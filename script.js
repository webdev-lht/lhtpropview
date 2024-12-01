// Event listener for the button to trigger filtering only when data is available
document.addEventListener('DOMContentLoaded', function() {
    const countyDropdown = document.getElementById("countyDropdown");
    const acreageCheckboxes = document.querySelectorAll(".acreage-filter");
    const showResultsBtn = document.getElementById("showResultsBtn");
    const resultsList = document.getElementById("results-list").getElementsByTagName("tbody")[0];

    if (!countyDropdown) {
        console.error("County select element not found");
        return;
    }

    // Function to get the selected acreage values
    function getSelectedAcreage() {
        let selectedAcreage = [];
        acreageCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedAcreage.push(checkbox.value);
            }
        });
        return selectedAcreage;
    }

    // Function to fetch and filter data based on selected county and acreage filters
    async function fetchAndFilterData() {
        // Check if data is loaded
        if (!window.dataLoaded || !window.propertyData) {
            console.log("Data is not yet loaded.");
            return;
        }

        const selectedCounty = countyDropdown.value;
        const selectedAcreage = getSelectedAcreage();

        // Use the globally defined propertyData from app.js
        const propertyData = window.propertyData;

        // Filter the properties based on selected county and acreage filters
        let filteredProperties = Object.values(propertyData).filter(property => {
            const matchesCounty = selectedCounty === "All" || property.property_County === selectedCounty;
            const matchesAcreage = selectedAcreage.some(range => {
                const acreage = property.property_Acres;
                switch (range) {
                    case "20-50":
                        return acreage >= 20 && acreage <= 50;
                    case "51-100":
                        return acreage >= 51 && acreage <= 100;
                    case "101-150":
                        return acreage >= 101 && acreage <= 150;
                    case "151-200":
                        return acreage >= 151 && acreage <= 200;
                    case "201+":
                        return acreage > 200;
                    default:
                        return false;
                }
            });

            return matchesCounty && matchesAcreage;
        });

        displayResults(filteredProperties);
    }

    // Function to display filtered results in the table
    function displayResults(properties) {
        // Clear previous results
        resultsList.innerHTML = "";

        // If no results found, show a message
        if (properties.length === 0) {
            const noResultsRow = document.createElement("tr");
            const noResultsCell = document.createElement("td");
            noResultsCell.colSpan = 8;
            noResultsCell.textContent = "No results found";
            noResultsRow.appendChild(noResultsCell);
            resultsList.appendChild(noResultsRow);
            return;
        }

        // Append each filtered property to the results table
        properties.forEach(property => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${property.property_MLS}</td>
                <td>${property.property_Acres}</td>
                <td>${property.property_DOM}</td>
                <td>${property.property_County}</td>
                <td>${property.property_Address}</td>
                <td>${property.property_ElementarySchool}</td>
                <td>${property.property_MiddleSchool}</td>
                <td>${property.property_HighSchool}</td>
            `;
            resultsList.appendChild(row);
        });
    }

    // Wait until data is loaded before enabling the button
    const checkDataLoaded = setInterval(() => {
        if (window.dataLoaded) {
            // Enable the button after data is loaded
            showResultsBtn.disabled = false;

            // Attach the event listener to trigger the filtering
            showResultsBtn.addEventListener("click", function() {
                fetchAndFilterData();
            });

            console.log("Data is now loaded and button is enabled.");
            clearInterval(checkDataLoaded);  // Stop checking once the data is loaded
        }
    }, 100);  // Check every 100ms if data is loaded
});