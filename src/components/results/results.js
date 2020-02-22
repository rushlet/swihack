import data from '../../measures_swihack';
import config from './measurement_config';

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
            output += this.getMarkUpForLanguage(lang, options);
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

    getMarkUpForLanguage(language, options) {
        const output = this.exampleMarkupForLang(language, options)
        return `<div class="language-results ${language}">
                    <h3 class="examples_title lang-${language}">${this.capitalise(language)}</h3>
                    <div class="examples-container">${output}</div>
                </div>`;
    }

    exampleMarkupForLang(language, options) {
        const dataForLang = this.formattedData[language];
        const ids = Object.keys(this.formattedData[language]);
        return ids.reduce((previous, current, i) => {
            return `${previous}
                <div class="example-container">
                    <img src="./assets/img/${dataForLang[ids[i]].icon}" alt="${dataForLang[ids[i]].text}">
                    <span class="calculation">${this.calculateExampleByInput(options.unit, dataForLang[ids[i]].size, options.type)}</span>
                    <span class="units">1 ${dataForLang[ids[i]].text} = ${dataForLang[ids[i]].size}</span>
                    <span class="description">${dataForLang[ids[i]].text}</span>
                </div>`;
        }, '');
    }

    calculateExampleByInput(unit, sizeOfExample, type) {
        console.log('str', sizeOfExample);
        let currentUnit = sizeOfExample.match(/[a-zA-Z]+/g)[0];
        if (currentUnit === 'km' || currentUnit === 'm') currentUnit += "^2";
        console.log('currentUnit: ', currentUnit);
        const number = sizeOfExample.match(/\d+/g)[0];
        console.log('user selected', unit, 'example measured in', currentUnit, `(${number})`);
        const conversion = this.convertToOneOfUnit(number, currentUnit, unit, type);
        console.log('conversion', conversion);
        return conversion;
    }

    convertToOneOfUnit(number, currentUnit, unitToConvertTo, type) {
        console.log(unitToConvertTo, currentUnit, currentUnit !== unitToConvertTo);
        if (currentUnit !== unitToConvertTo) {
            const smallestUnits = Object.keys(config[type]);
            let unitKey = '';
            smallestUnits.forEach((key) => {
                if (Object.keys(config[type][key]).includes(unitToConvertTo)) unitKey = key;
            })
            console.log('unitKey', unitKey, 'currentUnit', currentUnit, 'unitToConvertTo');
            console.log('number', number, conversion, conversion);
            const conversion = config[type][unitKey][currentUnit] / config[type][unitKey][unitToConvertTo];
            return `${number * conversion}${unitToConvertTo}`;
        }
        return `${number}${unitToConvertTo}`;
    }

    capitalise(string) {
        return string.replace(/^\w/, c => c.toUpperCase());
    }
}