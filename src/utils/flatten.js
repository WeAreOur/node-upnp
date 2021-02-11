module.exports = function flatten(arr) {
    const isArray = Array.isArray(arr);
    
    if (isArray) {
        return arr.reduce((sum, each) => {
            return sum.concat(flatten(each));
        }, []);
    }
    
    return [arr];
};
