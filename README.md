# ProductHub

A product management app (CRUD) built with **React 19**, **React Router 7** and the **Context API**.

Live demo: https://abdelrhmanabdelnabisaad.github.io/ProductHub-react/

## Features
- Register and login with validation and a password visibility toggle
- Protected dashboard route, session saved in localStorage
- Add, edit and delete products with field-by-field validation
- Live search by name or description, and filter by category
- Stats: total products and average price
- Toast notifications with react-hot-toast

## Validation rules
- Product name: starts with a capital letter, 2 to 15 characters (letters, digits, spaces, hyphens)
- Price: whole number, at least 3 digits
- Description: at least 30 characters
- Auth: valid email, password of 6+ characters, name of 3 to 30 letters

## Run it
```bash
npm install
npm run dev
```

## Deploy to GitHub Pages
```bash
npm run deploy
```
The build also creates `dist/404.html` (a copy of `index.html`), so refreshing or opening a direct link such as `/login` works on GitHub Pages.

> Data and accounts are stored in the browser (localStorage) only, so this is a front-end demo with no real backend.
