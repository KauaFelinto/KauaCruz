import { useState, useEffect } from 'react'
import './App.css'
import { MdOutlineDarkMode, MdLightMode, MdMenu, MdClose } from "react-icons/md"
import Perfil from './components/perfil/perfil'
import About from './components/about/about'
import Projects from './components/projetos/projects'
import Certificacoes from './components/certificacoes/certificacoes';
import Contact from './components/contact/contact';

function App() {
  const [darkMode, setDarkMode] = useState(false)
  
  // Detectar idioma preferido do navegador
  const getDefaultLanguage = () => {
    const savedLanguage = localStorage.getItem('preferred-language')
    if (savedLanguage && ['pt', 'en', 'es'].includes(savedLanguage)) {
      return savedLanguage
    }
    
    const browserLang = navigator.language.toLowerCase()
    if (browserLang.startsWith('es')) return 'es'
    if (browserLang.startsWith('en')) return 'en'
    return 'pt' // padrão
  }
  
  const [language, setLanguage] = useState(getDefaultLanguage())
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [headerVisible, setHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [menuToggleDisabled, setMenuToggleDisabled] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle('dark-mode')
  }

  const toggleLanguage = () => {
    let newLanguage
    if (language === 'pt') {
      newLanguage = 'en'
    } else if (language === 'en') {
      newLanguage = 'es'
    } else {
      newLanguage = 'pt'
    }
    
    setLanguage(newLanguage)
    localStorage.setItem('preferred-language', newLanguage)
  }

  const selectLanguage = (newLanguage) => {
    setLanguage(newLanguage)
    localStorage.setItem('preferred-language', newLanguage)
    setLanguageDropdownOpen(false)
  }

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen)
  }

  const getLanguageInfo = (lang) => {
    const languageMap = {
      'pt': { flag: '🇧🇷', name: 'Português', short: 'PT' },
      'en': { flag: '🇺🇸', name: 'English', short: 'EN' },
      'es': { flag: '🇪🇸', name: 'Español', short: 'ES' }
    }
    return languageMap[lang] || languageMap['pt']
  }

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    setMobileMenuOpen(false) // Fechar menu móvel ao navegar
    document.body.classList.remove('menu-open') // Remover bloqueio de scroll
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleMobileMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (menuToggleDisabled) return;
    
    const newMenuState = !mobileMenuOpen;
    setMobileMenuOpen(newMenuState);
    
    // Adicionar debounce para evitar cliques múltiplos
    setMenuToggleDisabled(true);
    setTimeout(() => {
      setMenuToggleDisabled(false);
    }, 300);
    
    // Controlar scroll do body
    if (newMenuState) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  // Detectar mudanças no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Detectar seção ativa durante scroll e controlar visibilidade do header
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          
          // Controlar visibilidade do header baseado na direção do scroll
          if (currentScrollY === 0) {
            // No topo da página - sempre mostrar
            setHeaderVisible(true)
          } else if (currentScrollY < lastScrollY) {
            // Scrolling para cima - mostrar header
            setHeaderVisible(true)
          } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
            // Scrolling para baixo e longe do topo - esconder header
            setHeaderVisible(false)
          }
          
          setLastScrollY(currentScrollY)
          
          // Detectar seção ativa
          const sections = ['home', 'projects', 'about', 'academic', 'contact']
          let currentSection = 'home'
          
          for (const section of sections) {
            const element = document.getElementById(section)
            if (element) {
              const rect = element.getBoundingClientRect()
              if (rect.top <= 150 && rect.bottom >= 150) {
                currentSection = section
                break
              }
            }
          }
          
          setActiveSection(currentSection)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Fechar menu móvel ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.app-header') && !event.target.closest('.mobile-menu-overlay')) {
        setMobileMenuOpen(false)
        document.body.classList.remove('menu-open')
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [mobileMenuOpen])

  // Fechar menu móvel com tecla ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
        document.body.classList.remove('menu-open')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  // Fechar dropdown de idioma ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageDropdownOpen && !event.target.closest('.language-dropdown')) {
        setLanguageDropdownOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [languageDropdownOpen])

  // Fechar dropdown de idioma com tecla ESC
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && languageDropdownOpen) {
        setLanguageDropdownOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [languageDropdownOpen])

  // Fechar dropdown de idioma ao rolar a página
  useEffect(() => {
    const handleScroll = () => {
      if (languageDropdownOpen) {
        setLanguageDropdownOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [languageDropdownOpen])

  // Traduções
  const translations = {
    pt: {
      name: 'Kaua Cruz',
      // Navegação
      navHome: 'Início',
      navProjects: 'Projetos',
      navAbout: 'Sobre Mim',
      navAcademic: 'Acadêmico',
      navContact: 'Contato',
      title: 'Software Engineer and Cloud Computing',
      subtitle: 'Cloud e desenvolvimento juntos!',
      aboutTitle: 'Sobre Mim',
      aboutDescription: 'Sou um desenvolvedor apaixonado por tecnologia com experiência em desenvolvimento web e computação em nuvem. Tenho conhecimento sólido em JavaScript, React, Node.js e ferramentas de cloud computing. Sempre busco aprender novas tecnologias e aplicar as melhores práticas em meus projetos.',
      skillsTitle: 'Minhas Habilidades',
      skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'Git', 'AWS', 'Terraform', 'Linux', 'Docker', 'MongoDB'],
      aboutImageAlt: 'Desenvolvimento de código',
      academicTitle: 'Formação Acadêmica',
      academicDescription: 'Minhas certificações e formações que comprovam meu conhecimento e dedicação ao aprendizado contínuo.',
      certificationsTitle: 'Certificações',
      educationTitle: 'Educação',
      certifications: [
        {
          title: 'AWS Cloud Practitioner',
          issuer: 'Amazon Web Services',
          date: '2025',
          image: '/AWS-Cloud-Practitioner.png',
          link: '#'
        },
        {
          title: 'Terraform Associate',
          issuer: 'HashiCorp',
          date: '2025',
          image: 'https://via.placeholder.com/300x180/7B42BC/ffffff?text=Terraform',
          link: '#'
        },
        {
          title: 'LPI Essentials',
          issuer: 'Linux Foundation',
          date: '2025',
          image: '/lpi-alura-linux.png',
          link: '#'
        }
      ],
      education: [
        {
          degree: 'Análise e Desenvolvimento de Sistemas',
          institution: 'FMU',
          period: '2023 - 2025',
          status: 'Em andamento',
          image: '/fmupalestra.jpg'
        },
        {
          degree: 'Segurança da Informação',
          institution: 'UNICID',
          period: '2025 - 2026',
          status: 'Em andamento',
          image: '/cruzeirodosul.jpg'
        }
      ],
      projectsTitle: 'Meus Projetos',
      projectsDescription: 'Aqui estão alguns dos projetos que desenvolvi. Cada um deles representa uma parte da minha jornada como desenvolvedor.',
      projects: [
        {
          title: "E-commerce React",
          description: "Aplicação de e-commerce desenvolvida com React"
        },
        {
          title: "Gerenciador de Tarefas",
          description: "Gerenciador de tarefas com React e Local Storage"
        },
        {
          title: "App do Clima",
          description: "Aplicativo de previsão do tempo com API"
        },
        {
          title: "Rick API",
          description: "SPA feito em React e Sass com API de Rick and Morty"
        },
        {
          title: "Plataforma de Blog",
          description: "Plataforma de blog com sistema de comentários feita em Angular"
        },
        {
          title: "Landing page",
          description: "Landing page para sistema de produtividade feita em Angular"
        }
      ],
      // Contato
      contactTitle: 'Entre em Contato',
      contactDescription: 'Vamos conversar sobre seu próximo projeto! Entre em contato comigo através do formulário abaixo ou pelas informações de contato.',
      namePlaceholder: 'Seu nome completo',
      emailPlaceholder: 'Seu e-mail',
      subjectPlaceholder: 'Assunto',
      projectTypePlaceholder: 'Selecione o tipo de projeto',
      websiteProject: 'Website/Landing Page',
      mobileProject: 'Aplicativo Mobile',
      ecommerceProject: 'E-commerce',
      consultingProject: 'Consultoria',
      otherProject: 'Outro',
      messagePlaceholder: 'Descreva seu projeto ou dúvida...',
      sendButton: 'Enviar Mensagem',
      formSubmitMessage: 'Mensagem enviada com sucesso! Entrarei em contato em breve.',
      contactInfoTitle: 'Informações de Contato',
      emailLabel: 'E-mail',
      phoneLabel: 'Telefone',
      linkedinLabel: 'LinkedIn',
      githubLabel: 'GitHub'
    },
    en: {
      name: 'Kaua Cruz',
      // Navigation
      navHome: 'Home',
      navProjects: 'Projects',
      navAbout: 'About Me',
      navAcademic: 'Academic',
      navContact: 'Contact',
      title: 'Software Engineer and Cloud Computing',
      subtitle: 'Cloud and development together!',
      aboutTitle: 'About Me',
      aboutDescription: 'I am a technology-passionate developer with experience in web development and cloud computing. I have solid knowledge in JavaScript, React, Node.js, and cloud computing tools. I always seek to learn new technologies and apply best practices in my projects.',
      skillsTitle: 'My Skills',
      skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'Git', 'AWS', 'Terraform', 'Linux', 'Docker', 'MongoDB'],
      aboutImageAlt: 'Code development',
      academicTitle: 'Academic Background',
      academicDescription: 'My certifications and education that demonstrate my knowledge and dedication to continuous learning.',
      certificationsTitle: 'Certifications',
      educationTitle: 'Education',
      certifications: [
        {
          title: 'AWS Cloud Practitioner',
          issuer: 'Amazon Web Services',
          date: '2025',
          image: '/AWS-Cloud-Practitioner.png',
          link: '#'
        },
        {
          title: 'Terraform Associate',
          issuer: 'HashiCorp',
          date: '2025',
          image: 'https://via.placeholder.com/300x180/7B42BC/ffffff?text=Terraform',
          link: '#'
        },
        {
          title: 'LPI Essentials',
          issuer: 'Linux Foundation',
          date: '2025',
          image: '/lpi-alura-linux.png',
          link: '#'
        }
      ],
      education: [
        {
          degree: 'Systems Analysis and Development',
          institution: 'FMU',
          period: '2023 - 2025',
          status: 'In progress',
          image: '/fmupalestra.jpg'
        },
        {
          degree: 'Information Security',
          institution: 'UNICID',
          period: '2025 - 2026',
          status: 'In progress',
          image: '/cruzeirodosul.jpg'
        }
      ],
      projectsTitle: 'My Projects',
      projectsDescription: 'Here are some of the projects I have developed. Each one represents a part of my journey as a developer.',
      projects: [
        {
          title: "E-commerce React",
          description: "E-commerce application developed with React"
        },
        {
          title: "Task Manager",
          description: "Task manager with React and Local Storage"
        },
        {
          title: "Weather App",
          description: "Weather forecast application with API"
        },
        {
          title: "Rick API",
          description: "SPA built with React and Sass using Rick and Morty API"
        },
        {
          title: "Blog Platform",
          description: "Blog platform with comment system built with Angular"
        },
        {
          title: "Landing page",
          description: "Landing page for productivity system built with Angular"
        }
      ],
      // Contact
      contactTitle: 'Get in Touch',
      contactDescription: 'Let\'s talk about your next project! Contact me through the form below or through the contact information.',
      namePlaceholder: 'Your full name',
      emailPlaceholder: 'Your email',
      subjectPlaceholder: 'Subject',
      projectTypePlaceholder: 'Select project type',
      websiteProject: 'Website/Landing Page',
      mobileProject: 'Mobile App',
      ecommerceProject: 'E-commerce',
      consultingProject: 'Consulting',
      otherProject: 'Other',
      messagePlaceholder: 'Describe your project or question...',
      sendButton: 'Send Message',
      formSubmitMessage: 'Message sent successfully! I will contact you soon.',
      contactInfoTitle: 'Contact Information',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      linkedinLabel: 'LinkedIn',
      githubLabel: 'GitHub'
    },
    es: {
      name: 'Kaua Cruz',
      // Navegación
      navHome: 'Inicio',
      navProjects: 'Proyectos',
      navAbout: 'Sobre Mí',
      navAcademic: 'Académico',
      navContact: 'Contacto',
      title: 'Ingeniero de Software y Computación en la Nube',
      subtitle: '¡Nube e desenvolvimento juntos!',
      aboutTitle: 'Sobre Mí',
      aboutDescription: 'Soy un desarrollador apasionado por la tecnología con experiencia en desarrollo web y computación en la nube. Tengo conocimientos sólidos en JavaScript, React, Node.js y herramientas de computación en la nube. Siempre busco aprender nuevas tecnologías e implementar las mejores prácticas en mis proyectos.',
      skillsTitle: 'Mis Habilidades',
      skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'Git', 'AWS', 'Terraform', 'Linux', 'Docker', 'MongoDB'],
      aboutImageAlt: 'Desarrollo de código',
      academicTitle: 'Formación Académica',
      academicDescription: 'Mis certificaciones y formación que demuestran mi conocimiento e dedicação ao aprendizado contínuo.',
      certificationsTitle: 'Certificaciones',
      educationTitle: 'Educación',
      certifications: [
        {
          title: 'AWS Cloud Practitioner',
          issuer: 'Amazon Web Services',
          date: '2025',
          image: '/AWS-Cloud-Practitioner.png',
          link: '#'
        },
        {
          title: 'Terraform Associate',
          issuer: 'HashiCorp',
          date: '2025',
          image: 'https://via.placeholder.com/300x180/7B42BC/ffffff?text=Terraform',
          link: '#'
        },
        {
          title: 'LPI Essentials',
          issuer: 'Linux Foundation',
          date: '2025',
          image: '/lpi-alura-linux.png',
          link: '#'
        }
      ],
      education: [
        {
          degree: 'Análisis y Desarrollo de Sistemas',
          institution: 'FMU',
          period: '2023 - 2025',
          status: 'En progreso',
          image: '/fmupalestra.jpg'
        },
        {
          degree: 'Seguridad de la Información',
          institution: 'UNICID',
          period: '2025 - 2026',
          status: 'En progreso',
          image: '/cruzeirodosul.jpg'
        }
      ],
      projectsTitle: 'Mis Proyectos',
      projectsDescription: 'Aquí están algunos de los proyectos que he desarrollado. Cada uno representa una parte de mi camino como desarrollador.',
      projects: [
        {
          title: "E-commerce React",
          description: "Aplicação de e-commerce desenvolvida com React"
        },
        {
          title: "Gestor de Tareas",
          description: "Gestor de tarefas com React e Local Storage"
        },
        {
          title: "App del Clima",
          description: "Aplicação de pronóstico del tempo com API"
        },
        {
          title: "Rick API",
          description: "SPA hecho con React y Sass usando API de Rick and Morty"
        },
        {
          title: "Plataforma de Blog",
          description: "Plataforma de blog con sistema de comentarios hecha en Angular"
        },
        {
          title: "Landing page",
          description: "Landing page para sistema de productividad hecha en Angular"
        }
      ],
      // Contacto
      contactTitle: 'Ponte en Contacto',
      contactDescription: '¡Hablemos sobre tu próximo proyecto! Contáctame a través del formulario de abajo o por la información de contacto.',
      namePlaceholder: 'Tu nombre completo',
      emailPlaceholder: 'Tu email',
      subjectPlaceholder: 'Asunto',
      projectTypePlaceholder: 'Selecciona el tipo de projeto',
      websiteProject: 'Sitio Web/Landing Page',
      mobileProject: 'Aplicación Móvil',
      ecommerceProject: 'E-commerce',
      consultingProject: 'Consultoría',
      otherProject: 'Otro',
      messagePlaceholder: 'Describe tu proyecto o pregunta...',
      sendButton: 'Enviar Mensaje',
      formSubmitMessage: '¡Mensaje enviado con éxito! Me pondré en contacto pronto.',
      contactInfoTitle: 'Información de Contacto',
      emailLabel: 'Email',
      phoneLabel: 'Teléfono',
      linkedinLabel: 'LinkedIn',
      githubLabel: 'GitHub'
    }
  }

  const currentTranslations = translations[language] || translations['pt']

  return (
    <>
      {/* Overlay para menu móvel - só renderiza em mobile */}
      {isMobile && (
        <div 
          className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => {
            setMobileMenuOpen(false)
            document.body.classList.remove('menu-open')
          }}
        />
      )}
      
      <header className={`app-header ${darkMode ? 'dark' : 'light'} ${headerVisible ? 'header-visible' : 'header-hidden'}`}>
        {isMobile ? (
          <>
            {/* Layout Mobile */}
            <div className="mobile-header">
              <button 
                className="mobile-menu-toggle"
                onClick={toggleMobileMenu}
                aria-label="Menu"
                type="button"
                disabled={menuToggleDisabled}
              >
                {mobileMenuOpen ? <MdClose /> : <MdMenu />}
              </button>
              
              <h1 className="header-title-mobile">{currentTranslations.name}</h1>
            </div>

            {/* Menu Mobile Dropdown */}
            <nav className={`mobile-nav ${mobileMenuOpen ? 'mobile-nav-open' : ''}`}>
              <button 
                className={`mobile-nav-item ${activeSection === 'home' ? 'active' : ''}`}
                onClick={() => scrollToSection('home')}
              >
                {currentTranslations.navHome}
              </button>
              <button 
                className={`mobile-nav-item ${activeSection === 'projects' ? 'active' : ''}`}
                onClick={() => scrollToSection('projects')}
              >
                {currentTranslations.navProjects}
              </button>
              <button 
                className={`mobile-nav-item ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => scrollToSection('about')}
              >
                {currentTranslations.navAbout}
              </button>
              <button 
                className={`mobile-nav-item ${activeSection === 'academic' ? 'active' : ''}`}
                onClick={() => scrollToSection('academic')}
              >
                {currentTranslations.navAcademic}
              </button>
              <button 
                className={`mobile-nav-item ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => scrollToSection('contact')}
              >
                {currentTranslations.navContact}
              </button>
              
              {/* Controles de idioma e tema dentro do menu */}
              <div className="mobile-menu-controls">
                <button 
                  onClick={toggleLanguage} 
                  className="mobile-menu-language"
                  data-tooltip={language === 'pt' ? 'Mudar para English' : language === 'en' ? 'Cambiar a Español' : 'Mudar para Português'}
                  aria-label={`Current language: ${language === 'pt' ? 'Português' : language === 'en' ? 'English' : 'Español'}`}
                >
                  <span className="language-indicator">
                    {language === 'pt' ? '🇺🇸 EN' : language === 'en' ? '🇪🇸 ES' : '🇧🇷 PT'}
                  </span>
                </button>
                <button onClick={toggleDarkMode} className="mobile-menu-theme">
                  {darkMode ? <MdOutlineDarkMode /> : <MdLightMode />}
                </button>
              </div>
            </nav>
          </>
        ) : (
          /* Layout Desktop */
          <div className="desktop-header">
            <h1 className="header-title">{currentTranslations.name}</h1>
            
            <nav className="header-nav">
              <button 
                className={`nav-item ${activeSection === 'home' ? 'active' : ''}`}
                onClick={() => scrollToSection('home')}
              >
                {currentTranslations.navHome}
              </button>
              <button 
                className={`nav-item ${activeSection === 'projects' ? 'active' : ''}`}
                onClick={() => scrollToSection('projects')}
              >
                {currentTranslations.navProjects}
              </button>
              <button 
                className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}
                onClick={() => scrollToSection('about')}
              >
                {currentTranslations.navAbout}
              </button>
              <button 
                className={`nav-item ${activeSection === 'academic' ? 'active' : ''}`}
                onClick={() => scrollToSection('academic')}
              >
                {currentTranslations.navAcademic}
              </button>
              <button 
                className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`}
                onClick={() => scrollToSection('contact')}
              >
                {currentTranslations.navContact}
              </button>
            </nav>

            <div className='header-controls'>
              <div className={`language-dropdown ${languageDropdownOpen ? 'open' : ''}`}>
                <button 
                  onClick={toggleLanguageDropdown}
                  className="language-toggle"
                  aria-label={`Current language: ${getLanguageInfo(language).name}`}
                  aria-expanded={languageDropdownOpen}
                  aria-haspopup="listbox"
                  role="button"
                >
                  <span className="language-current">
                    {getLanguageInfo(language).flag} {getLanguageInfo(language).short}
                  </span>
                  <span className="dropdown-arrow">▼</span>
                </button>
                
                {languageDropdownOpen && (
                  <div 
                    className="language-dropdown-menu"
                    role="listbox"
                    aria-label="Select language"
                  >
                    {['pt', 'en', 'es'].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => selectLanguage(lang)}
                        className={`language-option ${language === lang ? 'active' : ''}`}
                        role="option"
                        aria-selected={language === lang}
                      >
                        {getLanguageInfo(lang).flag} {getLanguageInfo(lang).name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button onClick={toggleDarkMode} className="theme-toggle">
                {darkMode ? <MdOutlineDarkMode id='dark-mode-icon'/> : <MdLightMode />}
              </button>
            </div>
          </div>
        )}
      </header>
      
      <main>
        <section id="home">
          <Perfil translations={currentTranslations} />
        </section>
        <section id="projects">
          <Projects translations={currentTranslations} />
        </section>
        <section id="about">
          <About translations={currentTranslations} />
        </section>
        <section id="academic">
          <Certificacoes translations={currentTranslations} />
        </section>
        <section id="contact">
          <Contact translations={currentTranslations} />
        </section>
      </main>
    </>
  )
}

export default App
