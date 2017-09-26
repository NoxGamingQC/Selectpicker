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

    hasValueSelected: function(select) {
        var hasSelected = false;
        select.querySelectorAll('option').forEach(function(value) {
            if (value.getAttribute('selected') !== null) {
                hasSelected = true;
            }
        });
        return hasSelected;
    },

    initSelectPicker: function() {
        document.querySelectorAll('.selectpicker').forEach(function(picker) {
            var divElement = document.createElement('div');

            selectpicker.createSelectpickerButton(picker, divElement);
            selectpicker.displayedValue(picker, divElement);

            divElement.innerHTML += '<div class="dropdown-menu-select"><ul class="select-option-list"></ul></div>';
            selectpicker.selectpickerEvent(divElement);

            picker.querySelectorAll('option').forEach(function(option) {
                divElement.querySelector('div.dropdown-menu-select > ul.select-option-list').innerHTML += '<li value="' + option.value + '">' + option.innerHTML + '</li>'
            });

            divElement.appendChild(picker);
            selectpicker.setSelectOptionEvent();
        });
    },

    selectpickerEvent: function(divElement) {
        divElement.querySelector('button.selectpicker-button').addEventListener('click', function () {
            divElement.classList.toggle('open');
        });
    },

    createSelectpickerButton: function (picker, divElement) {
        var pickerParentElement = picker.parentNode;

        pickerParentElement.replaceChild(divElement, picker);
        divElement.classList.add('selectpicker-group');
        divElement.innerHTML = '<button id="selectpickerButton" class="" role="button"> <span class="selectpicker-value"></span> <span class="caret"><span></button>';
        divElement.querySelector('button#selectpickerButton').setAttribute('data-type', picker.getAttribute('data-type'));
        divElement.querySelector('button#selectpickerButton').classList.add('selectpicker-button');
    },

    displayedValue: function (picker, divElement) {
        if (selectpicker.hasValueSelected(picker)) {

        } else {
            if(picker.getAttribute('placeholder')) {
                divElement.querySelector('button.selectpicker-button > span.selectpicker-value').innerHTML = picker.getAttribute('placeholder');
                divElement.querySelector('button.selectpicker-button > span.selectpicker-value').classList.add('placeholder');
            } else if(picker.getAttribute('title')) {
                divElement.querySelector('button.selectpicker-button > span.selectpicker-value').innerHTML = picker.getAttribute('title');
                divElement.querySelector('button.selectpicker-button > span.selectpicker-value').classList.add('title');
            }
        }
    },

    setSelectOptionEvent: function() {
        var selectedValue = '';
        document.querySelectorAll('div.selectpicker-group > div.dropdown-menu-select > ul.select-option-list > li').forEach(function(option) {
            option.addEventListener('click', function() {
                option.setAttribute('selected', '');
                selectedValue = '' + option.value;
                option.parentElement.parentElement.parentElement.querySelectorAll('select.selectpicker > option').forEach(function(selectOption) {
                    if(selectOption.value == option.value) {
                        selectOption.setAttribute('selected', '');
                    } else {
                        selectOption.removeAttribute('selected');
                    }
                });
                document.querySelectorAll('div.selectpicker-group > div.dropdown-menu-select > ul.select-option-list > li').forEach(function (option) {
                    if ('' + option.value !== selectedValue) {
                        option.removeAttribute('selected');
                    }
                });
            })
        });
    }
}
