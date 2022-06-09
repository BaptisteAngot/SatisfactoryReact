const functions = {
    filterCategories: (textSearch, listCategories) => {
        if (textSearch === '') {
            return [];
        }
        return listCategories.filter(item =>
            item.code.includes(textSearch) || item.libelle.includes(textSearch)
        )
    },
    filterArticles: (textSearch, listArticles) => {
        if (textSearch === '') {
            return [];
        }
        return listArticles.filter(item =>
            item.code.includes(textSearch) || item.libelle.includes(textSearch)
        )
    },
    filterOperations: (textSearch, listOperations) => {
        if (textSearch === '') {
            return [];
        }
        return listOperations.filter(item =>
            item.code.includes(textSearch) || item.libelle.includes(textSearch)
        )
    }
}

module.exports = functions