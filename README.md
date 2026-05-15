# CRUD App (React)

A full-featured product management application built with **React 18**, **React Router v6**, and **Context API**. Converted and upgraded from a vanilla JS project.

---

##  Features

###  Authentication
- Register with name, email, and password
- Login with validation and error messages
- Password strength indicator on register
- Protected routes — dashboard requires login
- Persistent sessions via localStorage

###  Product Management (CRUD)
- **Add** products with full validation
- **Edit** products inline with form pre-fill
- **Delete** with confirmation dialog
- **Search** by name or description (real-time)
- **Filter** by category (mobile, laptop, tv, watch, tablet)
- Stats dashboard (total products, average price)

### Validation
- Product name: starts with capital letter, 2–15 chars
- Price: minimum 3 digits
- Category: must be from predefined list
- Description: minimum 30 characters
- Auth: email format, password length, name length
- Real-time field validation with visual feedback

---

## 🛠 Tech Stack

- React 18 => UI framework
- Vite => Build Tool
- React Router v6 => Client Stat (Auth + Products)
- Context API => Global Stat (Auth + Products)
- react-hot-toast => Toast Notification
- localStorage => Data Persistence

---

## ScreenShot
[!Register](./design/register.png)
[!Error Register Not Add Data](./design/error-register.png)
[!Matched Password With Confirm Password](./design/match-password.png)
[!Login](./design/login.png)
[!Invalid Login](./design/invalid-login.png)
[!Home](./design/home.png)
[!Regular Expression](./design/regular-products.png)
[!Add Products](./design/add-product.png)

## 🚀 Run Locally

```bash
npm install
npm run dev
```

---

##  Developer by

**Abdelrhman Saad** — Front-End Developer  
Converted from Vanilla JS → React with Auth, Routing, Context API

