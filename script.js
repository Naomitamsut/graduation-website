// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// ✅ Firebase configuration (Use your real credentials)
const firebaseConfig = {
    apiKey: "AIzaSyA2C0rpSx1gTO3lHFqn0_zy8hKIEcnZ9O0",
    authDomain: "graduation-ceremony-rsvp.firebaseapp.com",
    projectId: "graduation-ceremony-rsvp",
    storageBucket: "graduation-ceremony-rsvp.appspot.com",
    messagingSenderId: "832509482723",
    appId: "1:832509482723:web:82689e4e03e104a94f57d6"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Function to submit RSVP
async function submitRSVP(event) {
    event.preventDefault(); // Stop form from refreshing

    // Get form values
    const studentName = document.getElementById("student-name").value;
    const numPeople = document.getElementById("num-people").value;
    const dietaryRestrictions = document.getElementById("dietary-restrictions").value;
    const allergies = document.getElementById("allergies").value;
    const accessibility = document.getElementById("accessibility").value;

    try {
        // Add RSVP data to Firestore
        await addDoc(collection(db, "rsvps"), {
            studentName,
            numPeople,
            dietaryRestrictions,
            allergies,
            accessibility
        });
        alert("✅ RSVP submitted successfully!");

        // ✅ Clear form fields after successful submission
        document.getElementById("rsvp-form").reset();
    } catch (error) {
        alert("❌ Error submitting RSVP: " + error);
    }
}

// ✅ Attach function to form submit button
document.getElementById("rsvp-form").addEventListener("submit", submitRSVP);
