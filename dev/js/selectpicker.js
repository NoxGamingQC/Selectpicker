document.addEventListener("DOMContentLoaded", function () {
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
            divElement.innerHTML = '<button id="selectpickerButton" class="" role="button"> <span class="selectpicker-value"></span> <span class="caret"><span></button>';
            divElement.querySelector('button#selectpickerButton').setAttribute('class', picker.getAttribute('class'));
            divElement.querySelector('button#selectpickerButton').classList.add('selectpicker-button');
            divElement.querySelector('button.selectpicker-button').classList.remove('selectpicker');
            divElement.querySelector('button.selectpicker-button > span.selectpicker-value').innerHTML = picker.getAttribute('placeholder');
            divElement.querySelector('button.selectpicker-button > span.selectpicker-value').classList.add('placeholder');
            divElement.innerHTML += '<div class="dropdown-menu-select"><ul class="select-option-list"></ul></div>';
            divElement.querySelector('button.selectpicker-button').addEventListener('click', function() {
                divElement.classList.toggle('open');
            });

            picker.querySelectorAll('option').forEach(function(option) {
                divElement.querySelector('div.dropdown-menu-select > ul.select-option-list').innerHTML += '<li value="' + option.value + '">' + option.innerHTML + '</li>'
            });
            divElement.appendChild(picker);
        });
    }
}
