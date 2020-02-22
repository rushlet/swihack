import data from '../../measures_swihack';

export default class Results {
    constructor() {
        this.resultContainer = document.querySelector('.results-container');
    }

    renderResults(options) {
        this.examplesIDs = this.getExamplesForSelection(options);
        this.langs = this.getLanguagesForInput();
        this.formattedData = this.formatDataByLanguage();
        let output = '';
        this.langs.forEach((lang) => {
            output += this.getMarkUpForLanguage(lang);
        });
        this.resultContainer.innerHTML = `<h2>Results</h2><div class="lang-container">${output}</div>`;
    }
    getExamplesForSelection(options) {
        const selectedUnit = options.unit;
        this.examplesForType = data.type[options.type].examples;
        return Object.keys(this.examplesForType).filter(key => this.examplesForType[key].unit.includes(selectedUnit));
    }

    getLanguagesForInput() {
        const allLangs = [];
        this.examplesIDs.forEach((key) => {
            allLangs.push(...Object.keys(this.examplesForType[key].text));
        });
        return [...new Set(allLangs)];
    }

    formatDataByLanguage() {
        const formattedData = {};
        this.examplesIDs.forEach((id) => {
            const datum = this.examplesForType[id];
            Object.keys(datum.text).forEach((lang) => {
                if (!formattedData[lang]) formattedData[lang] = {};
                formattedData[lang][id] = {
                    text: datum.text[lang],
                    desc: datum.desc || "placeholder for description",
                    size: datum.size,
                    icon: datum.icon
                }
            });
        });
        return formattedData;
    }

    getMarkUpForLanguage(language) {
        const output = this.exampleMarkupForLang(language)
        return `<div class="examples-container ${language}">
                    <h3 class="examples_title lang-${language}">${this.capitalise(language)}</h3>
                    ${output}
                </div>`;
    }

    exampleMarkupForLang(language) {
        const dataForLang = this.formattedData[language];
        const ids = Object.keys(this.formattedData[language]);
        return ids.reduce((previous, current, i) => {
            console.log('dataForLang[ids[i]]', dataForLang[ids[i]]);
            return `${previous}
                <div class="example-container">
                    <img src="${dataForLang[ids[i]].icon}" alt="${dataForLang[ids[i]].text}">
                    <span class="calculation">${this.calculateExampleByInput()}</span>
                    <span class="units">1 ${dataForLang[ids[i]].text} = ${dataForLang[ids[i]].size}</span>
                    <span class="description">${dataForLang[ids[i]].text}</span>
                </div>`;
        }, '');
    }

    calculateExampleByInput(sizeOfExample, unit) {
        // const measurementConf = {

        // }
        return 'placeholder conversion';
    }

    capitalise(string) {
        return string.replace(/^\w/, c => c.toUpperCase());
    }
}