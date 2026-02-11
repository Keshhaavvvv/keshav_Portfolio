# 🚀 Personal Portfolio & Web Development Capstone

A modern, responsive Personal Portfolio website built to showcase my skills, projects, and education. This project serves as my **Web Development Capstone** submission, integrating advanced frontend concepts, local storage management, and interactive React components.

🔗 **Live Demo:** [https://keshav-portfolio-gold.vercel.app/]

---

## 📋 Project Overview

This Single Page Application (SPA) combines three key project requirements into one cohesive experience:
1.  **Resume/Portfolio Website:** A fully responsive layout with About, Skills, Education, and Contact sections.
2.  **Contact Manager (SPA):** A live demo section where users can add contacts dynamically.
3.  **Interactive React Components:** Reusable project cards with independent state management (Like/Unlike functionality).

---

## ✨ Key Features

### 1. 🎨 UI/UX & Theming
* **Dark/Light Mode:** Fully functional theme toggle that persists user preference via `localStorage`.
* **Responsive Design:** Optimized for mobile, tablet, and desktop views.
* **Animations:** Smooth page transitions and hover effects using **Framer Motion**.

### 2. 📬 Contact Form & Data Retrieval
* **Data Storage:** Contact form submissions are saved locally using **Browser LocalStorage** (JSON format).
* **Admin Dashboard:** A hidden admin panel to view received messages.
* **Secure-ish Login:** Admin section is protected by a hardcoded authentication check.

### 3. 🧩 Interactive Components
* **Dynamic Project Cards:** Reusable components that accept props for title, image, and tech stack.
* **Like Button Logic:** Each project card has an independent `useState` hook to handle its "Liked" status.
* **Live Contact Directory:** Users can add new contacts to a list instantly without page reloads (demonstrating React State updates).

---

## 🛠️ Tech Stack

* **Frontend Framework:** React 19 + TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS v4
* **Animations:** Framer Motion
* **Icons:** Lucide React

---

## 🚀 Getting Started (Run Locally)

Follow these steps to run the project on your local machine:

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/keshav-portfolio.git](https://github.com/YOUR_USERNAME/keshav-portfolio.git)
    cd keshav-portfolio
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start the Development Server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:5173` to view the app.

---

##  Project Structure

```text
src/
├── components/        # Reusable UI components
│   ├── ContactCard.tsx
│   ├── ProjectCard.tsx
│   └── ResponseCard.tsx
├── App.tsx           # Main application logic & layout
├── index.css         # Tailwind imports & global styles
└── main.tsx          # React entry point
public/               # Static assets (images)