const functions = {
    //CODECATEGORY:888:TABLE=(ASSEMBLAGE)[PIED*4][BOIS*1][BOIS*1];
    parseInputToJson: (input) => {
        input = input.replace(" ", "");
        const regExpForOp = /\((.*?)\)/
        const regExpForArt = /\[(.*?)\]/g;
        let splitEqual = input.split("=");
        let metadata = splitEqual[0].split(":");
        let recette = splitEqual[1];
        let op = recette.match(regExpForOp)
        let listeMatch = recette.match(regExpForArt);
        let articlesQt = []
        listeMatch.forEach(x => {
            x = x.replace("[","");
            x = x.replace("]","");
            articlesQt.push(x)
        });

        return {
            codeArticle: metadata[1],
            codeCategory: metadata[0],
            codeOperation: op[1],
            articles: [
                {
                    codeArticle: articlesQt[0].split("*")[0],
                    quantite: parseInt(articlesQt[0].split("*")[1])
                },
                {
                    codeArticle: articlesQt[1].split("*")[0],
                    quantite: parseInt(articlesQt[1].split("*")[1])
                }
            ]
        };
    },
}

module.exports = functions
