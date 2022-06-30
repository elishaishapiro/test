window.addEventListener("load", (e) => {
  let data = JSON.parse(sessionStorage.getItem("data"));

  const startGame = document.getElementById("start-game");
  const fieldImg = document.getElementById("field-img");
  const xy = document.getElementById("XY");

  startGame.onclick = async function () {
    advance();
  };

  document.onkeydown = function (e) {
    e = e || window.event;
    let key = e.key;
    if (key === "A" || key === "a") {
      advance();
    }
  };

  fieldImg.onclick = async function (e) {
    let x = e.offsetX;
    let y = e.offsetY;

    xy.style.left = x - xy.style.width / 2 + "px";
    xy.style.top = y - xy.style.height / 2 + "px";

    xy.classList.remove("hidden");

    data.startPosition = [xy.style.left, xy.style.top];

    console.log(data.startPosition);
  };

  function advance() {
    if (data.startPosition[0] === 0) {
      alert("Must select robot's starting position first.");
      return;
    }

    data.events = [...data.events, [data.matchTime, "auto"]];
    window.location.href = "../html/auto.html";
    sessionStorage.setItem("data", JSON.stringify(data));
    startCount();
  }

  function startCount() {
    setInterval(() => {
      if (data.matchTime < 150) {
        data.matchTime += 1;
      }
    }, 1000);
  }
});
