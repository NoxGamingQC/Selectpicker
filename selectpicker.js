document.addEventListener("DOMContentLoaded", function (event) {
    selectpicker.init();
});

var selectpicker = {
    init: function() {
        if (selectpicker.checkIfDomHasSelectpicker()) {
            selectpicker.initSelectPicker();
        }
    },

    checkIfDomHasSelectpicker: function() {
        return document.querySelectorAll('.selectpicker').length > 0;
    },

    initSelectPicker: function() {
        document.querySelectorAll('.selectpicker').forEach(function(picker) {
            var pickerParentElement = picker.parentNode;
            var divElement = document.createElement('div');

            pickerParentElement.replaceChild(divElement, picker);
            divElement.classList.add('selectpicker-group');
            selectPickerTitle = picker.getAttribute('title');
            divElement.innerHTML = '<button class="selectpicker-button" role="button">' + selectPickerTitle +' <span class="caret"><span></button>';
            divElement.appendChild(picker);
        });
    }
}
