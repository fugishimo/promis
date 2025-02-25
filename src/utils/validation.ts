export const profileValidation = {
  username: (value: string) => {
    if (!value) return "Username is required";
    if (value.length < 3) return "Username must be at least 3 characters";
    if (value.length > 30) return "Username must be less than 30 characters";
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Username can only contain letters, numbers, and underscores";
    return null;
  },
  
  profileName: (value: string) => {
    if (!value) return "Profile name is required";
    if (value.length > 50) return "Profile name must be less than 50 characters";
    return null;
  },
  
  bio: (value: string) => {
    if (value.length > 160) return "Bio must be less than 160 characters";
    return null;
  },
  
  location: (value: string) => {
    if (value.length > 100) return "Location must be less than 100 characters";
    return null;
  }
};
