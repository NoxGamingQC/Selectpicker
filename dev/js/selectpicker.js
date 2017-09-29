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

    getSelectpickerValue: function(select) {
        var optionsSelected = '';
        select.querySelectorAll('option').forEach(function (value) {
            if (value.getAttribute('selected') !== null) {
                optionSelected = value.innerHTML;
            }
        });
        return optionSelected;
    },

    initSelectPicker: function() {
        document.querySelectorAll('.selectpicker').forEach(function(picker) {
            buildSelectPicker.createSelectPicker(picker);
        });
    },

    selectpickerEvent: function(divElement) {
        divElement.querySelector('button.selectpicker-button').addEventListener('click', function () {
            divElement.classList.toggle('open');
        });
    },

    displayedValue: function (picker, divElement) {
        if (selectpicker.hasValueSelected(picker)) {
            divElement.querySelector('button.selectpicker-button > span.selectpicker-value').innerHTML = selectpicker.getSelectpickerValue(picker);
            if (divElement.querySelector('button.selectpicker-button > span.selectpicker-value.placeholder')) {
                divElement.querySelector('button.selectpicker-button > span.selectpicker-value').classList.remove('placeholder')
            }
            if (divElement.querySelector('button.selectpicker-button > span.selectpicker-value.title')) {
                divElement.querySelector('button.selectpicker-button > span.selectpicker-value').classList.remove('title')
            }
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

    setSelectOptionEvent: function(divElement) {
        document.querySelectorAll('div.selectpicker-group > div.dropdown-menu-select > ul.select-option-list > li').forEach(function(option) {
            option.addEventListener('click', function() {
                selectpicker.onOptionSelect(divElement, option);
            });
        });
    },

    onOptionSelect: function(divElement, option) {
        var selectedValue = '';
        var picker = divElement.querySelector('select.selectpicker');

        option.setAttribute('selected', '');
        selectedValue = option.getAttribute('value');
        selectpicker.setSelectpickerOptionSelection(option, selectedValue);
        selectpicker.removeDropdownNotSelectedValue(selectedValue);
        divElement.classList.remove('open');
        selectpicker.displayedValue(picker, divElement);
    },

    setSelectpickerOptionSelection: function(option, selectedValue) {
        option.parentElement.parentElement.parentElement.querySelectorAll('select.selectpicker > option').forEach(function (selectOption) {
            if (selectOption.getAttribute('value') == selectedValue) {
                selectOption.setAttribute('selected', '');
            } else {
                selectOption.removeAttribute('selected');
            }
        });
    },

    removeDropdownNotSelectedValue: function(selectedValue) {
        document.querySelectorAll('div.selectpicker-group > div.dropdown-menu-select > ul.select-option-list > li').forEach(function (option) {
            if (option.getAttribute('value') !== selectedValue) {
                option.removeAttribute('selected');
            }
        });
    }
}

var buildSelectPicker = {
    createSelectPicker: function(picker) {
        var divElement = document.createElement('div');
        buildSelectPicker.createSelectpickerButton(picker, divElement);
        selectpicker.displayedValue(picker, divElement);
        divElement.innerHTML += '<div class="dropdown-menu-select"><ul class="select-option-list"></ul></div>';
        selectpicker.selectpickerEvent(divElement);
        buildSelectPicker.createOptionsSelectpicker(picker, divElement);
        divElement.appendChild(picker);

        selectpicker.setSelectOptionEvent(divElement);
    },

    createOptionsSelectpicker: function(picker, divElement) {
        picker.querySelectorAll('option').forEach(function (option) {
            divElement.querySelector('div.dropdown-menu-select > ul.select-option-list').innerHTML += '<li value="' + option.value + '">' + option.innerHTML + '</li>'
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
}
