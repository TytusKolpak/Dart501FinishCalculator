
// Any possible throw
const scoreAny = [
    60, 57, 54, 51, 48, 45, 42, 39, 36, 33, 30, 27, 24, 21, 18, 15, 12, 9, 6, 3, // triple
    50, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2, // double + bullseye
    25, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 // single + bull
];

// All possible ending throws (at a double)
const scoreDouble = [50, 40, 38, 36, 34, 32, 30, 28, 26, 24, 22, 20, 18, 16, 14, 12, 10, 8, 6, 4, 2];

// Notations for the values in scoreAny
const notationsAny = [
    "T20", "T19", "T18", "T17", "T16", "T15", "T14", "T13", "T12", "T11", "T10", "T9", "T8", "T7", "T6", "T5", "T4", "T3", "T2", "T1", "D25", "D20", "D19", "D18", "D17", "D16", "D15", "D14", "D13", "D12", "D11", "D10", "D9", "D8", "D7", "D6", "D5", "D4", "D3", "D2", "D1", "25", "20", "19", "18", "17", "16", "15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"
]

const notationsDouble = ["D25", "D20", "D19", "D18", "D17", "D16", "D15", "D14", "D13", "D12", "D11", "D10", "D9", "D8", "D7", "D6", "D5", "D4", "D3", "D2", "D1"]


// ------------------------------ Helper functions ------------------------------
// Helper function to check for duplicate combinations
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

function processKey(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the default form submission
        processValue(); // Call the function when Enter is pressed
    } else if (event.key === "c") {
        document.getElementById("Ones").innerHTML = '';
        document.getElementById("Twos").innerHTML = '';
        document.getElementById("Threes").innerHTML = '';
        document.getElementById("Error").innerHTML = '';
    }
}

function processValue() {
    // ------------------------------ Variable declarations ----------------------------------------
    var count = 0;
    var combinations = []; // Array to store unique combinations
    var positions = [];
    var outShots = [];

    // Input
    var targetTotalScore = parseInt(document.getElementById("numericInput").value);

    console.log(targetTotalScore);
    // if (targetTotalScore=null) {
    //     document.getElementById("Ones").innerHTML = ''; 
    // }

    // ------------------------------ Operations ----------------------------------------
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

    // Three throws out
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

    // Three throws out
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

    document.getElementById("ErrorMessage").innerHTML = ''; //clear it so the massages don't pile up
    console.log(count);
    if (count === 0) {
        console.log("cant score that");
        var errorElement = document.createElement("h3");
        const errorMessage = 'Cant score that';
        errorElement.textContent = errorMessage;

        document.getElementById("ErrorMessage").appendChild(errorElement);
    } else {

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


    // ------------------------------ Output ------------------------------
    // Clear output if there was some
    document.getElementById("Ones").innerHTML = '';
    document.getElementById("Twos").innerHTML = '';
    document.getElementById("Threes").innerHTML = '';

    // Container for results
    var containerForOnes = document.getElementById("Ones")
    var containerForTwos = document.getElementById("Twos")
    var containerForThrees = document.getElementById("Threes")

    // console.log(outShots); // array of arrays of strings in form of "T20"
    // console.log(combinations); // same but as numerical values like 60, same length equivalent elements, basically the same array but not translated into user friendly notation

    for (var i = 0; i < outShots.length; i++) {
        // Extract a single outShot sequence from array of all possible outShot sequences
        var subarray = outShots[i];

        // Create a new <div> element and assign it ot a variable
        var myDiv = document.createElement("div");

        // Set the content of the <div> as the subarray
        myDiv.textContent = subarray.join(", ");

        const lastShot = combinations[i][combinations[i].length - 1]

        // Check if it is a good shot
        // Ff last shot is divisible by 8 then it means that you can miss and hit undoubled score 3 times in a row.
        // (You are left with X where X is some whole number C multiplied by 8 so X = 8C.
        // First you shoot at D4C then D2C then D1C) (target:8 D4, D2, D1)
        if (lastShot % 8 === 0) {
            myDiv.classList.add('goodShot');
        }

        if (subarray.length === 3) {
            // Append the <div> to the container
            containerForThrees.appendChild(myDiv);
        } else if (subarray.length === 1) {
            containerForOnes.appendChild(myDiv);
        } else if (subarray.length === 2) {
            containerForTwos.appendChild(myDiv);
        }
    }

    // Rearrange the out shots so that the best are in the beginning
    // Select them
    var parentDiv = document.getElementById("Twos");
    var divsToRemove = parentDiv.getElementsByClassName("goodShot");

    // Create a document fragment to hold the removed divs
    var fragment = document.createDocumentFragment();

    // Move the divs to the document fragment
    while (divsToRemove.length) {
        fragment.appendChild(divsToRemove[0]);
    }

    // Insert the fragment at the beginning of the parent div
    parentDiv.insertBefore(fragment, parentDiv.firstChild);

    // For Threes
    var parentDiv = document.getElementById("Threes");
    var divsToRemove = parentDiv.getElementsByClassName("goodShot");
    var fragment = document.createDocumentFragment();
    
    while (divsToRemove.length) {
        fragment.appendChild(divsToRemove[0]);
    }

    parentDiv.insertBefore(fragment, parentDiv.firstChild);
}


// TODO: jak dam sobie target: 36 to powinno być D18, obramówka 4,D16 a potem reszta, teraz te rzuty to niezaznaczone D16,D2. trzeba zmienić metodę pokazywania wyników