(() => {
  const param = new URLSearchParams(window.location.search).get("clawpilotTheme");
  const theme = param || document.documentElement.getAttribute("data-theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
})();
