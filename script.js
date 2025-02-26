// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2C0rpSx1gTO3lHFqn0_zy8hKIEcnZ9O0",
    authDomain: "graduation-ceremony-rsvp.firebaseapp.com",
    projectId: "graduation-ceremony-rsvp",
    storageBucket: "graduation-ceremony-rsvp.firebasestorage.app",
    messagingSenderId: "832509482723",
    appId: "1:832509482723:web:82689e4e03e104a94f57d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Check if Firebase initialized
console.log("✅ Firebase Initialized", app);

// Function to submit RSVP
async function submitRSVP(event) {
    event.preventDefault(); // Stop form from refreshing the page

    console.log("📤 Submitting RSVP..."); // Debugging line to confirm function runs

    // Get form values
    const studentName = document.getElementById("student-name").value.trim();
    const numPeople = document.getElementById("num-people").value.trim();
    const dietaryRestrictions = document.getElementById("dietary-restrictions").value.trim();
    const allergies = document.getElementById("allergies").value.trim();
    const accessibility = document.getElementById("accessibility").value.trim();

    // Prevent submission if fields are empty
    if (!studentName || !numPeople) {
        alert("⚠️ Please fill in all required fields.");
        return;
    }

    try {
        // Add RSVP data to Firestore
        await addDoc(collection(db, "rsvps"), {
            studentName,
            numPeople,
            dietaryRestrictions,
            allergies,
            accessibility,
            timestamp: new Date() // Adds a timestamp
        });

        alert("✅ RSVP submitted successfully!");
        document.getElementById("rsvp-form").reset(); // Clear form after submission
    } catch (error) {
        console.error("❌ Error submitting RSVP:", error);
        alert("❌ Error submitting RSVP: " + error.message);
    }
}

// Wait for the DOM to load before adding event listener
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("rsvp-form");
    if (form) {
        form.addEventListener("submit", submitRSVP);
        console.log("📌 Event listener attached to form.");
    } else {
        console.error("⚠️ Form not found.");
    }
});
