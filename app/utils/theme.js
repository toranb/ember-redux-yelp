export default function(themeName) {
  let themeUrl = `/themes/${themeName}.css`;
  let themeLink = document.createElement('link');
  themeLink.href = themeUrl;
  themeLink.rel = 'stylesheet';
  themeLink.type = 'text/css';
  document.body.appendChild(themeLink);
}
