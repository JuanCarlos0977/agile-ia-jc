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
            id="${fruit.id}"
            name="${fruit.nombre}"
            price="${fruit.precio}"
            image="${fruit.imagen}"
          ></fruit-card>
        `).join('')}
      </div>
    `

    const cards = this.shadowRoot.querySelectorAll('fruit-card')
    cards.forEach(card => {
      card.addEventListener('fruit-selected', (event) => {
        this.dispatchEvent(new CustomEvent('fruit-selected', {
          detail: event.detail,
          bubbles: true,
          composed: true
        }))
      })
    })
  }
}

customElements.define('fruit-catalog', FruitCatalog)
