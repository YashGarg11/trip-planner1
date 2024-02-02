
        function planTrip() {
            var destination = document.getElementById("destination").value;
            var mapFrame = document.getElementById("mapFrame");
            var tripDetails = document.getElementById("trip-details");

            // Check if destination is provided
            if (destination.trim() === '') {
                alert('Please enter a destination for your trip.');
                return;
            }

            // Construct the Google Maps Geocoding API URL
            var geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(destination)}&key=YOUR_GOOGLE_MAPS_API_KEY`;

            // Fetch geocoding data to get latitude and longitude of the destination
            fetch(geocodingApiUrl)
                .then(response => response.json())
                .then(data => {
                    // Check if results array is empty
                    if (data.results.length === 0) {
                        alert(`No results found for the entered destination: ${destination}`);
                        return;
                    }

                    var location = data.results[0].geometry.location;
                    var latitude = location.lat;
                    var longitude = location.lng;

                    // Construct the map URL with latitude and longitude
                    var mapUrl = `https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${latitude},${longitude}&zoom=15`;
                    mapFrame.src = mapUrl;

                    // Display trip details
                    tripDetails.innerHTML = `
                        <h3>Your Trip Details:</h3>
                        <p>Destination: ${destination}</p>
                        <p>Latitude: ${latitude}</p>
                        <p>Longitude: ${longitude}</p>
                    `;
                })
                .catch(error => {
                    console.error('Error fetching geocoding data:', error);
                    alert('Error fetching geocoding data. Please try again later.');
                });
        }
    
