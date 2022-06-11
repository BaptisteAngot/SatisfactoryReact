const functions = require('../src/utils/parsing.js')

describe('ParseStringToJson',() => {
    test('parsing', () => {
        // codeCategorie:888:TABLE =(ASSEMBLAGE)[PIED*4]+[BOIS*1];
        let inputArticle = functions.parseStringToJson("codeCategorie:888 =(ASSEMBLAGE)[PIED*4]+[BOIS*1];");
        let jsonArticle = {
            codeArticle: "888",
            codeCategorie: "codeCategorie",
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
        expect(inputArticle.data.codeArticle).toBe(jsonArticle.codeArticle);
        expect(inputArticle.data.codeCategorie).toBe(jsonArticle.codeCategorie);
        expect(inputArticle.data.codeOperation).toBe(jsonArticle.codeOperation);
        expect(inputArticle.data.articles[0].codeArticle).toBe(jsonArticle.articles[0].codeArticle);
        expect(inputArticle.data.articles[0].quantite).toBe(jsonArticle.articles[0].quantite);
        expect(inputArticle.data.articles[1].codeArticle).toBe(jsonArticle.articles[1].codeArticle);
        expect(inputArticle.data.articles[1].quantite).toBe(jsonArticle.articles[1].quantite);
    });

    test('2 elements par recette', () => {
        // codeCategorie:888:TABLE =(ASSEMBLAGE)[PIED*4]+[BOIS*1];
        let inputArticle1 = functions.parseStringToJson("codeCategorie:888 =(ASSEMBLAGE)[PIED*4]+[BOIS*1]+[BOIS*1];");
        expect(inputArticle1.error).toBe("pas plus de 2 elements par recette");
    });

    test('erreur de syntax: (CodeOpération)', () => {
        let inputArticle2 = functions.parseStringToJson("codeCategorie:888 =(ASSEMBLAGE[PIED*4][BOIS*1];");
        expect(inputArticle2.error).toBe("erreur de syntax: (CodeOpération)");
    });

    test('erreur de syntax: [codeActicle*qty]', () => {
        let inputArticle3 = functions.parseStringToJson("codeCategorie:888=(ASSEMBLAGE)PIED*4BOIS*1;");
        expect(inputArticle3.error).toBe("erreur de syntax: [codeActicle*qty]");
    });

    test('(empty) erreur de syntax: [codeActicle*qty]', () => {
        let inputArticle3 = functions.parseStringToJson("codeCategorie:888 =(ASSEMBLAGE)");
        expect(inputArticle3.error).toBe("erreur de syntax: [codeActicle*qty]");
    });

    test('erreur de syntax: codeCategorie:CODEARTICLE', () => {
        let inputArticle3 = functions.parseStringToJson("codeCategorie888 =(ASSEMBLAGE[PIED*4][BOIS*1];");
        expect(inputArticle3.error).toBe("erreur de syntax: CODECATEGORIE:CODEARTICLE");
    });

    test('erreur de syntax: \'=\'', () => {
        let inputArticle3 = functions.parseStringToJson("codeCategorie:888 (ASSEMBLAGE[PIED*4][BOIS*1];");
        expect(inputArticle3.error).toBe("erreur de syntax: '='");
    });
})


/*
* {
            codeArticle: "888",
            codeCategorie: "codeCategorie",
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
        // codeCategorie:888:TABLE =(ASSEMBLAGE)[PIED*4]+[BOIS*1];
        let inputArticle = functions.parseJsonToString({
            codeArticle: "888",
            codeCategorie: "codeCategorie",
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
        let jsonArticle = "codeCategorie:888=(ASSEMBLAGE)[PIED*4][BOIS*1];";
        expect(inputArticle).toBe(jsonArticle);
    });
    test('attribut : codeArticle, introuvable', () => {
        // codeCategorie:888:TABLE =(ASSEMBLAGE)[PIED*4]+[BOIS*1];
        let inputArticle = functions.parseJsonToString({
            codeCategorie: "codeCategorie",
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
    test('attribut : codeCategorie, introuvable', () => {
        // codeCategorie:888:TABLE =(ASSEMBLAGE)[PIED*4]+[BOIS*1];
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
        expect(inputArticle).toBe("attribut : codeCategorie, introuvable");
    });
    test('attribut : codeOperation, introuvable', () => {
        // codeCategorie:888:TABLE =(ASSEMBLAGE)[PIED*4]+[BOIS*1];
        let inputArticle = functions.parseJsonToString({
            codeArticle: "888",
            codeCategorie: "codeCategorie",
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
        // codeCategorie:888:TABLE =(ASSEMBLAGE)[PIED*4]+[BOIS*1];
        let inputArticle = functions.parseJsonToString({
            codeArticle: "888",
            codeCategorie: "codeCategorie",
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
        // codeCategorie:888:TABLE =(ASSEMBLAGE)[PIED*4]+[BOIS*1];
        let inputArticle = functions.parseJsonToString({
            codeArticle: "888",
            codeCategorie: "codeCategorie",
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
        // codeCategorie:888:TABLE =(ASSEMBLAGE)[PIED*4]+[BOIS*1];
        let inputArticle = functions.parseJsonToString({
            codeArticle: "888",
            codeCategorie: "codeCategorie",
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

