import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { v4 as uuidv4 } from 'uuid';

type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"];

// Define the profile update interface
interface ProfileUpdate {
  username?: string;
  bio?: string;
  avatar_url?: string;
  profile_pic?: string;
  display_name?: string;
  location?: string;
  social_links?: { [key: string]: string };
}

export const profileService = {
  async getOrCreateUUID(privyId: string) {
    console.log("Getting or creating UUID for Privy ID:", privyId);
    
    try {
      // First, try to get existing mapping
      const { data: existingMapping, error: fetchError } = await supabase
        .from("user_id_mapping")
        .select("uuid")
        .eq("privy_id", privyId)
        .single();

      if (existingMapping?.uuid) {
        console.log("Found existing UUID mapping:", existingMapping.uuid);
        return existingMapping.uuid;
      }

      // If no mapping exists, create one with a new UUID
      const newUuid = uuidv4();
      const { data: newMapping, error: insertError } = await supabase
        .from("user_id_mapping")
        .insert([{ 
          privy_id: privyId,
          uuid: newUuid
        }])
        .select("uuid")
        .single();

      if (insertError) {
        console.error("Error creating UUID mapping:", insertError);
        throw insertError;
      }

      console.log("Created new UUID mapping:", newUuid);
      return newUuid;
    } catch (error) {
      console.error("Error in getOrCreateUUID:", error);
      throw error;
    }
  },

  async getProfile(privyId: string) {
    console.log("Getting profile for Privy ID:", privyId);
    
    try {
      const uuid = await this.getOrCreateUUID(privyId);
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", uuid)
        .single();

      if (error && error.code !== 'PGRST116') { // Ignore "not found" error
        console.error("Error getting profile:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error in getProfile:", error);
      throw error;
    }
  },

  async createProfile(privyId: string, username: string) {
    console.log("Creating profile with:", { privyId, username });
    
    try {
      // First check if username is taken
      const { data: existingUser } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", username)
        .single();

      if (existingUser) {
        throw new Error("Username is already taken");
      }

      // Get or create UUID for this Privy ID
      const uuid = await this.getOrCreateUUID(privyId);

      // Create the profile with the UUID
      const { data, error } = await supabase
        .from("profiles")
        .insert([{
          id: uuid,
          username,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error("Profile creation error:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error in createProfile:", error);
      throw error;
    }
  },

  async updateProfile(privyId: string, updates: ProfileUpdate) {
    try {
      const uuid = await this.getOrCreateUUID(privyId);

      if (updates.username) {
        // Check if new username is taken by another user
        const { data: existingUser } = await supabase
          .from("profiles")
          .select("id")
          .eq("username", updates.username)
          .neq("id", uuid)
          .single();

        if (existingUser) {
          throw new Error("Username is already taken");
        }
      }

      const { data, error } = await supabase
        .from("profiles")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
          ...(updates.username && { username_changed_at: new Date().toISOString() })
        })
        .eq("id", uuid)
        .select()
        .single();

      if (error) {
        console.error("Profile update error:", error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Error in updateProfile:", error);
      throw error;
    }
  },

  async uploadProfilePicture(privyId: string, file: File) {
    try {
      const uuid = await this.getOrCreateUUID(privyId);
      const fileExt = file.name.split('.').pop();
      const filePath = `${uuid}/profile-picture.${fileExt}`;

      const { error: uploadError } = await supabase
        .storage
        .from('profile-pictures')
        .upload(filePath, file, {
          upsert: true
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase
        .storage
        .from('profile-pictures')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      throw error;
    }
  }
};
