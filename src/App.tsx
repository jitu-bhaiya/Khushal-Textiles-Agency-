import React, { useEffect, useRef, useState } from 'react';

const phoneNumber = "918013128779";
const getWhatsAppUrl = (text: string) => `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

const StarIcon = () => (
  <svg className="star" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" style={{ marginRight: '8px' }}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
  </svg>
);

const galleryItems = [
  {
    id: 1,
    src: "https://cdn0.weddingwire.in/vendor/2912/3_2/960/jpg/agarwals-sarees-and-suits-5_15_222912-1560169221.jpeg",
    title: "Banarasi Saree",
    description: "Premium Banarasi saree with rich zari work, perfect for weddings and traditional events."
  },
  {
    id: 2,
    src: "https://www.shoppingworldyt.com/cdn/shop/files/rn-image_picker_lib_temp_a98aa6a4-eceb-4c31-9c43-f079053b8744.jpg?v=1761125221",
    title: "Bridal Lehenga",
    description: "Stunning dark pink heavy bridal lehenga with intricate embroidery and a matching blouse."
  },
  {
    id: 3,
    src: "data:image/jpeg;base64,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",
    title: "Designer Suit",
    description: "Elegant designer suit with exquisite detailing, ideal for parties and festive occasions."
  },
  {
    id: 4,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ1PVALljJGSZFVjCrMvYfo8ZEAhSn2O30wQ&s",
    title: "Kanjivaram Saree",
    description: "Classic Kanjivaram saree offering a regal look with its vibrant colors and gold woven pallu."
  },
  {
    id: 5,
    src: "https://kvsshopping.com/cdn/shop/files/98564C81-4409-4460-A35B-66BD97F7768B.jpg?v=1738063380",
    title: "Embroidered Lehenga",
    description: "Beautiful heavily embroidered lehenga designed for grand celebrations and bridal wear."
  },
  {
    id: 6,
    src: "https://pinkphulkari.com/cdn/shop/collections/lucknowi-chikankari-suits-524683.webp?v=1726107344",
    title: "Chikankari Suit",
    description: "Authentic Lucknowi Chikankari suit in soothing colors and delicate hand embroidery."
  }
];

export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  useEffect(() => {
    // Fonts initialization
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..700&family=Outfit:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll, .service-card, .testimonial-card, .gallery-item').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsNavOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header>
        <div className="header-container">
          <a href="#home" className="logo" onClick={(e) => handleNavClick(e, 'home')}>KTA</a>
          
          <nav className={isNavOpen ? 'active' : ''}>
            <a href="#home" className="nav-link" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
            <a href="#services" className="nav-link" onClick={(e) => handleNavClick(e, 'services')}>Collections</a>
            <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, 'about')}>About</a>
            <a href="#gallery" className="nav-link" onClick={(e) => handleNavClick(e, 'gallery')}>Gallery</a>
            <a href="#contact" className="nav-link" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a>
          </nav>
          
          <div className="header-cta">
            <a href={`tel:+${phoneNumber}`} className="btn btn-secondary">📞 Call</a>
            <a href={getWhatsAppUrl("Hi Khushal ji, saree suit lehenga collection dekhni hai 💕")} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> WhatsApp
            </a>
          </div>
          
          <div className={`hamburger ${isNavOpen ? 'active' : ''}`} onClick={() => setIsNavOpen(!isNavOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Bar */}
      <div className="mobile-bottom-bar">
        <a href={`tel:+${phoneNumber}`} className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>📞 Call</a>
        <a href={getWhatsAppUrl("Hi Khushal ji, saree suit lehenga collection dekhni hai 💕")} className="btn btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon /> WhatsApp
        </a>
      </div>

      <main>
        {/* Hero */}
        <section id="home" className="hero">
          <div className="container">
            <div className="hero-content animate-on-scroll">
              <h1>Khushal Textiles Agency</h1>
              <h2>Premium Saree, Suit &amp; Lehenga Collection Specialist</h2>
              <p className="hero-subtitle">
                Wholesale &amp; Retail | Exclusive designs sourced from Kolkata &amp; Surat | 10+ Years Trusted in Jaipur
              </p>
              <div className="hero-cta">
                <a href={getWhatsAppUrl("Hi Khushal ji, saree suit lehenga collection dekhni hai 💕")} className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem', display: 'inline-flex', alignItems: 'center' }} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> View Latest Collection
                </a>
                <a href={`tel:+${phoneNumber}`} className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
                  Call Now
                </a>
              </div>
            </div>
            
            <div className="hero-visual animate-on-scroll" style={{ animationDelay: '0.2s' }}>
              <img src="https://cdn0.weddingwire.in/vendor/2912/3_2/960/jpg/agarwals-sarees-and-suits-5_15_222912-1560169221.jpeg" alt="Premium saree collection" loading="eager" />
              <svg className="fabric-motif" viewBox="0 0 100 100">
                <defs>
                  <pattern id="fabric1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M0 0 L10 10 M10 0 L0 10" stroke="#d97706" strokeWidth="1" opacity="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#fabric1)"/>
              </svg>
            </div>
          </div>
        </section>

        {/* Trust Strip */}
        <section className="trust-strip">
          <div className="container">
            <div className="trust-grid animate-on-scroll">
              <div className="trust-item">
                <h3>10+</h3>
                <p>Years Serving Jaipur</p>
              </div>
              <div className="trust-item">
                <h3>3</h3>
                <p>Cities Sourced</p>
              </div>
              <div className="trust-item">
                <h3>10000+</h3>
                <p>Satisfied Customers</p>
              </div>
              <div className="trust-item">
                <h3>Daily</h3>
                <p>New Arrivals</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="services">
          <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '1rem' }}>Our Collections</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 4rem' }}>
              Premium quality sarees, suits &amp; lehengas for every occasion. Wholesale prices for retailers.
            </p>

            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">🥻</div>
                <h3>Premium Sarees</h3>
                <p style={{marginBottom: '1.5rem'}}>Variety collection of Banarasi, Kanjivaram, Chanderi &amp; designer sarees. Perfect for weddings, festivals &amp; daily wear.</p>
                <a href={getWhatsAppUrl("Hi Khushal ji, saree collection details bhej sakte hain? Quantity aur price bhi bata dijiye")} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center' }} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> WhatsApp Catalogue
                </a>
              </div>
              
              <div className="service-card">
                <div className="service-icon">👗</div>
                <h3>Suits &amp; Salwar</h3>
                <p style={{marginBottom: '1.5rem'}}>Exclusive Lucknowi chikankari, embroidered &amp; printed suits. Latest designer collection for all occasions.</p>
                <a href={getWhatsAppUrl("Hi Khushal ji, suit collection ka catalogue bhej dijiye. Latest designs aur wholesale rate")} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center' }} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> View Suits
                </a>
              </div>
              
              <div className="service-card">
                <div className="service-icon">✨</div>
                <h3>Lehengas</h3>
                <p style={{marginBottom: '1.5rem'}}>Bridal &amp; party wear lehengas with heavy embroidery. Perfect for weddings &amp; celebrations.</p>
                <a href={getWhatsAppUrl("Hi Khushal ji, lehenga collection dikhayiye. Bridal aur party wear ke designs bhej sakte hain")} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center' }} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> Lehenga Catalogue
                </a>
              </div>
              
              <div className="service-card" style={{ gridColumn: 'span 2', maxWidth: '500px', margin: '0 auto' }}>
                <div className="service-icon" style={{ background: 'linear-gradient(135deg, var(--accent-secondary), var(--accent-tertiary))' }}>🏪</div>
                <h3>Wholesale &amp; Retail</h3>
                <p>Best rates for bulk orders. Direct sourcing from Kolkata &amp; Surat mills. Minimum order just 5 pieces.</p>
                <div className="service-price">Trade Prices <span style={{ fontSize: '0.8em' }}>Available</span></div>
                <a href={getWhatsAppUrl("Hi Khushal ji, wholesale rate list bhej dijiye. Minimum order kitna hai")} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center' }} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> Get Wholesale Rates
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="about" style={{ background: 'var(--bg-secondary)' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '4rem' }}>About Khushal Textiles</h2>
            
            <div className="about-grid">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="owner-avatar">KTA</div>
              </div>
              
              <div className="about-content animate-on-scroll">
                <p>Hi, I'm <strong>Khushal Sharma</strong>. Started this journey 10 years ago from a small 100 sq ft shop in Kishanpole. Today, we serve retailers across Rajasthan with premium sarees, suits &amp; lehengas.</p>
                
                <p>What makes us different? <strong>Direct sourcing branches in Kolkata &amp; Surat</strong>. No middlemen, factory-fresh collections at unbeatable prices. My father taught me fabric quality testing – still check every piece personally.</p>
                
                <p>Remember Diwali 2018? Supplied 500+ bridal lehengas in 3 days! That's the trust we've built over years. Whether you're a retailer or buying for wedding, we treat you family.</p>
                
                <div className="differentiators">
                  <span className="differentiator">✅ Kolkata-Surat Direct Sourcing</span>
                  <span className="differentiator">✅ 10+ Years Experience</span>
                  <span className="differentiator">✅ Wholesale &amp; Retail</span>
                  <span className="differentiator">✅ Same Day Dispatch</span>
                  <span className="differentiator">✅ Quality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="gallery">
          <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '1rem' }}>Latest Collection</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem' }}>Fresh arrivals every week</p>
            
            <div className="gallery-grid">
              {galleryItems.map((item) => (
                <div key={item.id} className="gallery-item" style={{ cursor: 'pointer' }} onClick={() => setSelectedImage(item)}>
                  <img src={item.src} alt={item.title} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonials" style={{ background: 'var(--bg-secondary)' }}>
          <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '4rem' }}>What Retailers Say</h2>
            
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} />)}
                </div>
                <p className="testimonial-text">"Ordered 50 sarees for Diwali, delivered same day! Quality was excellent, customers loved the Banarasi collection. Best wholesale rates in Jaipur."</p>
                <div>
                  <div className="testimonial-author">Ramesh Tailor</div>
                  <div className="testimonial-location">Chandpole Bazaar</div>
                </div>
              </div>
              
              <div className="testimonial-card">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} />)}
                </div>
                <p className="testimonial-text">"Lehenga collection is outstanding! Got 20 pieces for wedding season, all sold in 2 days. Khushal ji's Kolkata sourcing makes real difference."</p>
                <div>
                  <div className="testimonial-author">Priya Designer</div>
                  <div className="testimonial-location">MI Road</div>
                </div>
              </div>
              
              <div className="testimonial-card">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((s) => <StarIcon key={s} />)}
                </div>
                <p className="testimonial-text">"Reliable supplier for past 3 years. Never missed delivery date. Their chikankari suits sell like hot cakes in my store!"</p>
                <div>
                  <div className="testimonial-author">Amit Fabrics</div>
                  <div className="testimonial-location">Tripolia Bazaar</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="pricing">
          <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '2rem' }}>Transparent Wholesale Pricing</h2>
            <div className="pricing-list animate-on-scroll">
              <div className="price-item">
                <span>Premium Sarees (per piece)</span>
                <span>₹2,500 - ₹12,000</span>
              </div>
              <div className="price-item">
                <span>Designer Suits (per set)</span>
                <span>₹1,800 - ₹6,500</span>
              </div>
              <div className="price-item">
                <span>Bridal Lehengas (per set)</span>
                <span>₹5,500 - ₹25,000</span>
              </div>
              <div className="price-item">
                <span>Minimum Order</span>
                <span>5 pieces</span>
              </div>
              <div className="price-item">
                <span><strong>Ready to Order?</strong></span>
                <strong>Call/WhatsApp Now!</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '4rem' }}>Visit Us</h2>
            
            <div className="contact-grid">
              <div className="map-container animate-on-scroll">
                <iframe 
                  src="https://maps.google.com/maps?q=Shop+No+121,+1st+Floor,+C.K.+House+No.+677,+Harshukh+Kasliwal+Ka+Rasta,+Bichun+Market,+Kishanpole+Bazaar,+Jaipur+-+302003&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
              
              <div className="contact-info">
                <div className="contact-item animate-on-scroll" style={{ animationDelay: '0.1s' }}>
                  <div className="contact-icon">📍</div>
                  <div>
                    <h3>Shop Location</h3>
                    <p>Shop No 121, 1st Floor<br/>C.K. House No. 677, Harshukh Kasliwal Ka Rasta<br/>Bichun Market, Kishanpole Bazaar<br/>Jaipur - 302003 (Raj.)</p>
                  </div>
                </div>
                
                <div className="contact-item animate-on-scroll" style={{ animationDelay: '0.2s' }}>
                  <div className="contact-icon">📱</div>
                  <div>
                    <h3>Phone &amp; WhatsApp</h3>
                    <p><strong>8013128777</strong> (Primary)<br/>9339391287 (Secondary)</p>
                  </div>
                </div>
                
                <div className="contact-item animate-on-scroll" style={{ animationDelay: '0.3s' }}>
                  <div className="contact-icon">✉️</div>
                  <div>
                    <h3>Email</h3>
                    <p>khushalsharma499@gmail.com</p>
                  </div>
                </div>
                
                <div className="contact-item animate-on-scroll" style={{ animationDelay: '0.4s' }}>
                  <div className="contact-icon">🕒</div>
                  <div>
                    <h3>Business Hours</h3>
                    <div className="hours-grid">
                      <div>Monday - Saturday</div>
                      <div>10:00 AM – 8:30 PM</div>
                      <div>Sunday</div>
                      <div>11:00 AM – 6:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div>
              <h3 style={{ marginBottom: '1rem' }}>Khushal Textiles Agency</h3>
              <p style={{ color: '#aaa', marginBottom: '1rem' }}>Premium saree, suit and lehenga collection specialist</p>
              <p style={{ color: '#aaa', fontSize: '0.85rem' }}>© 2021 Khushal Textiles Agency. All rights reserved.</p>
            </div>
            
            <div>
              <h4 style={{ marginBottom: '1rem' }}>Quick Links</h4>
              <ul style={{ listStyle: 'none' }}>
                <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')} style={{ color: '#ccc', textDecoration: 'none' }}>Home</a></li>
                <li><a href="#services" onClick={(e) => handleNavClick(e, 'services')} style={{ color: '#ccc', textDecoration: 'none' }}>Collections</a></li>
                <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')} style={{ color: '#ccc', textDecoration: 'none' }}>About</a></li>
                <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')} style={{ color: '#ccc', textDecoration: 'none' }}>Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ marginBottom: '1rem' }}>Contact Info</h4>
              <p style={{ color: '#ccc' }}>Shop No 121, 1st Floor<br/>Kishanpole Bazar<br/>Jaipur - 302003</p>
              <p style={{ color: '#aaa', fontSize: '0.9rem' }}>8013128777 | 9339391287</p>
            </div>
          </div>
          
          <div className="footer-cta">
            <h3 style={{ marginBottom: '1.5rem' }}>Ready to place your order?</h3>
            <a href={getWhatsAppUrl("Hi Khushal ji, main order place karna chahta hoon. Catalogue bhej dijiye")} className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1.25rem 3rem', display: 'inline-flex', alignItems: 'center' }} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> Order on WhatsApp
            </a>
          </div>
        </div>
      </footer>
      
      {selectedImage && (
        <div className="modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedImage(null)}>
              &times;
            </button>
            <div className="modal-image-container">
              <img src={selectedImage.src} alt={selectedImage.title} />
            </div>
            <div className="modal-info">
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{selectedImage.title}</h3>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>{selectedImage.description}</p>
              <a href={getWhatsAppUrl(`Hi Khushal ji, I'm interested in the ${selectedImage.title}.`)} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center' }} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon /> Shop Now on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
