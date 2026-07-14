import { useEffect, useMemo, useState } from 'react'
import './App.css'

const categories = ['All', 'Cement & Concrete', 'Aggregates', 'Steel & Metal', 'Bricks & Blocks', 'Wood & Lumber']

const products = [
  {
    id: 1,
    name: 'Portland Cement – High Strength (50kg)',
    category: 'Cement & Concrete',
    description: 'Consistent compressive strength, suitable for structural concrete and precast. Certified to EN 197-1.',
    price: 12.5,
    unit: 'bag',
    stock: '5,000',
    locations: ['New York', 'Los Angeles'],
    eta: '24-48h',
    cert: 'EN197-1'
  },
  {
    id: 2,
    name: 'Coarse Washed Sand (Bulk)',
    category: 'Aggregates',
    description: 'Low-fines, washed sand for concrete and mortar. Consistent grading for mix control.',
    price: 35,
    unit: 'ton',
    stock: '2,000',
    locations: ['Los Angeles', 'Houston'],
    eta: '48-72h',
    cert: 'Aggregate Quality A'
  },
  {
    id: 3,
    name: 'Steel Reinforcement Bar 12mm',
    category: 'Steel & Metal',
    description: 'High-yield rebar for reinforced concrete. Manufactured to BS4449 with traceable mill certificates.',
    price: 650,
    unit: 'ton',
    stock: '200',
    locations: ['New York', 'Chicago'],
    eta: '72h+',
    cert: 'BS4449'
  },
  {
    id: 4,
    name: 'Softwood Lumber 2x4 - KD',
    category: 'Wood & Lumber',
    description: 'Kiln-dried softwood for framing; graded for structural use with moisture control.',
    price: 8.5,
    unit: 'piece',
    stock: '5,000',
    locations: ['Houston', 'Miami'],
    eta: '24-48h',
    cert: 'C16'
  },
]

const locations = [
  {
    city: 'New York',
    type: 'Warehouse',
    address: '123 Industrial Blvd',
    phone: '(212) 555-0101',
    stock: 'Fast dispatch for cement and steel',
  },
  {
    city: 'Los Angeles',
    type: 'Distribution Center',
    address: '456 Commerce St',
    phone: '(213) 555-0202',
    stock: 'High aggregate stock and bulk delivery',
  },
  {
    city: 'Chicago',
    type: 'Branch',
    address: '789 Market Ave',
    phone: '(312) 555-0303',
    stock: 'Ideal for steel and prefabricated materials',
  },
]

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [apiStatus, setApiStatus] = useState('Checking backend...')

  useEffect(() => {
    fetch('/api/health')
      .then((response) => response.json())
      .then((data) => setApiStatus(data.status || 'Backend online'))
      .catch(() => setApiStatus('Backend offline'))
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [searchTerm, selectedCategory])

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="logo">RawMaterials<span className="logo-dot">.</span></div>
          <div className="search-wrap">
            <input
              className="search-input"
              placeholder="Search by name, SKU or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">Search</button>
          </div>
          <nav className="actions">
            <a className="action-link" href="#locations">Find a branch</a>
            <a className="action-quote" href="#contact">Get a Quote</a>
            <a className="action-account" href="#">Sign In</a>
          </nav>
        </div>
        <div className="category-nav">
          <div className="category-list">
            <button className="cat">All</button>
            <button className="cat">Cement</button>
            <button className="cat">Aggregates</button>
            <button className="cat">Steel</button>
            <button className="cat">Lumber</button>
            <button className="cat">Roofing</button>
          </div>
        </div>
      </header>
      <header className="hero-section">
        <div className="hero-banner">
          <div className="hero-banner-inner">
            <div className="hero-text-block">
              <p className="eyebrow">Trusted supplier network</p>
              <h1>Nationwide distribution for construction raw materials</h1>
              <p className="hero-text">Fast pickup, reliable delivery, and tailored quotes for builders.</p>
              <div className="hero-actions">
                <a className="primary-btn" href="#catalog">Shop materials</a>
                <a className="secondary-btn" href="#contact">Request a quote</a>
              </div>
            </div>
            <div className="hero-cta">
              <div className="live-card">
                <p className="card-label">Live backend</p>
                <h3>{apiStatus}</h3>
                <p className="small">API health is visible here — products and quotes coming next.</p>
                <a className="primary-btn" href="#locations">Find a branch</a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="catalog-section" id="catalog">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Material catalog</p>
            <h2>Browse raw materials by category and availability.</h2>
          </div>
          <p>Filter by category and search for the exact material you need.</p>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Search material"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-media"> 
                <div className="product-img">
                  <img src={`https://picsum.photos/seed/product-${product.id}/600/400`} alt={product.name} />
                </div>
              </div>
              <div className="card-body">
                <div className="card-top">
                  <span className="pill">{product.category}</span>
                  <span className="sku">SKU: {product.id}</span>
                </div>
                <h3>{product.name}</h3>
                <p className="desc">{product.description}</p>
                <div className="meta-row">
                  <span className="price">${product.price.toFixed(2)}/{product.unit}</span>
                  <span className="eta">Delivery: {product.eta}</span>
                  <span className="cert">Cert: {product.cert}</span>
                </div>
                <div className="card-actions">
                  <button className="btn-quote">Request quote</button>
                  <button className="btn-add">Add to quote</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="locations-section" id="locations">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Distribution locations</p>
            <h2>Pick the nearest branch for pickup or delivery.</h2>
          </div>
          <p>Each location shows current focus inventory and contact details.</p>
        </div>

        <div className="location-finder">
          <div className="finder-inputs">
            <input type="text" placeholder="Enter town or postcode" />
            <select>
              <option>All branches</option>
              <option>Warehouse</option>
              <option>Branch</option>
              <option>Distribution Center</option>
            </select>
            <button className="primary-btn">Search</button>
          </div>
          <div className="location-grid">
            {locations.map((location) => (
              <article className="location-card" key={location.city}>
                <div className="location-header">
                  <h3>{location.city}</h3>
                  <span>{location.type}</span>
                </div>
                <p>{location.address}</p>
                <p>{location.phone}</p>
                <p>{location.stock}</p>
                <div className="location-actions">
                  <button className="secondary-btn">View details</button>
                  <button className="primary-btn">Get directions</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-card">
          <div>
            <p className="eyebrow">Quote request</p>
            <h2>Need a custom delivery plan?</h2>
            <p>Tell us the material, quantity, and location so we can prepare a tailored quote.</p>
          </div>
          <form onSubmit={(event) => event.preventDefault()}>
            <input type="text" placeholder="Your name" />
            <input type="email" placeholder="Business email" />
            <input type="text" placeholder="Material / quantity" />
            <button type="submit">Send request</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default App
