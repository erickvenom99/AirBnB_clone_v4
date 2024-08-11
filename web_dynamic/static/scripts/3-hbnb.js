/* Script ensures the DOM is fully loaded
   Initializes an empty object to store selected amenities
   Listens for changes on checkbox inputs
   Retrieves and updates the selectAmen dictionary
   Updates the selected amenities
*/

$(document).ready(function() {
    const selectAmen = {};
    $("div.amenities input[type='checkbox']").change(function() {
        const amenId = $(this).data("id");
        const amenName = $(this).data("name");
        
        if ($(this).is(":checked")) {
            selectAmen[amenId] = amenName;
        } else {
            delete selectAmen[amenId];
        }
        
        const listAmenity = Object.values(selectAmen).join(', ');
        if (listAmenity.length > 0) {
            $('div.amenities h4').text(listAmenity);
        } else {
            $('div.amenities h4').html('&nbsp;');
        }
    });
    $.get("http://0.0.0.0:5001/api/v1/status/", function(data) {
        if (data.status === "OK") {
            $("#api_status").addClass("available");
        } else {
            $("#api_status").removeClass("available");
        }
    });
    $.ajax({
        url: "http://0.0.0.0:5001/api/v1/places_search",
        type: "POST",
        data: "{}",
        dataType: "json",
        contentType: "application/json",
        success: function(data) {
            for (let k = 0; k < data.length; k++) {
                let place = data[k];
                $('section.places').append(`
                    <article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guests</div>
                            <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                        </div>
                        <div class="description">
                            ${place.description}
                        </div>
                    </article>
                `);
            }
        }
    });
});

