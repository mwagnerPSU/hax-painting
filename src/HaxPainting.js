import { html, css, LitElement } from 'lit';
import './HaxCanvas.js';
import './HaxColors.js';

export class HaxPainting extends LitElement {
  static get tag() {
    return 'hax-painting';
  }

  constructor() {
    super();
    this.activeColor = 'red';
    this.brush = "normal";
  }

  static get properties() {
    return {

      activeColor: { type: String, reflect: true, attribute: 'active-color' },
      brush: { type: String, reflect: true },
    };
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) =>  {

    });
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 0px;
      }
    `;
  }
  colorChange(e) {
    this.activeColor = e.detail.activeColor;
  }
  brushChange(e) {
    this.brush = e.detail.brush;
  }

  render() {
    return html`
    <div class="container">
      <h3 class="pageTitle">Welcome to HAX Camp!</h3>
<<<<<<< master
      <hax-canvas brush="${this.brush}" color="${this.activeColor}"></hax-canvas>
      <hax-colors @brush-changed="${this.brushChange}" @active-color-changed="${this.colorChange}"></hax-colors>
=======
      <hax-canvas></hax-canvas>
      <hax-colors></hax-colors>
      <img src="../images/red-splat.png" alt="red image1"/>
>>>>>>> master
    </div>
    `;
  }
}

window.customElements.define(HaxPainting.tag, HaxPainting);