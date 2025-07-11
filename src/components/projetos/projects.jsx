import React, { useRef, useEffect, useState } from 'react';
import './projects.css';

function Projects({ translations }) {
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

  const projects = [
    {
      id: 1,
      image: "https://via.placeholder.com/300x200/4f46e5/ffffff?text=E-commerce",
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
      image: "https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Portfolio",
      repository: "https://github.com/kauacruz/portfolio"
    },
    {
      id: 5,
      image: "https://via.placeholder.com/300x200/ef4444/ffffff?text=Blog+Platform",
      repository: "https://github.com/kauacruz/blog-platform"
    },
    {
      id: 6,
      image: "https://via.placeholder.com/300x200/06b6d4/ffffff?text=Chat+App",
      repository: "https://github.com/kauacruz/chat-app"
    }
  ];

  return (
    <div className={`projects ${isVisible ? 'animate' : ''}`} ref={sectionRef}>
      <h2>{translations.projectsTitle}</h2>
      <p>
        {translations.projectsDescription}
      </p>
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
    </div>
  );
}

export default Projects;