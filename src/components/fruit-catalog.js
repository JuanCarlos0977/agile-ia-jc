import './fruit-card.js'

class FruitCatalog extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this._fruits = []
  }

  connectedCallback() {
    this.render()
  }

  set fruits(value) {
    this._fruits = value || []
    this.render()
  }

  get fruits() {
    return this._fruits
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .catalog {
          display: grid;
          grid-template-columns: repeat(auto-fill, 200px);
          gap: 16px;
          padding: 16px;
          justify-content: center;
        }
      </style>
      <div class="catalog">
        ${this._fruits.map(fruit => `
          <fruit-card
            name="${fruit.nombre}"
            price="${fruit.precio}"
            image="${fruit.imagen}"
          ></fruit-card>
        `).join('')}
      </div>
    `
  }
}

customElements.define('fruit-catalog', FruitCatalog)
