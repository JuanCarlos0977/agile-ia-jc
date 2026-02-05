class AppHeader extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        header {
          background: #4CAF50;
          color: white;
          padding: 1rem;
          text-align: center;
        }
        h1 {
          margin: 0;
        }
      </style>
      <header>
        <h1>Frutería</h1>
      </header>
    `
  }
}

customElements.define('app-header', AppHeader)
