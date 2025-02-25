import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"];
type ProfileUpdate = Database["public"]["Tables"]["user_profiles"]["Update"];

export const profileService = {
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data as UserProfile;
  },

  async updateProfile(userId: string, profile: ProfileUpdate) {
    // First check username uniqueness if it's being updated
    if (profile.username) {
      const { data: existingUser } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("username", profile.username)
        .neq("id", userId)
        .single();

      if (existingUser) {
        throw new Error("Username is already taken");
      }
    }

    const { data, error } = await supabase
      .from("user_profiles")
      .update(profile)
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as UserProfile;
  },

  async uploadProfilePicture(userId: string, file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/profile.${fileExt}`;
    const filePath = `profile_pictures/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('profiles')
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('profiles')
      .getPublicUrl(filePath);

    return publicUrl;
  },

  async createProfile(userId: string, walletAddress: string) {
    const { data: existingProfile } = await supabase
      .from("user_profiles")
      .select("id")
      .eq("id", userId)
      .single();

    if (existingProfile) return;

    const { error } = await supabase
      .from("user_profiles")
      .insert({
        id: userId,
        username: `user_${userId.slice(0, 8)}`, // Generate temporary username
        linked_wallet: walletAddress,
      });

    if (error) throw error;
  }
};
