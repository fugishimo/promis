# **Profile Page - Backend Product Requirements Document (PRD)**

## **Overview**
The Profile Page allows users to **edit and manage** their personal information, including their username, bio, profile picture, and linked wallet. The backend will handle **profile data storage, validation, and updates** while ensuring seamless integration with **Privy for authentication** and **Supabase for database management**.

---

## **1. Profile Page Access & Visibility**
### **Core Rules:**
- The **Profile tab appears in the left sidebar only when the user is logged in**.
- When a user **logs out, the Profile tab disappears immediately**.
- If an unauthenticated user attempts to access the Profile page, they are **redirected to the login page**.

---

## **2. Profile Data Management**
### **Stored User Information (in Supabase)**
Each user profile will be linked to **Privy's User ID** and include the following fields:
- **Username** (must be unique, validated on creation and update)
- **Profile Name** (display name, separate from username)
- **Bio** (short description)
- **Location** (optional field)
- **Profile Picture** (stored in Supabase storage)
- **Linked Wallet** (read-only, managed by Privy authentication)
- **Last Updated Timestamp** (tracks the last profile modification)

### **Profile Editing Rules:**
- Users can update **Profile Name, Bio, Location, and Profile Picture** at any time.
- **Usernames must be unique** and are validated against existing usernames.
- The **Save Changes button** must be clicked to apply profile updates.
- **Linked Wallet is read-only** and cannot be changed from the Profile page.

### **Profile Picture Upload Rules:**
- Users can **upload a new profile picture** through the UI.
- Images are stored in **Supabase storage** under a user-specific path.
- Public URL is generated for profile pictures.
- Default avatar fallback is provided if no picture is uploaded.

---

## **3. Backend System & Database Handling**
### **Database Structure (Supabase Tables)**
#### **user_profiles Table:**
| Column Name      | Data Type  | Description |
|----------------|-----------|-------------|
| `id`           | UUID (Primary Key) | Matches Privy's User ID |
| `username`     | TEXT (Unique) | User-selected handle |
| `profile_name` | TEXT | Display name |
| `bio`          | TEXT | Short personal description |
| `location`     | TEXT | Optional user location |
| `profile_pic`  | TEXT (URL) | Path to profile picture in storage |
| `linked_wallet` | TEXT (Read-only) | Wallet address linked via Privy |
| `last_updated` | TIMESTAMP | Last modification date |

### **Implemented Services:**
1. **Profile Service**
   - ✅ Get or create UUID mapping for Privy ID
   - ✅ Profile creation with unique username validation
   - ✅ Profile retrieval by Privy ID
   - ✅ Profile updates with field validation
   - ✅ Profile picture upload to Supabase storage

2. **Authentication Flow**
   - ✅ Privy integration for user authentication
   - ✅ Automatic profile check on login
   - ✅ Redirect to profile creation for new users
   - ✅ Session management with Privy

---

## **4. Security & Performance Considerations**
- ✅ **Unique username validation** implemented
- ✅ **Profile data validation** using validation utils
- ✅ **Secure file storage** in Supabase
- ✅ **Authentication checks** before profile operations

---

## **Implementation Status**

### **Completed Components:**
1. **Frontend Structure**
   - ✅ Basic Profile page component created
   - ✅ Profile route added to App.tsx
   - ✅ Navigation item added to MainNavigation
   - ✅ Authentication redirect logic implemented
   - ✅ Basic form layout with all required fields
   - ✅ Profile picture upload UI with functionality
   - ✅ Form validation implementation
   - ✅ Error handling and notifications

2. **Backend Integration**
   - ✅ Supabase client setup
   - ✅ Database types definition
   - ✅ Profile service implementation
   - ✅ Basic CRUD operations structure
   - ✅ Initial profile creation on login
   - ✅ Image upload to Supabase storage
   - ✅ Username uniqueness validation

### **Pending Implementation:**
1. **Features**
   - ⏳ Profile picture crop/resize functionality
   - ⏳ Username change cooldown logic
   - ⏳ Advanced error handling
   - ⏳ Loading state improvements

2. **Security**
   - ⏳ Rate limiting
   - ⏳ Advanced access control
   - ⏳ Enhanced session management

### **Next Steps:**
1. Implement profile picture cropping
2. Add username change cooldown mechanism
3. Enhance loading states and error handling
4. Implement rate limiting for profile updates

---

## **Latest Updates**
- **[2024-XX-XX]** Implemented profile picture upload functionality
- **[2024-XX-XX]** Added form validation with error handling
- **[2024-XX-XX]** Integrated Supabase storage for profile pictures
- **[2024-XX-XX]** Implemented username uniqueness validation
- **[2024-XX-XX]** Added profile creation and update flows
- **[2024-XX-XX]** Integrated toast notifications for user feedback

---

## **Conclusion**
This backend system ensures **secure and efficient profile management**, allowing users to update their information while maintaining **seamless integration with Privy authentication** and **Supabase for storage**. Future updates will introduce **profile search and privacy settings.**

