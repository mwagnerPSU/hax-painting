import { html, css, LitElement } from 'lit';

export class HaxColors extends LitElement {
  static get tag() {
    return 'hax-colors';
  }

  constructor() {
    super();
    this.redSelected = false;
    this.blueSelected = false;
    this.greenSelected = false;
    this.orangeSelected = false;
  }

  static get properties() {
    return {
      redSelected: { type: Boolean, reflect: true },
      blueSelected: { type: Boolean, reflect: true },
      greenSelected: { type: Boolean, reflect: true },
      orangeSelected: { type: Boolean, reflect: true },
    };
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) =>  {
      if (propName === 'redSelected' && this[propName]) {
        if (this.redSelected === true) {

            console.log('red changed');

            //reset other selections
            this.blueSelected = false;
            this.greenSelected = false;
            this.orangeSelected = false;

            //delete me
            console.log(`red: ${this.redSelected}`);
            console.log(`blue: ${this.blueSelected}`);
            console.log(`green: ${this.greenSelected}`);
            console.log(`orange: ${this.orangeSelected}`);

            //button selection indication
            let redButton = this.shadowRoot.querySelector('.red');
            redButton.style.boxShadow = '6px 6px 6px #6A6C6E';

            //reset other button borders
            let blueButton = this.shadowRoot.querySelector('.blue');
            let greenButton = this.shadowRoot.querySelector('.green');
            let orangeButton = this.shadowRoot.querySelector('.orange');

            blueButton.style.boxShadow = '3px 3px 3px #6A6C6E';
            greenButton.style.boxShadow = '3px 3px 3px #6A6C6E';
            orangeButton.style.boxShadow = '3px 3px 3px #6A6C6E';
            
        }
      }

      if (propName === 'blueSelected' && this[propName]) {
        if (this.blueSelected === true) {

            console.log('blue changed');

            //reset other selections
            this.redSelected = false;
            this.greenSelected = false;
            this.orangeSelected = false;

            //delete me
            console.log(`red: ${this.redSelected}`);
            console.log(`blue: ${this.blueSelected}`);
            console.log(`green: ${this.greenSelected}`);
            console.log(`orange: ${this.orangeSelected}`);
            
            //button selection indication
            let blueButton = this.shadowRoot.querySelector('.blue');
            blueButton.style.boxShadow = '6px 6px 6px #6A6C6E';

            //reset other button borders
            let redButton = this.shadowRoot.querySelector('.red');
            let greenButton = this.shadowRoot.querySelector('.green');
            let orangeButton = this.shadowRoot.querySelector('.orange');

            redButton.style.boxShadow = '3px 3px 3px #6A6C6E';
            greenButton.style.boxShadow = '3px 3px 3px #6A6C6E';
            orangeButton.style.boxShadow = '3px 3px 3px #6A6C6E';
        }
      }

      if (propName === 'greenSelected' && this[propName]) {
        if (this.greenSelected === true) {

            console.log('green changed');

            //reset other selections
            this.redSelected = false;
            this.blueSelected = false;
            this.orangeSelected = false;

            //delete me
            console.log(`red: ${this.redSelected}`);
            console.log(`blue: ${this.blueSelected}`);
            console.log(`green: ${this.greenSelected}`);
            console.log(`orange: ${this.orangeSelected}`);
            
            //button selection indication
            let greenButton = this.shadowRoot.querySelector('.green');
            greenButton.style.boxShadow = '6px 6px 6px #6A6C6E';

            //reset other button borders
            let redButton = this.shadowRoot.querySelector('.red');
            let blueButton = this.shadowRoot.querySelector('.blue');
            let orangeButton = this.shadowRoot.querySelector('.orange');

            redButton.style.boxShadow = '3px 3px 3px #6A6C6E';
            blueButton.style.boxShadow = '3px 3px 3px #6A6C6E';
            orangeButton.style.boxShadow = '3px 3px 3px #6A6C6E';
        }
      }

      if (propName === 'orangeSelected' && this[propName]) {
        if (this.orangeSelected === true) {

            console.log('orange changed');

            //reset other selections
            this.redSelected = false;
            this.blueSelected = false;
            this.greenSelected = false;

            //delete me
            console.log(`red: ${this.redSelected}`);
            console.log(`blue: ${this.blueSelected}`);
            console.log(`green: ${this.greenSelected}`);
            console.log(`orange: ${this.orangeSelected}`);
            
            //button selection indication
            let orangeButton = this.shadowRoot.querySelector('.orange');
            orangeButton.style.boxShadow = '6px 6px 6px #6A6C6E';
            
            //reset other button borders
            let redButton = this.shadowRoot.querySelector('.red');
            let blueButton = this.shadowRoot.querySelector('.blue');
            let greenButton = this.shadowRoot.querySelector('.green');

            redButton.style.boxShadow = '3px 3px 3px #6A6C6E';
            blueButton.style.boxShadow = '3px 3px 3px #6A6C6E';
            greenButton.style.boxShadow = '3px 3px 3px #6A6C6E';
        }
      }
    });
  }

  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
  }

  redClicked() {
    console.log('red clicked');
    this.redSelected = true;
  }

  blueClicked() {
    console.log('blue clicked');
    this.blueSelected = true;
  }

  greenClicked() {
    console.log('green clicked');
    this.greenSelected = true;
  }
  
  orangeClicked() {
    console.log('orange clicked');
    this.orangeSelected = true;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .colorsTitle {
        display: flex;
        margin: auto;
        justify-content: space-around;
        width: 80%;
      }

      .colorsArea {
        display: flex;
        margin: auto;
        justify-content: space-around;
        width: 80%;
      }

      .option {
        width: 50px;
        height: 50px;
        margin: 10px;
        border-radius: 50%;
        border: 1px solid black;
        box-shadow: 3px 3px 1px #6A6C6E;
      }

      .red {
        background-color: red;
      }

      .blue {
        background-color: blue;
      }

      .green {
        background-color: green;
      }

      .orange {
        background-color: orange;
      }
    `;
  }

  render() {
    return html`
    <div class="colorsTitle">
        <h4>Select a Color</h4>
    </div>
    <div class="colorsArea">
      <button class="option red" @click="${this.redClicked}"></button>
      <button class="option blue" @click="${this.blueClicked}"></button>
      <button class="option green" @click="${this.greenClicked}"></button>
      <button class="option orange" @click="${this.orangeClicked}"></button>
    </div>
    `;
  }
}

window.customElements.define(HaxColors.tag, HaxColors);