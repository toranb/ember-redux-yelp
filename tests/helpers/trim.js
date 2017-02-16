export default function(text, tight) {
  let spacing = tight ? '' : ' ';
  return text.replace(/\s\s+/g, spacing).trim();
}
