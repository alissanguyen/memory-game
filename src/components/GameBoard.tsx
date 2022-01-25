import * as React from "react";

const GameBoard = () => {
  return (
    <div className="game-control">
      <h2 className="sr-only">memory game play center</h2>
      <div className="secondary-menu">
        <img src="./assets/logo.svg" alt="" aria-hidden="true" />
        <div className="secondary-menu-container">
          <button
            className="secondary-menu-button border-radius"
            aria-pressed="false"
          >
            menu
          </button>
          <div className="tablet-menu-control">
            <input
              type="button"
              value="Restart"
              className="restart-button restart-button-tab border-radius"
            />
            <input
              type="button"
              value="new game"
              className="setup-new-game-button setup-new-game-button-tab border-radius"
            />
          </div>
        </div>
      </div>

      <div className="container"></div>
      <div className="modal-end hide">
        <div className="game-results">
          <h3 className="modal-end-title">You did it!</h3>
          <p className="modal-end-content">
            Game over. Here is how you got on...
          </p>
          <div className="time-taken" aria-live="polite">
            <span className="time-taken-label">Time taken</span>
            <span className="time-taken-value"></span>
          </div>
          <div className="steps-taken" aria-live="polite">
            <span className="steps-taken-label">Moves taken</span>
            <span className="steps-taken-value"></span>
          </div>
        </div>

        <div className="setup-restart" tabIndex={-1}>
          <input
            type="button"
            value="Restart"
            className="restart-button restart-setup-btn border-radius"
          />
          <input
            type="button"
            value="Setup new game"
            className="setup-new-game-button restart-setup-btn border-radius"
          />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
