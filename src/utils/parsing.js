const functions = {
    //CODECATEGORY:888:TABLE=(ASSEMBLAGE)[PIED*4][BOIS*1];
    parseStringToJson: (input) => {
        input = input.replace(" ", "");
        const regExpForOp = /\((.*?)\)/
        const regExpForArt = /\[(.*?)\]/g;
        let splitEqual = input.split("=");
        if(splitEqual.length !== 2) {
            return "erreur de syntax: '='";
        }
        let metadata = splitEqual[0].split(":");
        if(metadata.length !== 2) {
            return "erreur de syntax: CODECATEGORIE:CODEARTICLE";
        }
        let recette = splitEqual[1];
        let op = recette.match(regExpForOp)
        if(!op) {
            return "erreur de syntax: (CodeOpération)"
        }
        let listeMatch = recette.match(regExpForArt);
        let articlesQt = []
        try {
            listeMatch.map(x => {
                x = x.replace("[","");
                x = x.replace("]","");
                let itemArray = x.split("*");
                articlesQt.push({
                    codeArticle: itemArray[0],
                    quantite: parseInt(itemArray[1])
                })
            });
        }catch (e){
            return "erreur de syntax: [codeActicle*qty]";
        }
        if(listeMatch.length > 2) {
            return "pas plus de 2 elements par recette";
        }
        return {
            codeArticle: metadata[1],
            codeCategorie: metadata[0],
            codeOperation: op[1],
            articles: articlesQt
        };
    },
    parseJsonToString: (json) => {
        if (!json.codeArticle){ return "attribut : codeArticle, introuvable"; }
        if (!json.codeCategorie){ return "attribut : codeCategorie, introuvable"; }
        if (!json.codeOperation){ return "attribut : codeOperation, introuvable"; }
        if (!json.articles){ return "attribut : articles, introuvable"; }
        if(json.articles.length > 2){ return "plus de 2 elements"; }
        // CODECATEGORY:888
        let metaData = json.codeCategorie + ":" + json.codeArticle;
        //(ASSEMBLAGE)
        let op = "("+json.codeOperation+")";
        //[PIED*4]+[BOIS*1]
        let articles = "";
        let error;
        json.articles.forEach(item => {
            if (!item.codeArticle || !item.quantite){
                error = true;
            }
            articles+="["+item.codeArticle+"*"+item.quantite.toString()+"]";
        });
        if (error) {
            return "les attributs dans la list d'articles incorrect ( ex: articles:[{codeArticle:\"codeArticle\",quantite:10}] )";
        }
        // CODECATEGORY:888:TABLE=(ASSEMBLAGE)[PIED*4][BOIS*1];
        return metaData+"="+op+articles+";";
    },
}

module.exports = functions
