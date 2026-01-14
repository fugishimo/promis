PRD: Removing Profile Page & Using Privy ID as Username

Overview

This document outlines the removal of the Profile Page and the new implementation where a user's Privy.io ID is automatically assigned as their username. Upon login, the user’s Privy ID will appear in a username box next to the Log Out/Login button.

1. Profile Page Removal

Changes to be Made:

Completely remove the Profile Page (both frontend UI and backend endpoints for profile creation/updates).

Remove the profile sidebar tab so it does not appear in the navigation.

Remove the profile creation redirect (after logging in, users go directly to the Home page without needing to set up a profile).

Delete unused Supabase database fields related to profile data (e.g., profile name, bio, location, profile picture). Only keep Privy ID in the user table.

2. Using Privy ID as Username

New Username Logic:

The user's Privy.io ID will automatically become their username.

No option for users to change their username.

Usernames should be unique, and since Privy assigns unique IDs, no validation is required.

Data Storage:

Supabase User Table Changes:

Keep: id (UUID from Privy), created_at

Remove: username, profile_name, bio, location, profile_pic

Final Schema:

Column Name

Data Type

Description

id

UUID (Primary Key)

Matches Privy.io User ID

created_at

TIMESTAMP

Account creation date

Privy ID to UUID Mapping:

A mapping system has been implemented where the Privy ID is linked to a UUID.

On user login: The system checks if the logged-in Privy ID has an associated UUID:

If the UUID exists: Proceed with login.

If no UUID exists: A new UUID is generated, stored in Supabase, and linked to the Privy ID.

This ensures consistent user identification and retrieval.

3. Frontend Changes

Username Display on Home Page

Before Login: No username box is visible.

After Login: A box next to the Log Out button will display:

Label: Your Username:

Value: User's Privy.io ID

Box Disappears on Logout (username should not be visible when logged out).

Login Flow Adjustments:

User logs in via Privy.io.

Privy assigns a unique ID and the backend checks if the user already exists in Supabase.

If user exists → Redirect to Home Page.

If user is new → Save their Privy ID to Supabase, then redirect to Home Page.

On Home Page, username box appears next to the Log Out button.

On Logout, username box disappears.

4. Backend System & API Adjustments

Supabase User Management

On user login: Check if Privy ID exists in Supabase:

If exists, proceed with login

If new, store Privy ID in Supabase and proceed

API Endpoints:

POST /auth/login → Authenticate user with Privy.

GET /user/{id} → Retrieve user data (only Privy ID).

POST /user/create → Add new user (only store Privy ID).

POST /auth/logout → Log out user and remove session.

5. Security & Performance Considerations

Privy.io handles authentication securely (no need for manual password storage).

Minimal database storage (only store Privy ID and timestamp, reducing query load).

Efficient session handling (username box only appears when logged in, reducing unnecessary UI elements).

Ensure fast retrieval of username on login (cached for smooth frontend experience).

Conclusion

This update simplifies user management by removing profile creation entirely and instead using Privy.io IDs as usernames. The frontend will dynamically display the username after login, and the backend will only store minimal user data in Supabase. This results in a more efficient, seamless experience while maintaining strong authentication security. 🚀

