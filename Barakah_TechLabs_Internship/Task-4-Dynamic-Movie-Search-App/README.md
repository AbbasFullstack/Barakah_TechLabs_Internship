# Task 4 — Dynamic Movie Search App

A responsive movie search web app built for the Barakah TechLabs Frontend Web Developer internship.

## Tech Stack
- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Fetch API
- OMDb API
- LocalStorage for browser-only API key storage

## Features
- Search movies through the OMDb API
- Responsive movie result cards
- Movie title, year, type, and poster
- Asynchronous API requests with Fetch
- Loading state while searching
- No-results and API error handling
- Network error handling
- Responsive desktop, tablet, and mobile layout
- Accessible labels and semantic HTML
- API key configuration stored locally in the browser

## Setup
1. Get a free OMDb API key from https://www.omdbapi.com/apikey.aspx
2. Open index.html, preferably through a local development server.
3. Click API Key.
4. Enter your OMDb API key and save it.
5. Search for a movie such as Interstellar, Inception, or The Dark Knight.

The OMDb API key is stored in LocalStorage for this static frontend project. A browser-exposed API key should not be treated as a secret.

## Run locally
Because the app uses browser Fetch requests, a local server is recommended:

~~~bash
python -m http.server 5500
~~~

Then open:
http://localhost:5500/Barakah_TechLabs_Internship/Task-4-Dynamic-Movie-Search-App/

## Internship Requirement Mapping
| Requirement | Implementation |
|---|---|
| HTML, CSS, JavaScript | index.html, style.css, script.js |
| OMDb API | https://www.omdbapi.com/ |
| Search movies | Search form + Fetch request |
| HTML cards | Dynamic movie card rendering |
| Async loading | async/await + Fetch API |
| No results | API response error handling |
| Network errors | Fetch exception handling |