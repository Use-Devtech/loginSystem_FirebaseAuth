import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const token = localStorage.getItem("authToken");
if (!token) {
    alert("You must log in first.");
    window.location.href = "loginform.html";
}
const dashboard = document.getElementById("dashboard");
const logoutButton = document.getElementById("logout-button");

onAuthStateChanged(auth, (user) => {
    if (user) {
        dashboard.textContent = "Hello World! Welcome to the Dashboard.";
        logoutButton.style.display = "block";
    } else {
        window.location.href = "loginform.html";
    }
});

logoutButton.addEventListener("click", async () => {
    try {
        await signOut(auth);
        localStorage.removeItem("authToken");
        alert("You have been logged out.");
        window.location.href = "loginform.html";
    } catch (error) {
        console.error("Error logging out:", error.message);
    }
});
