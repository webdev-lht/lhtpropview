// Import necessary functions from Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';  // Import initializeApp
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js';  // Import necessary Firebase Realtime Database functions

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

//Load data from Firebase
export let propertyData = {};
export let dataLoaded = false;

// Fetch data from Firebase and store it in global propertyData
export async function fetchMLSData() {
    const dbRef = ref(db, 'properties');
    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            propertyData = snapshot.val();
            dataLoaded = true;
        } else {
            console.log("No data available in Firabase.");
        }
    } catch (error) {
        console.error ("Error fetching data:", error);
    }
}

//Call the fetch function when the script is executed
fetchMLSData();