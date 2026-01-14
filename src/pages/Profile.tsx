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
import { Textarea } from "@/components/ui/textarea";

const Profile = () => {
  const navigate = useNavigate();
  const { authenticated, user } = usePrivy();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isNewUser, setIsNewUser] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    bio: "",
    location: ""
  });
  const [error, setError] = useState("");
  
  const [profileData, setProfileData] = useState({
    username: "",
    profileName: "",
    bio: "",
    location: "",
    profilePic: "",
  });

  useEffect(() => {
    if (!authenticated || !user) {
      navigate("/login");
      return;
    }

    // Check if user already has a profile
    const checkExistingProfile = async () => {
      try {
        const profile = await profileService.getProfile(user.id);
        if (profile) {
          setFormData({
            username: profile.username || "",
            displayName: profile.display_name || "",
            bio: profile.bio || "",
            location: profile.location || ""
          });
          setProfileData({
            username: profile.username || "",
            profileName: profile.display_name || "",
            bio: profile.bio || "",
            location: profile.location || "",
            profilePic: profile.profile_pic || "",
          });
          setIsNewUser(false);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setIsNewUser(true);
      }
    };

    checkExistingProfile();
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
    
    const usernameError = profileValidation.username(formData.username);
    if (usernameError) newErrors.username = usernameError;
    
    const displayNameError = profileValidation.profileName(formData.displayName);
    if (displayNameError) newErrors.displayName = displayNameError;
    
    const bioError = profileValidation.bio(formData.bio);
    if (bioError) newErrors.bio = bioError;
    
    const locationError = profileValidation.location(formData.location);
    if (locationError) newErrors.location = locationError;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!formData.username.trim()) {
      setError("Username is required");
      toast({
        title: "Error",
        description: "Username is required",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      await profileService.createProfile(
        user!.id,
        formData.username.trim()
      );

      // If additional fields are filled, update the profile
      if (formData.displayName || formData.bio || formData.location) {
        await profileService.updateProfile(user!.id, {
          display_name: formData.displayName,
          bio: formData.bio,
          location: formData.location
        });
      }

      toast({
        title: "Success",
        description: "Profile created successfully",
      });
      navigate("/");
    } catch (error: any) {
      console.error("Profile creation error:", error);
      setError(error.message || "Failed to create profile");
      toast({
        title: "Error",
        description: error.message || "Failed to create profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
                        value={formData.username}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, username: e.target.value }));
                          if (errors.username) {
                            setErrors(prev => ({...prev, username: ""}));
                          }
                        }}
                        placeholder="Enter your username"
                        className={errors.username ? "border-red-500" : ""}
                      />
                      {errors.username && (
                        <p className="text-sm text-red-500">{errors.username}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={formData.displayName}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, displayName: e.target.value }));
                          if (errors.displayName) {
                            setErrors(prev => ({...prev, displayName: ""}));
                          }
                        }}
                        placeholder="Enter your display name"
                      />
                      {errors.displayName && (
                        <p className="text-sm text-red-500">{errors.displayName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, bio: e.target.value }));
                          if (errors.bio) {
                            setErrors(prev => ({...prev, bio: ""}));
                          }
                        }}
                        placeholder="Tell us about yourself"
                      />
                      {errors.bio && (
                        <p className="text-sm text-red-500">{errors.bio}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, location: e.target.value }));
                          if (errors.location) {
                            setErrors(prev => ({...prev, location: ""}));
                          }
                        }}
                        placeholder="Enter your location"
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
