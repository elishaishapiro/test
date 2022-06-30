import data from "./Data.js";
import config from "../config.js";

window.addEventListener("load", (e) => {
  const scoutName = document.getElementById("scout-name");
  const teamNumber = document.getElementById("team-number");
  const matchNumber = document.getElementById("match-number");
  const verifyBut = document.getElementById("match-validation");
  const advanceBut = document.getElementById("welcome-advance");

  let eventKey = config.eventKey;
  console.log(eventKey);

  teamNumber.addEventListener("keyup", (e) => {
    validate();
  });

  matchNumber.addEventListener("keyup", (e) => {
    validate();
  });

  async function validate() {
    if (teamNumber.value.length > 0 && matchNumber.value.length > 0) {
      fetch(
        "https://www.thebluealliance.com/api/v3/team/frc" +
          teamNumber.value +
          "/event/" +
          eventKey +
          "/matches/simple?X-TBA-Auth-Key=1Q00khN730ZnDXFekpNoOLqaUJZVLqKARaRS0bFz9UVyzfb6XLjoYfcdpa2KLHRU",
      )
        .then((res) => res.json())
        .then((data) => {
          let valid = false;

          for (const match of data) {
            if (match.comp_level !== "qm") continue;

            if (matchNumber.value == match.match_number) {
              valid = true;
            }
          }

          if (valid) {
            verifyBut.style.backgroundColor = "#00ff00";
          } else {
            verifyBut.style.backgroundColor = "#ff0000";
          }
        });
    }
  }

  advanceBut.onclick = async function (e) {
    if (scoutName.value.length === 0) {
      alert("Must input your name.");
      return;
    } else if (teamNumber.value.length === 0) {
      alert("Must input number of the team you are scouting.");
      return;
    } else if (matchNumber.value.length === 0) {
      alert("Must input the number of the match you are scouting.");
      return;
    } else if (verifyBut.style.backgroundColor == "rgb(255, 0, 0)") {
      alert(`Team ${teamNumber.value} does not play in qualification match ${matchNumber.value}.`);
      return;
    }

    data.matchNumber = parseInt(matchNumber.value);
    data.teamNumber = parseInt(teamNumber.value);
    data.scout = scoutName.value;

    window.location.href = "../html/position.html";
    sessionStorage.setItem("data", JSON.stringify(data));
  };
});
