import React, { useRef, useEffect, useState } from 'react';
import './certificacoes.css';

function Certificacoes({ translations }) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentCertSlide, setCurrentCertSlide] = useState(0);
  const [currentEduSlide, setCurrentEduSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3 // Ativa quando 30% da seção está visível
      }
    );

    const currentSection = sectionRef.current;

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  // Detectar mudanças no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Funções de navegação do carrossel - Certificações
  const nextCertSlide = () => {
    setCurrentCertSlide((prev) => (prev + 1) % translations.certifications.length);
  };

  const prevCertSlide = () => {
    setCurrentCertSlide((prev) => (prev - 1 + translations.certifications.length) % translations.certifications.length);
  };

  const goToCertSlide = (index) => {
    setCurrentCertSlide(index);
  };

  // Funções de navegação do carrossel - Educação
  const nextEduSlide = () => {
    setCurrentEduSlide((prev) => (prev + 1) % translations.education.length);
  };

  const prevEduSlide = () => {
    setCurrentEduSlide((prev) => (prev - 1 + translations.education.length) % translations.education.length);
  };

  const goToEduSlide = (index) => {
    setCurrentEduSlide(index);
  };

  return (
    <section className={`certificacoes ${isVisible ? 'animate' : ''}`} ref={sectionRef}>
      <div className="certificacoes-content">
        <h2>{translations.academicTitle}</h2>
        <p className="academic-description">{translations.academicDescription}</p>
        
        <div className="academic-sections">
          <div className="certifications-section">
            <h3>{translations.certificationsTitle}</h3>
            {isMobile ? (
              // Carrossel para mobile - Certificações
              <div className="certifications-carousel">
                <div className="carousel-container">
                  <div 
                    className="carousel-track"
                    style={{
                      transform: `translateX(-${currentCertSlide * 100}%)`,
                      transition: 'transform 0.3s ease-in-out'
                    }}
                  >
                    {translations.certifications.map((certification, index) => (
                      <div key={index} className="carousel-slide">
                        <a 
                          href={certification.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="certification-card"
                        >
                          <div className="certification-image">
                            <img src={certification.image} alt={certification.title} />
                          </div>
                          <div className="certification-info">
                            <h4>{certification.title}</h4>
                            <p className="certification-issuer">{certification.issuer}</p>
                            <p className="certification-date">{certification.date}</p>
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Botões de navegação */}
                <div className="carousel-nav">
                  <button className="carousel-btn prev" onClick={prevCertSlide}>
                    &#8249;
                  </button>
                  <button className="carousel-btn next" onClick={nextCertSlide}>
                    &#8250;
                  </button>
                </div>
                
                {/* Indicadores */}
                <div className="carousel-indicators">
                  {translations.certifications.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${currentCertSlide === index ? 'active' : ''}`}
                      onClick={() => goToCertSlide(index)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              // Grid para desktop/tablet
              <div className="certifications-grid">
                {translations.certifications.map((certification, index) => (
                  <a 
                    key={index} 
                    href={certification.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="certification-card"
                    style={{
                      animationDelay: isVisible ? `${index * 0.15}s` : '0s'
                    }}
                  >
                    <div className="certification-image">
                      <img src={certification.image} alt={certification.title} />
                    </div>
                    <div className="certification-info">
                      <h4>{certification.title}</h4>
                      <p className="certification-issuer">{certification.issuer}</p>
                      <p className="certification-date">{certification.date}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="education-section">
            <h3>{translations.educationTitle}</h3>
            {isMobile ? (
              // Carrossel para mobile - Educação
              <div className="education-carousel">
                <div className="carousel-container">
                  <div 
                    className="carousel-track"
                    style={{
                      transform: `translateX(-${currentEduSlide * 100}%)`,
                      transition: 'transform 0.3s ease-in-out'
                    }}
                  >
                    {translations.education.map((edu, index) => (
                      <div key={index} className="carousel-slide">
                        <div className="education-card">
                          <div className="education-image">
                            <img src={edu.image} alt={edu.institution} />
                          </div>
                          <div className="education-info">
                            <h4>{edu.degree}</h4>
                            <p className="education-institution">{edu.institution}</p>
                            <p className="education-period">{edu.period}</p>
                            <p className="education-status">{edu.status}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Botões de navegação */}
                <div className="carousel-nav">
                  <button className="carousel-btn prev" onClick={prevEduSlide}>
                    &#8249;
                  </button>
                  <button className="carousel-btn next" onClick={nextEduSlide}>
                    &#8250;
                  </button>
                </div>
                
                {/* Indicadores */}
                <div className="carousel-indicators">
                  {translations.education.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${currentEduSlide === index ? 'active' : ''}`}
                      onClick={() => goToEduSlide(index)}
                    />
                  ))}
                </div>
              </div>
            ) : (
              // Grid para desktop/tablet
              <div className="education-grid">
                {translations.education.map((edu, index) => (
                  <div 
                    key={index} 
                    className="education-card"
                    style={{
                      animationDelay: isVisible ? `${(index + translations.certifications.length) * 0.15}s` : '0s'
                    }}
                  >
                    <div className="education-image">
                      <img src={edu.image} alt={edu.institution} />
                    </div>
                    <div className="education-info">
                      <h4>{edu.degree}</h4>
                      <p className="education-institution">{edu.institution}</p>
                      <p className="education-period">{edu.period}</p>
                      <p className="education-status">{edu.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certificacoes;