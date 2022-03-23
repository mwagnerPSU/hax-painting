(function (exports, lit) {
  'use strict';

  class HaxCanvas extends lit.LitElement {
    static get tag() {
      return 'hax-canvas';
    }

    constructor() {
      super();
      this.title = '';
      this.clicked = false;
      this.color = "";
      this.xCoor = 0;
      this.yCoor = 0;
      this.pictureX = 0;
      this.pictureY = 0;
      this.clickLocationX = 0;
      this.clickLocationY = 0;
    }

    static get properties() {
      return {
        title: { type: String },
        clicked: { type: Boolean },
        color: { type: String },
        xCoor: { type: Number },
        yCoor: { type: Number },
        pictureX: { type: Number },
        pictureY: { type: Number },
        clickLocationX: { type: Number },
        clickLocationY: { type: Number },
      };
    }

    updated(changedProperties) {
      changedProperties.forEach((oldValue, propName) =>  {
        if (propName === 'clicked' && this[propName]) {
          console.log('clicked');

          //checks a color is selected first
          if (this.parentElement.querySelector('hax-colors').attributes.length > 0) {
            //gets the color that is selected
            let colorSelected = this.parentElement.querySelector('hax-colors').attributes[0].nodeName;

            //sets name we'll use for color
            if (colorSelected === 'redselected') {
              this.color = 'red';
            } else if (colorSelected === 'blueselected') {
              this.color = 'blue';
            } else if (colorSelected === 'greenselected') {
              this.color = 'green';
            } else if (colorSelected === 'orangeselected') {
              this.color = 'orange';
            }
    
            console.log(this.color);
    
            console.log(`x: ${this.xCoor}`);
    
            console.log(`y: ${this.yCoor}`);
    
            //get picture element
            let picture = this.shadowRoot.querySelector('.haxImg');
    
            //get height and width of image on user's device
            this.pictureX = picture.clientWidth;
            this.pictureY = picture.clientHeight;
    
            console.log(`pictureX: ${this.pictureX}`);
            console.log(`pictureY: ${this.pictureY}`);

            //makes a percentage of where the click location was relative to the size of the image
            this.clickLocationX = this.xCoor / this.pictureX;
            this.clickLocationY = this.yCoor / this.pictureY;

            console.log(`click loc x: ${this.clickLocationX}`);
            console.log(`click loc y: ${this.clickLocationY}`);

            if (this.color === 'red') {
              let newRedSplat = `<img class="splat" src="../images/red-splat.png" style="left: ${this.pictureX * this.clickLocationX}px; top: ${this.pictureY * this.clickLocationY}px;">`;
              this.shadowRoot.querySelector('.colorsArea').innerHTML += newRedSplat;

              // let redSplat = this.shadowRoot.querySelector('.redTest');
              // redSplat.style.left = `${this.pictureX * this.clickLocationX}px`;
              // redSplat.style.top = `${this.pictureY * this.clickLocationY}px`;
            } else if (this.color === 'blue') {
              let newBlueSplat = `<img class="splat" src="../images/blue-splat.png" style="left: ${this.pictureX * this.clickLocationX}px; top: ${this.pictureY * this.clickLocationY}px;">`;
              this.shadowRoot.querySelector('.colorsArea').innerHTML += newBlueSplat;

              // let blueSplat = this.shadowRoot.querySelector('.blueTest');
              // blueSplat.style.left = `${this.pictureX * this.clickLocationX}px`;
              // blueSplat.style.top = `${this.pictureY * this.clickLocationY}px`;
            } else if (this.color === 'green') {
              let newGreenSplat = `<img class="splat" src="../images/green-splat.png" style="left: ${this.pictureX * this.clickLocationX}px; top: ${this.pictureY * this.clickLocationY}px;">`;
              this.shadowRoot.querySelector('.colorsArea').innerHTML += newGreenSplat;

              // let greenSplat = this.shadowRoot.querySelector('.greenTest');
              // greenSplat.style.left = `${this.pictureX * this.clickLocationX}px`;
              // greenSplat.style.top = `${this.pictureY * this.clickLocationY}px`;
            } else if (this.color === 'orange') {
              let newOrangeSplat = `<img class="splat" src="../images/orange-splat.png" style="left: ${this.pictureX * this.clickLocationX}px; top: ${this.pictureY * this.clickLocationY}px;">`;
              this.shadowRoot.querySelector('.colorsArea').innerHTML += newOrangeSplat;

              // let orangeSplat = this.shadowRoot.querySelector('.orangeTest');
              // orangeSplat.style.left = `${this.pictureX * this.clickLocationX}px`;
              // orangeSplat.style.top = `${this.pictureY * this.clickLocationY}px`;
            }
          }
          this.clicked = false;
          
        }
      });
    }

    firstUpdated(changedProperties) {
      if (super.firstUpdated) {
        super.firstUpdated(changedProperties);
      }
    }

    pictureAreaClicked(event) {
      //sets clicked
      this.clicked = true;

      //gets coordinates of mouse inside haxImg at the click
      let rect = event.target.getBoundingClientRect();
      this.xCoor = event.clientX - rect.left;
      this.yCoor = event.clientY - rect.top;
    }

    static get styles() {
      return lit.css`
      :host {
        display: block;
        margin: auto;
      }

      .pictureArea {
        display: flex;
        justify-content: center;
        height: auto;
      }

      .splat {
        height: 100px;
        width: 100px;
        position: fixed;
        z-index: -1;
      }

      .redTest {
        height: 100px;
        width: 100px;
        position: fixed;
        left: 100px;
        z-index: -1;
      }

      .blueTest {
        height: 100px;
        width: 100px;
        position: fixed;
        left: 200px;
        z-index: -1;
      }

      .greenTest {
        height: 100px;
        width: 100px;
        position: fixed;
        left: 300px;
        z-index: -1;
      }

      .orangeTest {
        height: 100px;
        width: 100px;
        position: fixed;
        left: 400px;
        z-index: -1;
      }

      .haxImg {
        border: 1px dashed black;
        width: 95%;
        z-index: 1;
      }

    `;
    }

    render() {
      return lit.html`
    <div class="pictureArea">
      <div class="colorsArea"></div>
      <img class="haxImg" src="../images/hax-camp-pic-2022.png" @click="${this.pictureAreaClicked}">
    </div>
    `;
    }
  }

  window.customElements.define(HaxCanvas.tag, HaxCanvas);

  class HaxColors extends lit.LitElement {
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
      return lit.css`
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
        background-color: cyan;
      }

      .green {
        background-color: lightgreen;
      }

      .orange {
        background-color: orange;
      }
    `;
    }

    render() {
      return lit.html`
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

  class HaxPainting extends lit.LitElement {
    static get tag() {
      return 'hax-painting';
    }

    constructor() {
      super();
      this.title = '';
    }

    static get properties() {
      return {
        title: { type: String },
        loaded: { type: Boolean },
      };
    }

    updated(changedProperties) {
      changedProperties.forEach((oldValue, propName) =>  {
        if (propName === 'loaded' && this[propName]) ;
      });
    }

    firstUpdated(changedProperties) {
      if (super.firstUpdated) {
        super.firstUpdated(changedProperties);
      }
    }

    static get styles() {
      return lit.css`
      :host {
        display: block;
        padding: 0px;
      }
    `;
    }

    render() {
      return lit.html`
    <div class="container">
      <h3 class="pageTitle">Welcome to HAX Camp!</h3>
      <hax-canvas></hax-canvas>
      <hax-colors></hax-colors>
    </div>
    `;
    }
  }

  window.customElements.define(HaxPainting.tag, HaxPainting);

  exports.HaxPainting = HaxPainting;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

})({}, lit);
