export const checkIfVariablesAreAvailable = (array) => {
  const internalErrorLog = [];

  array.map((eachItem) => {
    !eachItem.obj && internalErrorLog.push(eachItem.name);
  });
  return internalErrorLog;
};
