$(document).ready(function() {

    // if the user makes a selection
    function blankAlert() {
        // and the textarea is empty
        if ($('textarea').val().length === 0) {
            // prompt the user to input text
            alert('Add some text!');
        }
    };

    // if the lowercase option is selected
    $('#lowercase').on('click', function() {
        // convert all textarea content to lowercase
        $('textarea').val(function() {
            return this.value.toLowerCase();
        });

        blankAlert();
    });

    // if the uppercase option is selected
    $('#uppercase').on('click', function() {
        // convert all textarea content to uppercase
        $('textarea').val(function() {
            return this.value.toUpperCase();
        }); 

        blankAlert();
    });
});

