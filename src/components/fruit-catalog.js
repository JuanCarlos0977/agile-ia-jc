import './fruit-card.js'

class FruitCatalog extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this._fruits = []
  }

  connectedCallback() {
    this.render()
    this.addEventListener('fruit-click', this.handleFruitClick.bind(this))
  }

  set fruits(value) {
    this._fruits = value || []
    this.render()
  }

  get fruits() {
    return this._fruits
  }

  handleFruitClick(event) {
    const { fruitId, name } = event.detail
    
    this.dispatchEvent(new CustomEvent('fruit-selected', {
      detail: { fruitId, name },
      bubbles: true
    }))
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
            data-id="${fruit.id}"
          ></fruit-card>
        `).join('')}
      </div>
    `
  }
}

customElements.define('fruit-catalog', FruitCatalog)
