import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const loginForm = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const token = await user.getIdToken();
        localStorage.setItem("authToken", token);
        alert(`Welcome back, ${user.email}`);
        window.location.href = "dashboard.html";
    } catch (error) {
        console.error("Error during sign-in:", error.code, error.message);
        if (error.code === "auth/user-not-found") {
            errorMessage.textContent = "User not found. Please register first.";
        } else if (error.code === "auth/wrong-password") {
            errorMessage.textContent = "Incorrect password. Please try again.";
        } else if (error.code === "auth/invalid-email") {
            errorMessage.textContent = "Invalid email format.";
        } else {
            errorMessage.textContent = "Login failed. Please check your credentials.";
        }
    }
});
