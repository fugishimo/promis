import { useState, useEffect } from "react";
import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from "react-router-dom";
import { profileService } from "@/services/profileService";
import { profileValidation } from "@/utils/validation";
import { SidebarProvider } from "@/components/ui/sidebar";
import MainNavigation from "@/components/MainNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { authenticated, user } = usePrivy();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  
  const [profileData, setProfileData] = useState({
    username: "",
    profileName: "",
    bio: "",
    location: "",
    profilePic: "",
  });

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
      return;
    }

    const checkProfile = async () => {
      try {
        setIsLoading(true);
        const profile = await profileService.getProfile(user!.id);
        setProfileData({
          username: profile.username,
          profileName: profile.profile_name || "",
          bio: profile.bio || "",
          location: profile.location || "",
          profilePic: profile.profile_pic || "",
        });
        setIsNewUser(false);
      } catch (error) {
        // If profile doesn't exist, this is a new user
        setIsNewUser(true);
      } finally {
        setIsLoading(false);
      }
    };

    checkProfile();
  }, [authenticated, user, navigate]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const publicUrl = await profileService.uploadProfilePicture(user!.id, file);
      await profileService.updateProfile(user!.id, { profile_pic: publicUrl });
      setProfileData(prev => ({ ...prev, profilePic: publicUrl }));
      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload profile picture",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    const usernameError = profileValidation.username(profileData.username);
    if (usernameError) newErrors.username = usernameError;
    
    const profileNameError = profileValidation.profileName(profileData.profileName);
    if (profileNameError) newErrors.profileName = profileNameError;
    
    const bioError = profileValidation.bio(profileData.bio);
    if (bioError) newErrors.bio = bioError;
    
    const locationError = profileValidation.location(profileData.location);
    if (locationError) newErrors.location = locationError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // For new users, only validate username
    if (isNewUser) {
      const usernameError = profileValidation.username(profileData.username);
      if (usernameError) {
        setErrors({ username: usernameError });
        return;
      }
    } else if (!validateForm()) {
      return;
    }

    try {
      setIsSaving(true);
      if (isNewUser) {
        // Create new profile for new users
        await profileService.createProfile(
          user!.id, 
          profileData.username
        );
        // Redirect to home after successful profile creation
        navigate("/");
      } else {
        // Update existing profile
        await profileService.updateProfile(user!.id, {
          username: profileData.username,
          profile_name: profileData.profileName,
          bio: profileData.bio,
          location: profileData.location,
        });
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes("username")) {
        setErrors({ username: "Username is already taken" });
        toast({
          title: "Error",
          description: "Username is already taken",
          variant: "destructive",
        });
      } else {
        console.error("Profile error:", error); // Add this for debugging
        toast({
          title: "Error",
          description: "Failed to update profile",
          variant: "destructive",
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <MainNavigation />
        <main className="flex-1 p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-lg text-muted-foreground">Loading...</div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <header className="mb-8">
                <h1 className="text-4xl font-bold text-foreground">
                  {isNewUser ? "Create Your Profile" : "Edit Profile"}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {isNewUser 
                    ? "Choose a username to get started" 
                    : "Manage your profile information"}
                </p>
              </header>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center space-x-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profileData.profilePic} />
                      <AvatarFallback>
                        {profileData.profileName?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <Button variant="outline" onClick={() => document.getElementById("picture-upload")?.click()}>
                      Change Picture
                    </Button>
                    <input
                      id="picture-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username">Username*</Label>
                      <Input
                        id="username"
                        value={profileData.username}
                        onChange={(e) => {
                          setProfileData(prev => ({...prev, username: e.target.value}));
                          if (errors.username) {
                            setErrors(prev => ({...prev, username: ""}));
                          }
                        }}
                        className={errors.username ? "border-red-500" : ""}
                        required
                      />
                      {errors.username && (
                        <p className="text-sm text-red-500">{errors.username}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="profileName">Display Name</Label>
                      <Input
                        id="profileName"
                        value={profileData.profileName}
                        onChange={(e) => {
                          setProfileData(prev => ({...prev, profileName: e.target.value}));
                          if (errors.profileName) {
                            setErrors(prev => ({...prev, profileName: ""}));
                          }
                        }}
                        className={errors.profileName ? "border-red-500" : ""}
                      />
                      {errors.profileName && (
                        <p className="text-sm text-red-500">{errors.profileName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => {
                          setProfileData(prev => ({...prev, bio: e.target.value}));
                          if (errors.bio) {
                            setErrors(prev => ({...prev, bio: ""}));
                          }
                        }}
                        className={errors.bio ? "border-red-500" : ""}
                      />
                      {errors.bio && (
                        <p className="text-sm text-red-500">{errors.bio}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => {
                          setProfileData(prev => ({...prev, location: e.target.value}));
                          if (errors.location) {
                            setErrors(prev => ({...prev, location: ""}));
                          }
                        }}
                        className={errors.location ? "border-red-500" : ""}
                      />
                      {errors.location && (
                        <p className="text-sm text-red-500">{errors.location}</p>
                      )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardContent>
                </Card>
              </form>
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Profile;
