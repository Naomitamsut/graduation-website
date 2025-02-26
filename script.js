// ✅ Import Firebase (ONLY ONCE)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// ✅ Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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

// ✅ Function to check admin password and show RSVPs
window.checkAdmin = function () {
    const password = prompt("Enter admin password:");
    if (password === "grad2025") { // Change "grad2025" to your real password
        showRSVPs();
    } else {
        alert("Incorrect password!");
    }
};

// ✅ Function to show RSVPs
async function showRSVPs() {
    const rsvpList = document.getElementById("rsvp-list");
    rsvpList.innerHTML = ""; // Clear previous results

    const querySnapshot = await getDocs(collection(db, "rsvps"));
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const rsvpItem = document.createElement("p");
        rsvpItem.textContent = `📝 ${data.studentName} - ${data.numPeople} guests - Diet: ${data.dietaryRestrictions}`;
        rsvpList.appendChild(rsvpItem);
    });
}
