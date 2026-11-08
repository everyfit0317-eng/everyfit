import React, { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Oversized Heavyweight T-Shirt',
    category: 'Men',
    price: 899,
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: 'Relaxed Fit Linen Shirt',
    category: 'Men',
    price: 1399,
    sizes: ['M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Floral Casual Summer Dress',
    category: 'Women',
    price: 1499,
    sizes: ['XS', 'S', 'M', 'L'],
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 4,
    name: 'High-Waisted Wide-Leg Pants',
    category: 'Women',
    price: 1599,
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80'
  }
];

// APNA WHATSAPP NUMBER YAHA DALEIN (Country code ke saath, bina '+' ya space ke, e.g. 919876543210)
const WHATSAPP_NUMBER = '917822012372';

function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleWhatsAppOrder = (product) => {
    const chosenSize = selectedSizes[product.id] || product.sizes[0];
    const message = `Hi EVERYFIT, I want to order:\n\n👕 Item: ${product.name}\n📏 Size: ${chosenSize}\n💰 Price: ₹${product.price}\n\nPlease share payment and delivery details.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURI(message)}`, '_blank');
  };

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(item => item.category === activeCategory);

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', color: '#111', margin: 0, padding: 0 }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px 30px',
        borderBottom: '1px solid #eee',
        position: 'sticky',
        top: 0,
        backgroundColor: '#fff',
        zIndex: 100
      }}>
        <div style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '2px' }}>EVERYFIT</div>
        <div style={{ display: 'flex', gap: '16px' }}>
          {['All', 'Men', 'Women'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: activeCategory === cat ? '700' : '500',
                color: activeCategory === cat ? '#000' : '#777',
                borderBottom: activeCategory === cat ? '2px solid #000' : '2px solid transparent',
                paddingBottom: '4px'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Banner */}
      <section style={{ textAlign: 'center', padding: '50px 20px', backgroundColor: '#f9f9f9', borderBottom: '1px solid #eee' }}>
        <p style={{ letterSpacing: '3px', textTransform: 'uppercase', fontSize: '11px', color: '#666', marginBottom: '8px' }}>
          Streetwear & Everyday Comfort
        </p>
        <h1 style={{ fontSize: '32px', margin: '0 0 12px', fontWeight: '800' }}>Fits Crafted for Movement</h1>
        <p style={{ color: '#555', maxWidth: '450px', margin: '0 auto', fontSize: '14px' }}>
          Exclusive men's and women's collections. Direct WhatsApp delivery.
        </p>
      </section>

      {/* Products */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '30px 20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>{activeCategory} Collection</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '24px'
        }}>
          {filteredProducts.map((item) => {
            const currentSize = selectedSizes[item.id] || item.sizes[0];
            return (
              <div key={item.id} style={{ border: '1px solid #eee', borderRadius: '10px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#888' }}>{item.category}</span>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', margin: '4px 0 8px' }}>{item.name}</h3>
                  <div style={{ fontSize: '16px', fontWeight: '800', marginBottom: '12px' }}>₹{item.price}</div>
                  
                  {/* Size Selector */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', color: '#555', marginBottom: '6px' }}>Select Size:</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {item.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => handleSizeSelect(item.id, sz)}
                          style={{
                            padding: '6px 12px',
                            fontSize: '12px',
                            fontWeight: '600',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            border: currentSize === sz ? '1.5px solid #000' : '1px solid #ddd',
                            backgroundColor: currentSize === sz ? '#000' : '#fff',
                            color: currentSize === sz ? '#fff' : '#000'
                          }}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Order Button */}
                  <button
                    onClick={() => handleWhatsAppOrder(item)}
                    style={{
                      marginTop: 'auto',
                      backgroundColor: '#25D366',
                      color: '#fff',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '700',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    💬 Order on WhatsApp
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;