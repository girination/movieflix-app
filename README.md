# 🎬 MovieFlix App

A dynamic web application for browsing and searching movies, built with **Next.js** and **Tailwind CSS**. The app fetches movie data from **The Movie Database (TMDB) API**, providing an interactive user experience with fast page loads.

---

## **Features**

* **Browse Popular Movies**: View a list of current popular movies.
* **Movie Details**: Click on any movie to see its synopsis, rating, release date, and other information.
* **Search Functionality**: Search for movies by title using the integrated search bar.
* **Responsive Design**: Works seamlessly on desktops, tablets, and mobile devices.
* **Optimized Performance**: Leverages Next.js's App Router with Server Components and Client Components, including `Suspense` for smooth loading states.

---

## **Technologies Used**

* **Next.js**: React framework with App Router for SSR and SSG.
* **React**: Core library for building the UI.
* **TypeScript**: Provides type safety and better maintainability.
* **Tailwind CSS**: Utility-first CSS framework for styling.
* **TMDB API**: Source of all movie data.

---

## **Getting Started**

Follow these steps to set up and run the project locally.

### **Prerequisites**

* Node.js (v18 or later)
* npm or yarn

---

### **1. Clone the repository**

```bash
git clone https://github.com/girination/movieflix-app.git
cd movieflix-app
```

---

### **2. Install dependencies**

```bash
npm install
# or
yarn install
```

---

### **3. Set up Environment Variables**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_TMDB_API_KEY=YOUR_TMDB_API_KEY
```

> Replace `YOUR_TMDB_API_KEY` with your actual TMDB API key.
> `.env.local` is included in `.gitignore` to prevent committing your keys to GitHub.

---

### **4. Run the development server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### **5. Build for production**

```bash
npm run build
# or
yarn build
```

This generates optimized production files in the `.next` directory.

---

### **6. Start the production server**

```bash
npm start
# or
yarn start
```

---

## **Project Structure**

```
movieflix-app/
├─ src/
│  ├─ app/
│  │  ├─ movie/[id]/page.tsx       # Dynamic movie detail page
│  │  ├─ search/page.tsx           # Movie search page
│  │  └─ page.tsx                  # Home page
│  ├─ components/                  # Reusable UI components
│  │  ├─ MovieCard.tsx
│  │  └─ LoadingSpinner.tsx
│  ├─ lib/                         # Utility functions (e.g., tmdb.ts)
│  └─ types/                       # TypeScript definitions (e.g., movie.ts)
├─ public/                          # Static assets like images
├─ next.config.js
└─ package.json
```

---

## **Built by**

💙 **MovieFlix** was built by Girination.
