# afghanistan-tour-guide
A travel guide website for foreign tourists visiting Afghanistan. It provides information about cities, attractions, culture, and travel tips to help visitors explore safely and enjoyably

## Front-end features

- Responsive navigation with a mobile menu on the content pages
- Searchable and filterable destination cards rendered from JavaScript data
- Keyboard-accessible photo gallery lightbox
- Client-side booking form validation and a demo preview only
- Optional current-weather lookup using the Open-Meteo API

The booking form does not send or save requests. The project has no backend or
database.

## Running the project

Open `index.html` directly to browse the static pages. To use the weather
feature, run the folder with a local static server such as the VS Code Live
Server extension, then open `index.html` from its local HTTP address. The API
feature requires an internet connection; other pages and interactions remain
available if the weather service cannot be reached.

## JavaScript files

- `JS/main.js` contains the shared mobile navigation, home search, destination
  data/filtering, and weather Fetch example.
- `JS/gallery.js` contains the gallery lightbox interactions.
- `JS/booking.js` contains front-end-only form validation and preview logic.
