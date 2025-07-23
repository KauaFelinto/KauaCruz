import React, { useRef, useEffect, useState } from 'react';
import './projects.css';

function Projects({ translations }) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3
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

  // Funções de navegação do carrossel
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const projects = [
    {
      id: 1,
      image: "/vtexx.png",
      repository: "https://github.com/kauacruz/ecommerce-react"
    },
    {
      id: 2,
      image: "https://via.placeholder.com/300x200/10b981/ffffff?text=Task+Manager",
      repository: "https://github.com/kauacruz/task-manager"
    },
    {
      id: 3,
      image: "https://via.placeholder.com/300x200/f59e0b/ffffff?text=Weather+App",
      repository: "https://github.com/kauacruz/weather-app"
    },
    {
      id: 4,
      image: "/rick-api.png",
      repository: "https://github.com/kauacruz/portfolio"
    },
    {
      id: 5,
      image: "/blog-angular.png",
      repository: "https://github.com/kauacruz/blog-platform"
    },
    {
      id: 6,
      image: "/raycast.png",
      repository: "https://github.com/kauacruz/chat-app"
    }
  ];

  return (
    <div className={`projects ${isVisible ? 'animate' : ''}`} ref={sectionRef}>
      <h2>{translations.projectsTitle}</h2>
      <p>
        {translations.projectsDescription}
      </p>
      
      {isMobile ? (
        // Carrossel para mobile
        <div className="projects-carousel">
          <div className="carousel-container" ref={carouselRef}>
            <div 
              className="carousel-track"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: 'transform 0.3s ease-in-out'
              }}
            >
              {projects.map((project, index) => (
                <div key={project.id} className="carousel-slide">
                  <a 
                    href={project.repository} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-card"
                  >
                    <div className="project-image">
                      <img src={project.image} alt={translations.projects[index].title} />
                    </div>
                    <div className="project-info">
                      <h3>{translations.projects[index].title}</h3>
                      <p>{translations.projects[index].description}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
          
          {/* Botões de navegação */}
          <div className="carousel-nav">
            <button className="carousel-btn prev" onClick={prevSlide}>
              &#8249;
            </button>
            <button className="carousel-btn next" onClick={nextSlide}>
              &#8250;
            </button>
          </div>
          
          {/* Indicadores */}
          <div className="carousel-indicators">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`indicator ${currentSlide === index ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      ) : (
        // Grid para desktop/tablet
        <div className="projects-grid">
          {projects.map((project, index) => (
            <a 
              key={project.id} 
              href={project.repository} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="project-card"
              style={{
                animationDelay: isVisible ? `${index * 0.15}s` : '0s'
              }}
            >
              <div className="project-image">
                <img src={project.image} alt={translations.projects[index].title} />
              </div>
              <div className="project-info">
                <h3>{translations.projects[index].title}</h3>
                <p>{translations.projects[index].description}</p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default Projects;