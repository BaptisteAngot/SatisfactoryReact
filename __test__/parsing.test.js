const functions = require('../src/utils/parsing.js')

test('parsing', () => {
    // CODECATEGORY:888:TABLE =(ASSEMBLAGE)[PIED*4]+[BOIS*1];
    let inputArticle = functions.parseInputToJson("CODECATEGORY:888:TABLE =(ASSEMBLAGE)[PIED*4]+[BOIS*1];");
    let jsonArticle = {
        codeArticle: "testCodeArticle",
        codeCategory: "testCodeCategory",
        codeOperation: "testCodeOperation",
        articles: [
            {
                codeArticle: "testCodeArticle1",
                quantite: 10
            },
            {
                codeArticle: "testCodeArticle2",
                quantite: 12
            }
        ]
    };
    expect(inputArticle.codeArticle).toBe(jsonArticle.codeArticle);
    expect(inputArticle.codeCategory).toBe(jsonArticle.codeCategory);
    expect(inputArticle.codeOperation).toBe(jsonArticle.codeOperation);
    expect(inputArticle.articles[0].codeArticle).toBe(jsonArticle.articles[0].codeArticle);
    expect(inputArticle.articles[0].quantite).toBe(jsonArticle.articles[0].quantite);
    expect(inputArticle.articles[1].codeArticle).toBe(jsonArticle.articles[1].codeArticle);
    expect(inputArticle.articles[1].quantite).toBe(jsonArticle.articles[1].quantite);
});