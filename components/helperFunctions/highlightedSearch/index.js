function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

function formatSearchPhrase(entry, searchPhrase) {

  const regex = new RegExp(escapeRegex(searchPhrase), "ig");
  const matches = Array.from(searchPhrase.matchAll(regex));
  return searchPhrase.split(regex).flatMap((e, index) => [
    e,
    <span key={index} className={styles.color}>
      {matches[index]?.[0]}
    </span>
  ]);
} 
