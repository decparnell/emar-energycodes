export function getDistinctValuesSource(array) {
    var distinct = [];
    const uniqueValues = [...new Set(array.map(item => item.SourceName))];

    for (var i = 0; i < uniqueValues.length; i++) {
        const value = uniqueValues[i];
        if (value != null) {
            distinct.push({ sourceNameTitle: value, sourceNameValue: value });
        }
    }
    
    return distinct;
}

export function getDistinctValuesTarget(array) {
    var distinct = [];
    const uniqueValues = [...new Set(array.map(item => item.TargetName))];

    for (var i = 0; i < uniqueValues.length; i++) {
        const value = uniqueValues[i];
        if (value != null) {
            distinct.push({ targetNameTitle: value, targetNameValue: value });
        }
    }
    
    return distinct;
}