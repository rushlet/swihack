import data from '../../measures_swihack';

export default class Results {
    constructor() {
        this.resultContainer = document.querySelector('.results-container');
    }

    renderResults(options) {
        this.suggestions = this.getExamplesForSelection(options);
        const markup = this.suggestions.reduce((previous, current, i) => {
            console.log('current', this.examplesForType[current]);
            return `${previous}<img class="${current}" src="${this.examplesForType[current].icon}">`
        }, `<h2>Results for ${options.type}, ${options.unit}, ${options.value}</h2><div class="examples-container">`);
        console.log('markup', markup);
        this.resultContainer.innerHTML = `${markup}</div>`;
    }

    getExamplesForSelection(options) {
        const selectedUnit = options.unit;
        this.examplesForType = data.type[options.type].examples;
        return Object.keys(this.examplesForType).filter(key => this.examplesForType[key].unit.includes(selectedUnit));
    }
}