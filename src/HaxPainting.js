import { html, css, LitElement } from 'lit';
import './HaxCanvas';
import './HaxColors';

export class HaxPainting extends LitElement {
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
      if (propName === 'loaded' && this[propName]) {

      }
    });
  }

  firstUpdated(changedProperties) {
    if (super.firstUpdated) {
      super.firstUpdated(changedProperties);
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 0px;
      }
    `;
  }

  render() {
    return html`
    <div class="container">
      <h3 class="pageTitle">Welcome to HAX Camp!</h3>
      <hax-canvas></hax-canvas>
      <hax-colors></hax-colors>
    </div>
    `;
  }
}

window.customElements.define(HaxPainting.tag, HaxPainting);