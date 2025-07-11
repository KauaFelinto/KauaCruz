# 🚀 Portfólio Pessoal - Kaua Cruz

Um portfólio moderno e responsivo desenvolvido com React e Vite, apresentando meus projetos, habilidades e experiência como Software Engineer especializado em Cloud Computing.

## ✨ Funcionalidades

- 🌓 **Tema Escuro/Claro**: Alternância entre modos de visualização
- 🌍 **Multilíngue**: Suporte para Português e Inglês com bandeiras dos países
- 📱 **Design Responsivo**: Interface adaptada para desktop, tablet e mobile
- 🎯 **Navegação Suave**: Scroll suave entre seções com indicador ativo
- 📧 **Formulário de Contato**: Sistema de envio de mensagens integrado
- 🎨 **Animações Fluidas**: Transições e efeitos visuais modernos
- 📊 **Seções Organizadas**: Home, Projetos, Sobre Mim, Acadêmico e Contato

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18, Vite
- **Estilização**: CSS3 com variáveis CSS para temas
- **Ícones**: React Icons (Material Design)
- **Formulário**: EmailJS para envio de emails
- **Deploy**: Vercel/Netlify ready
- **Linting**: ESLint

## 📦 Instalação e Execução

1. **Clone o repositório**
   ```bash
   git clone https://github.com/KauaFelinto/KauaCruz.git
   cd my-portfolio
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas credenciais do EmailJS
   ```

4. **Execute o projeto**
   ```bash
   npm run dev
   ```

5. **Acesse no navegador**
   ```
   http://localhost:5173
   ```

## 🌟 Principais Seções

### 🏠 Home
- Apresentação pessoal com foto de perfil
- Título e subtítulo em dois idiomas
- Links para redes sociais

### 💼 Projetos
- Galeria de projetos desenvolvidos
- Descrições detalhadas de cada projeto
- Links para repositórios e demos

### 👨‍💻 Sobre Mim
- Biografia profissional
- Lista de habilidades técnicas
- Experiência e especialidades

### 🎓 Acadêmico
- Certificações obtidas
- Formação educacional
- Cursos e especializações

### 📞 Contato
- Formulário de contato funcional
- Informações de contato direto
- Links para redes sociais

## 📱 Responsividade

O portfólio foi desenvolvido seguindo o conceito **Mobile First** e é totalmente responsivo:

- **Mobile** (≤ 768px): Menu hambúrguer, layout vertical
- **Tablet** (769px - 1024px): Layout adaptado para telas médias
- **Desktop** (≥ 1025px): Layout completo com navegação horizontal

## 🎨 Personalização

### Temas
O projeto utiliza variáveis CSS para fácil customização de cores:

```css
:root {
  /* Tema Claro */
  --primary-color: #007bff;
  --background-color: #ffffff;
  --text-color: #333333;
}

.dark-mode {
  /* Tema Escuro */
  --primary-color: #4dabf7;
  --background-color: #1a1a1a;
  --text-color: #ffffff;
}
```

### Idiomas
Para adicionar novos idiomas, edite o objeto `translations` em `App.jsx`:

```javascript
const translations = {
  pt: { /* traduções em português */ },
  en: { /* traduções em inglês */ },
  // Adicione novos idiomas aqui
}
```

## 📧 Configuração do EmailJS

1. Crie uma conta no [EmailJS](https://www.emailjs.com/)
2. Configure um serviço de email
3. Crie um template de email
4. Adicione as credenciais no arquivo `.env`:

```env
VITE_EMAILJS_SERVICE_ID=seu_service_id
VITE_EMAILJS_TEMPLATE_ID=seu_template_id
VITE_EMAILJS_USER_ID=seu_user_id
```

## 🚀 Deploy

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Arraste a pasta dist para o Netlify
```

## 📄 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build localmente
- `npm run lint` - Executa o linter

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Kaua Cruz**
- 💼 Software Engineer & Cloud Computing Specialist
- 📧 Email: [kauafelintoc@gmail.com]
- 💼 LinkedIn: [www.linkedin.com/in/kauã-felinto]
- 🐙 GitHub: [KauaFelinto](https://github.com/KauaFelinto)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
