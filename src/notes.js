window.addEventListener("load", (e) => {
  let data = JSON.parse(sessionStorage.getItem("data"));

  const defenseCheck = document.getElementById("played-defense");
  const defendCheck = document.getElementById("was-defended");
  const disableCheck = document.getElementById("got-disabled");
  const notesInput = document.getElementById("match-notes-input");
  const advanceBut = document.getElementById("notes-advance");

  advanceBut.onclick = function (e) {
    if (defenseCheck.checked) {
      data.playedDefense = true;
    }
    if (defendCheck.checked) {
      data.wasDefended = true;
    }
    if (disableCheck.checked) {
      data.gotDisabled = true;
    }

    if (!notesInput.value) {
      alert("Please write some notes aboout the match.");
      return;
    }

    data.notes = notesInput.value;

    window.location.href = "../html/qr-viewer.html";
    sessionStorage.setItem("data", JSON.stringify(data));
  };
});
