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
});
