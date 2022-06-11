const functions = {
    filter: (textSearch, list) => {
        if (textSearch.length < 2) {
            return list;
        }
        return list.filter(item => item.code.includes(textSearch) || item.libelle.includes(textSearch))
    },
}

module.exports = functions