//Setting Up Firebase Realtime Database in Node.js

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.database();

//Referencing the Properties node
const ref = db.ref('properties');

//Getting the data from Firebase Realtime Database
ref.once('value', (snapshot) => {
    const data = snapshot.val();
    console.log(data);
})
.catch((error) => {
    console.error("Error reading from Realtime Database:", error);
});