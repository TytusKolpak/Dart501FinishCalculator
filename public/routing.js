document.addEventListener("DOMContentLoaded", () => {
  $(".pageP").show();
});

function navButtonClicked(letter) {
  $(".mainDisplay").hide();
  switch (letter) {
    case "P":
      $(".pageP").show();
      break;
    case "S":
      $(".pageS").show();
      break;
  }
}
