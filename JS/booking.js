const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  const startDate = document.getElementById("startDate");
  const endDate = document.getElementById("endDate");
  const destination = document.getElementById("destination");
  const guests = document.getElementById("guests");
  const feedback = document.getElementById("formFeedback");
  const endDateError = document.getElementById("endDateError");

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
      endDate.setCustomValidity("The end date must be on or after the start date.");
      endDateError.textContent = "Choose an end date on or after the start date.";
    } else {
      endDate.setCustomValidity("");
      endDateError.textContent = "";
    }
  }

  function hideFeedback() {
    feedback.classList.remove("show");
    feedback.removeAttribute("data-state");
    feedback.textContent = "";
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

  startDate.addEventListener("input", updateDateValidation);
  startDate.addEventListener("change", updateDateValidation);
  endDate.addEventListener("input", updateDateValidation);
  endDate.addEventListener("change", updateDateValidation);
  bookingForm.addEventListener("input", hideFeedback);
  bookingForm.addEventListener("change", hideFeedback);

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateDateValidation();

    if (!bookingForm.checkValidity()) {
      bookingForm.reportValidity();
      feedback.dataset.state = "error";
      feedback.textContent =
        "Please check the highlighted fields. No request has been sent or saved.";
      feedback.classList.add("show");
      return;
    }

    const preview = {
      destination: destination.value,
      guests: Number(guests.value),
      startDate: startDate.value,
      endDate: endDate.value,
    };

    console.log("Front-end demo request preview:", preview);
    feedback.dataset.state = "success";
    feedback.textContent =
      `Demo preview: ${preview.destination}, ${preview.guests} ` +
      `${preview.guests === 1 ? "guest" : "guests"}, ${preview.startDate} to ` +
      `${preview.endDate}. This information has not been sent or saved.`;
    feedback.classList.add("show");
  });

  updateDateValidation();
}
