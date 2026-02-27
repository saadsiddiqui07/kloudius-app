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

---

## 📸 Screenshots

### iOS
<img width="190" height="auto" alt="Simulator Screenshot - iPhone 16 Pro - 2026-02-27 at 17 58 43" src="https://github.com/user-attachments/assets/9efdd8a7-db63-4e80-83d1-b8ef3d0d3ab8" /> <img width="190" height="auto" alt="Simulator Screenshot - iPhone 16 Pro - 2026-02-27 at 17 58 31" src="https://github.com/user-attachments/assets/1958b743-c545-4fce-9930-a31b45e07320" /> <img width="190" height="auto" alt="Simulator Screenshot - iPhone 16 Pro - 2026-02-27 at 17 59 32" src="https://github.com/user-attachments/assets/539676f8-a7f7-46d2-a2d7-3fad07b4c0b1" /> <img width="190" height="auto" alt="Simulator Screenshot - iPhone 16 Pro - 2026-02-27 at 18 00 05" src="https://github.com/user-attachments/assets/107b8ba2-9e6c-4c22-9138-8ea3ab974eef" /> <img width="190" height="auto" alt="Simulator Screenshot - iPhone 16 Pro - 2026-02-27 at 18 38 25" src="https://github.com/user-attachments/assets/00cc225a-1a4e-4465-b160-549b9052df35" />


### Android
<img width="190" height="auto" alt="Screenshot_1772195625" src="https://github.com/user-attachments/assets/7c08d188-78ec-4e53-980a-84b1df2b1ac3" /> <img width="190" height="auto" alt="Screenshot_1772195572" src="https://github.com/user-attachments/assets/ee35ebc0-4cdb-4a4e-a19c-c4316315de1c" />

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
