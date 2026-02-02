<div align="center">
  <h1>🎬 Movie Swipe</h1>
  <p><strong>Discover your next favorite movie, one swipe at a time</strong></p>
  
  ![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
</div>

---

## 📖 About

**Movie Swipe** is a Tinder-style movie discovery app that makes finding your next watch fun and intuitive. Swipe right on movies you like, swipe left on those you don't. Each card displays the movie poster, rating, and overview provided by The Movie Database (TMDB) API.

Built with **Vue 3** .

---

## ✨ Features

- 👆 **Swipe Gestures** - Swipe left or right to browse movies
- 🎥 **Expandable Movie Cards** - View poster, rating, overview, trailer and quick view links
- 🔍 **Filtering** - Filter by genre, year, rating, and more
- 💾 **Personal Movie List** - Save your favorite movies
- 📱 **Mobile-First Design** - Optimized for mobile with responsive layout
- ⚡ **Smooth Animations** - Satisfying card animations and transitions
- 💽 **Local Storage** - Your choices persist across sessions

---

## 🛠️ Tech Stack

- **Frontend Framework:** Vue 3 (Composition API)
- **Build Tool:** Vite
- **Language:** JavaScript (ES6+)
- **Styling:** CSS
- **API:** The Movie Database (TMDB) API
- **State Management:** Pinia stores
- **Storage:** Local Storage

---

## 📁 Project Structure

```
movie_swipe/
├── src/
│   ├── app/              # Main app configuration
│   ├── features/         # Feature modules
│   │   ├── components/   # Vue components
│   │   ├── composables/  # Reusable composition functions
│   │   └── stores/       # Pinia state stores
│   ├── services/         # API services
│   └── shared/           # Shared utilities and constants
├── public/               # Static assets
└── index.html            # Entry HTML file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **TMDB API Key** (free)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MiguelDSC/movie_swipe.git
   cd movie_swipe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```
   
   > 🔑 Get your free API key at [TMDB Settings](https://www.themoviedb.org/settings/api)

4. **Run the development server**
   ```bash
   npm run dev
   ```


## 🎯 Usage

1. **Browse Movies** - Swipe through movie cards
2. **Swipe Right** - Add movies to your list
3. **Swipe Left** - Skip movies you're not interested in
4. **Apply Filters** - Use the filter menu to narrow down results
5. **View Your List** - Check all the movies you've saved
6. **Watch Trailers** - Click on cards to view trailers
6. **Add to Stemio** - Navigate to steamio to add movie as bookmark

