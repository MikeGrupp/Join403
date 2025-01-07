function selectRandomColor() {
  const COLORS = [
    "orange",
    "pink",
    "violet_blue",
    "violet",
    "blue_cerulean ",
    "green_java ",
    "red_bittersweet ",
    "orange_tangerine ",
    "pink_helitrope ",
    "yellow_supernova ",
    "blue_ribbon ",
    "green_yellow ",
    "yellow_sun ",
    "red_coral ",
    "yellow_sin ",
    "purple_minsk",
  ];
  let randomNumber = Math.floor(Math.random() * COLORS.length);
  return COLORS[randomNumber];
}

function determineInitials(name) {
  return name
    .split(" ")
    .map((char) => {
      return char[0];
    })
    .join("");
}