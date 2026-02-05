class FruitCard extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  static get observedAttributes() {
    return ['name', 'price', 'image', 'fruit-id']
  }

  connectedCallback() {
    this.render()
    this.addEventListener('click', this.handleClick.bind(this))
  }

  attributeChangedCallback() {
    if (this.shadowRoot) {
      this.render()
    }
  }

  formatPrice(price) {
    const num = parseFloat(price) || 0
    return num.toFixed(2)
  }

  handleClick() {
    const event = new CustomEvent('fruitClick', {
      bubbles: true,
      composed: true,
      detail: {
        id: this.getAttribute('fruit-id'),
        name: this.getAttribute('name'),
        price: this.getAttribute('price'),
        image: this.getAttribute('image')
      }
    })
    this.dispatchEvent(event)
  }

  render() {
    const name = this.getAttribute('name') || ''
    const price = this.getAttribute('price') || '0'
    const image = this.getAttribute('image') || ''
    const formattedPrice = this.formatPrice(price)
    const fallbackImage = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect fill="#e0e0e0" width="200" height="200"/><text x="100" y="100" text-anchor="middle" fill="#999" font-size="40">🍎</text></svg>')

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          width: 200px;
          height: 200px;
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .name {
          position: absolute;
          top: 8px;
          left: 8px;
          background: rgba(255, 255, 255, 0.9);
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: bold;
          font-size: 14px;
        }

        .price {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(255, 255, 255, 0.9);
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: bold;
          font-size: 14px;
          color: #4CAF50;
        }
      </style>
      <div class="card">
        <img class="card-image" src="${image}" alt="${name}" onerror="this.src='${fallbackImage}'">
        <span class="name">${name}</span>
        <span class="price">${formattedPrice} &euro;/kg</span>
      </div>
    `
  }
}

customElements.define('fruit-card', FruitCard)
