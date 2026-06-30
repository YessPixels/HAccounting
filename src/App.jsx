import { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Download, 
  BookOpen, 
  Award, 
  CheckCircle, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronLeft,
  Star, 
  Globe, 
  Users, 
  ShieldCheck, 
  TrendingUp,
  Briefcase,
  Heart,
  CreditCard
} from 'lucide-react';
import { translations, initialTestimonials } from './localization';
import './App.css';

// Import local images from assets folder
import principalImg from './img/principal.jpeg';
import guiaImg from './img/guia.jpeg';
import qboImg from './assets/qbo.jpg';

// Import cofounders and logo from img folder
import raulImg from './img/Sobre mi Ra.jpeg';
import ricardoImg from './img/Sobre mi Ri.jpeg';
import logoImg from './img/Logo HAcconting.png';

function App() {
  const [lang, setLang] = useState('es'); // 'es' or 'en'
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAboutSlide, setActiveAboutSlide] = useState(0);
  
  const [activeService, setActiveService] = useState(null);
  
  // Testimonials State
  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('hola_testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });
  


  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Ebook Modal / Lead Capture State
  const [ebookModalOpen, setEbookModalOpen] = useState(false);
  const [ebookForm, setEbookForm] = useState({
    name: '',
    email: ''
  });
  
  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Fetch texts based on selected language
  const t = translations[lang];

  // Monitor scroll for sticky header shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Save testimonials to localStorage
  useEffect(() => {
    localStorage.setItem('hola_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  // Auto-slide for Nosotros carousel (resets 6s timer on manual changes)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAboutSlide((prev) => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(timer);
  }, [activeAboutSlide]);

  // Push Toast notification
  const addToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };

  // Handle contact form submit
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.phone) {
      addToast(lang === 'es' ? 'Por favor completa los campos obligatorios.' : 'Please fill in required fields.');
      return;
    }
    
    // Simulate sending email to corporate address
    console.log("Sending email to hello@holaaccounting.com...", contactForm);
    
    setIsSubmitted(true);
    addToast(lang === 'es' ? '¡Llamada reservada con éxito!' : 'Discovery call scheduled successfully!');
  };

  // Reset booking form
  const handleResetBooking = () => {
    setContactForm({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: ''
    });
    setIsSubmitted(false);
  };

  // Handle Ebook Download lead capture
  const handleEbookSubmit = (e) => {
    e.preventDefault();
    if (!ebookForm.name || !ebookForm.email) {
      addToast(lang === 'es' ? 'Completa tu nombre y correo.' : 'Please enter your name and email.');
      return;
    }
    
    console.log("Lead captured for free guide:", ebookForm);
    setEbookModalOpen(false);
    setEbookForm({ name: '', email: '' });
    addToast(lang === 'es' ? '¡Guía enviada a tu correo!' : 'Guide successfully sent to your inbox!');
    addToast(lang === 'es' ? 'Descargando archivo PDF...' : 'Starting PDF download...');
  };



  // Smooth scroll helper
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="app-container">
      {/* Toast Notification Box */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            <CheckCircle size={18} className="benefit-icon" />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* --- HEADER --- */}
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Logo image */}
          <a href="#" className="logo-container" onClick={(e) => { e.preventDefault(); scrollToSection('inicio'); }}>
            <img src={logoImg} alt="Hola! Accounting" className="logo-image-file" />
          </a>

          {/* Desktop Menu */}
          <nav className="nav-menu">
            <li><a href="#inicio" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('inicio'); }}>{t.nav.home}</a></li>
            <li><a href="#servicios" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('servicios'); }}>{t.nav.services}</a></li>
            <li><a href="#recursos" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('recursos'); }}>{t.nav.resources}</a></li>
            <li><a href="#sobre-mi" className="nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('sobre-mi'); }}>{t.nav.about}</a></li>
          </nav>

          {/* Action buttons */}
          <div className="nav-actions">
            <button 
              className="lang-selector" 
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              aria-label="Toggle language"
            >
              <span>{lang === 'es' ? 'ES' : 'EN'}</span>
              <span className="lang-separator">|</span>
              <span style={{ opacity: 0.5 }}>{lang === 'es' ? 'EN' : 'ES'}</span>
            </button>
            <a 
              href="https://calendar.app.google/dBVKQ2pbP3CL4GCv8" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
            >
              {t.nav.cta}
            </a>
          </div>

          {/* Mobile Hamburger toggle */}
          <button 
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-menu-links">
          <li><a href="#inicio" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('inicio'); }}>{t.nav.home}</a></li>
          <li><a href="#servicios" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('servicios'); }}>{t.nav.services}</a></li>
          <li><a href="#recursos" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('recursos'); }}>{t.nav.resources}</a></li>
          <li><a href="#sobre-mi" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('sobre-mi'); }}>{t.nav.about}</a></li>
        </ul>
        <div className="mobile-actions">
          <button 
            className="lang-selector" 
            onClick={() => { setLang(lang === 'es' ? 'en' : 'es'); setMobileMenuOpen(false); }}
            style={{ justifyContent: 'center', width: '100%', padding: '12px' }}
          >
            <Globe size={16} />
            <span style={{ marginLeft: '8px' }}>{lang === 'es' ? 'English (EN)' : 'Español (ES)'}</span>
          </button>
          <a 
            href="https://calendar.app.google/dBVKQ2pbP3CL4GCv8" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t.nav.cta}
          </a>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <section id="inicio" className="hero-section">
        <div className="container-wide hero-grid">
          <div className="hero-content">
            <h1>
              {lang === 'es' ? (
                <>Entiende tus números. <br /><span className="text-highlight">Toma mejores decisiones.</span></>
              ) : (
                <>Understand your numbers. <br /><span className="text-highlight">Make better decisions.</span></>
              )}
            </h1>
            <p className="hero-subtitle">
              {t.hero.subtitle}
            </p>
            <div className="hero-ctas">
              <a 
                href="https://calendar.app.google/dBVKQ2pbP3CL4GCv8" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn hero-btn-primary"
              >
                <Calendar size={18} className="btn-icon" />
                {t.hero.ctaPrimary}
              </a>
              <a 
                href="https://forms.gle/TnqPtbAfyAwc5JEf8" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn hero-btn-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
            
            <div className="benefits-row">
              <div className="benefit-item">
                <CheckCircle size={16} className="benefit-icon" />
                <span>{t.hero.benefit1}</span>
              </div>
              <div className="benefit-item">
                <CheckCircle size={16} className="benefit-icon" />
                <span>{t.hero.benefit2}</span>
              </div>
              <div className="benefit-item">
                <CheckCircle size={16} className="benefit-icon" />
                <span>{t.hero.benefit3}</span>
              </div>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <img 
              src={principalImg} 
              alt="Hola! Accounting" 
              className="hero-image"
              width="450"
              height="338"
              loading="eager"
            />
            {/* Superimposed Card Overlay on Nancy Desk Photo */}
            <div className="hero-floating-card">
              <div className="hero-floating-icon-box">
                <TrendingUp size={22} />
              </div>
              <span className="hero-floating-text">{t.hero.floatingCardText}</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section id="servicios" className="services-section">
        <div className="container-wide">
          <div className="section-header">
            <h2>{t.services.title}</h2>
          </div>

          <div className="services-grid">
            {[
              { id: 1, icon: BookOpen, title: t.services.s1Title, desc: t.services.s1Desc },
              { id: 2, icon: TrendingUp, title: t.services.s2Title, desc: t.services.s2Desc },
              { id: 3, icon: ShieldCheck, title: t.services.s3Title, desc: t.services.s3Desc },
              { id: 4, icon: Users, title: t.services.s4Title, desc: t.services.s4Desc },
              { id: 5, icon: CreditCard, title: t.services.s5Title, desc: t.services.s5Desc }
            ].map((srv, idx) => {
              const Icon = srv.icon;
              const isOpen = activeService === idx;
              return (
                <div 
                  key={srv.id} 
                  className={`service-card ${isOpen ? 'is-open' : ''}`}
                  onClick={() => setActiveService(isOpen ? null : idx)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="service-icon-box">
                    <Icon size={24} />
                  </div>
                  <h3>{srv.title}</h3>
                  
                  <div className="service-desc-wrapper" style={{ 
                    maxHeight: isOpen ? '200px' : '0px', 
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease, opacity 0.3s ease, margin-top 0.3s ease',
                    marginTop: isOpen ? '12px' : '0px'
                  }}>
                    <p style={{ margin: 0 }}>{srv.desc}</p>
                  </div>
                  
                  <div className="service-toggle-indicator" style={{ 
                    marginTop: 'auto', 
                    paddingTop: '16px',
                    color: 'var(--turquoise-dark)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span>{isOpen ? (lang === 'es' ? 'Ver menos' : 'Show less') : (lang === 'es' ? 'Ver más' : 'Show more')}</span>
                    <span style={{ 
                      transform: isOpen ? 'rotate(-90deg)' : 'rotate(90deg)', 
                      transition: 'transform 0.3s ease',
                      display: 'inline-block'
                    }}>➔</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- HOW WE WORK SECTION --- */}
      <section id="como-trabajamos" className="how-we-work-section">
        <div className="container-wide">
          <div className="section-header">
            <h2>{t.howWeWork.title}</h2>
          </div>

          <div className="timeline-container">
            {/* Desktop Horizontal Timeline */}
            <div className="timeline-horizontal">
              {/* Step 1 */}
              <div className="timeline-step">
                <span className="step-num-bubble">1</span>
                <div className="step-icon-circle">
                  <Calendar size={28} />
                </div>
                <h3>{t.howWeWork.step1Title}</h3>
                <p>{t.howWeWork.step1Desc}</p>
                {/* Arrow to Next */}
                <div className="timeline-connector">
                  <span className="timeline-arrow">➔</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="timeline-step">
                <span className="step-num-bubble">2</span>
                <div className="step-icon-circle">
                  <BookOpen size={28} />
                </div>
                <h3>{t.howWeWork.step2Title}</h3>
                <p>{t.howWeWork.step2Desc}</p>
                {/* Arrow to Next */}
                <div className="timeline-connector">
                  <span className="timeline-arrow">➔</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="timeline-step">
                <span className="step-num-bubble">3</span>
                <div className="step-icon-circle">
                  <Users size={28} />
                </div>
                <h3>{t.howWeWork.step3Title}</h3>
                <p>{t.howWeWork.step3Desc}</p>
              </div>
            </div>

            {/* Mobile Vertical Timeline */}
            <div className="timeline-vertical">
              <div className="v-step">
                <div className="v-step-num-bubble">1</div>
                <div className="v-step-icon-circle">
                  <Calendar size={16} />
                </div>
                <h3>{t.howWeWork.step1Title}</h3>
                <p>{t.howWeWork.step1Desc}</p>
              </div>

              <div className="v-step">
                <div className="v-step-num-bubble">2</div>
                <div className="v-step-icon-circle">
                  <BookOpen size={16} />
                </div>
                <h3>{t.howWeWork.step2Title}</h3>
                <p>{t.howWeWork.step2Desc}</p>
              </div>

              <div className="v-step">
                <div className="v-step-num-bubble">3</div>
                <div className="v-step-icon-circle">
                  <Users size={16} />
                </div>
                <h3>{t.howWeWork.step3Title}</h3>
                <p>{t.howWeWork.step3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FREE RESOURCES SECTION --- */}
      <section id="recursos" className="resources-section">
        <div className="container-wide">
          <div className="resource-box">
            <div className="resource-grid">
              <div className="resource-image-panel">
                <img 
                  src={guiaImg} 
                  alt="Portada del Ebook - 5 errores financieros" 
                  className="resource-mockup"
                  width="240"
                  height="320"
                  loading="lazy"
                />
              </div>
              <div className="resource-info-panel">
                <span className="resource-tag">{t.resources.tag}</span>
                <h3>{t.resources.title}</h3>
                <p>{t.resources.desc}</p>
                <a 
                  href="https://forms.gle/TnqPtbAfyAwc5JEf8" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn resource-download-btn"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {t.resources.button} <Download size={16} style={{ marginLeft: '8px' }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section id="testimonios" className="testimonials-section">
        <div className="container-wide">
          <div className="section-header">
            <h2>{t.testimonials.title}</h2>
          </div>

          {/* Testimonials List Grid */}
          {testimonials.length === 0 ? (
            <p className="text-center" style={{ color: 'var(--text-light)', fontStyle: 'italic', margin: '40px 0' }}>
              {t.testimonials.emptyMsg}
            </p>
          ) : (
            <div className="testimonials-grid">
              {testimonials.map((test) => (
                <div key={test.id} className="testimonial-card">
                  <div className="stars-row">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        fill={i < test.rating ? 'currentColor' : 'none'} 
                        stroke={i < test.rating ? 'none' : 'currentColor'}
                      />
                    ))}
                  </div>
                  <p className="testimonial-text">
                    {typeof test.text === 'string' ? test.text : (test.text[lang] || test.text.es)}
                  </p>
                  <div className="testimonial-author">
                    <span className="author-name">{test.name}</span>
                    <span className="author-business">
                      {typeof test.business === 'string' ? test.business : (test.business[lang] || test.business.es)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}


        </div>
      </section>

      {/* --- SOBRE MI SECTION (NOSOTROS CAROUSEL) --- */}
      <section id="sobre-mi" className="about-section">
        <div className="container-wide">
          {/* Centered Section Header for Nosotros */}
          <div className="section-header">
            <h2>{t.about.tag}</h2>
          </div>

          <div className="about-carousel-wrapper" style={{ marginTop: '40px' }}>
            {[
              {
                name: "Raúl",
                img: raulImg,
                role: t.about.profiles[0].role,
                bio: t.about.profiles[0].bio
              },
              {
                name: "Ricardo",
                img: ricardoImg,
                role: t.about.profiles[1].role,
                bio: t.about.profiles[1].bio
              }
            ].map((profile, index) => (
              <div 
                key={index} 
                className={`about-grid about-slide-content ${activeAboutSlide === index ? 'active' : ''}`}
              >
                <div className="about-image-wrapper">
                  <img 
                    src={profile.img} 
                    alt={`${profile.name} - ${profile.role}`} 
                    className="about-image"
                    width="280"
                    height="280"
                    loading="lazy"
                  />
                </div>

                <div className="about-info">
                  <h3 style={{ fontSize: '2rem', marginBottom: '4px', color: 'var(--primary-navy)' }}>{profile.name}</h3>
                  <h4 style={{ 
                    fontFamily: 'var(--font-body)', 
                    fontSize: '0.92rem', 
                    color: 'var(--turquoise-dark)', 
                    fontWeight: 700, 
                    marginBottom: '16px' 
                  }}>{profile.role}</h4>
                  
                  <p className="about-bio-text" style={{ whiteSpace: 'pre-line' }}>
                    {profile.bio}
                  </p>



                  {/* Bullets with icons matching image */}
                  <div className="about-bullets-box" style={{ marginTop: '24px', borderTop: '1px solid rgba(13, 44, 84, 0.08)', paddingTop: '20px' }}>
                    <div className="about-bullet-item">
                      <div className="about-bullet-icon-wrapper">
                        <Award size={18} />
                      </div>
                      <span className="about-bullet-text">{t.about.bullet1}</span>
                    </div>

                    <div className="about-bullet-item">
                      <div className="about-bullet-icon-wrapper">
                        <Briefcase size={18} />
                      </div>
                      <span className="about-bullet-text">{t.about.bullet2}</span>
                    </div>

                    <div className="about-bullet-item">
                      <div className="about-bullet-icon-wrapper">
                        <Heart size={18} />
                      </div>
                      <span className="about-bullet-text">{t.about.bullet3}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Carousel Controls */}
            <div className="about-carousel-controls">
              <div className="carousel-dots">
                {[0, 1].map((index) => (
                  <button
                    key={index}
                    className={`carousel-dot ${activeAboutSlide === index ? 'active' : ''}`}
                    onClick={() => setActiveAboutSlide(index)}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className="carousel-nav-arrows">
                <button 
                  className="carousel-arrow-btn" 
                  onClick={() => setActiveAboutSlide(activeAboutSlide === 0 ? 1 : 0)}
                  aria-label="Previous cofounder"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  className="carousel-arrow-btn" 
                  onClick={() => setActiveAboutSlide(activeAboutSlide === 1 ? 0 : 1)}
                  aria-label="Next cofounder"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CERTIFICATIONS SECTION --- */}
      <section id="certificaciones" className="certifications-section">
        <div className="container-wide">
          <div className="certifications-box">
            <h2>{t.certifications.title}</h2>
            <div className="cert-logo-container">
              <img 
                src={qboImg} 
                alt="QuickBooks Certified ProAdvisor Logo" 
                className="cert-logo"
                width="180"
                height="80"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA BANNER (Capsule banner inside page) --- */}
      <section className="final-cta-section">
        <div className="final-cta-banner">
          <div className="final-cta-left">
            <div className="final-cta-icon-box">
              <Calendar size={24} />
            </div>
            <div className="final-cta-text">
              <h2>{t.finalCta.title}</h2>
              <p>{t.finalCta.subtitle}</p>
            </div>
          </div>
          <a 
            href="https://calendar.app.google/dBVKQ2pbP3CL4GCv8" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn final-cta-btn"
          >
            {t.finalCta.button} <ChevronRight size={16} style={{ marginLeft: '4px' }} />
          </a>
        </div>
      </section>



      {/* --- FOOTER --- */}
      <footer className="footer">
        <div className="footer-grid">
          {/* Column 1: Brand & socials */}
          <div className="footer-brand">
            <a href="#" className="logo-container" onClick={(e) => { e.preventDefault(); scrollToSection('inicio'); }} style={{ marginBottom: '14px' }}>
              <img src={logoImg} alt="Hola! Accounting" className="logo-image-file" style={{ height: '65px' }} />
            </a>
            <p className="footer-brand-desc">
              {t.footer.tagline}
            </p>
            <div className="footer-social-row">
              <a 
                href="https://www.instagram.com/hola.accounting?igsh=aG5vdmxnc2VnbHlx" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link-circle" 
                aria-label="Instagram"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.917 3.917 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04 1.804.57 3.205 1.726 4.361 1.156 1.156 2.556 1.686 4.36 1.726.853.038 1.125.048 3.298.048 2.17 0 2.442-.01 3.296-.048 1.805-.04 3.207-.57 4.361-1.726 1.156-1.155 1.686-2.556 1.726-4.36.038-.853.048-1.125.048-3.298 0-2.172-.01-2.444-.048-3.298-.04-1.803-.57-3.204-1.726-4.361-1.156-1.156-2.556-1.686-4.36-1.726C10.443.01 10.17 0 8 0zm.002 1.46c2.14 0 2.394.008 3.237.046.778.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.707.275 1.486.038.84.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.778-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.778-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/hola-accounting-04986141a?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-link-circle" 
                aria-label="LinkedIn"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 1.146C0 .513.52 0 1.161 0h13.678C15.48 0 16 .513 16 1.146v13.708c0 .633-.52 1.146-1.161 1.146H1.161C.52 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Servicios */}
          <div className="footer-column">
            <h4>{t.footer.quickLinks}</h4>
            <ul className="footer-links">
              <li className="footer-link-item"><a href="#servicios" onClick={(e) => { e.preventDefault(); scrollToSection('servicios'); }}>Bookkeeping</a></li>
              <li className="footer-link-item"><a href="#servicios" onClick={(e) => { e.preventDefault(); scrollToSection('servicios'); }}>Financial Reporting</a></li>
              <li className="footer-link-item"><a href="#servicios" onClick={(e) => { e.preventDefault(); scrollToSection('servicios'); }}>Catch-Up & Clean-Up</a></li>
              <li className="footer-link-item"><a href="#servicios" onClick={(e) => { e.preventDefault(); scrollToSection('servicios'); }}>Advisory Services</a></li>
              <li className="footer-link-item"><a href="#servicios" onClick={(e) => { e.preventDefault(); scrollToSection('servicios'); }}>Credit Repair</a></li>
            </ul>
          </div>

          {/* Column 3: Recursos */}
          <div className="footer-column">
            <h4>{t.footer.resources}</h4>
            <ul className="footer-links">
              <li className="footer-link-item"><a href="#recursos" onClick={(e) => { e.preventDefault(); scrollToSection('recursos'); }}>5 Errores Financieros</a></li>
            </ul>
          </div>

          {/* Column 4: Enlaces */}
          <div className="footer-column">
            <h4>{t.footer.links}</h4>
            <ul className="footer-links">
              <li className="footer-link-item"><a href="#sobre-mi" onClick={(e) => { e.preventDefault(); scrollToSection('sobre-mi'); }}>Sobre Mí</a></li>
              <li className="footer-link-item"><a href="https://calendar.app.google/dBVKQ2pbP3CL4GCv8" target="_blank" rel="noopener noreferrer">{t.nav.cta}</a></li>
              <li className="footer-link-item"><a href="#privacy">Política de Privacidad</a></li>
              <li className="footer-link-item"><a href="#terms">Términos y Condiciones</a></li>
            </ul>
          </div>

          {/* Column 5: Contacto */}
          <div className="footer-column">
            <h4>{t.footer.contactInfo}</h4>
            <ul className="footer-info-list">
              <li className="footer-info-item">
                <Mail size={14} className="footer-info-icon" />
                <span>hola@holaaccounting.com</span>
              </li>
              <li className="footer-info-item" style={{ alignItems: 'flex-start' }}>
                <Phone size={14} className="footer-info-icon" style={{ marginTop: '3px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span><strong style={{ fontSize: '0.75rem', color: 'var(--primary-navy)', opacity: 0.9 }}>{lang === 'es' ? 'Español' : 'Spanish'}:</strong> (570) 987-6543</span>
                  <span><strong style={{ fontSize: '0.75rem', color: 'var(--primary-navy)', opacity: 0.9 }}>English:</strong> (570) 123-4567</span>
                </div>
              </li>
              <li className="footer-info-item">
                <MapPin size={14} className="footer-info-icon" />
                <span>Texas, USA</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-copyright">
            &copy; 2024 {t.footer.rights}
          </span>
        </div>
      </footer>

      {/* --- LEAD CAPTURE MODAL (EBOOK DOWNLOAD) --- */}
      {ebookModalOpen && (
        <div className="modal-backdrop" onClick={() => setEbookModalOpen(false)}>
          <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn" 
              onClick={() => setEbookModalOpen(false)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <div className="modal-header">
              <span className="resource-tag" style={{ textAlign: 'center', marginBottom: '8px' }}>{t.resources.tag}</span>
              <h3>{t.resources.formTitle}</h3>
              <p>{t.resources.formSubtitle}</p>
            </div>
            
            <form onSubmit={handleEbookSubmit} className="modal-form">
              <div className="input-group">
                <label htmlFor="modal-name">{t.resources.fieldName} *</label>
                <input 
                  type="text" 
                  id="modal-name"
                  className="form-input" 
                  placeholder="Nancy Ramos"
                  value={ebookForm.name}
                  onChange={(e) => setEbookForm({...ebookForm, name: e.target.value})}
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="modal-email">{t.resources.fieldEmail} *</label>
                <input 
                  type="email" 
                  id="modal-email"
                  className="form-input" 
                  placeholder="nancy@miempresa.com"
                  value={ebookForm.email}
                  onChange={(e) => setEbookForm({...ebookForm, email: e.target.value})}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                <Download size={18} className="btn-icon" />
                {t.resources.downloadCta}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
