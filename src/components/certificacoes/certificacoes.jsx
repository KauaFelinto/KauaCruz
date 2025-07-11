import React, { useRef, useEffect, useState } from 'react';
import './certificacoes.css';

function Certificacoes({ translations }) {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section className={`certificacoes ${isVisible ? 'animate' : ''}`} ref={sectionRef}>
      <div className="certificacoes-content">
        <h2>{translations.academicTitle}</h2>
        <p className="academic-description">{translations.academicDescription}</p>
        
        <div className="academic-sections">
          <div className="certifications-section">
            <h3>{translations.certificationsTitle}</h3>
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
          </div>

          <div className="education-section">
            <h3>{translations.educationTitle}</h3>
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certificacoes;