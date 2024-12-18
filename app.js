import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, update, ref,set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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
  const auth = getAuth(app);
  const database = getDatabase(app);
  const googleProvider = new GoogleAuthProvider();



  googleProvider.setCustomParameters({ prompt: "select_account" });
  const Google = document.getElementById("google")
  Google.addEventListener("click", function () {
    signInWithPopup(auth, googleProvider)
          .then((result) => {
              const user = result.user;
              set(ref(database, 'user/' + user.uid), {
                  username: user.displayName,
                  email: user.email,
                  photoURL: user.photoURL
              })
                  .then(() => {
                      window.location.href = "login.html"
                      console.log("user can ok");
                      alert("user can be Data sved ")
                      console.log("User UID: ", user.uid);
                      localStorage.setItem("userUID", user.uid);
                  })
  
                  .catch((error) => {
                      alert(error.message)
                      console.error("Error saving user data:", error.message);
                  });
          })
  
  })



submit.addEventListener("click", (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("imageupload");
    const file = fileInput.files[0];
    if (!file) {
        alert("Please select an image to upload.");
        return;
    }

    const CLOUDNAME = "docmzargc";
    const UPLOAD_PRESET = "Raheel";
    const URL = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`;
    const formData = new FormData();
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("file", file);
    fetch(URL, {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            // console.log("Cloudinary Response:", data);
            const imageUrl = data.secure_url;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const username = document.getElementById("username").value;

            if (!email || !password || !username) {
                alert("All fields are required.");
            }

            return createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;


                    return set(ref(database, `users/${user.uid}`), {
                        username: username,
                        email: email,
                        userId: user.uid,
                        imageUrl: imageUrl,

                    }).then(() => {
                        console.log("User UID:", user.uid);
                        localStorage.setItem("userUID", user.uid);
                        window.location.href="login.html"
                        alert("User created successfully!");
                    });


                });
        })

        .catch((error) => {
            alert(error)
        });


});

  