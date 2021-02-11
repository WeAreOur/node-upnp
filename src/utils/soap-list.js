const flatten = require('./flatten');

function toList(arr) {
    if (!arr) return [];
    return Array.isArray(arr) ? arr : [arr];
}

function getList(root, key) {
    return toList(root[key]).map(entity => entity[`${key}List`] ? [entity, getList(entity[`${key}List`], key)] : [entity]);
}

function soapList(root, key) {
    if (!root || !root[key]) return [];
    return flatten(getList(root, key));
}

function reduceSoapList(list, key) {
    return toList(list).reduce((all, entity) => {
        return all.concat(soapList(entity[`${key}List`], key));
    }, []);
}

module.exports = {
    soapList,
    reduceSoapList,
};
