!function(e){var t={};function n(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(i,a,function(t){return e[t]}.bind(null,a));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){n(1),e.exports=n(6)},function(e,t,n){"use strict";var i,a=n(2),r=(i=a)&&i.__esModule?i:{default:i};console.log("working"),new r.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i,a=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(3),s=(i=r)&&i.__esModule?i:{default:i};var o=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.results=new s.default,this.form=document.querySelector("#form_unit-converter"),this.unitContainer=document.querySelector(".input-container__unit"),this.dropdown=this.unitContainer.querySelector("select"),this.inputValueContainer=document.querySelector(".input-container__value"),this.inputValueEl=document.querySelector(".input-container__value input"),this.choices=document.querySelectorAll(".input-container__unit .btn-container"),this.formSubmit=this.form.querySelector('input[type="submit"]'),this.onFormSubmit(),this.setUpEventListeners()}return a(e,[{key:"onFormSubmit",value:function(){var e=this;this.form.querySelector('input[type="submit"]').addEventListener("click",(function(t){event.preventDefault(),e.results.renderResults({type:e.selectedType,unit:e.selectedUnit,value:e.inputValueEl.value})}),!1)}},{key:"setUpEventListeners",value:function(){var e=this;this.typeRadioBtns=document.querySelectorAll('.input-container__type input[type="radio"]'),this.typeRadioBtns.forEach((function(t){t.addEventListener("change",(function(t){return e.updateUnitOptions(t)}))})),this.unitRadioBtns=document.querySelectorAll('.input-container__unit input[type="radio"]'),this.unitRadioBtns.forEach((function(t){t.addEventListener("change",(function(t){return e.showValue(t)}))}))}},{key:"updateUnitOptions",value:function(e){console.log("target",e.target.value),this.selectedType=e.target.value,this.unitContainer.style.display="block",this.choices.forEach((function(e){e.style.display="none"})),document.querySelectorAll(".unit-"+this.selectedType).forEach((function(e){e.style.display="inline-block"}))}},{key:"showValue",value:function(e){this.inputValueContainer.style.display="block",document.querySelector(".input-container__submit").style.display="block",this.selectedUnit=e.target.value}}]),e}();t.default=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),a=s(n(4)),r=s(n(5));function s(e){return e&&e.__esModule?e:{default:e}}var o=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.resultContainer=document.querySelector(".results-container")}return i(e,[{key:"renderResults",value:function(e){var t=this;this.examplesIDs=this.getExamplesForSelection(e),this.formattedData=this.formatDataByLanguage(),this.langs=Object.keys(this.formattedData).sort();var n="";this.langs.forEach((function(i){n+=t.getMarkUpForLanguage(i,e)})),this.resultContainer.innerHTML='<h2>Results</h2><div class="lang-container">'+n+"</div>"}},{key:"getExamplesForSelection",value:function(e){var t=this,n=e.unit;return this.examplesForType=a.default.type[e.type].examples,Object.keys(this.examplesForType).filter((function(e){return t.examplesForType[e].unit.includes(n)}))}},{key:"formatDataByLanguage",value:function(){var e=this,t={};return this.examplesIDs.forEach((function(n){var i=e.examplesForType[n];Object.keys(i.text).forEach((function(e){var a="description"===e?"all":e;t[a]||(t[a]={}),t[a][n]={text:i.text[e],desc:i.text.description,size:i.size,icon:i.icon}}))})),t}},{key:"getMarkUpForLanguage",value:function(e,t){var n=this.exampleMarkupForLang(e,t);return'<div class="language-results '+e+'">\n                    <h3 class="examples_title lang-'+e+'">'+this.capitalise(e)+'</h3>\n                    <div class="examples-container">'+n+"</div>\n                </div>"}},{key:"exampleMarkupForLang",value:function(e,t){var n=this,i=this.formattedData[e],a=Object.keys(i).sort();return a.reduce((function(r,s,o){var u=i[a[o]];return r+'\n                <div class="example-container">\n                    <img src="./assets/img/'+u.icon+'" alt="'+u.text+'">\n                    <span class="calculation">'+t.value+t.unit+" is equal to "+n.calculateExampleByInput(t,u.size)+" "+u.desc+'</span>\n                    <span class="units">1 '+u.desc+" = "+(t.value/n.calculateExampleByInput(t,u.size)).toFixed(2)+t.unit+"</span>\n                    "+n.optionalDesc(e,u)+"\n                </div>"}),"")}},{key:"optionalDesc",value:function(e,t){return"all"===e?"":'<span class="description">'+e+": "+t.text+"</span>"}},{key:"calculateExampleByInput",value:function(e,t){var n=e.unit,i=e.type,a=e.value,r=t.match(/[a-zA-Z]+/g)[0];("area"===e.type&&"km"===r||"area"===e.type&&"m"===r)&&(r+="^2");var s=t.match(/\d+/g)[0],o=this.convertToOneOfUnit(s,r,n,i);return(a/parseFloat(o)).toFixed(3)}},{key:"convertToOneOfUnit",value:function(e,t,n,i){if(t!==n){var a=Object.keys(r.default[i]),s="";return a.forEach((function(e){Object.keys(r.default[i][e]).includes(n)&&(s=e)})),""+e*(r.default[i][s][t]/r.default[i][s][n])+n}return""+e+n}},{key:"capitalise",value:function(e){return e.replace(/^\w/,(function(e){return e.toUpperCase()}))}}]),e}();t.default=o},function(e){e.exports=JSON.parse('{"type":{"area":{"units":["m^2","km^2","ha"],"examples":{"football_pitches":{"unit":["m^2","km^2","ha"],"size":"10800m^2","icon":"football-pitch.jpg","text":{"spanish":"canchas de fútbol","portuguese":"campos de futebol","english":"football pitches","arabic":"ملعب كرة قدم","chinese":"足球场","russian":"футбольное поле","description":"football pitches"}},"hyde_park":{"unit":["m^2","km^2","ha"],"size":"142ha","icon":"?","text":{"english":"Hyde Park","description":"Hyde Park"}},"central_park":{"unit":["m^2","km^2","ha"],"size":"3.41km^2","icon":"?","text":{"english":"Central Park","description":"Central Park"}},"baseball_pitches":{"unit":["m^2","km^2","ha"],"size":"14864m^2","icon":"baseball-field.jpg","text":{"japanese":"東京ドーム","description":"baseball pitch"}},"maracana":{"unit":["m^2","km^2","ha"],"size":"10800m^2","icon":"maracana-stadium.jpg","text":{"spanish":"estadios de Maracaná","portuguese":"Maracanãs","description":"Maracanã Stadium"}}}},"height":{"units":["m","km"],"examples":{"mount_Toubkal":{"unit":["m","km"],"size":"4167m","icon":"mount-toubkal.jpg","text":{"arabic":"كقمة توبقال","description":"Mount Toubkal"}},"Mount_Everest":{"unit":["m","km"],"size":"8848m","icon":"mount-everest.jpg","text":{"english":"Mount Everest","chinese":"珠穆朗玛峰","description":"Mount Everest"}},"Oskantino_tower":{"unit":["m","km"],"size":"540m","icon":"ostankino-tower.jpg","text":{"chinese":"珠穆朗玛峰","description":"Oskantino tower"}},"Aconcagua":{"unit":["m","km"],"size":"6962m","icon":"mount-aconcagua.jpg","text":{"spanish":"Aconcaguas","description":"Mount Aconcagua"}},"Mount_Fuji":{"unit":["m","km"],"size":"3776m","icon":"mount-fuji.jpg","text":{"japanese":"富士山","description":"Mount Fuji"}},"christ_redeemer":{"unit":["m"],"size":"38m","icon":"christ-redeemer.jpg","text":{"portuguese":"Cristo Redentor","description":"Christ the Redeemer (statue)"}}}},"volume":{"units":["ml","cl","dl","l","hl"],"examples":{"glass_water":{"unit":["ml","cl","dl"],"size":"148ml","icon":"glass-water.jpg","text":{"arabic":"كأس ما","description":"glass of water"}},"glass_wine":{"unit":["ml","cl","dl","l"],"size":"360ml","icon":"wine-glass.jpg","text":{"russian":"Один бокал вина","description":"glass of wine"}},"watertank":{"unit":["l","hl"],"size":"100l","icon":"?","text":{"chinese":"大象","description":"watertank"}},"tequila_shot":{"unit":["ml","cl","dl","l"],"size":"43ml","icon":"tequila-shot.jpg","text":{"spanish":"caballitos","description":"tequila shots"}},"beer_bottle":{"unit":["ml","cl","dl","l"],"size":"600ml","icon":"caraf-beer.jpg","text":{"portuguese":"garrafa de cervejas","description":"beer bottle"}},"sake_bottle":{"unit":["ml","cl","dl","l"],"size":"18dl","icon":"sake-bottle.jpg","text":{"japanese":"升","description":"bottle of sake"}}}},"weight":{"units":["g","kg","t"],"examples":{"elephant":{"unit":["kg","t"],"size":"5400kg","icon":"elephant.jpg","text":{"spanish":"elefante","english":"elephants","chinese":"大象","russian":"слон","description":"elephants"}},"rice_bags":{"unit":["kg"],"size":"60kg","icon":"rice-package.jpg","text":{"japanese":"俵","description":"rice bags"}},"arrobas":{"unit":["kg"],"size":"15kg","icon":"arroba.jpg","text":{"portuguese":"arrobas","description":"Unit of weight used in Brazil acriculture"}},"bag_flour":{"unit":["kg"],"size":"50kg","icon":"sack-flour.jpg","text":{"russian":"мешок муки","description":"sack of flour"}},"bag_wheat":{"unit":["kg"],"size":"10kg","icon":"wheat-grain.jpeg","text":{"arabic":"كيس من القمح","description":"bag of wheat"}},"sugar_cube":{"unit":["kg","g"],"size":"4g","icon":"sugar-cube.jpg","text":{"chinese":"一块方糖","description":"sugar cube"}},"rice_bags_s":{"unit":["kg"],"size":"1kg","icon":"?","text":{"spanish":"paquetes de arroz","description":"bag of rice"}},"bean_bags":{"unit":["kg"],"size":"1kg","icon":"black-beans.jpg","text":{"portuguese":"saco de feijão","description":"bag of beans"}},"yen_coin":{"unit":["g"],"size":"1g","icon":"yen.jpg","text":{"japanese":"円玉","description":"yen coin"}}}}}}')},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={area:{"m^2":{"km^2":1e5,ha:1e4,"m^2":1}},weight:{g:{kg:1e3,t:1e6,g:1}},volume:{ml:{hl:1e4,l:1e3,dl:100,cl:10,ml:1}},height:{m:{km:1e3,m:1}}}},function(e,t,n){}]);