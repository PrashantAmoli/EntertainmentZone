# Entertainment Zone

This web app is developed using ReactJS (Vite), Redux, and Tailwind CSS. It is a simple web app which shows the list of movies and TV shows with option of adding them to favourites. It also shows the details of the selected movie or TV show. There is scope for more features to be added and incrementally adopted improve the app. 

### This app uses 2 APIs to fetch the data. The APIs are:
1. OMDB API - http://www.omdbapi.com/
- NOTE: Only `/search` endpoint uses OMDB API
2. MovieDB API - https://www.themoviedb.org/documentation/api

### Structures
- `src` - Contains all the source code
- `src/components` - Contains all the components exported to other folders via `index.js`
- `src/pages` - Contains will contain all the page components when app grows
- `src/context` - Contains all the redux related code
- `src/utils` - Contains all the utility functions
- `src/index.css` - Contains all the CSS utitlity classes
- `src/api/index.js` - Contains API urls for various reqests with comments

### To run the app locally:
1. Clone the repo
2. Run `npm install`
3. Add environment variables in `.env` file: 
- `VITE_OMDB_API_KEY` 
- `VITE_MOVIEDB_API_KEY`
3. Run `npm run dev`
4. Open `http://localhost:3000/` in the browser
5. Install Better Comments extension in VS Code to better visualize comments in the code



