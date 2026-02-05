import './fruit-card.js'

class FruitCatalog extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this._fruits = []
  }

  connectedCallback() {
    this.render()
    this.addEventListener('fruitClick', this.handleFruitClick.bind(this))
  }

  set fruits(value) {
    this._fruits = value || []
    this.render()
  }

  get fruits() {
    return this._fruits
  }

  handleFruitClick(event) {
    const { id } = event.detail
    if (id) {
      window.location.hash = `#/detalle/${id}`
    }
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
            fruit-id="${fruit.id}"
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
