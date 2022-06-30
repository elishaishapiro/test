window.addEventListener("load", (e) => {
  let data = JSON.parse(sessionStorage.getItem("data"));
  startCount();

  const shotsHigh = document.getElementById("tele-shots-high");
  const shotsHighCount = document.getElementById("tele-shots-high-count");
  const shotsLow = document.getElementById("tele-shots-low");
  const shotsLowCount = document.getElementById("tele-shots-low-count");
  const shotsMissed = document.getElementById("tele-shots-miss");
  const shotsMissedCount = document.getElementById("tele-shots-miss-count");
  const undoBut = document.getElementById("tele-undo");
  const advanceBut = document.getElementById("tele-advance");

  shotsHigh.onclick = function (e) {
    shotMadeHigh(1);
  };

  shotsLow.onclick = function (e) {
    shotMadeLow(1);
  };

  shotsMissed.onclick = function (e) {
    shotMissed(1);
  };

  undoBut.onclick = function (e) {
    undo();
  };

  advanceBut.onclick = function (e) {
    advance();
  };

  document.onkeydown = function (e) {
    e = e || window.event;
    let key = e.key;
    if (key === "h" || key === "H") {
      shotMadeHigh(1);
    } else if (key === "l" || key === "L") {
      shotMadeLow(1);
    } else if (key === "m" || key === "M") {
      shotMissed(1);
    } else if (key === "u" || key === "U") {
      undo();
    } else if (key === "a" || key === "A") {
      advance();
    }
  };

  function shotMadeHigh(num) {
    data.shotsMadeHighTele = data.shotsMadeHighTele + num;
    shotsHighCount.innerHTML = data.shotsMadeHighTele;

    if (num >= 0) {
      data.events = [...data.events, [data.matchTime, "shotMadeHighTele"]];
    }
  }

  function shotMadeLow(num) {
    data.shotsMadeLowTele = data.shotsMadeLowTele + num;
    shotsLowCount.innerHTML = data.shotsMadeLowTele;

    if (num >= 0) {
      data.events = [...data.events, [data.matchTime, "shotMadeLowTele"]];
    }
  }

  function shotMissed(num) {
    data.shotsMissTele = data.shotsMissTele + num;
    shotsMissedCount.innerHTML = data.shotsMissTele;

    if (num >= 0) {
      data.events = [...data.events, [data.matchTime, "shotMissTele"]];
    }
  }

  function undo() {
    if (data.events.length !== 0) {
      switch (data.events[data.events.length - 1][1]) {
        case "shotMadeHighTele":
          shotMadeHigh(-1);
          data.events = data.events.slice(0, -1);
          break;
        case "shotMadeLowTele":
          shotMadeLow(-1);
          data.events = data.events.slice(0, -1);
          break;
        case "shotMissTele":
          shotMissed(-1);
          data.events = data.events.slice(0, -1);
          break;
        case "teleop":
          data.events = data.events.slice(0, -1);
          window.location.href = "../html/auto.html";
          sessionStorage.setItem("data", JSON.stringify(data));
      }
    }
  }

  function advance() {
    data.startClimb = data.matchTime;
    data.events = [...data.events, [data.matchTime, "climb"]];
    window.location.href = "../html/endgame.html";
    sessionStorage.setItem("data", JSON.stringify(data));
  }

  function startCount() {
    setInterval(() => {
      if (data.matchTime < 150) {
        data.matchTime += 1;
      }
    }, 1000);
  }
});
