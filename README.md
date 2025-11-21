# 📱 WorldItSocialNetwork – Mobile Client

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-9cf?style=for-the-badge)

**WorldItSocialNetwork Mobile** is the official mobile application for the WorldIt social platform. Built with **React Native** and **Expo**, it offers a cross-platform experience for users to connect, share posts, chat, and manage their digital social life.

---

## 🚀 Features

Based on the project modules, the app includes:

-   **🔐 Authentication:** Login and Registration flows.
-   **💬 Messaging System:** Private chats and real-time messaging (`modules/chat`).
-   **📝 Feed & Posts:** Create, view, and interact with posts (`modules/post`).
-   **👤 User Profile:** Manage avatar and personal details (`modules/my_publications`).
-   **🖼️ Media Sharing:** Image uploads and galleries.

---

## 📁 Project Structure

The project follows a **Feature-Sliced/Modular** architecture for better scalability.

```text
WorldItSocialNetwork/
│
├── .expo/                  # Expo configuration files
├── assets/                 # Static assets (fonts, icons)
├── src/
│   ├── modules/            # Business logic modules
│   │   ├── chat/           # Chat features (privateChat.tsx, etc.)
│   │   ├── post/           # Post handling (change-post.tsx, etc.)
│   │   ├── my_publications/# User's content management
│   │   ├── friendship/     # Friend requests logic
│   │   └── album/          # Photo albums
│   │
│   ├── shared/             # Shared resources
│   │   ├── ui/             # Reusable UI components & Images
│   │   │   └── images/     # (avatar.png, main-logo.png...)
│   │   ├── api/            # API services (Axios/Fetch)
│   │   └── utils/          # Helper functions
│   │
│   └── navigation/         # App navigation configuration
│
├── App.tsx                 # Main application entry point
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
└── babel.config.js
```

## ✨ Features

Based on the current project structure, the following functionality is implemented:

### 🔐 Authorization

-   Login and registration screens
-   Basic validation logic

### 📝 Feed & Posts

-   Creation and editing of publications
-   Viewing your own posts
-   Updated design for post editing (change-post)

### 💬 Private Chat

-   Private messaging interface (privateChat module)

### 👤 User Profile

-   Displaying user avatar
-   Viewing a list of personal publications

---

## 🛠 Installation & Setup

### 🔧 Prerequisites

Make sure you have installed:

-   **Node.js** (LTS version recommended)
-   **Git**

---

### 📥 Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/sema-gr/WorldItSocialNetwork-Front-End.git
cd WorldItSocialNetwork
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Configuration**
   `If your project uses API requests, create a .env file in the root directory and specify your backend API URL:`

```
API_BASE_URL=http://your-backend-url/
```

4. **Start the project**

```
npx expo start
```

## 📱 Testing the Application

### On a physical device

Install the **Expo Go** app from:

- Google Play  
- App Store  

Then scan the QR code displayed in the terminal after running:

```bash
expo start
```

On an emulator

Press **a** — launch Android emulator

Press **i** — launch iOS simulator (macOS only)

## 📌 Notes

The project is currently in active development.

Additional modules will be added as the application grows.