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
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          
          .loading {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 60vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            margin: 20px;
          }

          .loading-spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 20px;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .loading-text {
            color: white;
            font-size: 18px;
            font-weight: 500;
            animation: pulse 2s ease-in-out infinite;
          }
        </style>
        <div class="loading">
          <div class="loading-spinner"></div>
          <div class="loading-text">Cargando detalles premium...</div>
        </div>
      `
      return
    }

    if (!this._fruit) {
      this.shadowRoot.innerHTML = `
        <style>
          .error {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 60vh;
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            border-radius: 20px;
            margin: 20px;
            color: white;
            text-align: center;
          }

          .error-icon {
            font-size: 80px;
            margin-bottom: 20px;
          }

          .error-text {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 10px;
          }

          .error-subtext {
            font-size: 16px;
            opacity: 0.9;
          }
        </style>
        <div class="error">
          <div class="error-icon"></div>
          <div class="error-text">Fruta no encontrada</div>
          <div class="error-subtext">La fruta que buscas no está disponible</div>
        </div>
      `
      return
    }

    const { nombre, precio, imagen } = this._fruit
    const formattedPrice = this.formatPrice(precio)
    const fallbackImage = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"><rect fill="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" width="400" height="400"/><text x="200" y="200" text-anchor="middle" fill="#fff" font-size="80">🍎</text></svg>')

    this.shadowRoot.innerHTML = `
      <style>
        :root {
          --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          --glass-bg: rgba(255, 255, 255, 0.95);
          --glass-border: rgba(255, 255, 255, 0.3);
          --shadow-elevation-1: 0 2px 8px rgba(0,0,0,0.08);
          --shadow-elevation-2: 0 8px 20px rgba(0,0,0,0.12);
          --shadow-elevation-3: 0 20px 40px rgba(0,0,0,0.15);
          --text-primary: #2d3748;
          --text-secondary: #718096;
          --accent-green: #48bb78;
          --accent-blue: #4299e1;
        }

        * {
          box-sizing: border-box;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .detail-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px;
          min-height: 100vh;
          position: relative;
        }

        .breadcrumb {
          margin-bottom: 30px;
          animation: fadeInUp 0.6s ease-out;
        }

        .breadcrumb-list {
          display: flex;
          align-items: center;
          gap: 10px;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .breadcrumb-item {
          color: var(--text-secondary);
          font-size: 14px;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .breadcrumb-item:hover {
          color: var(--accent-blue);
        }

        .breadcrumb-separator {
          color: var(--text-secondary);
          opacity: 0.5;
        }

        .breadcrumb-current {
          color: var(--text-primary);
          font-weight: 600;
        }

        .detail-content {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          box-shadow: var(--shadow-elevation-3);
          overflow: hidden;
          animation: fadeInUp 0.8s ease-out;
        }

        .detail-header {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
          padding: 40px;
          align-items: center;
        }

        .image-container {
          position: relative;
          animation: slideInLeft 0.8s ease-out 0.2s both;
        }

        .image-wrapper {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-elevation-2);
          transition: transform 0.3s ease;
        }

        .image-wrapper:hover {
          transform: scale(1.05);
        }

        .detail-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .image-wrapper:hover .detail-image {
          transform: scale(1.1);
        }

        .badge-new {
          position: absolute;
          top: 20px;
          right: 20px;
          background: var(--gradient-secondary);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: var(--shadow-elevation-1);
        }

        .detail-info {
          animation: slideInRight 0.8s ease-out 0.3s both;
        }

        .category-tag {
          display: inline-block;
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
        }

        .detail-name {
          font-size: 48px;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 20px;
          line-height: 1.1;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .rating-container {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 30px;
        }

        .stars {
          display: flex;
          gap: 4px;
        }

        .star {
          color: #fbbf24;
          font-size: 20px;
        }

        .star.empty {
          color: #e5e7eb;
        }

        .rating-text {
          color: var(--text-secondary);
          font-size: 14px;
        }

        .price-container {
          display: flex;
          align-items: baseline;
          gap: 15px;
          margin-bottom: 30px;
        }

        .detail-price {
          font-size: 36px;
          font-weight: 700;
          color: var(--accent-green);
        }

        .price-unit {
          color: var(--text-secondary);
          font-size: 16px;
        }

        .description {
          color: var(--text-secondary);
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .actions {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .btn {
          padding: 14px 28px;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-primary {
          background: var(--gradient-primary);
          color: white;
          box-shadow: var(--shadow-elevation-1);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-elevation-2);
        }

        .btn-secondary {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          border: 2px solid rgba(102, 126, 234, 0.2);
        }

        .btn-secondary:hover {
          background: rgba(102, 126, 234, 0.2);
          transform: translateY(-2px);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 40px;
          background: rgba(102, 126, 234, 0.03);
        }

        .feature-card {
          text-align: center;
          padding: 20px;
          border-radius: 12px;
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
        }

        .feature-icon {
          font-size: 32px;
          margin-bottom: 10px;
        }

        .feature-title {
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 5px;
        }

        .feature-value {
          color: var(--text-secondary);
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .detail-header {
            grid-template-columns: 1fr;
            gap: 30px;
            padding: 30px 20px;
          }

          .detail-name {
            font-size: 36px;
          }

          .detail-image {
            height: 300px;
          }

          .actions {
            flex-direction: column;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }

          .features-grid {
            grid-template-columns: 1fr;
            padding: 30px 20px;
          }
        }
      </style>
      <div class="detail-container">
        <nav class="breadcrumb">
          <ul class="breadcrumb-list">
            <li><a href="/" class="breadcrumb-item">Inicio</a></li>
            <li class="breadcrumb-separator">›</li>
            <li><a href="/" class="breadcrumb-item">Frutas</a></li>
            <li class="breadcrumb-separator">›</li>
            <li class="breadcrumb-current">${nombre}</li>
          </ul>
        </nav>

        <div class="detail-content">
          <div class="detail-header">
            <div class="image-container">
              <div class="image-wrapper">
                <img class="detail-image" 
                     src="${imagen}" 
                     alt="${nombre}" 
                     loading="lazy"
                     onerror="this.src='${fallbackImage}'">
                <div class="badge-new">Premium</div>
              </div>
            </div>

            <div class="detail-info">
              <div class="category-tag">Fruta Fresca</div>
              <h1 class="detail-name">${nombre}</h1>
              
              <div class="rating-container">
                <div class="stars">
                  <span class="star">★</span>
                  <span class="star">★</span>
                  <span class="star">★</span>
                  <span class="star">★</span>
                  <span class="star empty">★</span>
                </div>
                <span class="rating-text">4.2 (156 reseñas)</span>
              </div>

              <div class="price-container">
                <span class="detail-price">${formattedPrice}</span>
                <span class="price-unit">€/kg</span>
              </div>

              <p class="description">
                Disfruta de la fresca y deliciosa ${nombre}, 
                cuidadosamente seleccionada para ofrecer la mejor calidad y sabor. 
                Perfecta para una alimentación saludable y equilibrada.
              </p>

              <div class="actions">
                <button class="btn btn-primary">
                  <span>🛒</span>
                  <span>Agregar al carrito</span>
                </button>
                <button class="btn btn-secondary back-button">
                  <span>←</span>
                  <span>Volver al catálogo</span>
                </button>
              </div>
            </div>
          </div>

          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon"></div>
              <div class="feature-title">100% Natural</div>
              <div class="feature-value">Sin conservantes</div>
            </div>
            <div class="feature-card">
              <div class="feature-icon"></div>
              <div class="feature-title">Envío Rápido</div>
              <div class="feature-value">24-48h</div>
            </div>
            <div class="feature-card">
              <div class="feature-icon"></div>
              <div class="feature-title">Calidad Premium</div>
              <div class="feature-value">Certificada</div>
            </div>
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