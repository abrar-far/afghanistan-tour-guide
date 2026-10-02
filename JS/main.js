const siteNavButtons = document.querySelectorAll(".menu-toggle");

siteNavButtons.forEach((button) => {
  const menu = document.getElementById(button.getAttribute("aria-controls"));

  if (!menu) {
    return;
  }

  const sidebarOverlay =
    menu.id === "sidebar" ? document.getElementById("sidebarOverlay") : null;

  function closeMenu(returnFocus = false) {
    menu.classList.remove("is-open");
    menu.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open site menu");
    sidebarOverlay?.classList.remove("active");
    document.body.classList.remove("menu-open");
    if (returnFocus) button.focus();
  }

  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    menu.classList.toggle("is-open", !isExpanded);
    menu.classList.toggle("open", !isExpanded);
    button.setAttribute("aria-expanded", String(!isExpanded));
    button.setAttribute(
      "aria-label",
      isExpanded ? "Open site menu" : "Close site menu",
    );
    sidebarOverlay?.classList.toggle("active", !isExpanded);
    document.body.classList.toggle("menu-open", !isExpanded);
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeMenu());
  });

  sidebarOverlay?.addEventListener("click", () => closeMenu(true));

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      button.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu(true);
    }
  });
});

const homeSearchForm = document.getElementById("homeSearchForm");

if (homeSearchForm) {
  homeSearchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchInput = document.getElementById("homeSearch");
    const searchTerm = searchInput.value.trim();
    const destinationUrl = new URL("destination.html", window.location.href);

    if (searchTerm) {
      destinationUrl.searchParams.set("search", searchTerm);
    }

    window.location.href = destinationUrl.href;
  });
}

const TOUR_DESTINATIONS = [
  {
    name: "Band-e Amir",
    slug: "Band-e-Amir",
    region: "Bamyan Province",
    description: "Turquoise lakes and mountain scenery in central Afghanistan",
    image: "images/Somewhere in Afghanistan_.jpg",
    alt: "Mountain and lake scenery in Afghanistan",
    category: "Nature",
    keywords: ["Band Amir", "lakes"],
    lat: 34.84,
    lon: 67.23,
    pricePerNight: 95,
    itinerary: [
      "Lakeside sunrise walk",
      "Boat ride on Band-e Haibat",
      "Picnic at Band-e Zulfiqar",
    ],
  },
  {
    name: "Parwan",
    slug: "Parwan",
    region: "Panjshir & Salang",
    description: "Blooming pink Arghawan trees of Gulghundi Hill",
    image: "images/FullSizeRender-28.jpg",
    alt: "Pink Arghawan blossoms on Gulghundi Hill in Parwan",
    category: "Nature",
    lat: 35.01,
    lon: 69.17,
    pricePerNight: 70,
    itinerary: [
      "Panjshir river drive",
      "Riverside lunch",
      "Salang Pass viewpoint",
    ],
  },
  {
    name: "Noristan",
    slug: "Noristan",
    region: "Hindu Kush",
    description:
      "Lush green valleys, pine forests, and unique wooden architecture",
    image: "images/img_2_1790137915663badkhshan.jpg",
    alt: "Mountain scenery and green forest in Noristan",
    category: "Nature",
    lat: 35.32,
    lon: 70.9,
    pricePerNight: 110,
    itinerary: ["Village homestay", "Forest trekking", "Waterfall trail"],
  },
  {
    name: "Mazar-i-Sharif",
    slug: "Mazar-i-Sharif",
    region: "Balkh Province",
    description: "Shrine of Hazrat Ali, Balkh province",
    image: "images/IMG-20260925-WA0022.jpg",
    alt: "Blue-tiled shrine in Mazar-i-Sharif",
    category: "Culture",
    lat: 36.71,
    lon: 67.11,
    pricePerNight: 75,
    itinerary: ["Blue Mosque at dawn", "Ancient Balkh", "Local bazaar tour"],
  },
  {
    name: "Herat",
    slug: "Herat",
    region: "Western Afghanistan",
    description: "City of poets and the Great Mosque",
    image: "images/IMG-20260925-WA0011herat.jpg",
    alt: "Historic architecture in Herat",
    category: "Culture",
    lat: 34.35,
    lon: 62.2,
    pricePerNight: 80,
    itinerary: ["Friday Mosque tiles", "Herat Citadel", "Musalla minarets"],
  },
  {
    name: "Bamyan",
    slug: "Bamyan",
    region: "Central Highlands",
    description: "Ancient valley and rock-cut niches",
    image: "images/IMG-20260925-WA0013bamyan.jpg",
    alt: "Mountain valley in Bamyan",
    category: "History",
    lat: 34.82,
    lon: 67.83,
    pricePerNight: 85,
    itinerary: [
      "Buddha niches & caves",
      "Shahr-e Gholghola ruins",
      "Dragon Valley hike",
    ],
  },
  {
    name: "Kabul",
    slug: "Kabul",
    region: "Capital",
    description: "Capital city, gardens and old bazaars",
    image: "images/img_2_1790053530279kabul.jpg",
    alt: "City scenery in Kabul",
    category: "City",
    lat: 34.53,
    lon: 69.17,
    pricePerNight: 65,
    itinerary: ["Babur Gardens", "National Museum", "Bird market & old city"],
  },
];

window.TOUR_DESTINATIONS = TOUR_DESTINATIONS;

const findDestination = (nameOrSlug) => {
  const key = String(nameOrSlug || "").toLowerCase();
  return TOUR_DESTINATIONS.find(
    (destination) =>
      destination.slug.toLowerCase() === key ||
      destination.name.toLowerCase() === key,
  );
};

function bookingUrlFor(destinationName) {
  return `bookings.html?destination=${encodeURIComponent(destinationName)}#bookingForm`;
}

const destinationGrid = document.getElementById("destinationGrid");

if (destinationGrid) {
  const destinations = TOUR_DESTINATIONS;

  const searchInput = document.getElementById("destinationSearch");
  const categoryFilter = document.getElementById("categoryFilter");
  const resultsCount = document.getElementById("resultsCount");
  const initialSearch = new URLSearchParams(window.location.search).get("search");

  function createDestinationCard(destination) {
    const card = document.createElement("article");
    card.className = "card";

    const imageWrap = document.createElement("div");
    imageWrap.className = "card-image-wrap";

    const image = document.createElement("img");
    image.className = "card-image";
    image.src = destination.image;
    image.alt = destination.alt;
    image.loading = "lazy";

    const darkOverlay = document.createElement("div");
    darkOverlay.className = "card-dark";
    darkOverlay.setAttribute("aria-hidden", "true");

    const title = document.createElement("h2");
    title.className = "card-tag";
    title.textContent = destination.name;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const description = document.createElement("p");
    description.textContent = destination.description;

    const category = document.createElement("p");
    category.className = "card-category";
    category.textContent = destination.category;

    const bookingUrl = bookingUrlFor(destination.name);
    const link = document.createElement("a");
    link.className = "btn";
    link.href = bookingUrl;
    link.textContent = "Plan a visit";

    card.tabIndex = 0;
    card.setAttribute("role", "link");
    card.setAttribute(
      "aria-label",
      `Select ${destination.name} and go to the booking form`,
    );

    const goToBooking = () => {
      window.location.href = bookingUrl;
    };

    card.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        return;
      }
      goToBooking();
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        goToBooking();
      }
    });

    imageWrap.append(image, darkOverlay, title);
    cardBody.append(description, category, link);
    card.append(imageWrap, cardBody);
    return card;
  }

  function renderDestinations() {
    const searchTerm = searchInput.value
      .trim()
      .toLocaleLowerCase()
      .replace(/[\s-]/g, "");
    const selectedCategory = categoryFilter.value;
    const matchingDestinations = destinations.filter((destination) => {
      const keywords = (destination.keywords || []).join(" ");
      const searchableText = `${destination.name} ${destination.description} ${destination.category} ${keywords}`
        .toLocaleLowerCase()
        .replace(/[\s-]/g, "");
      const matchesSearch = searchableText.includes(searchTerm);
      const matchesCategory =
        selectedCategory === "all" || destination.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    destinationGrid.replaceChildren();

    for (const destination of matchingDestinations) {
      destinationGrid.append(createDestinationCard(destination));
    }

    if (matchingDestinations.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.className = "empty-state";
      emptyMessage.textContent =
        "No destinations match. Try a different search or category.";
      destinationGrid.append(emptyMessage);
    }

    resultsCount.textContent = `${matchingDestinations.length} ${
      matchingDestinations.length === 1 ? "destination" : "destinations"
    } found`;
  }

  searchInput.value = initialSearch || "";
  searchInput.addEventListener("input", renderDestinations);
  categoryFilter.addEventListener("change", renderDestinations);
  renderDestinations();
}

const weatherForm = document.getElementById("weatherForm");

if (weatherForm) {
  const weatherResult = document.getElementById("weatherResult");
  const weatherSelect = document.getElementById("weatherLocation");

  function describeWeather(code) {
    if (code === 0) return "Clear sky";
    if (code === 1) return "Mainly clear";
    if (code === 2) return "Partly cloudy";
    if (code === 3) return "Overcast";
    if (code <= 48) return "Foggy";
    if (code <= 57) return "Drizzle";
    if (code <= 67) return "Rain";
    if (code <= 77) return "Snow";
    if (code <= 82) return "Rain showers";
    if (code <= 86) return "Snow showers";
    if (code <= 99) return "Thunderstorms";
    return "Conditions unavailable";
  }

  function weatherIconUrl(code, isDay) {
    const dayNight = isDay ? "d" : "n";
    let icon = "01";
    if (code === 0) icon = "01";
    else if (code === 1) icon = "02";
    else if (code === 2) icon = "03";
    else if (code === 3) icon = "04";
    else if (code <= 48) icon = "50";
    else if (code <= 57) icon = "09";
    else if (code <= 67) icon = "10";
    else if (code <= 77) icon = "13";
    else if (code <= 82) icon = "09";
    else if (code <= 86) icon = "13";
    else icon = "11";
    return `https://openweathermap.org/img/wn/${icon}${dayNight}@2x.png`;
  }

  async function loadWeather(locationName) {
    const location = findDestination(locationName);
    if (!location || !weatherResult) {
      return;
    }

    weatherResult.dataset.state = "loading";
    weatherResult.innerHTML = `<p>Loading current weather for ${locationName}…</p>`;

    try {
      const apiUrl = new URL("https://api.open-meteo.com/v1/forecast");
      apiUrl.search = new URLSearchParams({
        latitude: String(location.lat),
        longitude: String(location.lon),
        current: "temperature_2m,apparent_temperature,weather_code,is_day",
        temperature_unit: "celsius",
        timezone: "auto",
      }).toString();

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Weather request failed with status ${response.status}`);
      }

      const data = await response.json();
      if (!data.current) {
        throw new Error("The weather response did not include current conditions.");
      }

      const temperature = Math.round(data.current.temperature_2m);
      const feelsLike = Math.round(data.current.apparent_temperature);
      const status = describeWeather(data.current.weather_code);
      const iconUrl = weatherIconUrl(
        data.current.weather_code,
        data.current.is_day === 1,
      );

      weatherResult.dataset.state = "success";
      weatherResult.innerHTML = `
        <div class="weather-live">
          <img src="${iconUrl}" alt="${status}" width="80" height="80" />
          <div>
            <p class="weather-live-place">${locationName}</p>
            <p class="weather-live-temp">${temperature}°C</p>
            <p class="weather-live-status">${status} · feels like ${feelsLike}°C</p>
          </div>
        </div>
      `;

      fetch("http://127.0.0.1:7522/ingest/072caa3d-7910-4cca-aeae-d204b1b99786", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Debug-Session-Id": "fd5015",
        },
        body: JSON.stringify({
          sessionId: "fd5015",
          runId: "post-fix",
          hypothesisId: "W",
          location: "JS/main.js:weather",
          message: "weather rendered",
          data: { locationName, temperature, status },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
    } catch (error) {
      console.error("Could not load weather:", error);
      weatherResult.dataset.state = "error";
      weatherResult.innerHTML =
        "<p>Weather is unavailable right now. Please check your connection and try again.</p>";
    }
  }

  weatherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    loadWeather(weatherSelect.value);
  });

  weatherSelect.addEventListener("change", () => {
    loadWeather(weatherSelect.value);
  });
}

      const items = document.querySelectorAll("#heroList li");
      if (items.length) {
        items.forEach((li) => {
          li.addEventListener("click", () => {
            items.forEach((i) => i.classList.remove("active"));
            li.classList.add("active");
          });
        });
      }

      const menuToggle = document.getElementById("menuToggle");
      const sidebar = document.getElementById("sidebar");
      const sidebarOverlay = document.getElementById("sidebarOverlay");

      if (menuToggle && sidebar && sidebarOverlay) {
        function toggleMenu() {
          sidebar.classList.toggle("open");
          sidebarOverlay.classList.toggle("active");
        }

        menuToggle.addEventListener("click", toggleMenu);

        sidebarOverlay.addEventListener("click", () => {
          sidebar.classList.remove("open");
          sidebarOverlay.classList.remove("active");
        });
      }

// //       // ==========================================
// // // Safe Mobile Menu Toggle (Runs on all pages)
// // // ==========================================
// document.addEventListener("DOMContentLoaded", () => {
//   // پیدا کردن دکمه (پشتیبانی از تمام آیدی‌ها و کلاس‌ها)
//   const menuBtn =
//     document.getElementById("menu-btn") ||
//     document.getElementById("menu-toggle") ||
//     document.querySelector(".menu-toggle");

//   // پیدا کردن منو (پشتیبانی از تمام آیدی‌ها و کلاس‌ها)
//   const mobileNav =
//     document.getElementById("mobile-nav") ||
//     document.getElementById("siteNav") ||
//     document.querySelector(".site-nav");

//   if (menuBtn && mobileNav) {
//     menuBtn.addEventListener("click", (e) => {
//       e.stopPropagation();
//       // باز و بسته کردن کلاس hidden در Tailwind
//       mobileNav.classList.toggle("hidden");
//     });
//   }
// });