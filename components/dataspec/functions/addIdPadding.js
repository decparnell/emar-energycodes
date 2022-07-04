export default function addPaddingToGroupId(groupId) {
  if (/^[0-9]+$/.test(groupId)) {
    while (groupId.length < 3) {
      groupId = "0" + groupId;
    }
  }
  return groupId;
}
