import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, update, ref } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCjbbA-4eQdWpJhlH1Q7DSKX1sQaTLtUJM",
    authDomain: "fir-53f3e.firebaseapp.com",
    databaseURL: "https://fir-53f3e-default-rtdb.firebaseio.com",
    projectId: "fir-53f3e",
    storageBucket: "fir-53f3e.firebasestorage.app",
    messagingSenderId: "935843526966",
    appId: "1:935843526966:web:63b78a73aa8fc202e1db97",
    measurementId: "G-0FT607NM8J"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();


const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;




            // Update last login timestamp
            const dt = new Date().toISOString();
            update(ref(database, 'users/' + user.uid), {
                last_login: dt
            })
                .then(() => {
                    alert("Login successful!");
                    // window.location.href = "main.html";
                    localStorage.setItem("userUID", user.uid);
                })
                .catch((dbError) => {
                    console.error("Database error:", dbError);
                    alert("Error updating last login.");
                });




        })
        .catch((error) => {
            console.error("Login error:", error);
            alert("Invalid email or password.");
        });
});


