export function getDistinctValuesSource(array) {
  const distinct = [];
  for (var i = 0; i < array.length; i++) {
    const value = array[i].SourceName;
    if (distinct.indexOf(value) == -1) {
      distinct.push(value);
    }
  }
  return distinct;
}

export function getDistinctValuesTarget(array) {
  var distinct = [];
  for (var i = 0; i < array.length; i++) {
    const value = array[i].TargetName;
    if (distinct.indexOf(value) == -1) {
      distinct.push(value);
    }
  }
  return distinct;
}
