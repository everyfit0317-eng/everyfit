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
    description: '100% Premium Bio-washed 240 GSM Cotton.'
  },
  {
    id: 2,
    name: 'Minimalist Relaxed Hoodie',
    category: 'Men',
    price: 1499,
    originalPrice: 2499,
    sizes: ['M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
    description: 'Heavyweight fleece fabric, drop shoulder fit.'
  },
  {
    id: 3,
    name: 'Floral Casual Summer Dress',
    category: 'Women',
    price: 1499,
    originalPrice: 2199,
    sizes: ['XS', 'S', 'M', 'L'],
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80',
    description: 'Breathable rayon fabric with elegant floral print.'
  },
  {
    id: 4,
    name: 'High-Waisted Wide-Leg Pants',
    category: 'Women',
    price: 1599,
    originalPrice: 2299,
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80',
    description: 'Comfortable stretch fit for all-day styling.'
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
      alert('Kripya pehle size select karein!');
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
      `🛍️ *NEW ORDER - EVERYFIT STORE*\n` +
      `--------------------------------\n` +
      `*Product:* ${selectedProduct.name}\n` +
      `*Size:* ${size}\n` +
      `*Price:* ₹${selectedProduct.price}\n` +
      `--------------------------------\n` +
      `📍 *DELIVERY ADDRESS:*\n` +
      `*Name:* ${addressData.name}\n` +
      `*Contact:* ${addressData.phone}\n` +
      `*Address:* ${addressData.address}\n` +
      `*City:* ${addressData.city}\n` +
      `*Pincode:* ${addressData.pincode}\n` +
      `*Payment:* ${addressData.paymentMethod}\n` +
      `--------------------------------\n` +
      `Please confirm my order and share tracking details!`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setSelectedProduct(null);
  };

  return (
    <div className="store-container">
      {/* Header */}
      <header className="navbar">
        <div className="brand-logo">EVERYFIT</div>
        <p className="tagline">Premium Streetwear & Everyday Essentials</p>
      </header>

      {/* Trust Badges Bar */}
      <section className="trust-strip">
        <div className="trust-item">
          <span className="trust-icon">💵</span>
          <div>
            <strong>Cash on Delivery</strong>
            <p>Pay safely at doorstep</p>
          </div>
        </div>
        <div className="trust-item">
          <span className="trust-icon">🔄</span>
          <div>
            <strong>7-Day Easy Exchange</strong>
            <p>Hassle-free size replacement</p>
          </div>
        </div>
        <div className="trust-item">
          <span className="trust-icon">🚚</span>
          <div>
            <strong>Pan-India Shipping</strong>
            <p>Express 3-5 day delivery</p>
          </div>
        </div>
        <div className="trust-item">
          <span className="trust-icon">✨</span>
          <div>
            <strong>100% Bio-Washed</strong>
            <p>Super combed 240+ GSM</p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="category-bar">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <main className="product-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="image-wrapper">
              <img src={product.image} alt={product.name} />
              <span className="badge">{product.category}</span>
            </div>
            
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="description">{product.description}</p>
              
              <div className="pricing">
                <span className="price">₹{product.price}</span>
                <span className="original-price">₹{product.originalPrice}</span>
              </div>

              {/* Size Selector with Size Guide Link */}
              <div className="size-selector-header">
                <span className="label">Select Size:</span>
                <button 
                  type="button" 
                  className="size-guide-btn" 
                  onClick={() => {
                    setSizeGuideTab(product.category === 'Women' ? 'Women' : 'Men');
                    setShowSizeGuide(true);
                  }}
                >
                  📏 Size Guide
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
                Order on WhatsApp
              </button>

              <div className="card-perks">
                <span>✓ Free Delivery</span>
                <span>✓ COD Available</span>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="modal-overlay" onClick={() => setShowSizeGuide(false)}>
          <div className="modal-card size-guide-card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>📏 Measurement Guide (Inches)</h2>
              <button className="close-btn" onClick={() => setShowSizeGuide(false)}>✕</button>
            </div>

            <div className="guide-tabs">
              <button 
                className={`guide-tab ${sizeGuideTab === 'Men' ? 'active' : ''}`}
                onClick={() => setSizeGuideTab('Men')}
              >
                Men's Oversized Tees & Hoodies
              </button>
              <button 
                className={`guide-tab ${sizeGuideTab === 'Women' ? 'active' : ''}`}
                onClick={() => setSizeGuideTab('Women')}
              >
                Women's Casual & Dresses
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
                      <th>Bust / Chest (in)</th>
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

            <div className="size-guide-tip">
              💡 <em>Tip: Streetwear fits loose and relaxed. Agar regular standard fit chahiye toh standard size se 1 size chhota order karein.</em>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Address Modal */}
      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h2>Delivery Address</h2>
              <button className="close-btn" onClick={() => setSelectedProduct(null)}>✕</button>
            </div>

            <div className="order-summary-box">
              <p><strong>Item:</strong> {selectedProduct.name} (Size: {selectedSizes[selectedProduct.id]})</p>
              <p><strong>Amount Payable:</strong> ₹{selectedProduct.price}</p>
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
                  placeholder="Contact Mobile Number *"
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
                  placeholder="Pincode *"
                  required
                  value={addressData.pincode}
                  onChange={handleInputChange}
                />
              </div>

              <div className="payment-select">
                <label>Payment Method:</label>
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
                Confirm & Send on WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}