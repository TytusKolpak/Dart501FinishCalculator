var displayMessages = [];
var inputValue = 0,
  shotsTotal = 0,
  totalScore = 0,
  averageScore = 0;

function numPadClicked(value) {
  var num = parseInt(value);

  if (!isNaN(num)) {
    inputValue = inputValue * 10 + num;
  } else {
    if (value === "ok") {
      shotsTotal += 3;
      totalScore += inputValue;
      averageScore = totalScore / (shotsTotal / 3);

      displayMessages[0] = "Last score: " + inputValue;
      displayMessages[1] = "Shots total: " + shotsTotal;
      displayMessages[2] = "Average score: " + averageScore;

      var displayString = displayMessages.join("<br>");

      $(".messageToPlayer").html(displayString);

      inputValue = 0;
    } else if (value === "del") {
      inputValue = Math.floor(inputValue / 10);
    }
  }
  $(".inputValue").html("Current score: " + inputValue);
}
