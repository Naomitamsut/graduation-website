<script src="script.js" type="module"></script>

// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to submit RSVP
async function submitRSVP(event) {
    event.preventDefault(); // Prevent form from refreshing

    const studentName = document.getElementById('student-name').value;
    const numPeople = document.getElementById('num-people').value;
    const dietaryRestrictions = document.getElementById('dietary-restrictions').value;
    const allergies = document.getElementById('allergies').value;
    const accessibility = document.getElementById('accessibility').value;

    try {
        await addDoc(collection(db, "rsvps"), {
            studentName,
            numPeople,
            dietaryRestrictions,
            allergies,
            accessibility
        });
        alert("RSVP submitted successfully!");
    } catch (error) {
        alert("Error submitting RSVP: " + error);
    }
}

// Attach function to form submit button
document.getElementById("rsvp-form").addEventListener("submit", submitRSVP);
