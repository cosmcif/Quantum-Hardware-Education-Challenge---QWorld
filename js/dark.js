let darkColors = {
  "--color-accent": "#F0571D",
  "--color-secondary": "#F0A266",
  "--color-text": "#fff1d4",
  "--color-bg": "#171717ff",
  "--filter-invert": "100%"
}
let lightColors = {
  "--color-accent": "#BA181B",
  "--color-secondary": "#D65551",
  "--color-text": "#303030",
  "--color-bg": "#F1F1E6",
  "--filter-invert": "0%"
}

function changeIcon(isLightMode) {
  $("#darkModeIcon").attr("src", "../images/" + (isLightMode ? "darkmode" : "lightmode") + ".svg");
}

function changeColors(isLightMode) {
  Object.entries(isLightMode ? lightColors : darkColors).forEach(([k, v]) => {
    document.documentElement.style
      .setProperty(k, v);
  });
}

let savedLightMode = localStorage.getItem("lightMode");
let lightMode = savedLightMode != null ? JSON.parse(savedLightMode) : false;
changeColors(lightMode);
$(document).ready(function() {
  changeIcon(lightMode);
  $("#switchDarkMode").click(function(e) {
    e.preventDefault();
    lightMode = !lightMode;
    localStorage.setItem("lightMode", lightMode);

    let duration = 200;
    $("#darkModeIcon").fadeOut(duration, function() {
      changeColors(lightMode);
      changeIcon(lightMode);
      $("#darkModeIcon").fadeIn(duration);
    });
  });
});
