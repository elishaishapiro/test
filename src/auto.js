window.addEventListener("load", (e) => {
  let data = JSON.parse(sessionStorage.getItem("data"));
  startCount();

  const shotsHigh = document.getElementById("auto-shots-high");
  const shotsHighCount = document.getElementById("auto-shots-high-count");
  const shotsLow = document.getElementById("auto-shots-low");
  const shotsLowCount = document.getElementById("auto-shots-low-count");
  const shotsMissed = document.getElementById("auto-shots-miss");
  const shotsMissedCount = document.getElementById("auto-shots-miss-count");
  const taxiBut = document.getElementById("auto-taxi");
  const undoBut = document.getElementById("auto-undo");
  const advanceBut = document.getElementById("auto-advance");

  shotsHigh.onclick = function (e) {
    shotMadeHigh(1);
  };

  shotsLow.onclick = function (e) {
    shotMadeLow(1);
  };

  shotsMissed.onclick = function (e) {
    shotMissed(1);
  };

  taxiBut.onclick = function (e) {
    taxi();
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
    } else if (key === "t" || key === "T") {
      taxi();
    } else if (key === "u" || key === "U") {
      undo();
    } else if (key === "a" || key === "A") {
      advance();
    } else if (key === "P" || key === "p") {
      console.log(data.events);
    }
  };

  function shotMadeHigh(num) {
    data.shotsMadeHighAuto = data.shotsMadeHighAuto + num;
    shotsHighCount.innerHTML = data.shotsMadeHighAuto;

    if (num >= 0) {
      data.events = [...data.events, [data.matchTime, "shotMadeHighAuto"]];
    }
  }

  function shotMadeLow(num) {
    data.shotsMadeLowAuto = data.shotsMadeLowAuto + num;
    shotsLowCount.innerHTML = data.shotsMadeLowAuto;

    if (num >= 0) {
      data.events = [...data.events, [data.matchTime, "shotMadeLowAuto"]];
    }
  }

  function shotMissed(num) {
    data.shotsMissAuto = data.shotsMissAuto + num;
    shotsMissedCount.innerHTML = data.shotsMissAuto;

    if (num >= 0) {
      data.events = [...data.events, [data.matchTime, "shotMissAuto"]];
    }
  }

  function taxi(undo) {
    data.taxi = !data.taxi;
    if (data.taxi) {
      taxiBut.style.backgroundColor = "#00ff00";
    } else {
      taxiBut.style.backgroundColor = "";
    }

    if (!undo) {
      data.events = [...data.events, [data.matchTime, "taxi"]];
    }
  }

  function undo() {
    if (data.events.length !== 0) {
      switch (data.events[data.events.length - 1][1]) {
        case "shotMadeHighAuto":
          shotMadeHigh(-1);
          data.events = data.events.slice(0, -1);
          break;
        case "shotMadeLowAuto":
          shotMadeLow(-1);
          data.events = data.events.slice(0, -1);
          break;
        case "shotMissAuto":
          shotMissed(-1);
          data.events = data.events.slice(0, -1);
          break;
        case "taxi":
          taxi(true);
          data.events = data.events.slice(0, -1);
          break;
      }
    }
  }

  function advance() {
    data.events = [...data.events, [data.matchTime, "teleop"]];
    window.location.href = "../html/teleop.html";
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
