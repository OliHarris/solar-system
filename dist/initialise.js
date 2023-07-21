"use strict";
let wikiApiUrl;
let wikiUrl;
// one set of values for raw URLs
const wikiRawString = 'https://en.wikipedia.org/wiki/';
const wikiApiRawString = 'https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&origin=*&titles=';
const updateDiagram = (article) => {
    wikiApiUrl = wikiApiRawString + article;
    wikiUrl = wikiRawString + article;
    // populate info from Wiki Api JSON file
    fetch(wikiApiUrl)
        .then((response) => response.json())
        .then((json) => {
        const pageInfo = json.query.pages;
        Object.keys(pageInfo).forEach((key) => {
            const pageExtract = pageInfo[key];
            const wikiH1 = document.querySelector('#wikipedia-article h1');
            wikiH1.innerHTML = pageExtract.title;
            const wikiArticle = document.querySelector('#wikipedia-article #article');
            wikiArticle.innerHTML = pageExtract.extract;
            const wikiAnchor = document.querySelector('#wikipedia-article a');
            wikiAnchor.setAttribute('href', wikiUrl);
        });
    });
};
updateDiagram('Solar_System');
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handlePauseAnimation = (event) => {
    document
        .querySelectorAll('.planet-orbit, .planet-orbit li, #saturn .rings-position')
        .forEach((item) => {
        item.classList.toggle('paused');
    });
    const target = event.target;
    // switch-on
    if (target.classList.contains('activated')) {
        target.classList.remove('activated');
        target.innerHTML = 'Pause animation';
    }
    else {
        // switch-off
        target.classList.add('activated');
        target.innerHTML = 'Play animation';
    }
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleHideAnimation = (event) => {
    const centerCanvas = document.querySelector('#center-canvas');
    centerCanvas.classList.toggle('hide');
    const wikiParent = document.querySelector('#wikipedia-article');
    const target = event.target;
    // switch-on
    if (target.classList.contains('activated')) {
        target.classList.remove('activated');
        target.innerHTML = 'Hide animation';
        wikiParent.classList.remove('bright-text');
    }
    else {
        // switch-off
        target.classList.add('activated');
        target.innerHTML = 'Show animation';
        wikiParent.classList.add('bright-text');
    }
};
