var currentlyOpenChallenge = 0;

function saveChallengeData(obj) {
    localStorage.setItem("RRChallData", JSON.stringify(obj));
}
function getChallengeData() {
    return JSON.parse(localStorage.getItem("RRChallData"));
}
var challObj = getChallengeData() || {};

var classicChallenges = [
    "Complete the Quest for the Golden Trophy quest.",
    "Complete the Curse of the Crimson Cauldron quest.",
    "Complete the Rise of Jumbotron quest.",
    "Complete the Isle of Lost Skulls quest.",
    "Complete the Crescendo of the Blood Moon quest.",
    "Eliminate 5 opponents in Rec Royale.",
    "Get 5 3-hit streaks in Paintball.",
    "Get 5 3-hit streaks in Laser Tag.",
    "Complete 10 games of Dodgeball.",
    "Complete 10 games of Paintball.",
    "Complete 10 games of Laser Tag.",
    "Complete 5 games of Rec Rally.",
    "Complete a game of Disc Golf under par.",
];

var easyChallenges = [
    "Make a 12 foot or more basketball shot in the Rec Center.",
    "Complete the Quest for the Golden Trophy quest.",
    "Win 3 games of Paintball.",
    "Win 3 games of Laser Tag.",
    "Win 5 games of Dodgeball.",
    "Win 5 games of Showdown.",
    "Win a game of Rec Rally.",
    "Play 5 games of Paintball.",
    "Play 5 games of Laser Tag.",
    "Play 8 games of Dodgeball.",
    "Play 8 games of Showdown.",
    "Play 3 games of Rec Rally.",
    "Reach Bridge in the Rise of Jumbotron quest.",
    "Reach Bog in the Curse of the Crimson Cauldron quest.",
    "Reach Gibbet Jungle in the Isle of Lost Skulls quest.",
    "Reach Grand Hall in the Crescendo of the Blood Moon quest.",
    "Bonk 2 players as Bonky in Make it to Midnight.",
    "Fix 1 generator as a survivor in Make it to Midnight.",
    "Eliminate 3 opponents in Rec Royale.",
    "Complete Stunt Runner with a B rank.",
    "Win 5 games of Paddleball.",
    "Score 30 points total in Paddleball.",
    "Get a strike in Bowling.",
    "Complete a hole of Disc Golf under par.",
    "Score a goal in Soccer.",
    "Win a game of Soccer."
];

var mediumChallenges = [
    "Complete the Rise of Jumbotron quest.",
    "Complete the Curse of the Crimson Cauldron quest.",
    "Complete the Isle of Lost Skulls quest.",
    "Complete the Crescendo of the Blood Moon quest.",
    "Eliminate 10 opponents in Rec Royale.",
    "Complete the Quest for the Golden Trophy quest with 3 outs or less.",
    "Get the most hits in a team of 4 in a game of Paintball.",
    "Get the most hits in a team of 4 in a game of Laser Tag.",
    "Get the most hits in a team of 3 in a game of Dodgeball.",
    "Get the most hits in a team of 3 in a game of Showdown.",
    "Get 5 3-hit streaks in Paintball.",
    "Get 5 3-hit streaks in Laser Tag.",
    "Get 5 3-hit streaks in Showdown.",
    "Kill 25 enemies in the Quest for the Golen Trophy quest.",
    "Kill 25 enemies in the Rise of Jumbotron quest.",
    "Kill 25 enemies in the Curse of the Crimson Cauldron quest.",
    "Kill 25 enemies in the Isle of Lost Skulls quest.",
    "Kill 25 enemies in the Crescendo of the Blood Moon quest.",
    "Score 65 points total in Paddleball.",
    "Win 10 games of Paddleball.",
    "Complete Stunt Runner with an A rank.",
    "Get 3 strikes in Bowling.",
    "Complete a game of Disc Golf with a score of +2 or less.",
    "Win 5 games of Soccer.",
    "Score 5 goals in Soccer."
];

var hardChallenges = [
    "Lap a player in Rec Rally.",
    "Complete the Rise of Jumbotron quest with an S rank.",
    "Complete the Crescendo of the Blood Moon quest with an S+ rank.",
    "Complete the Isle of Lost Skulls quest with 1 out or less.",
    "Complete the Curse of the Crimson Cauldron with 1 out or less.",
    "Complete the Quest for the Golden Trophy in 8 minutes or less.",
    "Complete the Quest for the Golden Trophy alone.",
    "Complete the Rise of Jumbotron quest with everyone using teleport.",
    "Eliminate 5 opponents in one game of Rec Royale.",
    "Get the most hits in 3 games of Paintball.",
    "Get the most hits in 3 games of Laser Tag.",
    "Get the most hits in 5 games of Dodgeball.",
    "Get 3 5-hit streaks in Paintball.",
    "Get 3 5-hit streaks in Laser Tag.",
    "Get 3 5-hit streaks in Showdown.",
    "Get a 10-hit streak in Paintball.",
    "Get a 10-hit streak in Laser Tag.",
    "Get a 10-hit streak in Showdown.",
    "Get 10 hits in a single game of Showdown.",
    "Complete a game of Disc Golf under par.",
    "Kill 100 enemies in the Quest for the Golden Trophy quest.",
    "Kill 100 enemies in the Rise of Jumbotron quest.",
    "Kill 100 enemies in the Curse of the Crimson Cauldron quest.",
    "Kill 100 enemies in the Isle of Lost Skulls quest.",
    "Kill 100 enemies in the Crescendo of the Blood Moon quest.",
    "Win a game of Paddleball in under a minute.",
    "Complete Stunt Runner with an S rank.",
    "Get 10 strikes in Bowling.",
    "Get 3 strikes in a row in Bowling.",
    "Score 15 goals in Soccer."
];

var vrOnly = [easyChallenges[20], easyChallenges[21], mediumChallenges[18], mediumChallenges[19], hardChallenges[7], hardChallenges[25]]

var timeSinceFirst = Date.now() - 1732744800000;
var week = Math.floor(timeSinceFirst/604800000);
console.log(week);

// Pseudo-random generator
function Marsaglia(i1, i2) {
    // from http://www.math.uni-bielefeld.de/~sillke/ALGORITHMS/random/marsaglia-c
    var z=i1 || 362436069, w= i2 || 521288629;
    var nextInt = function() {
        z=(36969*(z&65535)+(z>>>16)) & 0xFFFFFFFF;
        w=(18000*(w&65535)+(w>>>16)) & 0xFFFFFFFF;
        return (((z&0xFFFF)<<16) | (w&0xFFFF)) & 0xFFFFFFFF;
    };

    this.nextDouble = function() {
        var i = nextInt() / 4294967296;
        return i < 0 ? 1 + i : i;
    };
    this.nextInt = nextInt;
}
Marsaglia.createRandomized = function() {
    var now = new Date();
    return new Marsaglia((now / 60000) & 0xFFFFFFFF, now & 0xFFFFFFFF);
};
var random = new Marsaglia(week);

function randomFromArray(arr) {
    return arr[Math.floor(random.nextDouble()*arr.length)];
}

/** Picks a random amt challenges.
 * @param {Array} arr Array listing all challenges
 * @param {integer} amt Amount of challenges to pick
 * @returns {Array} Array containing amt challenges from arr
 */
function pickChallenges(arr, amt) {
    var isSafe = true;
    if (amt > arr.length) {
        throw "Cannot get more challenges than possible!";
    }
    var newArr = [];
    for (var i = 0; i < amt; i ++) {
        var candidate = randomFromArray(arr);
        while (newArr.includes(candidate)) {
            candidate = randomFromArray(arr);
        }
        newArr.push(candidate);
    }
    return newArr;
}

function addChallenge(txt, localStId) {
    var newEl = document.createElement("div");
    newEl.classList.add("challenge");
    newEl.innerHTML = "<span>" + txt + "</span>";
    if (challObj[localStId]) {
        newEl.classList.add("completed");
    }
    newEl.oncontextmenu = function(c) {
        if (c.target.classList.contains("challenge")) {
            c.target.classList.remove("completed");
        } else {
            c.target.parentElement.classList.remove("completed");
        }
        delete challObj[localStId];
        saveChallengeData(challObj);
        return false;
    };
    newEl.addEventListener("click", function(c) {
        if (c.target.classList.contains("challenge")) {
            c.target.classList.add("completed");
        } else {
            c.target.parentElement.classList.add("completed");
        }
        challObj[localStId] = true;
        saveChallengeData(challObj);
    })
    document.getElementById("challenge-container").appendChild(newEl);
}

function displayChallengeArray(arr) {
    for (var i = 0; i < arr.length; i ++) {
        var localStId = week;
        switch(arr) {
            case challengeList.classic:
                localStId += "c";
            break;
            case challengeList.easy:
                localStId += "e";
            break;
            case challengeList.medium:
                localStId += "m";
            break;
            case challengeList.hard:
                localStId += "h";
            break;
        }
        localStId += i;

        addChallenge(arr[i], localStId);
    }
}

var challengeList = {
    classic: pickChallenges(classicChallenges, 5),
    easy: pickChallenges(easyChallenges, 5),
    medium: pickChallenges(mediumChallenges, 5),
    hard: pickChallenges(hardChallenges, 5)
}

displayChallengeArray(challengeList.classic);

var timeSinceLast = timeSinceFirst%604800000;
timeUntilNext = 604800000 - timeSinceLast;
function formatTime(millis) {
    var days = Math.floor(millis/86400000);
    var hours = Math.floor((millis%86400000)/3600000);
    var minutes = Math.floor((millis%3600000)/60000);
    var seconds = Math.floor((millis%60000)/1000);
    var timeStr = "";
    if (days < 10) {
        timeStr += "0" + days;
    } else {
        timeStr += days;
    }

    if (hours < 10) {
        timeStr += ":0" + hours;
    } else {
        timeStr += ":" + hours;
    }

    if (minutes < 10) {
        timeStr += ":0" + minutes;
    } else {
        timeStr += ":" + minutes;
    }

    if (seconds < 10) {
        timeStr += ":0" + seconds;
    } else {
        timeStr += ":" + seconds;
    }

    return timeStr;
}
document.getElementById("challenge-timer").innerHTML = formatTime(timeUntilNext);
var prevWeek = week;
window.setInterval(function() {
    timeSinceFirst = Date.now() - 1732744800000;
    prevWeek = week;
    week = Math.floor(timeSinceFirst/604800000);
    timeSinceLast = timeSinceFirst%604800000;
    timeUntilNext = 604800000 - timeSinceLast;
    document.getElementById("challenge-timer").innerHTML = formatTime(timeUntilNext);

    if (prevWeek !== week) {
        console.log("new week");
        random = new Marsaglia(week);
        challengeList = {
            classic: pickChallenges(classicChallenges, 5),
            easy: pickChallenges(easyChallenges, 5),
            medium: pickChallenges(mediumChallenges, 5),
            hard: pickChallenges(hardChallenges, 5)
        };
        console.log(challengeList);
        document.getElementById("challenge-container").innerHTML = "";
        displayChallengeArray(challengeList[document.getElementsByClassName("selected")[0].classList[1]]);
    }
}, 1000);

var difficultyButtons = document.getElementsByClassName("difficulty_button");
for (var i = 0; i < difficultyButtons.length; i ++) {
    difficultyButtons[i].addEventListener("click", function(c) {
        document.getElementsByClassName("selected")[0].classList.add("unselected");
        document.getElementsByClassName("selected")[0].classList.remove("selected");

        c.target.classList.add("selected");
        c.target.classList.remove("unselected");
        
        document.getElementById("challenge-container").innerHTML = "";
        displayChallengeArray(challengeList[c.target.classList[1]]);
    })
}