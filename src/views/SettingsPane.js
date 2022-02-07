import React from "react";

import "./SettingsPane.css";
export default function SettingsPane({
  exitSettings,
  letterAmount,
  setLetterAmount,
}) {
  let d_arrow = true;
  let u_arrow = true;
  if (letterAmount >= 5) {
    u_arrow = false;
  } else if (letterAmount <= 3) {
    d_arrow = false;
  }

  let lowerAmount = () => {
    if (d_arrow) {
      setLetterAmount(letterAmount - 1);
      localStorage.setItem("letteramount", letterAmount - 1);
    }
  };

  let raiseAmount = () => {
    if (u_arrow) {
      setLetterAmount(letterAmount + 1);
      localStorage.setItem("letteramount", letterAmount + 1);
    }
  };

  let resetMatch = () => {
    setLetterAmount(letterAmount);
  }
  return (
    <div className="SettingsPane Pane">
      <div className="SettingsPaneHeader">
        <div className="SettingsPaneLeft"></div>
        <div className="SettingsPaneHeaderText">Settings</div>
        <div className="ExitButton" onClick={exitSettings}>
          &times;
        </div>
      </div>

      <div className="row" style={{marginTop: "15px"}}>
        <div className="row-left">Amount of Letters in Word</div>

        <div className="row-right">
          <div
            className={`lower-arrow ${d_arrow ? "" : "disabled"}`}
            onClick={lowerAmount}
          >
            &#8595;
          </div>
          <div className="number">{letterAmount}</div>
          <div
            className={`upper-arrow ${u_arrow ? "" : "disabled"}`}
            onClick={raiseAmount}
          >
            &#8593;
          </div>
        </div>
      </div>
      <div className="row" style={{marginTop: "15px"}}>
        <div className="row-left">Change Word</div>
        <div className="row-right">
          <div className="Button" onClick={resetMatch}>Reset</div>
        </div>
      </div>
      <div className="row" style={{marginTop: "auto", marginBottom: "25px", justifyContent: "end"}}>
        Created by Jonathan Rosado
      </div>
    </div>
  );
}
