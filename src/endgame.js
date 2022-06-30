window.addEventListener("load", (e) => {
  let data = JSON.parse(sessionStorage.getItem("data"));
  startCount();

  const lowRungBut = document.getElementById("endgame-low-rung");
  const midRungBut = document.getElementById("endgame-mid-rung");
  const highRungBut = document.getElementById("endgame-high-rung");
  const traversalRungBut = document.getElementById("endgame-traversal-rung");
  const failClimbBut = document.getElementById("endgame-climb-fail");
  const advanceBut = document.getElementById("endgame-advance");

  lowRungBut.onclick = function (e) {
    climbLow();
  };

  midRungBut.onclick = function (e) {
    climbMid();
  };

  highRungBut.onclick = function (e) {
    climbHigh();
  };

  traversalRungBut.onclick = function (e) {
    climbTraversal();
  };

  failClimbBut.onclick = function (e) {
    climbFail();
  };

  advanceBut.onclick = function (e) {
    advance();
  };

  document.onkeydown = function (e) {
    e = e || window.event;
    let key = e.key;
    if (key === "1") {
      climbLow();
    } else if (key === "2") {
      climbMid();
    } else if (key === "3") {
      climbHigh();
    } else if (key === "4") {
      climbTraversal();
    } else if (key === "f" || key === "F") {
      climbFail();
    } else if (key === "a" || key === "A") {
      advance();
    }
  };

  function climbLow() {
    data.rung = 1;

    lowRungBut.style.backgroundColor = "#00ff00";
    midRungBut.style.backgroundColor = "";
    highRungBut.style.backgroundColor = "";
    traversalRungBut.style.backgroundColor = "";

    data.events = [...data.events, [data.matchTime, "climbLow"]];
  }

  function climbMid() {
    data.rung = 2;

    lowRungBut.style.backgroundColor = "";
    midRungBut.style.backgroundColor = "#00ff00";
    highRungBut.style.backgroundColor = "";
    traversalRungBut.style.backgroundColor = "";

    data.events = [...data.events, [data.matchTime, "climbMid"]];
  }

  function climbHigh() {
    data.rung = 3;

    lowRungBut.style.backgroundColor = "";
    midRungBut.style.backgroundColor = "";
    highRungBut.style.backgroundColor = "#00ff00";
    traversalRungBut.style.backgroundColor = "";

    data.events = [...data.events, [data.matchTime, "climbHigh"]];
  }

  function climbTraversal() {
    data.rung = 4;

    lowRungBut.style.backgroundColor = "";
    midRungBut.style.backgroundColor = "";
    highRungBut.style.backgroundColor = "";
    traversalRungBut.style.backgroundColor = "#00ff00";

    data.events = [...data.events, [data.matchTime, "climbTraversal"]];
  }

  function climbFail() {
    data.rung = 0;

    lowRungBut.style.backgroundColor = "";
    midRungBut.style.backgroundColor = "";
    highRungBut.style.backgroundColor = "";
    traversalRungBut.style.backgroundColor = "";

    data.events = [...data.events, [data.matchTime, "climbFail"]];
  }

  function advance() {
    data.events = [...data.events, [data.matchTime, "notes"]];
    window.location.href = "../html/notes.html";
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
