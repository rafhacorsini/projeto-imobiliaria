# 🏠 Imobiliária Conecta - CRM

Sistema de captura e gestão de leads para imobiliárias com integração Airtable e notificações WhatsApp.

## 🚀 Funcionalidades

- ✅ Landing page profissional
- ✅ Formulário de captura de leads
- ✅ Dashboard de gestão de leads
- ✅ Integração com Airtable (banco de dados)
- ✅ Notificações WhatsApp (simulado)

## 🛠 Tecnologias

**Frontend:**
- React + Vite
- React Router
- Lucide Icons
- CSS puro

**Backend:**
- Node.js + Express
- API REST
- Integração Airtable

## 📦 Instalação

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## ⚙️ Configuração

Crie um arquivo `.env` na pasta `backend/` com:

```env
PORT=3001
AIRTABLE_API_KEY=seu_token_aqui
AIRTABLE_BASE_ID=seu_base_id
AIRTABLE_TABLE_NAME=Table 1
```

## 📱 Acesso

- **Landing Page:** http://localhost:5173
- **Dashboard:** http://localhost:5173/dashboard (acesso restrito)
- **API:** http://localhost:3001

## 📄 Licença

MIT
