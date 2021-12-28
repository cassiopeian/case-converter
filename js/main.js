$(document).ready(function() {
    let canConvert = true;
    let upThenDown;
    let spaceIndices = [];

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

    function sendPlaneToTypewriter() {
        if (canConvert === true) {
            // reveal the airplane and activate the keyframes animation that makes it fly
            $('#airplane').css('display', 'block').addClass('flight');

            // when the animation ends, hide the airplane and reset the animation
            setTimeout(function() {
            $('#airplane').css('display', 'none').removeClass('flight');
            }, 2050);

            // activate the fly-in keyframes animation
            $('#incoming-airplane').addClass('incoming-flight');

            // reset the fly-in animation
            setTimeout(function() {
            $('#incoming-airplane').removeClass('incoming-flight');
            }, 4050);
        }
    };

    function closeDropdown() {
        // rotate arrow up
        $('#arrow').css({'transform': 'rotate(45deg)', 'margin': '0 0 5px 0'});

        // close the dropdown
        $('#dropdown').css('display', 'none'); 
    };

    function toggleStartUp() {
        // confirm toggle begins with an uppercase letter
        upThenDown = true;

        // convert all textarea content to togglecase
        $('textarea').val(function() {
            // split the characters in the user's input text 
            let text = $('textarea').val().split('');

            // loop backward through text
            for (let x = text.length - 1; x >= 0; x--) {
                // and if the character is a blank space
                if (text[x] === ' ') {
                    // push the index of that space into the spaces array
                    spaceIndices.push(x);
                }
            }

            // remove blank spaces from the text, so they don't count as characters in the next step
            text = text.filter(chars => chars.trim() !== '');

            // loop through the individual characters
            for (let i = 0; i < text.length; i++) {
                // if the index is divisible by 2 (i.e., even)
                if ((i % 2) == 0) {
                    // convert the character to uppercase
                    text[i] = text[i].toUpperCase();
                } else {
                    // else, if odd, convert the character to lowercase
                    text[i] = text[i].toLowerCase();
                }
            }

            // loop backward through the numbers in the space index array
            spaceIndices.reverse().forEach(num => {
                console.log(text[num]);
                // and insert spaces before those index locations in the text
                text.splice(num, 0, ' ');
            });

            // clear the index array
            spaceIndices = [];

            console.log(text.join(''));
            return text = text.join('');
        });
    };

    function toggleStartDown() {
        // confirm toggle begins with a lowercase letter
        upThenDown = false;

        // convert all textarea content to togglecase
        $('textarea').val(function() {
            // split the characters in the user's input text 
            let text = $('textarea').val().split('');

            // loop backward through text
            for (let x = text.length - 1; x >= 0; x--) {
                // and if the character is a blank space
                if (text[x] === ' ') {
                    // push the index of that space into the spaces array
                    spaceIndices.push(x);
                }
            }

            // remove blank spaces from the text, so they don't count as characters in the next step
            text = text.filter(chars => chars.trim() !== '');

            // loop through the individual characters
            for (let i = 0; i < text.length; i++) {
                // if the index is not divisible by 2 (i.e., odd)
                if ((i % 2) !== 0) {
                    // convert the character to uppercase
                    text[i] = text[i].toUpperCase();
                } else {
                    // else, if even, convert the character to lowercase
                    text[i] = text[i].toLowerCase();
                }
            }

            // loop backward through the numbers in the space index array
            spaceIndices.reverse().forEach(num => {
                console.log(text[num]);
                // and insert spaces before those index locations in the text
                text.splice(num, 0, ' ');
            });

            // clear the index array
            spaceIndices = [];

            console.log(text.join(''));
            return text = text.join('');
        });
    };

    // to prevent triggering both touch and click events, on mobile devices
    $(window).on('touchstart click', function(event) {
        // if a touch event is registered
        if (event.type === 'touchstart') {
            // cancel click events
            $(window).off('click');
            
            // NB: this is also necessary, to make the retoggle button work
            $('*').off('click');
        }
    });

    $(window).on('touchstart click', function(event) {
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

    $('#case-selection').on('touchstart', function(event) {
        event.preventDefault();

        // on mobile, close the soft keyboard
        $('#case-selection').focus();
    });

    $('#dropdown button').on('touchstart click', function(event) {
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
        } else if (target.is('#title-case')) {
            // convert all textarea content to title case
            $('textarea').val(function() {
                // split the string into words
                let splitWords = $('textarea').val().split(' ');
    
                // to capitalize the first letter of each word
                let titleCased = splitWords.map(word => {
                    // get the first letter of each word
                    let upLetters = word.substring(0, 1);
                    // get the rest of each word
                    let downLetters = word.substring(1);
                    
                    // cap the first letters, and make the rest lowercase
                    return `${upLetters.toUpperCase()}${downLetters.toLowerCase()}`;
                });

                // remove array commas and display message
                return titleCased.join(' ');
            });
        } else if (target.is('#togglecase')) {
            // convert all textarea content to togglecase
            toggleStartDown();
        }

        // to ensure "retoggle" is available only while toggle is selected
        if (target.is('#togglecase')) {
            //reveal the retoggle button
            $('#retoggle').css('display', 'flex');
        } else {
            //hide the retoggle button
            $('#retoggle').css('display', 'none');
        }

        // prevent event bubbling
        event.stopPropagation();

        // activate the keyframes animation that makes the text fade in
        $('textarea').addClass('fade-in');

        // reset the fade-in animation 
        setTimeout(function() {
            $('textarea').removeClass('fade-in');
        }, 1050);

        rotateArrow();
        
        blankAlert();

        sendPlaneToTypewriter();
    });

    $('#lowercase').on('touchstart click', confirmSelection);

    $('#uppercase').on('touchstart click', confirmSelection);

    $('#title-case').on('touchstart click', confirmSelection);

    $('#togglecase').on('touchstart click', confirmSelection);

    $('#retoggle').on('touchstart click', function() {
        // if toggle begins with a lowercase letter
        if (upThenDown === false) {
            // retoggle, so the first letter is uppercase
            toggleStartUp();
        } else if (upThenDown === true) {
            // otherwise, revert back to a lowercase first letter
            toggleStartDown();
        }
    });

    // when the user clicks on the copy button
    $('#clipboard').on('touchstart click', function(event) {
        // prevent focus from returning to clipboard icon
        event.preventDefault();

        // select/highlight the textarea content 
        $('textarea').focus();
        $('textarea').select();

        // copy the textarea content to the clipboard
        navigator.clipboard.writeText($('textarea').val());

        // display the "copied to clipboard" notice
        $('#clipboard-notice').css('visibility', 'visible');

        // and then hide the notice again
        setTimeout(function() {
            $('#clipboard-notice').css('visibility', 'hidden');
        }, 2000);
    });
});