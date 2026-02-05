class FruitDetail extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this._fruit = null
  }

  static get observedAttributes() {
    return ['fruit-id']
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback() {
    if (this.shadowRoot) {
      this.render()
    }
  }

  set fruit(value) {
    this._fruit = value
    this.render()
  }

  get fruit() {
    return this._fruit
  }

  formatPrice(price) {
    const num = parseFloat(price) || 0
    return num.toFixed(2)
  }

  render() {
    const fruitId = this.getAttribute('fruit-id')
    
    if (!this._fruit && fruitId) {
      this.shadowRoot.innerHTML = `
        <style>
          .loading {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 400px;
            font-size: 18px;
            color: #666;
          }
        </style>
        <div class="loading">Cargando detalles de la fruta...</div>
      `
      return
    }

    if (!this._fruit) {
      this.shadowRoot.innerHTML = `
        <style>
          .error {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 400px;
            font-size: 18px;
            color: #f44336;
          }
        </style>
        <div class="error">No se encontró la fruta</div>
      `
      return
    }

    const { nombre, precio, imagen } = this._fruit
    const formattedPrice = this.formatPrice(precio)
    const fallbackImage = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect fill="#e0e0e0" width="400" height="400"/><text x="200" y="200" text-anchor="middle" fill="#999" font-size="80">🍎</text></svg>')

    this.shadowRoot.innerHTML = `
      <style>
        .detail-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .detail-header {
          display: flex;
          gap: 30px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .detail-image {
          width: 300px;
          height: 300px;
          object-fit: cover;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .detail-info {
          flex: 1;
          min-width: 250px;
        }

        .detail-name {
          font-size: 32px;
          font-weight: bold;
          color: #333;
          margin-bottom: 15px;
        }

        .detail-price {
          font-size: 24px;
          color: #4CAF50;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .back-button {
          background: #2196F3;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .back-button:hover {
          background: #1976D2;
        }

        @media (max-width: 768px) {
          .detail-header {
            flex-direction: column;
            align-items: center;
          }

          .detail-image {
            width: 100%;
            max-width: 300px;
            height: auto;
          }

          .detail-info {
            text-align: center;
          }
        }
      </style>
      <div class="detail-container">
        <div class="detail-header">
          <img class="detail-image" src="${imagen}" alt="${nombre}" onerror="this.src='${fallbackImage}'">
          <div class="detail-info">
            <h1 class="detail-name">${nombre}</h1>
            <div class="detail-price">${formattedPrice} &euro;/kg</div>
            <button class="back-button">← Volver al catálogo</button>
          </div>
        </div>
      </div>
    `

    const backButton = this.shadowRoot.querySelector('.back-button')
    backButton.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('back-to-catalog', {
        bubbles: true,
        composed: true
      }))
    })
  }
}

export { FruitDetail }
customElements.define('fruit-detail', FruitDetail)