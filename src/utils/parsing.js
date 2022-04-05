const functions = {
    //CODECATEGORY:888:TABLE=(ASSEMBLAGE)[PIED*4][BOIS*1][BOIS*1];
    parseInputToJson: (input) => {
        input = input.replace(" ","");
        const regExpForOp = /\(([^)]+)\)/;
        // TODO
        // const regExpForArticles = /\[(.*?)\]/;

        let splitEqual = input.split("=");
        let metadata = splitEqual[0].split(":");
        let recette = splitEqual[1];
        let op = regExpForOp.exec(recette)[1];
        //let articles = regExpForArticles.exec(recette);
        //console.log(articles);
        return {
            codeArticle: metadata[1],
            codeCategory: metadata[0],
            codeOperation: op,
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
    }
}

module.exports = functions