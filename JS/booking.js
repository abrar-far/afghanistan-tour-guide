(() => {
  fetch("http://127.0.0.1:7522/ingest/072caa3d-7910-4cca-aeae-d204b1b99786", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Debug-Session-Id": "fd5015",
    },
    body: JSON.stringify({
      sessionId: "fd5015",
      runId: "post-fix",
      hypothesisId: "A",
      location: "JS/booking.js:top",
      message: "booking.js evaluated",
      data: { hasForm: !!document.getElementById("bookingForm") },
      timestamp: Date.now(),
    }),
  }).catch(() => {});


  const bookingForm = document.getElementById("bookingForm");

  if (!bookingForm) {
    return;
  }

  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");
  const destination = document.getElementById("destination");
  const guests = document.getElementById("guests");
  const feedback = document.getElementById("formFeedback");
  const endDateError = document.getElementById("endDateError");

  if (
    !startDate ||
    !endDate ||
    !destination ||
    !guests ||
    !feedback ||
    !endDateError
  ) {
  
    fetch("http://127.0.0.1:7522/ingest/072caa3d-7910-4cca-aeae-d204b1b99786", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "fd5015",
      },
      body: JSON.stringify({
        sessionId: "fd5015",
        runId: "post-fix",
        hypothesisId: "B",
        location: "JS/booking.js:early-return",
        message: "early return missing DOM nodes",
        data: {
          startDate: !!startDate,
          endDate: !!endDate,
          destination: !!destination,
          guests: !!guests,
          feedback: !!feedback,
          endDateError: !!endDateError,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
  
    return;
  }

  function getLocalDateString(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function updateDateValidation() {
    const today = getLocalDateString();
    startDate.min = today;
    endDate.min = startDate.value || today;

    if (startDate.value && endDate.value && endDate.value < startDate.value) {
      endDate.setCustomValidity(
        "The end date must be on or after the start date.",
      );
      endDateError.textContent =
        "Choose an end date on or after the start date.";
    } else {
      endDate.setCustomValidity("");
      endDateError.textContent = "";
    }
  }

  function hideFeedback() {
    feedback.classList.remove("show");
    feedback.removeAttribute("data-state");
    feedback.textContent = "";
    feedback.classList.add("hidden");
  }

  if (destination.options.length === 0) {
    const optionList = [
      "Band-e Amir",
      "Bamyan",
      "Herat",
      "Kabul",
      "Mazar-i-Sharif",
      "Noristan",
      "Parwan",
    ];

    optionList.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      destination.append(option);
    });
  }

  const requestedDestination = new URLSearchParams(window.location.search).get(
    "destination",
  );

  if (requestedDestination) {
    const matchingOption = Array.from(destination.options).find(
      (option) =>
        option.value.toLocaleLowerCase() ===
        requestedDestination.toLocaleLowerCase(),
    );
    if (matchingOption) {
      destination.value = matchingOption.value;
    }
  }

  const previewImage = document.getElementById("p-img");
  const previewRegion = document.getElementById("p-region");
  const previewName = document.getElementById("p-name");
  const previewItinerary = document.getElementById("p-itin");
  const previewRate = document.getElementById("p-rate");
  const previewNights = document.getElementById("p-nights");
  const previewGuests = document.getElementById("p-guests");
  const previewTotal = document.getElementById("p-total");
  const savedBox = document.getElementById("saved-box");
  const savedList = document.getElementById("saved");
  const SAVED_KEY = "afghanistan-tour-bookings";

  function catalogDestination(name) {
    const list = window.TOUR_DESTINATIONS || [];
    const key = String(name || "").toLowerCase();
    return (
      list.find((item) => item.name.toLowerCase() === key) ||
      list[0] ||
      null
    );
  }

  function nightsBetween() {
    if (!startDate.value || !endDate.value) {
      return 0;
    }
    const start = new Date(`${startDate.value}T00:00:00`);
    const end = new Date(`${endDate.value}T00:00:00`);
    return Math.max(0, Math.round((end - start) / 86400000));
  }

  function updatePreview() {
    const details = catalogDestination(destination.value);
    const nights = nightsBetween();
    const guestCount = Number(guests.value) || 1;
    const rate = details?.pricePerNight || 0;
    const total = rate * nights * guestCount;

    if (previewImage && details) {
      previewImage.src = details.image;
      previewImage.alt = details.alt || details.name;
    }
    if (previewRegion) {
      previewRegion.textContent = details?.region || "";
    }
    if (previewName) {
      previewName.textContent = details?.name || "Choose a destination";
    }
    if (previewItinerary && details) {
      previewItinerary.replaceChildren();
      details.itinerary.forEach((stop, index) => {
        const item = document.createElement("li");
        item.className = "flex gap-3";
        const day = document.createElement("span");
        day.className = "text-sand shrink-0";
        day.textContent = `Day ${index + 1}`;
        const label = document.createElement("span");
        label.textContent = stop;
        item.append(day, label);
        previewItinerary.append(item);
      });
    }
    if (previewRate) {
      previewRate.textContent = rate ? `$${rate} / night / guest` : "—";
    }
    if (previewNights) {
      previewNights.textContent = nights || "—";
    }
    if (previewGuests) {
      previewGuests.textContent = String(guestCount);
    }
    if (previewTotal) {
      previewTotal.textContent = `$${total}`;
    }

  
    fetch("http://127.0.0.1:7522/ingest/072caa3d-7910-4cca-aeae-d204b1b99786", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "fd5015",
      },
      body: JSON.stringify({
        sessionId: "fd5015",
        runId: "post-fix",
        hypothesisId: "P",
        location: "JS/booking.js:preview",
        message: "preview updated",
        data: {
          selected: destination.value,
          image: details?.image || "",
          nights,
          guestCount,
          total,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});

  }

  function renderSavedBookings() {
    if (!savedBox || !savedList) {
      return;
    }
    let bookings = [];
    try {
      bookings = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
    } catch {
      bookings = [];
    }
    if (!Array.isArray(bookings) || bookings.length === 0) {
      savedBox.classList.add("hidden");
      return;
    }
    savedList.replaceChildren();
    bookings.forEach((booking) => {
      const item = document.createElement("li");
      item.className = "flex justify-between gap-4 py-3";
      item.innerHTML = `<span>${booking.destination} · ${booking.startDate}</span><span>$${booking.total}</span>`;
      savedList.append(item);
    });
    savedBox.classList.remove("hidden");
  }

  startDate.addEventListener("input", updateDateValidation);
  startDate.addEventListener("change", updateDateValidation);
  endDate.addEventListener("input", updateDateValidation);
  endDate.addEventListener("change", updateDateValidation);
  bookingForm.addEventListener("input", hideFeedback);
  bookingForm.addEventListener("change", hideFeedback);
  destination.addEventListener("change", updatePreview);
  guests.addEventListener("input", updatePreview);
  startDate.addEventListener("change", updatePreview);
  endDate.addEventListener("change", updatePreview);

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateDateValidation();
    const validity = bookingForm.checkValidity();

    fetch("http://127.0.0.1:7522/ingest/072caa3d-7910-4cca-aeae-d204b1b99786", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "fd5015",
      },
      body: JSON.stringify({
        sessionId: "fd5015",
        runId: "post-fix",
        hypothesisId: "C",
        location: "JS/booking.js:submit",
        message: "submit handler ran",
        data: {
          validity,
          dest: destination.value,
          start: startDate.value,
          end: endDate.value,
          endCustom: endDate.validationMessage,
          hidden: feedback.classList.contains("hidden"),
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});


    if (!validity) {
      bookingForm.reportValidity();
      feedback.dataset.state = "error";
      feedback.textContent =
        "Please complete all required fields correctly before submitting.";
      feedback.classList.remove("hidden");
      feedback.classList.add("show");
      return;
    }

    const reservationDetails = {
      fullName:
        (document.getElementById("fullName")?.value || "").trim() ||
        "traveler",
      email: document.getElementById("email")?.value,
      destination: destination.value || "your chosen destination",
      guests: Number(guests.value) || 1,
      startDate: startDate.value,
      endDate: endDate.value,
      notes: document.getElementById("notes")?.value || "",
    };

    console.log("✅ Reservation submitted:", reservationDetails);

    const catalog = catalogDestination(reservationDetails.destination);
    const nights = nightsBetween();
    const total =
      (catalog?.pricePerNight || 0) * nights * reservationDetails.guests;
    try {
      const existing = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
      existing.unshift({
        destination: reservationDetails.destination,
        startDate: reservationDetails.startDate,
        total,
      });
      localStorage.setItem(SAVED_KEY, JSON.stringify(existing.slice(0, 8)));
    } catch {
  
    }
    renderSavedBookings();

    feedback.dataset.state = "success";
    feedback.innerHTML = `
      <strong>Booking confirmed!</strong><br />
      Thank you, ${reservationDetails.fullName}. Your tour to <strong>${reservationDetails.destination}</strong> for ${
        reservationDetails.guests === 1 ? "guest" : "guests"
      } (${reservationDetails.startDate} to ${reservationDetails.endDate}) has been registered.
    `;
    feedback.classList.remove("hidden");
    feedback.classList.add("show");
    
    fetch("http://127.0.0.1:7522/ingest/072caa3d-7910-4cca-aeae-d204b1b99786", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "fd5015",
      },
      body: JSON.stringify({
        sessionId: "fd5015",
        runId: "post-fix",
        hypothesisId: "D",
        location: "JS/booking.js:success",
        message: "success feedback shown",
        data: {
          hidden: feedback.classList.contains("hidden"),
          show: feedback.classList.contains("show"),
          state: feedback.dataset.state,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});

  });

  updateDateValidation();
  updatePreview();
  renderSavedBookings();

  if (window.location.hash === "#bookingForm") {
    bookingForm.scrollIntoView({ behavior: "smooth", block: "start" });
  }
})();






  