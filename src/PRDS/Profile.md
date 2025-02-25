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
- **Username** (must be unique, 7-day cooldown for changes)
- **Profile Name** (display name, separate from username)
- **Bio** (short description)
- **Location** (optional field)
- **Profile Picture** (stored in Supabase storage)
- **Linked Wallet** (read-only, managed by Privy authentication)
- **Last Updated Timestamp** (tracks the last profile modification)

### **Profile Editing Rules:**
- Users can update **Profile Name, Bio, Location, and Profile Picture** at any time.
- **Usernames must be unique** and can only be changed **once every 7 days**.
- The **Save Changes button** must be clicked to apply profile updates.
- **Linked Wallet is read-only** and cannot be changed from the Profile page.

### **Profile Picture Upload Rules:**
- Users can **upload a new profile picture**.
- A **crop/resize option** is provided before finalizing the upload.
- Image is stored in **Supabase storage**, linked to the user's profile.
- Default avatar is assigned if no picture is uploaded.

---

## **3. Backend System & Database Handling**
### **Database Structure (Supabase Table: `user_profiles`)**
| Column Name      | Data Type  | Description |
|----------------|-----------|-------------|
| `id`           | UUID (Primary Key) | Matches Privy's User ID |
| `username`     | TEXT (Unique) | User-selected handle (7-day cooldown) |
| `profile_name` | TEXT | Display name |
| `bio`          | TEXT | Short personal description |
| `location`     | TEXT | Optional user location |
| `profile_pic`  | TEXT (URL) | Path to profile picture in storage |
| `linked_wallet` | TEXT (Read-only) | Wallet address linked via Privy |
| `last_updated` | TIMESTAMP | Last modification date |

### **API Endpoints:**
1. **GET /profile/{user_id}** → Retrieve user profile data.
2. **PUT /profile/update** → Update profile fields (except username & wallet).
3. **PUT /profile/update-username** → Change username (enforce 7-day cooldown).
4. **POST /profile/upload-picture** → Upload and store new profile picture.

---

## **4. Security & Performance Considerations**
- **Unique username validation** to prevent duplicates.
- **Rate limiting on profile updates** to prevent spam changes.
- **Session-based access control** to prevent unauthorized profile modifications.
- **Optimized queries & indexing** for fast profile retrieval.

---

## **Implementation Status**

### **Completed Components:**
1. **Frontend Structure**
   - ✅ Basic Profile page component created
   - ✅ Profile route added to App.tsx
   - ✅ Navigation item added to MainNavigation
   - ✅ Authentication redirect logic implemented
   - ✅ Basic form layout with all required fields
   - ✅ Profile picture upload UI (without functionality)
   - ✅ Fixed navigation routing using React Router's Link component

2. **UI Components Integrated:**
   - ✅ Avatar component for profile picture
   - ✅ Input fields for all profile data
   - ✅ Form layout with Cards
   - ✅ Toast notifications setup
   - ✅ Basic responsive design

3. **Backend Integration**
   - ✅ Supabase client setup
   - ✅ Database types definition
   - ✅ Profile service implementation
   - ✅ Basic CRUD operations structure
   - ✅ Initial profile creation on login

### **Pending Implementation:**
1. **Backend Integration**
   - ⏳ Image upload to Supabase storage
   - ⏳ Username uniqueness validation
   - ⏳ Username change cooldown logic

2. **Features**
   - ⏳ Profile picture crop/resize functionality
   - ⏳ Form validation
   - ⏳ Error handling
   - ⏳ Loading states
   - ⏳ Success/error notifications

3. **Security**
   - ⏳ Rate limiting
   - ⏳ Data validation
   - ⏳ Access control
   - ⏳ Session management

### **Next Steps:**
1. Implement image upload functionality
2. Add form validation and error handling
3. Implement username uniqueness checks
4. Add loading states and success/error notifications
5. Implement username change cooldown logic

---

## **Latest Updates**
- **[2024-XX-XX]** Initial Profile page component created
- **[2024-XX-XX]** Added Profile route to App.tsx
- **[2024-XX-XX]** Integrated basic UI components
- **[2024-XX-XX]** Added authentication redirect logic
- **[2024-XX-XX]** Implemented profile service with Supabase
- **[2024-XX-XX]** Fixed navigation routing with React Router
- **[2024-XX-XX]** Added initial profile creation on login

---

## **Conclusion**
This backend system ensures **secure and efficient profile management**, allowing users to update their information while maintaining **seamless integration with Privy authentication** and **Supabase for storage**. Future updates will introduce **profile search and privacy settings.**

