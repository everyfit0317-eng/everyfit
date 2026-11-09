import { useState } from 'react';
import './App.css';

const WHATSAPP_NUMBER = '917822012372';

const categoriesList = [
  { id: 'All', name: 'All Drops', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop&q=80' },
  { id: 'Jewellery', name: 'Luxury Jewellery', image: '/jewel1.jpg.jpeg' },
  { id: 'Tees', name: 'Oversized Tees', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80' },
  { id: 'Hoodies', name: 'Hoodies & Sweats', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&auto=format&fit=crop&q=80' }
];

const products = [
  {
    id: 1,
    name: '12mm Heavyweight Cuban Link Chain',
    category: 'Jewellery',
    gender: 'Unisex',
    price: 999,
    originalPrice: 1999,
    sizes: ['18 inch', '20 inch', '22 inch'],
    image: '/jewel1.jpg.jpeg',
    description: '316L Stainless Steel, Anti-tarnish & waterproof. High-polish luxury mirror shine.'
  },
  {
    id: 2,
    name: 'Minimalist Signature Signet Ring',
    category: 'Jewellery',
    gender: 'Unisex',
    price: 699,
    originalPrice: 1299,
    sizes: ['Size 7', 'Size 8', 'Size 9'],
    image: '/jewel2.jpg.jpeg',
    description: '18K Gold PVD plating over surgical steel. Sweatproof and hypoallergenic.'
  },
  {
    id: 3,
    name: '8mm Miami Curb Link Bracelet',
    category: 'Jewellery',
    gender: 'Unisex',
    price: 799,
    originalPrice: 1499,
    sizes: ['Free Size (Adjustable)'],
    image: 'https://images.unsplash.com/photo-1611591475155-4284ec289e0d?w=600&auto=format&fit=crop&q=80',
    description: 'Precision beveled edges, reinforced lobster lock. Anti-fade surgical steel.'
  },
  {
    id: 4,
    name: 'Classic 240 GSM Oversized Tee',
    category: 'Tees',
    gender: 'Men',
    price: 799,
    originalPrice: 1299,
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    description: '100% Super-combed Bio-washed Cotton. Tailored drop-shoulder silhouette.'
  },
  {
    id: 5,
    name: 'Acid Wash Heavyweight Boxy Tee',
    category: 'Tees',
    gender: 'Men',
    price: 899,
    originalPrice: 1499,
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80',
    description: '240 GSM vintage mineral wash finish with thick ribbed collar.'
  },
  {
    id: 6,
    name: 'Minimalist Relaxed Heavyweight Hoodie',
    category: 'Hoodies',
    gender: 'Men',
    price: 1499,
    originalPrice: 2499,
    sizes: ['M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
    description: '380 GSM fleece-lined French Terry. Anti-pilling soft luxury finish.'
  }
];

const reviews = [
  {
    id: 1,
    name: 'Arman K.',
    city: 'Mumbai',
    rating: '★★★★★',
    comment: 'The Cuban chain weight and shine is top notch. Anti-tarnish finish is legit.'
  },
  {
    id: 2,
    name: 'Sneha R.',
    city: 'Delhi',
    rating: '★★★★★',
    comment: 'The signet ring fits perfectly. WhatsApp confirmation was super fast and COD was seamless!'
  },
  {
    id: 3,
    name: 'Rohan M.',
    city: 'Bengaluru',
    rating: '★★★★★',
    comment: 'Best streetwear jewellery and oversized tees under one brand. Premium quality.'
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [sizeGuideTab, setSizeGuideTab] = useState('Men');

  const [addressData, setAddressData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'Cash on Delivery (COD)'
  });

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const openCheckoutModal = (product) => {
    const chosenSize = selectedSizes[product.id];
    if (!chosenSize) {
      alert('Kripya pehle size / option select karein!');
      return;
    }
    setSelectedProduct(product);
  };

  const handleInputChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    const phoneClean = addressData.phone.replace(/[^0-9]/g, '');
    if (phoneClean.length !== 10) {
      alert('Kripya sahi 10-digit mobile number enter karein!');
      return;
    }

    const pinClean = addressData.pincode.replace(/[^0-9]/g, '');
    if (pinClean.length !== 6) {
      alert('Kripya valid 6-digit Pincode dalein!');
      return;
    }

    const size = selectedSizes[selectedProduct.id];

    const message =
      `🛍️ *NEW ORDER - EVERYFIT STUDIO*\n` +
      `--------------------------------\n` +
      `*Product:* ${selectedProduct.name}\n` +
      `*Size / Option:* ${size}\n` +
      `*Price:* ₹${selectedProduct.price}\n` +
      `--------------------------------\n` +
      `📍 *DELIVERY DETAILS:*\n` +
      `*Name:* ${addressData.name.trim()}\n` +
      `*Mobile:* ${phoneClean}\n` +
      `*Address:* ${addressData.address.trim()}\n` +
      `*City:* ${addressData.city.trim()}\n` +
      `*Pincode:* ${pinClean}\n` +
      `*Payment:* ${addressData.paymentMethod}\n` +
      `--------------------------------\n` +
      `Please confirm my order and share invoice/tracking details!`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setSelectedProduct(null);
  };

  return (
    <div className="store-container">
      {/* 1. TOP ANNOUNCEMENT & NAVBAR */}
      <header className="navbar">
        <div className="top-banner">Complimentary Pan-India Shipping on All Pre-Orders ✦ COD Available</div>
        <div className="nav-wrapper">
          <div className="nav-links desktop-only">
            <a href="#categories">Collections</a>
            <a href="#drops">New Drops</a>
            <a href="#craft">The Craft</a>
          </div>

          <div className="logo-container">
            <img src="/logo.png" alt="Everyfit Logo" className="brand-logo-img" />
          </div>

          <div className="nav-actions">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="nav-help-btn">
              💬 WhatsApp Concierge
            </a>
          </div>
        </div>
      </header>

      {/* 2. HIGH-IMPACT HERO BANNER */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-tag">EDITION 2026 // STREETWEAR &amp; JEWELLERY</span>
          <h1 className="hero-title">FASHION FOR EVERYBODY</h1>
          <p className="hero-subtitle">
            Engineered silhouettes and anti-tarnish waterproof stainless steel jewellery designed for everyday luxury.
          </p>
          <div className="hero-buttons">
            <a href="#drops" className="hero-primary-btn">EXPLORE DROPS</a>
            <a href="#craft" className="hero-secondary-btn">OUR CRAFT</a>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES */}
      <section className="section-container" id="categories">
        <div className="section-header">
          <span className="section-eyebrow">CURATED COLLECTIONS</span>
          <h2 className="section-title">Shop by Category</h2>
          <div className="section-divider"></div>
        </div>

        <div className="category-tiles-grid">
          {categoriesList.map(cat => (
            <div
              key={cat.id}
              className={`category-tile ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(cat.id);
                document.getElementById('drops')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="category-tile-img-wrap">
                <img src={cat.image} alt={cat.name} />
              </div>
              <h3 className="category-tile-name">{cat.name}</h3>
              <span className="category-tile-link">View Collection &rarr;</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. TRENDING DROPS */}
      <section className="section-container" id="drops">
        <div className="section-header">
          <span className="section-eyebrow">LATEST ARRIVALS</span>
          <h2 className="section-title">Trending Drops</h2>
          <div className="section-divider"></div>
        </div>

        <div className="filter-pill-bar">
          {categoriesList.map(cat => (
            <button
              key={cat.id}
              className={`filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="image-wrapper">
                <img src={product.image} alt={product.name} />
                <span className="badge">{product.category}</span>
              </div>

              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="description">{product.description}</p>

                <div className="pricing">
                  <span className="price">₹{product.price}</span>
                  <span className="original-price">₹{product.originalPrice}</span>
                  <span className="discount-tag">Save ₹{product.originalPrice - product.price}</span>
                </div>

                <div className="size-selector-header">
                  <span className="size-label">Select Option / Size</span>
                  {product.category !== 'Jewellery' && (
                    <button
                      type="button"
                      className="size-guide-link"
                      onClick={() => {
                        setSizeGuideTab(product.gender === 'Women' ? 'Women' : 'Men');
                        setShowSizeGuide(true);
                      }}
                    >
                      📏 Size Guide
                    </button>
                  )}
                </div>

                <div className="size-buttons">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSizes[product.id] === size ? 'selected' : ''}`}
                      onClick={() => handleSizeSelect(product.id, size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <button
                  className="order-btn"
                  onClick={() => openCheckoutModal(product)}
                >
                  Order via WhatsApp
                </button>

                <div className="card-perks">
                  <span>✦ Anti-Tarnish / 100% Quality</span>
                  <span>✦ Cash on Delivery</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CRAFT SECTION */}
      <section className="section-container craft-section" id="craft">
        <div className="craft-card">
          <div className="craft-text">
            <span className="section-eyebrow">THE EVERYFIT STANDARD</span>
            <h2 className="section-title">Built For Everyday Luxury</h2>
            <p className="craft-desc">
              Har drop ko premium quality materials se taiyaar kiya gaya hai. Chahe anti-tarnish waterproof stainless steel chains ho ya 240+ GSM bio-washed heavy cotton garments.
            </p>

            <div className="craft-features">
              <div className="craft-feature-item">
                <span className="feature-num">316L</span>
                <strong>Surgical Steel</strong>
                <p>100% waterproof and sweatproof jewellery that never loses its luster.</p>
              </div>
              <div className="craft-feature-item">
                <span className="feature-num">240+</span>
                <strong>Heavyweight GSM</strong>
                <p>Dense knit fabric that keeps its shape wash after wash.</p>
              </div>
              <div className="craft-feature-item">
                <span className="feature-num">0%</span>
                <strong>Tarnish &amp; Fading</strong>
                <p>Advanced PVD coating and reactive dyes for timeless durability.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. REVIEWS */}
      <section className="section-container reviews-section">
        <div className="section-header">
          <span className="section-eyebrow">COMMUNITY VOICES</span>
          <h2 className="section-title">Loved by Everyfit Fam</h2>
          <div className="section-divider"></div>
        </div>

        <div className="reviews-grid">
          {reviews.map(item => (
            <div key={item.id} className="review-card">
              <div className="review-stars">{item.rating}</div>
              <p className="review-comment">&ldquo;{item.comment}&rdquo;</p>
              <div className="review-author">
                <strong>{item.name}</strong>
                <span>Verified Buyer • {item.city}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TRUST STRIP */}
      <section className="trust-strip">
        <div className="trust-item">
          <div className="trust-icon-box">💵</div>
          <div>
            <h4>Cash on Delivery</h4>
            <p>Pay verified at your doorstep</p>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon-box">🔄</div>
          <div>
            <h4>7-Day Free Exchange</h4>
            <p>Doorstep size replacements</p>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon-box">🚚</div>
          <div>
            <h4>Pan-India Express</h4>
            <p>Dispatched in 24 hours</p>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon-box">✨</div>
          <div>
            <h4>Premium Grade</h4>
            <p>Anti-tarnish &amp; bio-washed couture</p>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="luxury-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/logo.png" alt="Everyfit Logo" className="footer-logo-img" />
            <p>Modern Streetwear and Everyday Couture built for every silhouette.</p>
          </div>

          <div className="footer-column">
            <h4>Quick Links</h4>
            <a href="#drops">New Drops</a>
            <a href="#categories">Collections</a>
            <a href="#craft">The Craft</a>
          </div>

          <div className="footer-column">
            <h4>Concierge &amp; Support</h4>
            <p>WhatsApp: +91 78220 12372</p>
            <p>Hours: Mon - Sat (10 AM - 8 PM)</p>
            <p>COD &amp; Pan-India Deliveries</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 EVERYFIT STUDIO. ALL RIGHTS RESERVED. CRAFTED WITH PASSION.</p>
        </div>
      </footer>

      {/* SIZE GUIDE MODAL */}
      {showSizeGuide && (
        <div className="modal-overlay" onClick={() => setShowSizeGuide(false)}>
          <div className="modal-card size-guide-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Measurement Guide</h2>
              <button className="close-btn" onClick={() => setShowSizeGuide(false)}>✕</button>
            </div>

            <div className="guide-tabs">
              <button
                className={`guide-tab ${sizeGuideTab === 'Men' ? 'active' : ''}`}
                onClick={() => setSizeGuideTab('Men')}
              >
                Men&apos;s Oversized Fit
              </button>
              <button
                className={`guide-tab ${sizeGuideTab === 'Women' ? 'active' : ''}`}
                onClick={() => setSizeGuideTab('Women')}
              >
                Women&apos;s Fit
              </button>
            </div>

            {sizeGuideTab === 'Men' ? (
              <div className="table-responsive">
                <table className="size-table">
                  <thead>
                    <tr>
                      <th>Size</th>
                      <th>Chest (in)</th>
                      <th>Length (in)</th>
                      <th>Shoulder (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><strong>S</strong></td><td>40"</td><td>28"</td><td>20"</td></tr>
                    <tr><td><strong>M</strong></td><td>42"</td><td>29"</td><td>21"</td></tr>
                    <tr><td><strong>L</strong></td><td>44"</td><td>30"</td><td>22"</td></tr>
                    <tr><td><strong>XL</strong></td><td>46"</td><td>31"</td><td>23"</td></tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="size-table">
                  <thead>
                    <tr>
                      <th>Size</th>
                      <th>Bust (in)</th>
                      <th>Waist (in)</th>
                      <th>Length (in)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><strong>XS</strong></td><td>34"</td><td>26"</td><td>35"</td></tr>
                    <tr><td><strong>S</strong></td><td>36"</td><td>28"</td><td>36"</td></tr>
                    <tr><td><strong>M</strong></td><td>38"</td><td>30"</td><td>37"</td></tr>
                    <tr><td><strong>L</strong></td><td>40"</td><td>32"</td><td>38"</td></tr>
                    <tr><td><strong>XL</strong></td><td>42"</td><td>34"</td><td>39"</td></tr>
                  </tbody>
                </table>
              </div>
            )}

            <p className="size-guide-tip">
              ✦ Streetwear cuts are relaxed. Choose your regular size for an oversized drop, or downsize for a tailored look.
            </p>
          </div>
        </div>
      )}

      {/* CHECKOUT ADDRESS MODAL */}
      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h2>Complete Your Order</h2>
              <button className="close-btn" onClick={() => setSelectedProduct(null)}>✕</button>
            </div>

            <div className="order-summary-box">
              <p><strong>Item:</strong> {selectedProduct.name} (Option: {selectedSizes[selectedProduct.id]})</p>
              <p><strong>Amount:</strong> ₹{selectedProduct.price} (Free Shipping)</p>
            </div>

            <form onSubmit={handleOrderSubmit} className="address-form">
              <div className="input-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  required
                  value={addressData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="10-Digit Mobile Number *"
                  required
                  value={addressData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <textarea
                name="address"
                placeholder="Complete Address (House/Flat No., Street, Landmark) *"
                required
                rows="3"
                value={addressData.address}
                onChange={handleInputChange}
              />

              <div className="input-row">
                <input
                  type="text"
                  name="city"
                  placeholder="City *"
                  required
                  value={addressData.city}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="pincode"
                  placeholder="6-Digit Pincode *"
                  required
                  value={addressData.pincode}
                  onChange={handleInputChange}
                />
              </div>

              <div className="payment-select">
                <label>Payment Mode</label>
                <select
                  name="paymentMethod"
                  value={addressData.paymentMethod}
                  onChange={handleInputChange}
                >
                  <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                  <option value="UPI / Online on Delivery">UPI / Online on Delivery</option>
                </select>
              </div>

              <button type="submit" className="confirm-order-btn">
                Confirm & Order on WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}