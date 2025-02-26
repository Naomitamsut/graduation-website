// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2C0rpSx1gTO3lHFqn0_zy8hKIEcnZ9O0",
    authDomain: "graduation-ceremony-rsvp.firebaseapp.com",
    projectId: "graduation-ceremony-rsvp",
    storageBucket: "graduation-ceremony-rsvp.appspot.com",
    messagingSenderId: "832509482723",
    appId: "1:832509482723:web:82689e4e03e104a94f57d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Debugging: Check Firebase initialization
console.log("✅ Firebase Initialized", app);

// Function to submit RSVP
async function submitRSVP(event) {
    event.preventDefault(); // Stop form from refreshing the page

    console.log("📤 Submitting RSVP...");

    // Get form values
    const studentName = document.getElementById("studentName").value.trim();
    const numPeople = document.getElementById("guests").value.trim();
    const dietaryRestrictions = document.getElementById("diet").value.trim();
    const allergies = document.getElementById("allergies").value.trim();
    const accessibility = document.getElementById("accessibility").value.trim();

    // Prevent submission if required fields are empty
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
            timestamp: new Date()
        });

        alert("✅ RSVP submitted successfully!");
        document.getElementById("rsvpForm").reset(); // Clear form after submission
    } catch (error) {
        console.error("❌ Error submitting RSVP:", error);
        alert("❌ Error submitting RSVP: " + error.message);
    }
}

// Attach event listener AFTER the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("rsvpForm");
    if (form) {
        form.addEventListener("submit", submitRSVP);
        console.log("📌 Event listener attached to form.");
    } else {
        console.error("⚠️ Form not found.");
    }
});
