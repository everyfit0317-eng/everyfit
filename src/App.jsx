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
  const [selectedProduct, setSelectedProduct] = useState(null); // Checkout modal ke liye
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

    // WhatsApp structured message
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

              {/* Size Selector */}
              <div className="size-selector">
                <span className="label">Select Size:</span>
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
              </div>

              <button 
                className="order-btn"
                onClick={() => openCheckoutModal(product)}
              >
                Order on WhatsApp
              </button>
            </div>
          </div>
        ))}
      </main>

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