// Import necessary functions from Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js';

// Firebase config and initialization
const firebaseConfig = {
    apiKey: "AIzaSyDIuRu_pdlpzvWnKbQCbjgDH21xSLP0yg8",
    authDomain: "lhtpropview-e559d.firebaseapp.com",
    databaseURL: "https://lhtpropview-e559d-default-rtdb.firebaseio.com",
    projectId: "lhtpropview-e559d",
    storageBucket: "lhtpropview-e559d.firebasestorage.app",
    messagingSenderId: "683220233918",
    appId: "1:683220233918:web:a178f37f9f5f5159d7f8ef"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const db = getDatabase(app);

// Global propertyData and dataLoaded flag
export let propertyData = {};

// Fetch data from Firebase and store it in global propertyData
export async function fetchMLSData() {
    const dbRef = ref(db, 'properties');
    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            window.propertyData = snapshot.val();  // Store data in global window object
            window.dataLoaded = true;  // Explicitly set dataLoaded flag
            console.log("Data loaded successfully.");
        } else {
            console.log("No data available in Firebase.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        window.dataLoaded = false;  // Handle the error and set the flag to false
    }
}

// Call the fetch function when the script is executed
fetchMLSData();