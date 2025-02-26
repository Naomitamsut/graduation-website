// ✅ Import Firebase (ONLY ONCE)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// ✅ Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2C0rpSx1gTO3lHFqn0_zy8hKIEcnZ9O0",
    authDomain: "graduation-ceremony-rsvp.firebaseapp.com",
    projectId: "graduation-ceremony-rsvp",
    storageBucket: "graduation-ceremony-rsvp.firebasestorage.app",
    messagingSenderId: "832509482723",
    appId: "1:832509482723:web:82689e4e03e104a94f57d6"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Function to submit RSVP
async function submitRSVP(event) {
    event.preventDefault(); // Stop form from refreshing

    const studentName = document.getElementById("student-name").value;
    const numPeople = document.getElementById("num-people").value;
    const dietaryRestrictions = document.getElementById("dietary-restrictions").value;
    const allergies = document.getElementById("allergies").value;
    const accessibility = document.getElementById("accessibility").value;

    try {
        await addDoc(collection(db, "rsvps"), {
            studentName,
            numPeople,
            dietaryRestrictions,
            allergies,
            accessibility
        });
        alert("✅ RSVP submitted successfully!");
        document.getElementById("rsvp-form").reset();
    } catch (error) {
        alert("❌ Error submitting RSVP: " + error);
    }
}

// ✅ Attach function to form submit button
document.getElementById("rsvp-form").addEventListener("submit", submitRSVP);

window.checkAdmin = function () {
    const password = prompt("Enter admin password:");
    
    if (password === "12345") {  // ✅ Change to your real password
        showRSVPs();
    } else {
        alert("❌ Incorrect password! Try again.");
    }
};




// Function to fetch and display RSVPs
async function showRSVPs() {
    const rsvpContainer = document.getElementById("rsvp-container"); // Ensure this exists in HTML
    rsvpContainer.innerHTML = "<h3>Loading RSVPs...</h3>"; // Show loading text

    try {
        const querySnapshot = await getDocs(collection(db, "rsvps")); // Fetch RSVPs from Firestore
        let rsvpList = "<h3>RSVP List</h3><ul>";

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            rsvpList += `
                <li>
                    <strong>${data.studentName}</strong> - Guests: ${data.numPeople} <br>
                    Dietary: ${data.dietaryRestrictions || "None"}, Allergies: ${data.allergies || "None"} <br>
                    Accessibility: ${data.accessibility || "None"}
                </li><br>
            `;
        });

        rsvpList += "</ul>";
        rsvpContainer.innerHTML = rsvpList; // Display RSVPs in container
    } catch (error) {
        rsvpContainer.innerHTML = "<p>❌ Error loading RSVPs: " + error.message + "</p>";
    }
}
