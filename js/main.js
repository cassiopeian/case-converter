$(document).ready(function() {
    // if the lowercase option is selected
    $('#lowercase').on('click', function() {
        // convert all textarea content to lowercase
        $('textarea').val(function() {
            return this.value.toLowerCase();
        });
    });
});

