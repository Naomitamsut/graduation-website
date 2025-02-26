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
document.addEventListener("DOMContentLoaded", function () {
    console.log("📢 DOM fully loaded, adding event listener!");
    const form = document.getElementById("rsvp-form");

    if (form) {
        form.addEventListener("submit", submitRSVP);
        console.log("✅ Event listener added to the form!");
    } else {
        console.warn("⚠️ Form not found.");
    }
});

import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// ✅ Check admin password and show RSVPs
function checkAdmin() {
    const password = document.getElementById("admin-password").value;

    if (password === "your-secret-password") {  // Change this!
        document.getElementById("rsvp-table").style.display = "table"; // Show table
        loadRSVPs(); // Load RSVP responses
    } else {
        alert("❌ Incorrect password!");
    }
}

// ✅ Fetch RSVP data from Firestore and display it
async function loadRSVPs() {
    const rsvpTable = document.getElementById("rsvp-table");

    // Clear old rows (except the header)
    rsvpTable.innerHTML = `
        <tr>
            <th>Student Name</th>
            <th>Number of Guests</th>
            <th>Dietary Restrictions</th>
            <th>Allergies</th>
            <th>Accessibility Needs</th>
        </tr>
    `;

    try {
        const querySnapshot = await getDocs(collection(db, "rsvps"));

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const row = rsvpTable.insertRow();
            row.insertCell(0).textContent = data.studentName;
            row.insertCell(1).textContent = data.numPeople;
            row.insertCell(2).textContent = data.dietaryRestrictions;
            row.insertCell(3).textContent = data.allergies;
            row.insertCell(4).textContent = data.accessibility;
        });
    } catch (error) {
        alert("❌ Error loading RSVPs: " + error);
    }
}
