const Menu = () => {
  return (
    <div className="modal-start flex" tabIndex={-1}>
      <img src="./assets/logo.svg" alt="" className="logo" aria-hidden="true" />
      <h1 className="sr-only">Memory number and picture game</h1>

      <div className="menu-control-center flex">
        <fieldset className="inputs-wrapper">
          <legend>Select theme</legend>
          <div className="control-container">
            <input
              type="radio"
              name="theme"
              id="numbers"
              className="radio-btn sr-only"
              value="num"
              defaultChecked
              aria-checked="true"
              data-modal="intro"
            />
            <label htmlFor="numbers" className="input-labels border-radius">
              <span aria-hidden="true">Numbers</span>
              <span className="sr-only">
                select to play the numbers memory game
              </span>
            </label>
            <input
              type="radio"
              name="theme"
              id="icons"
              value="icon"
              className="radio-btn sr-only"
              data-modal="intro"
            />
            <label htmlFor="icons" className="input-labels border-radius">
              <span aria-hidden="true">Icons </span>
              <span className="sr-only">
                select to play the images memory game
              </span>
            </label>
          </div>
        </fieldset>

        <fieldset className="inputs-wrapper">
          <legend>Number of players</legend>
          <div className="control-container">
            <input
              type="radio"
              name="players"
              id="one"
              value="1"
              className="radio-btn sr-only"
              aria-checked="true"
              defaultChecked
              data-modal="intro"
            />
            <label htmlFor="one" className="input-labels border-radius">
              <span aria-hidden="true">1</span>
              <span className="sr-only">select single player mode</span>
            </label>
            <input
              type="radio"
              name="players"
              id="two"
              value="2"
              className="radio-btn sr-only"
              data-modal="intro"
            />
            <label htmlFor="two" className="input-labels border-radius">
              <span aria-hidden="true">2</span>
              <span className="sr-only">select double players mode</span>
            </label>
            <input
              type="radio"
              name="players"
              id="three"
              value="3"
              className="radio-btn sr-only"
              data-modal="intro"
            />
            <label htmlFor="three" className="input-labels border-radius">
              <span aria-hidden="true">3</span>
              <span className="sr-only">select triple players mode</span>
            </label>
            <input
              type="radio"
              name="players"
              id="four"
              value="4"
              className="radio-btn sr-only"
              data-modal="intro"
            />
            <label htmlFor="four" className="input-labels border-radius">
              <span aria-hidden="true">4</span>
              <span className="sr-only">select four players mode</span>
            </label>
          </div>
        </fieldset>

        <fieldset className="inputs-wrapper">
          <legend>Grid size</legend>
          <div className="control-container">
            <input
              type="radio"
              name="gridSize"
              id="four-by-four"
              value="4"
              aria-label="four by four"
              aria-checked="true"
              defaultChecked
              className="radio-btn sr-only"
              data-modal="intro"
            />
            <label
              htmlFor="four-by-four"
              className="input-labels border-radius"
            >
              <span aria-hidden="true">4X4</span>
              <span className="sr-only">select four by four grid</span>
            </label>
            <input
              type="radio"
              name="gridSize"
              value="6"
              id="six-by-six"
              className="radio-btn sr-only"
              data-modal="intro"
            />
            <label htmlFor="six-by-six" className="input-labels border-radius">
              <span aria-hidden="true">6X6 </span>
              <span className="sr-only">select six by six grid</span>
            </label>
          </div>
        </fieldset>

        <button className="modal-menu-control" data-modal="intro">
          Start Game
        </button>
      </div>
    </div>
  );
};

export default Menu;
