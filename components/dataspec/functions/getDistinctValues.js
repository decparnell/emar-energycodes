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

export function getDistinctValuesMarketMessage(array) {
  var distinct = [];
  const distinctKeys = [];
  for (var i = 0; i < array.length; i++) {
    const value = array[i];
    const newObject = {
      EnergyMarketMessageIdentifier: value.EnergyMarketMessageIdentifier,
      DTCDcode: value.DTCDcode,
      CSSMessageIdentifier: value.CSSMessageIdentifier,
      LegacyRGMAMessageIdentifier: value.LegacyRGMAMessageIdentifier,
      LegacySPAAMessageIdentifier: value.LegacySPAAMessageIdentifier,
      UNCMessageIdentifier: value.UNCMessageIdentifier,
      Label: value.Label,
      MessageVersionNumber: value.MessageVersionNumber
    };
    if (distinctKeys.indexOf(newObject.EnergyMarketMessageIdentifier) == -1) {
      distinct.push(newObject);
      distinctKeys.push(newObject.EnergyMarketMessageIdentifier);
    }
  }
  return distinct;
}

export const getDistinctValuesSchedules = (array) => {
  const distinct = [];
  for (var i = 0; i < array.length; i++) {
    const value = array[i].documentName;
    if (distinct.indexOf(value) == -1) {
      distinct.push(value);
    }
  }
  return distinct;
};
