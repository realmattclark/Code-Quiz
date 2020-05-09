function showHighscores() {
    var highScores = JSON.parse(window.localStorage.getItem("highscores"));

    highScores.sort(function(a, b) {
        return b.score - a.score;
    });

    highScores.forEach(function(score) {
        var li = createElement("li");
        li.textContent = score.initials + " - " + score.score;

        var ol = document.getElementById("highscores");
        ol.appendChild(li);
    });
}

function clearScores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
}

document.getElementById("clear").onclick = clearScores;

// final function
showHighscores();