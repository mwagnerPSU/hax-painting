import { html, css, LitElement } from 'lit';

export class HaxColors extends LitElement {
  static get tag() {
    return 'hax-colors';
  }

  constructor() {
    super();
    this.activeColor = "red";
    this.brush = "normal";
  }

  static get properties() {
    return {
      activeColor: { type: String, reflect: true, attribute: 'active-color' },
      brush: { type: String}
    };
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) =>  {
      if (propName === 'activeColor' && this[propName]) {
        this.shadowRoot.querySelectorAll('.active').forEach((node) => {
          node.classList.remove('active');
        });
        // trick to ensure the prev actually finishes beforehand even tho it almost always will
        // old devices it's possible it wouldn't but this enforced microtask will cheat to
        // make sure it always nullifies others before setting self
        setTimeout(() => {
          this.shadowRoot.querySelector(`[data-color="${this[propName]}"]`).classList.add('active');          
        }, 0);
        this.dispatchEvent(new CustomEvent('active-color-changed', {
          detail: this 
        }));
      }
      if (propName === 'brush' && this[propName]) {
        this.dispatchEvent(new CustomEvent('brush-changed', {
          detail: this 
        }));
      }
    });
  }

  //fires when red button is selected
  btnClicked(e) {
    // sanity check
    if (e.target.hasAttribute('data-color')) {
      this.activeColor = e.target.getAttribute('data-color');
    }
  }
  // brush changed but we have to actually query the item to get the value bc HTML is weird
  brushChange() {
    this.brush = this.shadowRoot.querySelector("#brush").value;
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
      .toolsArea {
        display: inline-flex;
        width: 10%;
      }
      #brush {
        font-size: 36px;
      }

      .option {
        width: 50px;
        height: 50px;
        margin: 10px;
        border-radius: 50%;
        border: 1px solid black;
        box-shadow: 3px 3px 1px #6A6C6E;
      }
      .active {
        box-shadow: 6px 6px 6px #6A6C6E;
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
    return html`
    <div class="colorsTitle">
        <h4>Select a color then click on hax-camp 2022 picture</h4>
    </div>
    <div class="toolsArea">
      <label for="brush">Brush size:</label>
      <select id="brush" @change="${this.brushChange}">
      <option value="small">small</option>
      <option value="normal" selected>normal</option>
      <option value="large">large</option>
      <option value="xlarge">xlarge</option>
      </select>
    </div>
    <div class="colorsArea">
      ${['red', 'orange', 'blue', 'green'].map(item => html`<button class="option ${item}" data-color="${item}" @click="${this.btnClicked}"></button>`
      )}
    </div>
    `;
  }
}

window.customElements.define(HaxColors.tag, HaxColors);