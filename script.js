// Import variables and functions from app.js
import { propertyData, dataLoaded, fetchMLSData } from './app.js';

// Waiting for DOM to load
document.addEventListener("DOMContentLoaded", async () => {
    await fetchMLSData();

    // DOM elements
    const acreageCheckboxes = document.querySelectorAll(".acreage-filter");
    const showResultsBtn = document.getElementById("showResultsBtn");
    const resultsList = document.getElementById("results-list");

    // Handle MLS Results Button
    showResultsBtn.addEventListener("click", () => {
        if (!dataLoaded) {
            alert("Data is still loading. Please try again in a moment.");
            return;
        }

        // Get selected acreage ranges
        const selectedAcreageRanges = Array.from(acreageCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => checkbox.value);

        // Filter and display logic here
        const filteredResults = Object.values(propertyData).filter((properties) => {
            // Clean the acreage value (ensure it's a number)
            let acres = properties.property_Acres;

            // Ensure acres is a number, if it's a string, convert it
            if (typeof acres === "string") {
                acres = parseFloat(acres.replace(/[^\d.-]/g, '')); // Remove non-numeric characters (if any)
            }

            // If acres is still not a number after conversion, skip this property
            if (isNaN(acres)) return false;

            // Check if the acreage is within any of the selected ranges
            let acreageMatch = false;
            selectedAcreageRanges.forEach((range) => {
                if (range === "20-50" && acres >= 20 && acres <= 50) {
                    acreageMatch = true;
                } else if (range === "51-100" && acres >= 51 && acres <= 100) {
                    acreageMatch = true;
                } else if (range === "101-150" && acres >= 101 && acres <= 150) {
                    acreageMatch = true;
                } else if (range === "151-200" && acres >= 151 && acres <= 200) {
                    acreageMatch = true;
                } else if (range === "201+" && acres > 200) {
                    acreageMatch = true;
                }
            });

            return acreageMatch;
        });

        // Display results
        resultsList.innerHTML = filteredResults.length
            ? filteredResults.map((properties) => `
                <div>
                    <p><strong>Acres:</strong> ${properties.property_Acres}</p>
                    <p><strong>Days on Market:</strong> ${properties.property_DOM}</p>
                    <p><strong>County:</strong> ${properties.property_County}</p>
                </div>
            `).join("")
            : "<p>No results found.</p>";
    });
});
