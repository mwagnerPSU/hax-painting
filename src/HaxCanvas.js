import { html, css, LitElement } from 'lit';

export class HaxCanvas extends LitElement {
  static get tag() {
    return 'hax-canvas';
  }

  constructor() {
    super();
    this.title = '';
    this.clicked = false;
    this.populateAllColors = false;
    this.color = "";
    this.brush = 'normal';
    this.xCoor = 0;
    this.yCoor = 0;
    this.pictureX = 0;
    this.pictureY = 0;
    this.clickLocationX = 0;
    this.clickLocationY = 0;
    this.splatMap = {
      red: "../images/red-splat.png",
      blue: "../images/blue-splat.png",
      green: "../images/green-splat.png",
      orange: "../images/orange-splat.png",
    };
    this.splatCoorAdjustments = [
      {
        size: "small",
        adj: 25
      },
      {
        size: "normal",
        adj: 0
      },
      {
        size: "large",
        adj: -25
      },
      {
        size: "xlarge",
        adj: -50
      },
    ];

    this.allColors = [];

    //db endpoints
    this.addColorEndpoint = '/api/addColor';
    this.dbEndpoint = '/api/db';
    this.deleteAllColorsEndpoint = '/api/deleteAllColors';
  }

  static get properties() {
    return {
      title: { type: String },
      clicked: { type: Boolean },
      populateAllColors: { type: Boolean },
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
          /*
          if (this.color === 'red') {
            // this.addColor(this.color, this.clickLocationX, this.clickLocationY);

            //create color image
            //let newRedSplat = `<img class="splat" src="https://i.postimg.cc/wBrsfHCF/red-splat.png" style="left: ${this.pictureX * this.clickLocationX}px; top: ${this.pictureY * this.clickLocationY}px;">`;
            let newRedSplat = `<img class="splat" src="../images/red-splat.png" style="left: ${this.pictureX * this.clickLocationX}px; top: ${this.pictureY * this.clickLocationY}px;">`;
            //adds color image to page
            this.shadowRoot.querySelector('.colorsArea').innerHTML += newRedSplat;

            // let redSplat = this.shadowRoot.querySelector('.redTest');
            // redSplat.style.left = `${this.pictureX * this.clickLocationX}px`;
            // redSplat.style.top = `${this.pictureY * this.clickLocationY}px`;
          } else if (this.color === 'blue') {
            //create color image
            //let newBlueSplat = `<img class="splat" src="https://i.postimg.cc/4xJtnWvv/blue-splat.png" style="left: ${this.pictureX * this.clickLocationX}px; top: ${this.pictureY * this.clickLocationY}px;">`;
            let newBlueSplat = `<img class="splat" src="../images/blue-splat.png" style="left: ${this.pictureX * this.clickLocationX}px; top: ${this.pictureY * this.clickLocationY}px;">`;
            //adds color image to page
            this.shadowRoot.querySelector('.colorsArea').innerHTML += newBlueSplat;

            // let blueSplat = this.shadowRoot.querySelector('.blueTest');
            // blueSplat.style.left = `${this.pictureX * this.clickLocationX}px`;
            // blueSplat.style.top = `${this.pictureY * this.clickLocationY}px`;
          } else if (this.color === 'green') {
            //create color image
            //let newGreenSplat = `<img class="splat" src="https://i.postimg.cc/2S2WWnTs/green-splat.png" style="left: ${this.pictureX * this.clickLocationX}px; top: ${this.pictureY * this.clickLocationY}px;">`;
            let newGreenSplat = `<img class="splat" src="../images/green-splat.png" style="left: ${this.pictureX * this.clickLocationX}px; top: ${this.pictureY * this.clickLocationY}px;">`;
            //adds color image to page
            this.shadowRoot.querySelector('.colorsArea').innerHTML += newGreenSplat;

            // let greenSplat = this.shadowRoot.querySelector('.greenTest');
            // greenSplat.style.left = `${this.pictureX * this.clickLocationX}px`;
            // greenSplat.style.top = `${this.pictureY * this.clickLocationY}px`;
          } else if (this.color === 'orange') {
            //create color image
            //let newOrangeSplat = `<img class="splat" src="https://i.postimg.cc/G2sT6VrR/orange-splat.png" style="left: ${this.pictureX * this.clickLocationX}px; top: ${this.pictureY * this.clickLocationY}px;">`;
            let newOrangeSplat = `<img class="splat" src="../images/orange-splat.png" style="left: ${this.pictureX * this.clickLocationX}px; top: ${this.pictureY * this.clickLocationY}px;">`;
            //adds color image to page
            this.shadowRoot.querySelector('.colorsArea').innerHTML += newOrangeSplat;

            // let orangeSplat = this.shadowRoot.querySelector('.orangeTest');
            // orangeSplat.style.left = `${this.pictureX * this.clickLocationX}px`;
            // orangeSplat.style.top = `${this.pictureY * this.clickLocationY}px`;
          }
          */
        }

        this.addColor();

        //resets click
        this.clicked = false;
      }

      // if (propName === 'populateAllColors' && this[propName]) {
      //   console.log('populate all colors');
      //   //get picture element
      //   let picture = this.shadowRoot.querySelector('.haxImg');

      //   //get height and width of image on user's device
      //   this.pictureX = picture.clientWidth;
      //   this.pictureY = picture.clientHeight;

      //   this.getData();

      //   setTimeout(() => {
      //     this.shadowRoot.querySelector('.colorsArea').innerHTML = '';

      //     this.allColors.forEach(color => {
      //       //sets ratios to data from db where the click location was relative to the size of the image
      //       // let xCoorRatio = color.xCoorRatio;
      //       // let yCoorRatio = color.yCoorRatio;

      //       // console.log(`xCoorRatio: ${xCoorRatio}`);
      //       // console.log(`yCoorRatio: ${yCoorRatio}`);

      //       //creates color image based on the color selected
      //       //each image uses the coor ratios to postion picture in the right spot
      //       if (Object.keys(this.splatMap).includes(color.color)) {
      //         console.log(color.color);
      //         let splat = document.createElement("img");
      //         //prevents dragging
      //         splat.setAttribute('draggable', 'false');
      //         splat.setAttribute('alt', '');
      //         splat.src = this.splatMap[color.color];
      //         // https://i.postimg.cc/4xJtnWvv blue
              
      //         console.log(splat.src);
      //         splat.classList.add("splat");
      //         splat.classList.add(color.size);
      //         splat.style.left = `${this.pictureX * color.xCoorRatio}px`;
      //         splat.style.top = `${this.pictureY * color.yCoorRatio}px`;
      //         this.shadowRoot.querySelector('.colorsArea').appendChild(splat);
      //       }
      //     });
      //   }, 1000);

      //   //resets click
      //   this.populateAllColors = false;
      // }
    });
  }

  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
  }

  //db endpoint to add a color
  async addColor() {

    const request = await fetch(`${this.addColorEndpoint}?color=${this.color}&xCoorRatio=${this.clickLocationX}&yCoorRatio=${this.clickLocationY}&size=${this.brush}`).then(res => res.json());
    // const request = await fetch(`${this.addColorEndpoint}?color=${testColor}&xCoorRatio=${testXCoorRatio}&yCoorRatio=${testYCoorRatio}`).then(res => res.json());
    
    let result = request;
    console.log(`Added new color. Color: ${result.color} xCoorRatio: ${result.xCoorRatio} yCoorRatio: ${result.yCoorRatio} size: ${result.size}`);
  }

  //db endpoint to get all colors data
  async getData() {
    console.log('check data ran');
    const request = await fetch(`${this.dbEndpoint}`).then(res => res.json());
    this.allColors = JSON.parse(JSON.stringify(request));
    console.log(this.allColors);
  }

  //db endpoint to delete all colors
  async deleteAllColors() {
    const request = await fetch(`${this.deleteAllColorsEndpoint}`).then(res => res.json());
    let result = request;
    console.log(result);
  }

  refresh() {
    this.populateAllColors = true;
  }

  //C:\Users\Owner\Documents\HAX drawing project\hax-painting\api\db.js

  pictureAreaClicked(event) {
    //sets clicked
    this.clicked = true;

    //gets coordinates of mouse inside haxImg at the click
    let rect = event.target.getBoundingClientRect();
    this.splatCoorAdjustments.forEach(size => {
      if (size.size === this.brush) {
        this.xCoor = (event.clientX + size.adj) - rect.left;
        this.yCoor = (event.clientY + size.adj) - rect.top;
      }
    })
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
        z-index: -1;
      }
      
      .large {
        height: 150px;
        width: 150px;
        z-index: -1;
      }

      .xlarge {
        height: 200px;
        width: 200px;
        z-index: -1;
      }

    `;
  }

  //website with all images hosted https://postimg.cc/gallery/4fYBTXB/a1a34154

  render() {
    return html`
    <div class="pictureArea">
      <!--area where color images are added to-->
      <div class="colorsArea"></div>
      <img alt="" class="haxImg" draggable="false" src="../images/hax-camp-pic-2022.png" @click="${this.pictureAreaClicked}" />
    </div>
    <button class='testBtn' @click=${this.addColor}>Add Color Test</button>
    <button class='testBtn' @click=${this.getData}>Get Data Test</button>
    <button class='testBtn' @click=${this.deleteAllColors}>Delete All Colors Test</button>
    <button class='testBtn' @click=${this.refresh}>Refresh Test</button>
    `;
  }
}

window.customElements.define(HaxCanvas.tag, HaxCanvas);