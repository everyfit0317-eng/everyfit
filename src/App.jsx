import React, { useState } from 'react';
import './App.css';

const WHATSAPP_NUMBER = '917822012372';

const products = [
  {
    id: 1,
    name: 'Classic Oversized Cotton Tee',
    category: 'Men',
    price: 799,
    originalPrice: 1299,
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80',
    description: '100% Bio-washed heavy 240 GSM combed cotton.'
  },
  {
    id: 2,
    name: 'Minimalist Relaxed Hoodie',
    category: 'Men',
    price: 1499,
    originalPrice: 2499,
    sizes: ['M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
    description: 'Premium heavyweight fleece fabric, tailored drop shoulder fit.'
  },
  {
    id: 3,
    name: 'Floral Casual Summer Dress',
    category: 'Women',
    price: 1499,
    originalPrice: 2199,
    sizes: ['XS', 'S', 'M', 'L'],
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80',
    description: 'Ultra-lightweight breathable rayon with signature chic print.'
  },
  {
    id: 4,
    name: 'High-Waisted Wide-Leg Pants',
    category: 'Women',
    price: 1599,
    originalPrice: 2299,
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80',
    description: 'Structured silhouette designed for modern elevated styling.'
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

  const categories = ['All', 'Men', 'Women'];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const openCheckoutModal = (product) => {
    const chosenSize = selectedSizes[product.id];
    if (!chosenSize) {
      alert('Kripya pehle apna size select karein!');
      return;
    }
    setSelectedProduct(product);
  };

  const handleInputChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const size = selectedSizes[selectedProduct.id];

    const message = 
      `🛍️ *NEW ORDER - EVERYFIT STUDIO*\n` +
      `--------------------------------\n` +
      `*Product:* ${selectedProduct.name}\n` +
      `*Size:* ${size}\n` +
      `*Price:* ₹${selectedProduct.price}\n` +
      `--------------------------------\n` +
      `📍 *DELIVERY DETAILS:*\n` +
      `*Name:* ${addressData.name}\n` +
      `*Mobile:* ${addressData.phone}\n` +
      `*Address:* ${addressData.address}\n` +
      `*City:* ${addressData.city}\n` +
      `*Pincode:* ${addressData.pincode}\n` +
      `*Payment:* ${addressData.paymentMethod}\n` +
      `--------------------------------\n` +
      `Please confirm my order & share invoice copy!`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setSelectedProduct(null);
  };

  return (
    <div className="store-container">
      {/* Luxury Minimal Header */}
      <header className="navbar">
        <div className="top-banner">Complimentary Pan-India Express Delivery on All Orders</div>
        <div className="brand-logo">EVERYFIT</div>
        <p className="tagline">MODERN STREETWEAR & ESSENTIALS</p>
      </header>

      {/* Category Navigation */}
      <nav className="category-bar">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Product Showcase */}
      <main className="product-grid">
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
              </div>

              {/* Size Selector */}
              <div className="size-selector-header">
                <span className="size-label">Select Size</span>
                <button 
                  type="button" 
                  className="size-guide-link" 
                  onClick={() => {
                    setSizeGuideTab(product.category === 'Women' ? 'Women' : 'Men');
                    setShowSizeGuide(true);
                  }}
                >
                  Size Guide
                </button>
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
                <span>✦ COD Available</span>
                <span>✦ Express Delivery</span>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Bottom Trust & Assurance Strip */}
      <section className="trust-strip">
        <div className="trust-item">
          <div className="trust-icon-box">💵</div>
          <div>
            <h4>Cash on Delivery</h4>
            <p>Pay conveniently at your doorstep</p>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon-box">🔄</div>
          <div>
            <h4>7-Day Exchange</h4>
            <p>Seamless door-to-door replacements</p>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon-box">🚚</div>
          <div>
            <h4>Pan-India Express</h4>
            <p>Dispatched with premier logistics</p>
          </div>
        </div>
        <div className="trust-item">
          <div className="trust-icon-box">✨</div>
          <div>
            <h4>Tailored Quality</h4>
            <p>Premium 240+ GSM bio-washed fabrics</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="luxury-footer">
        <div className="footer-logo">EVERYFIT</div>
        <p>© 2026 EVERYFIT STUDIO. ALL RIGHTS RESERVED.</p>
      </footer>

      {/* Size Guide Modal */}
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
                Men's Fit
              </button>
              <button 
                className={`guide-tab ${sizeGuideTab === 'Women' ? 'active' : ''}`}
                onClick={() => setSizeGuideTab('Women')}
              >
                Women's Fit
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

      {/* Checkout Address Modal */}
      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h2>Shipping Address</h2>
              <button className="close-btn" onClick={() => setSelectedProduct(null)}>✕</button>
            </div>

            <div className="order-summary-box">
              <p><strong>Item:</strong> {selectedProduct.name} (Size: {selectedSizes[selectedProduct.id]})</p>
              <p><strong>Amount:</strong> ₹{selectedProduct.price}</p>
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
                  placeholder="Mobile Number *"
                  required
                  value={addressData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <textarea
                name="address"
                placeholder="Full Street Address, House/Flat No., Landmark *"
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
                  placeholder="Pincode *"
                  required
                  value={addressData.pincode}
                  onChange={handleInputChange}
                />
              </div>

              <div className="payment-select">
                <label>Payment Method</label>
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
                Confirm & Order via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}