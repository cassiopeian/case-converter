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

    function confirmSelection() {
        // update "select case" placeholder with selected case
        $('#case-selection span').html($(this).html()).addClass('confirmed');

        // close the dropdown
        $('#dropdown').css('display', 'none');
    };

    // allow the user to close the dropdown without making a selection
    $('#selection-placeholder').on('click', function() {
        rotateArrow();

        // toggle dropdown display
        $('#dropdown').toggle();
    });

    $('#dropdown button').on('click', function(event) {
        // make each dropdown button a potential target
        let target = $(event.target);
        if (target.is('#lowercase')) {
            // convert all textarea content to lowercase
            $('textarea').val(function() {
                return this.value.toLowerCase();
            });
        } else if (target.is('#uppercase')) {
            // convert all textarea content to uppercase
            $('textarea').val(function() {
                return this.value.toUpperCase();
            });
        }

        // prevent event bubbling
        event.stopPropagation();

        rotateArrow();
     
        blankAlert();
    });

    $('#lowercase').on('click', confirmSelection);

    $('#uppercase').on('click', confirmSelection);
});