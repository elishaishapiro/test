window.addEventListener("load", () => {
  let data = JSON.parse(sessionStorage.getItem("data"));

  const code = document.getElementById("qrcode");
  const reset = document.getElementById("reset");

  const text = `${data.scout}\t${data.teamNumber}\t${data.matchNumber}\t${data.startPosition}\t${data.taxi}\t${data.shotsMadeHighAuto}\t${data.shotsMadeLowAuto}\t${data.shotsMissAuto}\t${data.shotsMadeHighTele}\t${data.shotsMadeLowTele}\t${data.shotsMissTele}\t${data.startClimb}\t${data.rung}\t${data.failClimb}\t${data.wasDefended}\t${data.playedDefense}\t${data.gotDisabled}\t${data.notes}`;

  let qrcode = undefined;

  if (qrcode === undefined) {
    qrcode = new QRCode(code, text);
  } else {
    qrcode.clear();
    qrcode.makeCode(value);
  }

  reset.onclick = async function (e) {
    window.location.href = "../html/index.html";
    sessionStorage.clear();
  };
});
