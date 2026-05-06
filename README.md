# 📺 Video Listing Project

A React-based video listing app that fetches videos and their metadata from an API and displays them in a YouTube-style layout — built to practice component architecture, state management, and hooks.



## 🚀 Features

- YouTube-style responsive video grid
- Fetches live video data from [FreeAPI](https://freeapi.app/)
- Skeleton loading cards while data is being fetched
- Formatted view counts, like counts, and comment counts (e.g. `1.2M`, `4.5K`)
- Human-readable timestamps (e.g. `2 years ago`, `Today`)
- Hover animation on video cards
- Graceful error handling on fetch failure
- Sticky header with search bar UI



## 🛠️ Tech Stack

- **React.js** — component architecture, `useState`, `useEffect`
- **Vanilla CSS-in-JS** — inline styles with a centralized `styles` object
- **FreeAPI** — public YouTube data API



## 📦 Getting Started

```bash
# Clone the repository
git clone https://github.com/Saimahmed78/Video-Listing-Project.git

# Navigate into the project
cd Video-Listing-Project

# Install dependencies
npm install

# Start the development server
npm run dev
```



## 🔌 API

Data is fetched from:

```
GET https://api.freeapi.app/api/v1/public/youtube/videos
```

No API key required.



## 📁 Project Structure

```
src/
├── App.jsx        # Main component — fetches data, renders layout
├── main.jsx       # React entry point
└── assets/        # Static assets
```



## 🧠 Concepts Practiced

- `useEffect` for data fetching with cleanup via `AbortController`
- `useState` for managing loading, error, and data states
- Component decomposition (`VideoCard`, `SkeletonCard`)
- Conditional rendering (skeleton → data / error)
- Helper functions for formatting counts and dates



## 🖼️ Preview

> YouTube-style dark UI with a responsive grid, skeleton loaders, and per-card stats (views, likes, comments).

![App Preview](../public/Preview%20Image.png)


## 👤 Author

**Saim Ahmed**  
BS Software Engineering — Riphah International University, Faisalabad

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-Saimahmed78-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Saimahmed78)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Saim%20Ahmed-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/saim-ahmed-722b802ba/)