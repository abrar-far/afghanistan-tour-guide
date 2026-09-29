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

const destinationGrid = document.getElementById("destinationGrid");

if (destinationGrid) {
  const destinations = [
    {
      name: "Band-e Amir",
      description: "Turquoise lakes and mountain scenery in central Afghanistan",
      image: "images/Somewhere in Afghanistan_.jpg",
      alt: "Mountain and lake scenery in Afghanistan",
      category: "Nature",
      keywords: ["Band Amir", "lakes"],
    },
    {
      name: "Parwan",
      description: "Blooming pink Arghawan trees of Gulghundi Hill",
      image: "images/FullSizeRender-28.jpg",
      alt: "Pink Arghawan blossoms on Gulghundi Hill in Parwan",
      category: "Nature",
    },
    {
      name: "Noristan",
      description:
        "Lush green valleys, pine forests, and unique wooden architecture",
      image: "images/img_2_1790137915663badkhshan.jpg",
      alt: "Mountain scenery and green forest in Noristan",
      category: "Nature",
    },
    {
      name: "Mazar-i-Sharif",
      description: "Shrine of Hazrat Ali, Balkh province",
      image: "images/IMG-20260925-WA0022.jpg",
      alt: "Blue-tiled shrine in Mazar-i-Sharif",
      category: "Culture",
    },
    {
      name: "Herat",
      description: "City of poets and the Great Mosque",
      image: "images/IMG-20260925-WA0011herat.jpg",
      alt: "Historic architecture in Herat",
      category: "Culture",
    },
    {
      name: "Bamyan",
      description: "Ancient valley and rock-cut niches",
      image: "images/IMG-20260925-WA0013bamyan.jpg",
      alt: "Mountain valley in Bamyan",
      category: "History",
    },
    {
      name: "Kabul",
      description: "Capital city, gardens and old bazaars",
      image: "images/img_2_1790053530279kabul.jpg",
      alt: "City scenery in Kabul",
      category: "City",
    },
  ];

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

    const link = document.createElement("a");
    link.className = "btn";
    link.href = `bookings.html?destination=${encodeURIComponent(destination.name)}`;
    link.textContent = "Plan a visit ";

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
  const weatherLocations = {
    Kabul: { latitude: 34.5553, longitude: 69.2075 },
    Bamyan: { latitude: 34.8216, longitude: 67.8273 },
    Herat: { latitude: 34.3529, longitude: 62.204 },
    "Mazar-i-Sharif": { latitude: 36.7069, longitude: 67.1122 },
    Parwan: { latitude: 35.0, longitude: 68.7 },
    Noristan: { latitude: 35.3, longitude: 70.9 },
  };

  function describeWeather(code) {
    if (code === 0) return "Clear sky";
    if (code <= 3) return "Partly cloudy";
    if (code <= 48) return "Foggy";
    if (code <= 67) return "Rain";
    if (code <= 77) return "Snow";
    if (code <= 82) return "Rain showers";
    if (code <= 86) return "Snow showers";
    if (code <= 99) return "Thunderstorms";
    return "Conditions unavailable";
  }

  weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const locationName = document.getElementById("weatherLocation").value;
    const location = weatherLocations[locationName];

    weatherResult.dataset.state = "loading";
    weatherResult.textContent = `Loading current weather for ${locationName}…`;

    try {
      const apiUrl = new URL("https://api.open-meteo.com/v1/forecast");
      apiUrl.search = new URLSearchParams({
        latitude: String(location.latitude),
        longitude: String(location.longitude),
        current: "temperature_2m,apparent_temperature,weather_code",
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
      weatherResult.dataset.state = "success";
      weatherResult.textContent =
        `${locationName}: ${describeWeather(data.current.weather_code)}, ` +
        `${temperature}°C (feels like ${feelsLike}°C).`;
    } catch (error) {
      console.error("Could not load weather:", error);
      weatherResult.dataset.state = "error";
      weatherResult.textContent =
        "Weather is unavailable right now. Please check your connection and try again.";
    }
  });
}

  const items = document.querySelectorAll("#heroList li");
      items.forEach((li) => {
        li.addEventListener("click", () => {
          items.forEach((i) => i.classList.remove("active"));
          li.classList.add("active");
        });
      });

      const menuToggle = document.getElementById("menuToggle");
      const sidebar = document.getElementById("sidebar");
      const sidebarOverlay = document.getElementById("sidebarOverlay");

      function toggleMenu() {
        sidebar.classList.toggle("open");
        sidebarOverlay.classList.toggle("active");
      }

      menuToggle.addEventListener("click", toggleMenu);

      sidebarOverlay.addEventListener("click", () => {
        sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("active");
      });