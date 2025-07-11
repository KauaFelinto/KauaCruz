# 📧 Configuração de Envio de Emails

Este portfólio suporta múltiplas formas de envio de email, desde serviços gratuitos até soluções mais robustas.

## 🚀 Opções de Configuração

### 1. EmailJS (Recomendado)
**Gratuito até 200 emails/mês**

1. Acesse [EmailJS](https://www.emailjs.com/)
2. Crie uma conta gratuita
3. Configure um serviço de email (Gmail, Outlook, etc.)
4. Crie um template de email
5. Copie as credenciais para o arquivo `.env`:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

**Template do EmailJS recomendado:**
```
Novo contato do portfólio!

Nome: {{from_name}}
Email: {{from_email}}
Assunto: {{subject}}
Tipo de Projeto: {{project_type}}

Mensagem:
{{message}}
```

### 2. Web3Forms (Alternativa)
**Gratuito até 1000 emails/mês**

1. Acesse [Web3Forms](https://web3forms.com/)
2. Obtenha sua Access Key gratuita
3. Substitua `YOUR_WEB3FORMS_KEY` no código pela sua chave

### 3. Fallback - Cliente de Email
Se nenhum serviço estiver configurado, o sistema automaticamente abrirá o cliente de email padrão do usuário.

## 🔧 Como Configurar

1. **Copie o arquivo de exemplo:**
```bash
cp .env.example .env
```

2. **Edite o arquivo `.env` com suas credenciais:**
```env
# EmailJS (Opção 1 - Recomendada)
VITE_EMAILJS_SERVICE_ID=seu_service_id
VITE_EMAILJS_TEMPLATE_ID=seu_template_id
VITE_EMAILJS_PUBLIC_KEY=sua_public_key

# Web3Forms (Opção 2 - Alternativa)
VITE_WEB3FORMS_KEY=sua_access_key
```

3. **Reinicie o servidor de desenvolvimento:**
```bash
npm run dev
```

## ✅ Teste de Funcionamento

1. Preencha o formulário de contato
2. Clique em "Enviar Mensagem"
3. Verifique se a mensagem foi enviada com sucesso

## 🔒 Segurança

- As chaves são armazenadas como variáveis de ambiente
- Nunca commite o arquivo `.env` no Git
- Use apenas as chaves públicas (não as privadas) no frontend

## 📝 Customização

Para personalizar o template de email, edite os parâmetros em `templateParams` no arquivo `contact.jsx`.
