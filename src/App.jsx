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
  const [language, setLanguage] = useState('pt')
  const [activeSection, setActiveSection] = useState('home')
  const [headerVisible, setHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle('dark-mode')
  }

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt')
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

  const toggleMobileMenu = () => {
    const newMenuState = !mobileMenuOpen
    setMobileMenuOpen(newMenuState)
    
    // Controlar scroll do body
    if (newMenuState) {
      document.body.classList.add('menu-open')
    } else {
      document.body.classList.remove('menu-open')
    }
  }

  // Detectar mudanças no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
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
      skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'Git', 'AWS', 'Docker', 'MongoDB', 'Express.js', 'TypeScript'],
      aboutImageAlt: 'Desenvolvimento de código',
      academicTitle: 'Formação Acadêmica',
      academicDescription: 'Minhas certificações e formações que comprovam meu conhecimento e dedicação ao aprendizado contínuo.',
      certificationsTitle: 'Certificações',
      educationTitle: 'Educação',
      certifications: [
        {
          title: 'AWS Cloud Practitioner',
          issuer: 'Amazon Web Services',
          date: '2024',
          image: 'https://via.placeholder.com/300x180/FF9900/ffffff?text=AWS',
          link: '#'
        },
        {
          title: 'React Developer',
          issuer: 'Meta',
          date: '2023',
          image: 'https://via.placeholder.com/300x180/61DAFB/ffffff?text=React',
          link: '#'
        },
        {
          title: 'JavaScript ES6+',
          issuer: 'JavaScript Institute',
          date: '2023',
          image: 'https://via.placeholder.com/300x180/F7DF1E/ffffff?text=JS',
          link: '#'
        }
      ],
      education: [
        {
          degree: 'Ciência da Computação',
          institution: 'Universidade Federal',
          period: '2020 - 2024',
          status: 'Concluído',
          image: 'https://via.placeholder.com/300x180/4f46e5/ffffff?text=Universidade'
        },
        {
          degree: 'Técnico em Informática',
          institution: 'Instituto Técnico',
          period: '2018 - 2020',
          status: 'Concluído',
          image: 'https://via.placeholder.com/300x180/10b981/ffffff?text=Técnico'
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
          title: "Site Portfolio",
          description: "Site de portfólio pessoal responsivo"
        },
        {
          title: "Plataforma de Blog",
          description: "Plataforma de blog com sistema de comentários"
        },
        {
          title: "Aplicação de Chat",
          description: "Aplicação de chat em tempo real"
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
      skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS', 'Git', 'AWS', 'Docker', 'MongoDB', 'Express.js', 'TypeScript'],
      aboutImageAlt: 'Code development',
      academicTitle: 'Academic Background',
      academicDescription: 'My certifications and education that demonstrate my knowledge and dedication to continuous learning.',
      certificationsTitle: 'Certifications',
      educationTitle: 'Education',
      certifications: [
        {
          title: 'AWS Cloud Practitioner',
          issuer: 'Amazon Web Services',
          date: '2024',
          image: 'https://via.placeholder.com/300x180/FF9900/ffffff?text=AWS',
          link: '#'
        },
        {
          title: 'React Developer',
          issuer: 'Meta',
          date: '2023',
          image: 'https://via.placeholder.com/300x180/61DAFB/ffffff?text=React',
          link: '#'
        },
        {
          title: 'JavaScript ES6+',
          issuer: 'JavaScript Institute',
          date: '2023',
          image: 'https://via.placeholder.com/300x180/F7DF1E/ffffff?text=JS',
          link: '#'
        }
      ],
      education: [
        {
          degree: 'Computer Science',
          institution: 'Federal University',
          period: '2020 - 2024',
          status: 'Completed',
          image: 'https://via.placeholder.com/300x180/4f46e5/ffffff?text=University'
        },
        {
          degree: 'Technical in Computer Science',
          institution: 'Technical Institute',
          period: '2018 - 2020',
          status: 'Completed',
          image: 'https://via.placeholder.com/300x180/10b981/ffffff?text=Technical'
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
          title: "Portfolio Website",
          description: "Responsive personal portfolio website"
        },
        {
          title: "Blog Platform",
          description: "Blog platform with comment system"
        },
        {
          title: "Chat Application",
          description: "Real-time chat application"
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
    }
  }

  const currentTranslations = translations[language]

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
              >
                {mobileMenuOpen ? <MdClose /> : <MdMenu />}
              </button>
              
              <h1 className="header-title-mobile">{currentTranslations.name}</h1>
              
              <div className='header-controls-mobile'>
                <button onClick={toggleLanguage} className="language-toggle-mobile">
                  {language === 'pt' ? (
                    <span style={{fontSize: '16px'}}>🇺🇸 EN</span>
                  ) : (
                    <span style={{fontSize: '16px'}}>🇧🇷 PT</span>
                  )}
                </button>
                <button onClick={toggleDarkMode} className="theme-toggle-mobile">
                  {darkMode ? <MdOutlineDarkMode /> : <MdLightMode />}
                </button>
              </div>
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
              <button onClick={toggleLanguage} className="language-toggle">
                {language === 'pt' ? (
                  <span style={{fontSize: '16px'}}>🇺🇸 EN</span>
                ) : (
                  <span style={{fontSize: '16px'}}>🇧🇷 PT</span>
                )}
              </button>
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
