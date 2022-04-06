const functions = require('../src/utils/parsing.js')

describe('ParseStringToJson',() => {
    test('parsing', () => {
        // CODECATEGORY:888:TABLE =(ASSEMBLAGE)[PIED*4]+[BOIS*1];
        let inputArticle = functions.parseStringToJson("CODECATEGORY:888 =(ASSEMBLAGE)[PIED*4]+[BOIS*1];");
        let jsonArticle = {
            codeArticle: "888",
            codeCategory: "CODECATEGORY",
            codeOperation: "ASSEMBLAGE",
            articles: [
                {
                    codeArticle: "PIED",
                    quantite: 4
                },
                {
                    codeArticle: "BOIS",
                    quantite: 1
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

    test('2 elements par recette', () => {
        // CODECATEGORY:888:TABLE =(ASSEMBLAGE)[PIED*4]+[BOIS*1];
        let inputArticle1 = functions.parseStringToJson("CODECATEGORY:888 =(ASSEMBLAGE)[PIED*4]+[BOIS*1]+[BOIS*1];");
        expect(inputArticle1).toBe("pas plus de 2 elements par recette");
    });

    test('erreur de syntax: (CodeOpération)', () => {
        let inputArticle2 = functions.parseStringToJson("CODECATEGORY:888 =(ASSEMBLAGE[PIED*4][BOIS*1];");
        expect(inputArticle2).toBe("erreur de syntax: (CodeOpération)");
    });

    test('erreur de syntax: [codeActicle*qty]', () => {
        let inputArticle3 = functions.parseStringToJson("CODECATEGORY:888=(ASSEMBLAGE)PIED*4BOIS*1;");
        expect(inputArticle3).toBe("erreur de syntax: [codeActicle*qty]");
    });

    test('(empty) erreur de syntax: [codeActicle*qty]', () => {
        let inputArticle3 = functions.parseStringToJson("CODECATEGORY:888 =(ASSEMBLAGE)");
        expect(inputArticle3).toBe("erreur de syntax: [codeActicle*qty]");
    });

    test('erreur de syntax: CODECATEGORY:CODEARTICLE', () => {
        let inputArticle3 = functions.parseStringToJson("CODECATEGORY888 =(ASSEMBLAGE[PIED*4][BOIS*1];");
        expect(inputArticle3).toBe("erreur de syntax: CODECATEGORY:CODEARTICLE");
    });

    test('erreur de syntax: \'=\'', () => {
        let inputArticle3 = functions.parseStringToJson("CODECATEGORY:888 (ASSEMBLAGE[PIED*4][BOIS*1];");
        expect(inputArticle3).toBe("erreur de syntax: '='");
    });
})


/*
* {
            codeArticle: "888",
            codeCategory: "CODECATEGORY",
            codeOperation: "ASSEMBLAGE",
            articles: [
                {
                    codeArticle: "PIED",
                    quantite: 4
                },
                {
                    codeArticle: "BOIS",
                    quantite: 1
                }
            ]
        }*/
describe('ParseJsonToString',() => {
    test('parsing', () => {
        // CODECATEGORY:888:TABLE =(ASSEMBLAGE)[PIED*4]+[BOIS*1];
        let inputArticle = functions.parseJsonToString({
            codeArticle: "888",
            codeCategory: "CODECATEGORY",
            codeOperation: "ASSEMBLAGE",
            articles: [
                {
                    codeArticle: "PIED",
                    quantite: 4
                },
                {
                    codeArticle: "BOIS",
                    quantite: 1
                }
            ]
        });
        let jsonArticle = "CODECATEGORY:888=(ASSEMBLAGE)[PIED*4][BOIS*1];";
        expect(inputArticle).toBe(jsonArticle);
    });
    test('attribut : codeArticle, introuvable', () => {
        // CODECATEGORY:888:TABLE =(ASSEMBLAGE)[PIED*4]+[BOIS*1];
        let inputArticle = functions.parseJsonToString({
            codeCategory: "CODECATEGORY",
            codeOperation: "ASSEMBLAGE",
            articles: [
                {
                    codeArticle: "PIED",
                    quantite: 4
                },
                {
                    codeArticle: "BOIS",
                    quantite: 1
                }
            ]
        });
        expect(inputArticle).toBe("attribut : codeArticle, introuvable");
    });
    test('attribut : codeCategory, introuvable', () => {
        // CODECATEGORY:888:TABLE =(ASSEMBLAGE)[PIED*4]+[BOIS*1];
        let inputArticle = functions.parseJsonToString({
            codeArticle: "888",
            codeOperation: "ASSEMBLAGE",
            articles: [
                {
                    codeArticle: "PIED",
                    quantite: 4
                },
                {
                    codeArticle: "BOIS",
                    quantite: 1
                }
            ]
        });
        expect(inputArticle).toBe("attribut : codeCategory, introuvable");
    });
    test('attribut : codeOperation, introuvable', () => {
        // CODECATEGORY:888:TABLE =(ASSEMBLAGE)[PIED*4]+[BOIS*1];
        let inputArticle = functions.parseJsonToString({
            codeArticle: "888",
            codeCategory: "CODECATEGORY",
            articles: [
                {
                    codeArticle: "PIED",
                    quantite: 4
                },
                {
                    codeArticle: "BOIS",
                    quantite: 1
                }
            ]
        });
        expect(inputArticle).toBe("attribut : codeOperation, introuvable");
    });
    test('plus de 2 elements', () => {
        // CODECATEGORY:888:TABLE =(ASSEMBLAGE)[PIED*4]+[BOIS*1];
        let inputArticle = functions.parseJsonToString({
            codeArticle: "888",
            codeCategory: "CODECATEGORY",
            codeOperation: "ASSEMBLAGE",
            articles: [
                {
                    codeArticle: "PIED",
                    quantite: 4
                },
                {
                    codeArticle: "BOIS",
                    quantite: 1
                },
                {
                    codeArticle: "BOIS",
                    quantite: 1
                }
            ]
        });
        expect(inputArticle).toBe("plus de 2 elements");
    });
    test('attribut : articles, introuvable', () => {
        // CODECATEGORY:888:TABLE =(ASSEMBLAGE)[PIED*4]+[BOIS*1];
        let inputArticle = functions.parseJsonToString({
            codeArticle: "888",
            codeCategory: "CODECATEGORY",
            codeOperation: "ASSEMBLAGE",
            artic: [
                {
                    codeArticle: "PIED",
                    quantite: 4
                },
                {
                    codeArticle: "BOIS",
                    quantite: 1
                }
            ]
        });
        expect(inputArticle).toBe("attribut : articles, introuvable");
    });
    test('les attributs dans la list d\'articles incorrect ( ex: articles:[{codeArticle:\"codeArticle\",quantite:10}] )', () => {
        // CODECATEGORY:888:TABLE =(ASSEMBLAGE)[PIED*4]+[BOIS*1];
        let inputArticle = functions.parseJsonToString({
            codeArticle: "888",
            codeCategory: "CODECATEGORY",
            codeOperation: "ASSEMBLAGE",
            articles: [
                {
                    codeArticdle: "PIED",
                    quantite: 4
                },
                {
                    codeArticle: "BOIS",
                    quantite: 1
                }
            ]
        });
        expect(inputArticle).toBe("les attributs dans la list d'articles incorrect ( ex: articles:[{codeArticle:\"codeArticle\",quantite:10}] )");
    });
})

