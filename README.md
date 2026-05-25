# PopChoice (V1) - AI-Powered Movie Recommendation App

PopChoice is a lightweight, conversational, and visually engaging web application designed to help users discover movies tailored to their exact mood and preferences. By combining artificial intelligence with curated movie database information, PopChoice eliminates decision fatigue and serves up personalized recommendations.

---

## 🚀 Features & User Flow

### 1. Welcome Screen
* **Intuitive Setup:** Users begin by selecting simple context criteria such as:
    * **How many people?** (Tailor recommendations for solo watching or group movie nights).
    * **How much time do you have?** (Filter out movies that exceed the available viewing window).
* **Clean Branding:** Minimalistic UI with a dark cinematic theme and the fun mascot, PopChoice.

### 2. Tailored Preference Questionnaire
* **Dynamic Inputs:** A user-friendly questionnaire designed to capture deep preferences:
    * *"What's your favorite movie and why?"* (Captures cinematic taste and stylistic benchmarks).
    * *"Are you in the mood for something new or a classic?"* (Selectable tag filters).
    * *"What are you in the mood for?"* (Filter tags: Fun, Serious, Inspiring, Scary).
    * *"Which famous film person would you love to be stranded on an island with and why?"* (Unlocks creative text insights for the AI model to understand the user's personality/vibe).

### 3. Smart Recommendation Engine
* **Personalized Explanations:** Instead of just showing a title, PopChoice explains *why* the movie fits your answers (e.g., contrasting a love for *Interstellar* with a recommendation for *Alien* to provide a darker, more suspenseful atmosphere).
* **Visual Richness:** Pulls high-quality movie artwork dynamically.
* **Continuous Discovery:** Features a "Next Movie" button to loop back and cycle through alternative options instantly.

---

## 🛠️ Tech Stack & Architecture

The application is built using a modern decoupled architecture separating client rendering from secure server-side logic and third-party APIs.

* **Frontend:**
    * **HTML5 & CSS3:** Semantic structure with custom CSS for the responsive dark-blue cinematic interface, typography, and interactive button active states.
    * **Vanilla JavaScript:** Lightweight UI state management, handling page transitions, active multi-select tags, and form data collection.
* **Backend:**
    * **Node.js:** Server-side runtime environment.
    * **Express.js:** Minimalist web framework to handle API endpoints securely, avoiding exposing secret access tokens to the client-side environment.
* **External APIs:**
    * **OpenAI API:** Processes raw textual answers (e.g., favorite movies, reasons, preferred styles) to accurately evaluate tone, pacing, genre, and duration constraints. It generates a natural language pitch explaining why the recommendation fits.
    * **The Movie Database (TMDB) API:** Used to cross-reference the movie string output from OpenAI to fetch real-time metadata, specifically high-resolution movie poster images (`poster_path`).

---

## 📸 Screenshots and Demo


[Project link demo](https://assadullahhassan.github.io/pop-choice/)

[Project Screenshot/video](https://drive.google.com/drive/folders/1Ntyl7apHzF326T0HXL5zPpTExWa0Racp?usp=sharing)

