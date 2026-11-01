const weatherApi = "https://api.weather.gov/alerts/active?area=";

function displayError(message) {
  const errorElement = document.getElementById("error-message");
  if (!errorElement) return;

  errorElement.textContent = message;
  errorElement.classList.remove("hidden");
}

function clearError() {
  const errorElement = document.getElementById("error-message");
  if (!errorElement) return;

  errorElement.textContent = "";
  errorElement.classList.add("hidden");
}

function displayAlerts(data) {
  const displayElement = document.getElementById("alerts-display");
  if (!displayElement) return;

  const alerts = Array.isArray(data.features) ? data.features : [];
  displayElement.replaceChildren();

  const summary = document.createElement("h2");
  summary.textContent = `${data.title || "Weather alerts"}: ${alerts.length}`;
  displayElement.append(summary);

  if (alerts.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "There are no active alerts for this state.";
    displayElement.append(emptyMessage);
    return;
  }

  const list = document.createElement("ul");
  alerts.forEach((alert) => {
    const item = document.createElement("li");
    item.textContent = alert.properties?.headline || "Weather alert";
    list.append(item);
  });
  displayElement.append(list);
}

async function fetchWeatherAlerts(state) {
  const response = await fetch(`${weatherApi}${encodeURIComponent(state)}`);
  if (!response.ok) {
    throw new Error(`Weather service returned an error (${response.status}).`);
  }

  return response.json();
}

async function handleAlertRequest() {
  const input = document.getElementById("state-input");
  const button = document.getElementById("fetch-alerts");
  const displayElement = document.getElementById("alerts-display");
  const state = input.value.trim().toUpperCase();
  input.value = "";

  if (!state) {
    displayError("Enter a two-letter state abbreviation, such as NY.");
    return;
  }

  if (!/^[A-Z]{2}$/.test(state)) {
    displayError("Enter a two-letter state abbreviation, such as NY.");
    return;
  }

  clearError();
  displayElement.replaceChildren();
  button.disabled = true;

  try {
    const data = await fetchWeatherAlerts(state);
    displayAlerts(data);
    clearError();
  } catch (error) {
    displayError(error.message || "Unable to retrieve weather alerts. Please try again.");
  } finally {
    button.disabled = false;
  }
}

const alertForm = document.getElementById("alert-form");
if (alertForm) {
  alertForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handleAlertRequest();
  });
}
