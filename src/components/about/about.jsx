import React, { useRef, useEffect, useState } from 'react';
import './about.css';

function About({ translations }) {
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
    <section className={`about ${isVisible ? 'animate' : ''}`} ref={sectionRef}>
      <div className="about-content">
        <div className="about-text">
          <h2>{translations.aboutTitle}</h2>
          <p className="about-description">{translations.aboutDescription}</p>
          <div className="skills-section">
            <h3>{translations.skillsTitle}</h3>
            <ul className="skills-list">
              {translations.skills.map((skill, index) => (
                <li key={index} className="skill-item">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="about-image">
          <img src="../../../public/cloud-dev.png" alt={translations.aboutImageAlt} />
        </div>
      </div>
    </section>
  );
}

export default About;