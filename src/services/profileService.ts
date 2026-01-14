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
  async getOrCreateUUID(privyId: string): Promise<string> {
    console.log("Starting getOrCreateUUID for Privy ID:", privyId);
    
    try {
      // First, check if a mapping already exists
      const { data: existingMapping, error: lookupError } = await supabase
        .from("user_id_mapping")
        .select("uuid")
        .eq("privy_id", privyId)
        .single();

      if (lookupError && lookupError.code !== 'PGRST116') { // Ignore "not found" error
        console.error("Error looking up existing mapping:", lookupError);
        throw lookupError;
      }

      // If mapping exists, return the UUID
      if (existingMapping) {
        console.log("Found existing mapping:", existingMapping);
        return existingMapping.uuid;
      }

      // If no mapping exists, create a new UUID and mapping
      console.log("No existing mapping found, creating new UUID");
      const newUUID = crypto.randomUUID();

      const { error: insertError } = await supabase
        .from("user_id_mapping")
        .insert([{
          privy_id: privyId,
          uuid: newUUID,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (insertError) {
        console.error("Error creating new mapping:", insertError);
        throw insertError;
      }

      console.log("Successfully created new mapping with UUID:", newUUID);
      return newUUID;
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

      // Get the existing UUID from mapping
      const { data: existingMapping } = await supabase
        .from("user_id_mapping")
        .select("uuid")
        .eq("privy_id", privyId)
        .single();

      let uuid;
      if (existingMapping) {
        uuid = existingMapping.uuid;
      } else {
        // If no mapping exists, create new UUID and mapping
        uuid = crypto.randomUUID();
        
        // First create the user
        const { error: userError } = await supabase
          .from("users")
          .insert([{ 
            id: uuid,
            created_at: new Date().toISOString()
          }]);

        if (userError) {
          console.error("User creation error:", userError);
          throw userError;
        }

        // Then create the mapping
        const { error: mappingError } = await supabase
          .from("user_id_mapping")
          .insert([{
            privy_id: privyId,
            uuid: uuid
          }]);

        if (mappingError) {
          console.error("Mapping creation error:", mappingError);
          throw mappingError;
        }
      }

      // Verify user exists and create if it doesn't
      const { data: userExists } = await supabase
        .from("users")
        .select("id")
        .eq("id", uuid)
        .single();

      if (!userExists) {
        const { error: userError } = await supabase
          .from("users")
          .insert([{ 
            id: uuid,
            created_at: new Date().toISOString()
          }]);

        if (userError) {
          console.error("User creation error:", userError);
          throw userError;
        }
      }

      // Create the profile
      const { data, error: profileError } = await supabase
        .from("profiles")
        .insert([{
          id: uuid,
          username,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (profileError) {
        console.error("Profile creation error:", profileError);
        throw profileError;
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
