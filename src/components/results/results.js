export default class Results {
    constructor() {
        this.resultContainer = document.querySelector('.results-container');
    }

    renderResults(data) {
        this.resultContainer.innerHTML = `
            <h2>Results for ${data.type}, ${data.unit}, ${data.value}</h2>
        `;
    }
}