// ---------------------------------------------------------------------- Variable declarations ----------------------------------------------------------------------
// Any possible throw
const scoreAny = [
    20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 25, // Single + bull
    40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, 50, // Double + bullseye
    60, 57, 54, 51, 48, 45, 42, 39, 36, 33, 30, 27, 24, 21, 18, 15, 12, 9, 6, 3 // Triple
];


// All possible ending throws (at a double)
const scoreDouble = [50, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2];

// Notations for the values in scoreAny
const notationsAny = [
    "20", "19", "18", "17", "16", "15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1", "25", // Single + bull
    "D20", "D19", "D18", "D17", "D16", "D15", "D14", "D13", "D12", "D11", "D10", "D9", "D8", "D7", "D6", "D5", "D4", "D3", "D2", "D1", "D25", // Double + bullseye
    "T20", "T19", "T18", "T17", "T16", "T15", "T14", "T13", "T12", "T11", "T10", "T9", "T8", "T7", "T6", "T5", "T4", "T3", "T2", "T1" // Triple
]

const notationsDouble = ["D25", "D20", "D19", "D18", "D17", "D16", "D15", "D14", "D13", "D12", "D11", "D10", "D9", "D8", "D7", "D6", "D5", "D4", "D3", "D2", "D1"]

var count, combinations, positions, outShots, targetTotalScore;

// ---------------------------------------------------------------------- Helper functions ----------------------------------------------------------------------
// Helper function to check for duplicate combinations
function clearOutputs() {
    document.getElementById("Ones").innerHTML = '';
    document.getElementById("Twos").innerHTML = '';
    document.getElementById("Threes").innerHTML = '';
    document.getElementById("ErrorMessage").innerHTML = '';
}

function findSingleThrowOut() {
    // Single throw out
    for (var o1 in scoreDouble) { // single throw
        // console.log(scoreDouble[o1],targetTotalScore);
        if (scoreDouble[o1] === targetTotalScore) {
            var p1 = scoreDouble[o1];

            if (!isDuplicateCombination(combinations, [p1])) {
                count += 1;
                combinations.push([p1]);
                positions.push([o1]);
            }
        }
    }
}

function findTwoThrowOuts() {
    for (var o1 in scoreAny) { // first throw
        for (var o2 in scoreDouble) { // second throw
            if (scoreAny[o1] + scoreDouble[o2] === targetTotalScore) {
                var p1 = scoreAny[o1];
                var p2 = scoreDouble[o2];

                if (!isDuplicateCombination(combinations, [p1, p2])) {
                    count += 1;
                    combinations.push([p1, p2]);
                    positions.push([o1, o2]);
                }
            }
        }
    }
}

function findThreeThrowOuts() {
    for (var o1 in scoreAny) { // first throw
        for (var o2 in scoreAny) { // second throw
            for (var o3 in scoreDouble) { // third throw
                if (scoreAny[o1] + scoreAny[o2] + scoreDouble[o3] === targetTotalScore) {
                    var p1 = scoreAny[o1];
                    var p2 = scoreAny[o2];
                    var p3 = scoreDouble[o3];

                    if (!isDuplicateCombination(combinations, [p1, p2, p3])) {
                        count += 1;
                        combinations.push([p1, p2, p3]);
                        positions.push([o1, o2, o3]);
                    }
                }
            }
        }
    }
}

function isDuplicateCombination(combinations, newCombination) {
    const sortedCombination = newCombination.slice().sort();

    for (var i = 0; i < combinations.length; i++) {
        const combination = combinations[i];
        const sortedExistingCombination = combination.slice().sort();

        if (sortedExistingCombination.every((value, index) => value === sortedCombination[index])) {
            return true; // Combination already exists
        }
    }
    return false; // Combination is unique
}

function displayNoFoundOutShotsError() {
    console.log("cant score that");
    var errorElement = document.createElement("h3");
    const errorMessage = 'Cant score that';
    errorElement.textContent = errorMessage;
    document.getElementById("ErrorMessage").appendChild(errorElement);
}

function createOutShotNotation() {
    // Create an array with possible outshots in alphanumeric notation
    for (const bigElement in positions) {
        var singleOutShotsSet = []
        for (const smallElement in positions[bigElement]) {
            if (smallElement != positions[bigElement].length - 1) {
                singleOutShotsSet.push(notationsAny[positions[bigElement][smallElement]]) //in scoreAny
            } else {
                singleOutShotsSet.push(notationsDouble[positions[bigElement][smallElement]]) //in scoreDouble
            }
        }
        outShots.push(singleOutShotsSet)
    }
}

function createAndDisplayDivForEveryOutShot() {
    // Container for results
    var containerForOnes = document.getElementById("Ones");
    var containerForTwos = document.getElementById("Twos");
    var containerForThrees = document.getElementById("Threes");

    // Object to store subarrays with the same starting number
    var subarraysByStartingNumber = {};

    for (var i = 0; i < outShots.length; i++) {
        // Extract a single outShot sequence from array of all possible outShot sequences
        var subarray = outShots[i];

        // Get the starting number of the subarray
        var startingNumber = subarray[0];

        // Create a new <div> element and assign it to a variable
        var myDiv = document.createElement("div");
        myDiv.textContent = subarray.join(", ");

        const lastShot = combinations[i][combinations[i].length - 1];

        // Check if it is a good shot
        if (lastShot % 8 === 0) {
            myDiv.classList.add('goodShot');
        }

        // Append the <div> to the corresponding container based on subarray length and starting number
        if (subarray.length === 3) {
            if (!subarraysByStartingNumber[startingNumber]) {
                // Create a new <div> for the starting number if it doesn't exist
                subarraysByStartingNumber[startingNumber] = document.createElement("div");
                containerForThrees.appendChild(subarraysByStartingNumber[startingNumber]);
            }

            // Check if the current div has the class "goodShot"
            if (myDiv.classList.contains('goodShot')) {
                // Insert the current div at the beginning of the container
                subarraysByStartingNumber[startingNumber].insertBefore(myDiv, subarraysByStartingNumber[startingNumber].firstChild);
            } else {
                // Append the current div to the end of the container
                subarraysByStartingNumber[startingNumber].appendChild(myDiv);
            }
        } else if (subarray.length === 1) {
            containerForOnes.appendChild(myDiv);
        } else if (subarray.length === 2) {
            containerForTwos.appendChild(myDiv);
        }
    }

}

function orderOutShots(divArray) {
    //This function separates good shots from the bad shots and places the good ones at the beginning (they are also marked as such)
    for (const index in divArray) {
        // Rearrange the out shots so that the best are in the beginning
        // Select them
        var parentDiv = document.getElementById(divArray[index]);
        var goodShots = parentDiv.getElementsByClassName("goodShot");

        // Create a document fragment to hold the removed divs
        var fragment = document.createDocumentFragment();

        // Move the divs to the document fragment
        while (goodShots.length) {
            fragment.appendChild(goodShots[0]);
        }

        // Insert the fragment at the beginning of the parent div
        parentDiv.insertBefore(fragment, parentDiv.firstChild);
    }
}

function processKey(event) {
    console.log("ok");
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default form submission
        processValue(); // Call the function when Enter is pressed
    } else if (event.key === "c") {
        document.getElementById("Ones").innerHTML = '';
        document.getElementById("Twos").innerHTML = '';
        document.getElementById("Threes").innerHTML = '';
        document.getElementById("Error").innerHTML = '';
    } else {
        console.log("Key has no action bound to it.");
    }
}

// ---------------------------------------------------------------------- Main function ----------------------------------------------------------------------
function processValue() {
    clearOutputs()

    count = 0, combinations = [], positions = [], outShots = [];
    targetTotalScore = parseInt(document.getElementById("numericInput").value);

    findSingleThrowOut()
    findTwoThrowOuts()
    findThreeThrowOuts()

    // Now we have table with original int values: combinations
    // and table with positions of these values corresponding to their alphanumeric translation: positions

    console.log("I find", count, "possible shot combinations to score:", targetTotalScore);
    if (count === 0) {
        displayNoFoundOutShotsError()
    } else {
        createOutShotNotation()
        //Now we have table with alphanumeric translations: outShots
    }

    // Display results
    createAndDisplayDivForEveryOutShot()

    // Order the results so that the good shots are in the beginning (can add ["Twos", "Threes"] but it's depreciated)
    orderOutShots(["Twos"])
}

// TODO: put outShots with two throws into the div for tripe throw outShots (will look neater)
