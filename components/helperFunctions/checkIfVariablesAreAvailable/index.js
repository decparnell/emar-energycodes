export function checkIfVariablesAreAvailable(array) {
  //function brings back the list of not available items within the array
  const internalErrorLog = [];

  array.map((eachItem) => {
    //if item is not available via obj key pushes the name of the object into the retruning array
    !eachItem.obj && internalErrorLog.push(eachItem.name);
  });
  return internalErrorLog;
}
