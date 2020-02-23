import data from '../../measures_swihack';
import config from './measurement_config';

export default class Results {
    constructor() {
        this.resultContainer = document.querySelector('.results-container');
    }

    renderResults(options) {
        this.examplesIDs = this.getExamplesForSelection(options);
        this.formattedData = this.formatDataByLanguage();
        this.langs = Object.keys(this.formattedData).sort();
        let output = '';
        this.langs.forEach((lang) => {
            output += this.getMarkUpForLanguage(lang, options);
        });
        this.resultContainer.innerHTML = `<h2>Results</h2><div class="lang-container">${output}</div>`;
    }

    getExamplesForSelection(options) {
        const selectedUnit = options.unit;
        this.examplesForType = data.type[options.type].examples;
        return Object.keys(this.examplesForType).filter(key => this.examplesForType[key].unit.includes(selectedUnit));
    }

    formatDataByLanguage() {
        const formattedData = {};
        this.examplesIDs.forEach((id) => {
            const datum = this.examplesForType[id];
            Object.keys(datum.text).forEach((lang) => {
                const key = (lang === 'description') ? 'all' : lang;
                if (!formattedData[key]) formattedData[key] = {};
                formattedData[key][id] = {
                    text: datum.text[lang],
                    desc: datum.text['description'],
                    size: datum.size,
                    icon: datum.icon
                }
            });
        });
        return formattedData;
    }

    getMarkUpForLanguage(language, options) {
        const output = this.exampleMarkupForLang(language, options);
        return `<div class="language-results ${language}">
                    <h3 class="examples_title lang-${language}">${this.capitalise(language)}</h3>
                    <div class="examples-container">${output}</div>
                </div>`;
    }

    exampleMarkupForLang(language, options) {
        const dataForLang = this.formattedData[language];
        const ids = Object.keys(dataForLang).sort();
        return ids.reduce((previous, current, i) => {
            const example = dataForLang[ids[i]];
            return `${previous}
                <div class="example-container">
                    <img src="./assets/img/${example.icon}" alt="${example.text}">
                    <span class="calculation">${options.value}${options.unit} is equal to ${this.calculateExampleByInput(options, example.size)} ${example.desc}</span>
                    <span class="units">1 ${example.desc} (${example.size}) = ${(options.value / this.calculateExampleByInput(options, example.size)).toFixed(3)}${options.unit}</span>
                    ${this.optionalDesc(language, example)}
                </div>`;
        }, '');
    }

    optionalDesc(language, example) {
        if (language === 'all') return '';
        return `<span class="description">${example.desc} in ${language}: ${example.text}</span>`;
    }

    calculateExampleByInput(opts, sizeOfExample) {
        const { unit, type, value } = opts;
        let currentUnit = sizeOfExample.match(/[a-zA-Z]+/g)[0];
        if ((opts.type === "area" && currentUnit === 'km') || (opts.type === "area" && currentUnit === 'm')) currentUnit += "^2";
        const number = sizeOfExample.match(/\d+/g)[0];
        const conversion = this.convertToOneOfUnit(number, currentUnit, unit, type);
        return (value / parseFloat(conversion)).toFixed(3);
    }

    convertToOneOfUnit(number, currentUnit, unitToConvertTo, type) {
        if (currentUnit !== unitToConvertTo) {
            const smallestUnits = Object.keys(config[type]);
            let unitKey = '';
            smallestUnits.forEach((key) => {
                if (Object.keys(config[type][key]).includes(unitToConvertTo)) unitKey = key;
            })
            const conversion = config[type][unitKey][currentUnit] / config[type][unitKey][unitToConvertTo];
            return `${number * conversion}${unitToConvertTo}`;
        }
        return `${number}${unitToConvertTo}`;
    }

    capitalise(string) {
        return string.replace(/^\w/, c => c.toUpperCase());
    }
}