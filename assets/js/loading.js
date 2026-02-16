// Loading Screen Handler
const loadingStartTime = Date.now();

window.addEventListener("load", function () {
  const loadingScreen = document.getElementById("loading-screen");
  const elapsedTime = Date.now() - loadingStartTime;

  // Check if user has visited before
  const hasVisited = localStorage.getItem("okinawa-visited");
  const minimumLoadingTime = hasVisited ? 0 : 10000; // 10 seconds for first visit, 0 for returning visitors
  const remainingTime = Math.max(0, minimumLoadingTime - elapsedTime);

  // Wait for minimum loading time (if first visit), then add a small delay for better UX
  setTimeout(function () {
    loadingScreen.classList.add("loaded");

    // Remove from DOM after transition completes (0.8s for map fade + 0.5s for screen fade)
    setTimeout(function () {
      loadingScreen.remove();
    }, 800);
  }, remainingTime + 300);

  // Mark as visited for future visits
  if (!hasVisited) {
    localStorage.setItem("okinawa-visited", "true");
  }
});
