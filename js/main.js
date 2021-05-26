$(document).ready(function() {

    // if the user makes a selection
    function blankAlert() {
        // and the textarea is empty
        if ($('textarea').val().length === 0) {
            // prompt the user to input text
            alert('Add some text!');
        }
    };

    function rotateArrow() {
        // if the dropdown is visible
        if ($('#dropdown').css('display') === 'block') {
            // rotate the arrow, so it points up
            $('#arrow').css({'transform': 'rotate(45deg)', 'margin': '0 0 5px 0'});
        } else {
            // rotate the arrow, so it points down
            $('#arrow').css({'transform': 'rotate(225deg)', 'margin': '0'});
        }
    };

    $('#selection-placeholder').on('click', function() {
        rotateArrow();

        // toggle dropdown display
        $('#dropdown').toggle();
    });

    // if the lowercase option is selected
    $('#lowercase').on('click', function(event) {
        // convert all textarea content to lowercase
        $('textarea').val(function() {
            return this.value.toLowerCase();
        });

        // prevent event bubbling
        event.stopPropagation();

        rotateArrow();

        // close the dropdown
        $('#dropdown').css('display', 'none');
        
        blankAlert();
    });

    // if the uppercase option is selected
    $('#uppercase').on('click', function(event) {
        // convert all textarea content to uppercase
        $('textarea').val(function() {
            return this.value.toUpperCase();
        }); 

        // prevent event bubbling
        event.stopPropagation();

        rotateArrow();

        // close the dropdown
        $('#dropdown').css('display', 'none');

        blankAlert();
    });
});

