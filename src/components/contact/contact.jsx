import React, { useRef, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import './contact.css';
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaSquarePhone } from "react-icons/fa6";


function Contact({ translations }) {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Configurações do EmailJS
      const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      // Se o EmailJS estiver configurado, usar EmailJS
      if (serviceID && templateID && publicKey) {
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          project_type: formData.projectType,
          message: formData.message,
          to_email: 'kauafelintoc@gmail.com'
        };

        await emailjs.send(serviceID, templateID, templateParams, publicKey);
        setSubmitStatus({ 
          type: 'success', 
          message: translations.formSubmitMessage || 'Mensagem enviada com sucesso!' 
        });
      } else {
        // Fallback: usar serviço Web3Forms (gratuito)
        const web3formsKey = import.meta.env.VITE_WEB3FORMS_KEY;
        
        if (web3formsKey) {
          const formDataToSend = new FormData();
          formDataToSend.append('access_key', web3formsKey);
          formDataToSend.append('name', formData.name);
          formDataToSend.append('email', formData.email);
          formDataToSend.append('subject', formData.subject);
          formDataToSend.append('project_type', formData.projectType);
          formDataToSend.append('message', formData.message);
          formDataToSend.append('redirect', 'false');

          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formDataToSend
          });

          if (response.ok) {
            setSubmitStatus({ 
              type: 'success', 
              message: translations.formSubmitMessage || 'Mensagem enviada com sucesso!' 
            });
          } else {
            throw new Error('Erro no envio');
          }
        } else {
          // Modo demonstração - simular envio bem-sucedido
          console.log('Modo demonstração - dados do formulário:', formData);
          await new Promise(resolve => setTimeout(resolve, 1500)); // Simular delay de rede
          setSubmitStatus({ 
            type: 'success', 
            message: 'Mensagem enviada com sucesso! (Modo demonstração)' 
          });
        }
      }
      
      // Resetar formulário
      setFormData({
        name: '',
        email: '',
        subject: '',
        projectType: '',
        message: ''
      });

    } catch (error) {
      console.error('Erro ao enviar:', error);
      // Fallback final: abrir cliente de email
      const emailBody = `
Nome: ${formData.name}
Email: ${formData.email}
Assunto: ${formData.subject}
Tipo de Projeto: ${formData.projectType}

Mensagem:
${formData.message}
      `.trim();

      const mailtoLink = `mailto:kauafelintoc@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoLink;
      setSubmitStatus({ 
        type: 'info', 
        message: 'Abrindo seu cliente de email como alternativa.' 
      });
    } finally {
      setIsSubmitting(false);
      // Limpar status após 5 segundos
      setTimeout(() => setSubmitStatus({ type: '', message: '' }), 5000);
    }
  };

  return (
    <section className={`contact ${isVisible ? 'animate' : ''}`} ref={sectionRef}>
      <div className="contact-content">
        <h2>{translations.contactTitle}</h2>
        <p className="contact-description">{translations.contactDescription}</p>
        
        <div className="contact-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            {submitStatus.message && (
              <div className={`submit-status ${submitStatus.type}`}>
                {submitStatus.message}
              </div>
            )}
            <div className="form-group">
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={translations.namePlaceholder} 
                required 
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={translations.emailPlaceholder} 
                required 
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder={translations.subjectPlaceholder} 
                required 
                className="form-input"
              />
            </div>
            <div className="form-group">
              <select 
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                required 
                className="form-select"
              >
                <option value="">{translations.projectTypePlaceholder}</option>
                <option value="website">{translations.websiteProject}</option>
                <option value="mobile">{translations.mobileProject}</option>
                <option value="ecommerce">{translations.ecommerceProject}</option>
                <option value="consulting">{translations.consultingProject}</option>
                <option value="other">{translations.otherProject}</option>
              </select>
            </div>
            <div className="form-group">
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={translations.messagePlaceholder} 
                required 
                className="form-textarea"
                rows="5"
              ></textarea>
            </div>
            <button type="submit" className="form-button" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : translations.sendButton}
            </button>
          </form>

          <div className="contact-info">
            <h3 className="contact-info-title">{translations.contactInfoTitle}</h3>
            <div className="contact-items-grid">
              <div className="contact-item">
                <div className="contact-icon"><MdEmail /></div>
                <div className="contact-details">
                  <span className="contact-label">{translations.emailLabel}</span>
                  <a href="mailto:kauafelintoc@gmail.com" className="contact-link">
                    kauafelintoc@gmail.com
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><FaSquarePhone /></div>
                <div className="contact-details">
                  <span className="contact-label">{translations.phoneLabel}</span>
                  <a href="tel:+5511994421740" className="contact-link">
                    +55 (11) 99442-1740
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><FaLinkedin /></div>
                <div className="contact-details">
                  <span className="contact-label">{translations.linkedinLabel}</span>
                  <a 
                    href="https://www.linkedin.com/in/kauã-felinto" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-link"
                  >
                    linkedin.com/in/kauã-felinto
                  </a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><FaGithubSquare /></div>
                <div className="contact-details">
                  <span className="contact-label">{translations.githubLabel}</span>
                  <a 
                    href="https://github.com/KauaFelinto" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-link"
                  >
                    github.com/KauaFelinto
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Contact;