$(document).ready(function() {
    let canConvert = true;

    // if the user makes a selection
    function blankAlert() {
        // and the textarea is empty
        if ($('textarea').val().length === 0) {
            // prompt the user to input text
            alert('Add some text!');

            // in this state, the text cannot be converted
            canConvert = false;
        } else {
            // the user can convert their text
            canConvert = true;
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
        // if there is text in the textarea
        if (canConvert === true) {
            // update "select case" placeholder with selected case
            $('#case-selection span').html($(this).html()).addClass('confirmed');
        }

        // close the dropdown
        $('#dropdown').css('display', 'none'); 
    };

    function closeDropdown() {
        // rotate arrow up
        $('#arrow').css({'transform': 'rotate(45deg)', 'margin': '0 0 5px 0'});

        // close the dropdown
        $('#dropdown').css('display', 'none'); 
    };

    $(window).on('click', function(event) {
        let selection = $(event.target);

        // if the target is anything on the page, except a descendant of #case-selection
        if (selection.is($('html').find('*')) == true && selection.is($('#case-selection').find('*')) == false) {
            // close the dropdown and rotate the arrow up
            closeDropdown();
        } else if (selection.is($('#case-selection').find('*')) == true) {
            // otherwise, if the user selects a descendant of #case-selection, let the arrow rotate up/down
            rotateArrow();

            // and toggle the dropdown display to open/close
            $('#dropdown').toggle();
        }
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
        } else if (target.is('#togglecase')) {
            // convert all textarea content to togglecase
            $('textarea').val(function() {
                // convert the user input to a variable
                let text = $('textarea').val();

                // split the characters apart
                text = text.split('');

                // loop through the individual characters
                for (let i = 0; i < text.length; i++) {
                    // if the index is divisible by 2 (i.e., even)
                    if ((i % 2) == 0) {
                        // convert the character to uppercase
                        text[i] = text[i].toUpperCase();
                    } 
                }
                console.log(text.join(''));
                return text = text.join('');
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