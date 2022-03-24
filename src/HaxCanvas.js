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
    this.brush = 'normal';
    this.xCoor = 0;
    this.yCoor = 0;
    this.pictureX = 0;
    this.pictureY = 0;
    this.clickLocationX = 0;
    this.clickLocationY = 0;
    this.splatMap = {
      red: "https://i.postimg.cc/wBrsfHCF/splat.png",
      blue: "https://i.postimg.cc/4xJtnWvv/splat.png",
      green: "https://i.postimg.cc/2S2WWnTs/splat.png",
      orange: "https://i.postimg.cc/G2sT6VrR/splat.png",
    };
  }

  static get properties() {
    return {
      title: { type: String },
      clicked: { type: Boolean },
      //selected color
      color: { type: String },
      //mouse coordinates on click
      xCoor: { type: Number },
      yCoor: { type: Number },
      //hax picture size on click
      pictureX: { type: Number },
      pictureY: { type: Number },
      //ratio for positioning of new color image
      clickLocationX: { type: Number },
      clickLocationY: { type: Number },
      // brush size
      brush: { type: String}
    };
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) =>  {
      if (propName === 'clicked' && this[propName]) {
        console.log('clicked');
        //checks a color is selected first
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

          //makes a ratio of where the click location was relative to the size of the image
          this.clickLocationX = this.xCoor / this.pictureX;
          this.clickLocationY = this.yCoor / this.pictureY;

          console.log(`click loc x: ${this.clickLocationX}`);
          console.log(`click loc y: ${this.clickLocationY}`);

          //creates color image based on the color selected
          //each image uses the click location ratios to postion picture in the right spot
          if (Object.keys(this.splatMap).includes(this.color)) {
            console.log(this.color);
            let splat = document.createElement("img");
            // this is not a normal thing but draggable actually accepts the string false to prevent dragging
            splat.setAttribute('draggable', 'false');
            splat.setAttribute('alt', '');
            splat.src = this.splatMap[this.color];
            // https://i.postimg.cc/4xJtnWvv blue
            
            console.log(splat.src);
            splat.classList.add("splat");
            splat.classList.add(this.brush);
            splat.style.left = `${this.pictureX * this.clickLocationX}px`;
            splat.style.top = `${this.pictureY * this.clickLocationY}px`;
            this.shadowRoot.querySelector('.colorsArea').appendChild(splat);
        }

        //resets click
        this.clicked = false;
      }
    });
  }

  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
  }

  addColor(col, xCoor, yCoor) {
    console.log(`${col} ${xCoor} ${yCoor}`);

    const colorItem = {
      color: col,
      xCoorRatio: xCoor,
      yCoorRatio: yCoor
    };

    let queryString = Object.keys(colorItem).map(key => key + '=' + colorItem[key]).join('&');
    // this.checkData();
    fetch(`../api/addColor?${queryString}`).then(res => res.json()).then((data) => {
      console.log('fetch ran');
      this.checkData();
    });
  }

  checkData() {
    console.log('check data ran');
    fetch("../api/db").then(res => res.json()).then((data) => {
      console.log(JSON.stringify(data, null, 2));
    });
  }

  //C:\Users\Owner\Documents\HAX drawing project\hax-painting\api\db.js

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
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -o-user-select: none;
        user-select: none;
      }

      .pictureArea {
        display: flex;
        justify-content: center;
        height: auto;
      }

      .splat {
        height: 100px;
        width: 100px;
        position: absolute;
        z-index: -1;
      }

      .haxImg {
        border: 1px dashed black;
        width: 95%;
        z-index: 1;
      }
      .small {
        height: 50px;
        width: 50px;
      }
      
      .large {
        height: 150px;
        width: 150px;
      }

      .xlarge {
        height: 200px;
        width: 200px;
      }

    `;
  }

  //website with all images hosted https://postimg.cc/gallery/4fYBTXB/a1a34154

  render() {
    return html`
    <div class="pictureArea">
      <!--area where color images are added to-->
      <div class="colorsArea"></div>
      <img alt="" class="haxImg" draggable="false" src="https://i.postimg.cc/tJQnbkCx/hax-camp-pic-2022.png" @click="${this.pictureAreaClicked}" />
    </div>
    `;
  }
}

window.customElements.define(HaxCanvas.tag, HaxCanvas);