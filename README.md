
# Set up guide

## Step 1
Fork the repository

## Step 2
Clone the forked repository
```bash
git clone <url to your forked repo>
```

## Step 3
Open vounteersiitj folder in VS code

## Step 4
Open terminal and run these commands

```
npm install
```
```
npx tailwindcss init
```

## Step 5
Setup tailwind css

### Update tailwind.config.js
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
### Add this to index.css in src folder
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```