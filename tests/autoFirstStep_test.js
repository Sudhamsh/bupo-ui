Feature('autoFirstStep');

Scenario('test something', (I) => {
    I.amOnPage('http://localhost:3000/auto');
    I.see('Basic Information');
});
