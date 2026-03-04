export function capitalise(str) {
  if (!str || typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str, maxLength) {
  if (!str || typeof str !== "string") return "";
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}

export function formatSynonyms(synonyms, limit = 5) {
  if (!Array.isArray(synonyms) || synonyms.length === 0) return "";
  return synonyms.slice(0, limit).join(", ");
}
