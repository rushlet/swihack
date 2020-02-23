import Results from './../results/results';

export default class Form {
    constructor() {
        this.results = new Results();
        this.form = document.querySelector('#form_unit-converter');
        this.unitContainer = document.querySelector('.input-container__unit');
        this.dropdown = this.unitContainer.querySelector('select');
        this.inputValueContainer = document.querySelector('.input-container__value');
        this.inputValueEl = document.querySelector('.input-container__value input');
        this.choices = document.querySelectorAll('.input-container__unit .btn-container');
        this.formSubmit = this.form.querySelector('input[type="submit"]')
        this.onFormSubmit();
        this.setUpEventListeners();
    }

    onFormSubmit() {
        this.form.querySelector('input[type="submit"]').addEventListener('click', (evt) => {
            event.preventDefault();
            this.results.renderResults({
                type: this.selectedType,
                unit: this.selectedUnit,
                value: this.inputValueEl.value,
            });
        }, false);
    }

    setUpEventListeners() {
        this.typeRadioBtns = document.querySelectorAll('.input-container__type input[type="radio"]');
        this.typeRadioBtns.forEach((el) => {
            el.addEventListener('change', (evt) => this.updateUnitOptions(evt));
        });
        this.unitRadioBtns = document.querySelectorAll('.input-container__unit input[type="radio"]');
        this.unitRadioBtns.forEach((el) => {
            el.addEventListener('change', (evt) => this.showValue(evt));
        });
    }

    updateUnitOptions(evt) {
        // populate unit options
        // update event listeners for units
        console.log('target', evt.target.value);
        this.selectedType = evt.target.value;
        
        this.unitContainer.style.display = 'block';
        this.choices.forEach((btn) => {
            btn.style.display = 'none';
        });
        document.querySelectorAll(`.unit-${this.selectedType}`).forEach((opt) => {
            opt.style.display = 'inline-block';
        });
    }

    showValue(evt) {
        this.inputValueContainer.style.display = 'block';
        document.querySelector('.input-container__submit').style.display = 'block';
        this.selectedUnit = evt.target.value;
    }
}