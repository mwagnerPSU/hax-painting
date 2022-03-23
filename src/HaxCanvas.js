import { html, css, LitElement } from 'lit';

export class HaxCanvas extends LitElement {
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
    return css`
      :host {
        display: block;
        margin: auto;
      }

      .pictureArea {
        display: flex;
        justify-content: center;
      }

      .haxImg {
        border: 1px dashed black;
        width: 95%;
      }

    `;
  }

  render() {
    return html`
    <div class="pictureArea">
      <img class="haxImg" src="../images/hax-camp-pic-2022.png" @click="${this.pictureAreaClicked}">
    </div>
    `;
  }
}

window.customElements.define(HaxCanvas.tag, HaxCanvas);