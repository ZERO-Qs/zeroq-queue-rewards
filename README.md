# ZeroQ Queue Rewards

This project is a web application designed to manage queues and reward users. It includes features for user registration, organization setup, and admin functionalities.

## Features

### User Management
- **User Registration:** Allows new users to create accounts.
- **Login/Logout:** Secure authentication for users.
- **Profile Management:** Users can view and manage their profiles.

### Organization Management
- **Organization Setup:** Organizations can register and set up their profiles, including name, type, location, contact number, image, and services offered.
- **Admin Dashboard:** (Planned) Administrators can manage organizations and user data.

### Queue Management
- **Quick Join:** Users can quickly join queues.
- **Queue Status:** (Planned) Users can view their position in a queue and estimated wait times.

## Project Structure

## User-Perspective Sitemap & Feature Flow

**1. Authentication & Access:**
*   **Login Page:** Users can log in with their credentials.
*   **Registration Page:** New users can create an account.
*   **Profile Management:**
    *   After logging in, users can access their profile (e.g., by clicking a "Profile" button in the navigation bar).
    *   Here, they can view their personal information, user type (e.g., "user", "admin", "org-admin").
    *   Users can also log out from this section.

**2. Main Application (User View):**
*   **Home Page:**
    *   Displays a list of available organizations.
    *   Each organization is presented as a card, showing its name, type, location, active queues, and average wait time.
    *   Users can click on an organization card to view more details or schedule a visit (join a queue).
*   **Organization Details Page (e.g., `/organization/:id`):**
    *   When a user clicks on an organization from the Home Page, they are taken to this page.
    *   This page will display detailed information about the selected organization, including its services.
    *   Users can join a queue for a specific service offered by the organization.
*   **Support Page:** Provides information or contact options for support.

**3. Organization Administrator (Org-Admin) View:**
*   **Org Admin Setup Page (e.g., `/org-admin-setup`):**
    *   This is the page we've been working on.
    *   New organization administrators will use this form to set up their organization's profile.
    *   They can enter:
        *   Organization Name
        *   Organization Type
        *   Location
        *   Contact Number
        *   Image URL
        *   Services Offered (with the ability to add and remove services dynamically).
    *   Submitting this form will save the organization's details.
*   **Org Admin Dashboard (e.g., `/org-admin`):**
    *   After setup, or upon logging in as an Org-Admin, they would access their dashboard.
    *   This dashboard would likely provide an overview of their organization's queues, active users, and other relevant metrics.
*   **Users Management (e.g., `/org-admin/users`):**
    *   Org-Admins can view and manage users associated with their organization.
    *   This might include viewing user details, their status, and when they joined.
*   **Counters Management (e.g., `/org-admin/counters`):**
    *   Org-Admins can manage the counters or service points within their organization.
    *   They can see how many customers each counter has served.
*   **Settings Page (e.g., `/org-admin/settings`):**
    *   Org-Admins can modify their organization's general information (name, address, contact number).
    *   They can also manage operating hours and other organization-specific preferences.

**4. General Components & Functionality:**
*   **Navigation Bar:** Provides quick access to Home, Support, and Profile/Login options.
*   **Theme Toggle:** Allows users to switch between light and dark themes.
*   **Toast Notifications:** Provides feedback to the user for actions like saving settings, successful logins, or errors.

## Project Structure

```
zeroQ/
├── public/                   # Static assets (images, favicons)
├── src/                      # Main application source code
│   ├── App.css               # Global CSS styles
│   ├── App.tsx               # Main application component
│   ├── components/           # Reusable UI components
│   │   ├── Navbar.tsx
│   │   ├── OrganizationCard.tsx
│   │   ├── ProfileModal.tsx
│   │   ├── QuickJoinModal.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── admin/            # Admin-specific components
│   │   ├── orgAdmin/         # Organization admin-specific components
│   │   └── ui/               # Shadcn UI components
│   ├── contexts/             # React Contexts for global state management
│   │   ├── AuthContext.tsx   # Authentication context
│   │   └── ThemeContext.tsx  # Theme context (dark/light mode)
│   ├── hooks/                # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── index.css             # Entry point for global styles
│   ├── lib/                  # Utility functions
│   │   └── utils.ts
│   ├── main.tsx              # Main entry point for the React application
│   ├── pages/                # Page-level components (routes)
│   │   ├── Home.tsx
│   │   ├── Index.tsx
│   │   ├── Login.tsx
│   │   ├── NotFound.tsx
│   │   ├── OrgAdminSetup.tsx # Organization setup form
│   │   ├── Organization.tsx
│   │   ├── Profile.tsx       # User profile page
│   │   ├── Register.tsx      # User registration page
│   │   ├── Wallet.tsx
│   │   ├── admin/            # Admin pages
│   │   └── orgAdmin/         # Organization admin pages
│   ├── types/                # TypeScript type definitions
│   │   └── organization.ts   # Organization related types
│   └── vite-env.d.ts         # Vite environment type definitions
├── .gitignore                # Git ignore file
├── bun.lockb                 # Bun lock file
├── components.json           # Shadcn UI components configuration
├── eslint.config.js          # ESLint configuration
├── index.html                # Main HTML file
├── package-lock.json         # npm package lock file
├── package.json              # Project dependencies and scripts
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.app.json         # TypeScript configuration for the application
├── tsconfig.json             # Base TypeScript configuration
├── tsconfig.node.json        # TypeScript configuration for Node.js environment
└── vite.config.ts            # Vite build configuration
```
