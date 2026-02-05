export class SimpleRouter {
  constructor() {
    this.routes = new Map()
    window.addEventListener('hashchange', this.handleRoute.bind(this))
    this.handleRoute()
  }

  addRoute(path, callback) {
    this.routes.set(path, callback)
  }

  handleRoute() {
    const hash = window.location.hash.slice(1)
    const [path, ...params] = hash.split('/')
    
    let matched = false
    
    for (const [route, callback] of this.routes) {
      if (route === path) {
        callback(params)
        matched = true
        break
      }
    }
    
    if (!matched && hash === '') {
      const defaultCallback = this.routes.get('catalog')
      if (defaultCallback) {
        defaultCallback([])
      }
    }
  }

  navigate(path) {
    window.location.hash = path.startsWith('#') ? path : `#${path}`
  }
}

export const router = new SimpleRouter()