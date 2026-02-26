# 🔐 User Authentication App (React Native CLI)

A clean, production-style React Native authentication app built using **React Context API** for state management and **React Navigation** for routing.
This project demonstrates a complete authentication flow with session persistence and scalable architecture.

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd <project-name>
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Install iOS Pods (iOS Only)

```bash
cd ios
pod install
cd ..
```

### 4️⃣ Run the App

**Android**

```bash
npx react-native run-android
```

**iOS**

```bash
npx react-native run-ios
```

---

## 🏗️ Architecture Overview

This app follows a **simple scalable architecture** commonly used in production React Native apps.

### 🔹 State Management — Context API

The authentication state is managed globally using a custom `AuthContext`.

It provides:

* `user` → Current logged-in user
* `login(email, password)`
* `signup(name, email, password)`
* `logout()`
* `loading` → Session restoration state

This avoids prop-drilling and keeps authentication logic centralized.

---

### 🔹 Navigation Flow

Navigation is conditionally rendered based on authentication state:

```
If user exists:
   → Home Screen

If user is null:
   → Login Screen
   → Signup Screen
```

This ensures protected routing without needing complex guards.

---

## ✨ Features Implemented

✅ Login & Signup Flow
✅ Global Authentication State (Context API)
✅ Form Validation with Error Messages
✅ Session Persistence using AsyncStorage
✅ Auto-login after app restart
✅ Logout Functionality
✅ Conditional Navigation
✅ Reusable UI Components
✅ Clean & Professional UI
✅ Smooth Animations using React Native Animated API
✅ Password Visibility Toggle (Bonus)

---

## 📁 Folder Structure

```
src/
 ├── components/        # Reusable UI components (Input, Button, etc.)
 ├── context/           # AuthContext (global auth logic)
 ├── navigation/        # Navigation configuration
 ├── screens/           # App screens (Login, Signup, Home)
 ├── styles/            # Global styling constants
 └── utils/             # Helpers (validation, storage helpers)
```

This structure keeps logic separated and easy to scale.

---

## 💾 How Persistence Works

Authentication state is persisted using **AsyncStorage**.

### On Login / Signup:

User object is saved:

```js
AsyncStorage.setItem('USER', JSON.stringify(user));
```

### On App Launch:

The app checks storage:

```js
AsyncStorage.getItem('USER')
```

If found → restore session → user stays logged in.
If not → show authentication flow.

### On Logout:

```js
AsyncStorage.removeItem('USER');
```

This simulates real-world token/session persistence.

---

## 🎯 Design Philosophy

The UI focuses on:

* Minimal and modern layout
* Consistent spacing system
* Clear typography hierarchy
* Smooth micro-interactions
* Production-ready feel (not a demo UI)

---

## 📸 Demo

(Add screenshots or a short recording here before submission.)

---

## ✅ What This Assignment Demonstrates

* Understanding of authentication flows
* Proper usage of React Context API
* Navigation state control
* Form handling & validation
* Persistent login sessions
* Clean architecture and reusable components

---

## 👨‍💻 Author

Built as part of a React Native take-home assignment to showcase clean architecture, UI discipline, and real-world patterns.
