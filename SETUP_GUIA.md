# 🏠 Projeto 1: Imobiliária Conecta - Guia de Setup

## 📋 Pré-requisitos

- [x] Conta no n8n Cloud (ou self-hosted)
- [ ] Conta no Airtable (gratuita)
- [ ] 15 minutos para configurar

---

## PASSO 1: Criar Base no Airtable

### 1.1 Acesse o Airtable
👉 [https://airtable.com](https://airtable.com)

### 1.2 Crie uma nova Base
- Clique em **"+ Create a base"**
- Nomeie: **"CRM Imobiliária Conecta"**

### 1.3 Configure a Tabela Principal
Renomeie a primeira tabela para: **"Leads"**

Crie as seguintes colunas:

| Nome da Coluna | Tipo | Opções |
|:---|:---|:---|
| Nome | Single line text | - |
| Telefone | Phone number | - |
| Email | Email | - |
| Interesse | Single select | Comprar, Alugar |
| Região | Single line text | - |
| Faixa de Preço | Single line text | - |
| Data de Entrada | Date | Include time |
| Origem | Single select | Formulário Site, Instagram, WhatsApp, Indicação, Google Ads |
| Status | Single select | Novo, Em Contato, Qualificado, Descartado, Convertido |
| Corretor | Single line text | - |
| Notas | Long text | - |

### 1.4 Copie as Credenciais

1. Clique no seu perfil (canto superior direito)
2. Vá em **"Developer Hub"**
3. Clique em **"Personal access tokens"**
4. Crie um novo token com permissões de:
   - `data.records:read`
   - `data.records:write`
5. **GUARDE O TOKEN** (só aparece uma vez!)

---

## PASSO 2: Importar Workflow no n8n

### 2.1 Acesse seu n8n
👉 [https://app.n8n.cloud](https://app.n8n.cloud)

### 2.2 Importe o Workflow
1. Clique em **"+ Add workflow"**
2. Clique nos **3 pontinhos** (menu) → **"Import from file"**
3. Selecione o arquivo: `workflow_imobiliaria.json`

### 2.3 Configure o Airtable
1. Clique no node **"Salvar no Airtable"**
2. Em **Credentials**, clique em **"Create new credential"**
3. Cole seu **Personal Access Token** do Airtable
4. Na configuração do node:
   - **Application**: Selecione "CRM Imobiliária Conecta"
   - **Table**: Selecione "Leads"

### 2.4 Ative o Workflow
1. Clique no toggle **"Inactive"** no canto superior direito
2. Mude para **"Active"**

### 2.5 Copie a URL do Webhook
1. Clique no node **"Webhook Lead"**
2. Na aba **"Parameters"**, copie a **"Production URL"**
3. Guarde essa URL! Ex: `https://seu-n8n.app.n8n.cloud/webhook/lead-imobiliaria`

---

## PASSO 3: Testar com Dados Fictícios

### Opção A: Via Terminal (curl)

Abra o terminal e execute:

```bash
curl -X POST "SUA_URL_WEBHOOK_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Carlos Ferreira",
    "telefone": "11987654321",
    "email": "joao.ferreira@gmail.com",
    "interesse": "Comprar",
    "regiao": "Zona Sul - Moema",
    "faixa_preco": "R$ 500.000 - R$ 800.000",
    "origem": "Formulário Site"
  }'
```

### Opção B: Via Postman/Insomnia

1. Crie uma nova requisição **POST**
2. URL: sua URL do webhook
3. Body: JSON (raw)
4. Cole os dados de teste do arquivo `dados_teste.json`

### Opção C: Via n8n (Test Workflow)

1. No n8n, clique em **"Test workflow"**
2. Clique no node **"Webhook Lead"**
3. Clique em **"Test step"**
4. Em outra aba, faça o POST para a URL de teste

---

## PASSO 4: Verificar Resultados

### ✅ Checklist de Validação

- [ ] **n8n**: Workflow executou sem erros (bolinhas verdes)
- [ ] **Airtable**: Lead apareceu na tabela com todos os campos
- [ ] **Console**: Mensagens de WhatsApp simulado aparecem no log
- [ ] **Corretor**: Notificação simulada aparece no log

### 📊 Onde ver os logs

1. No n8n, clique em **"Executions"** (menu lateral)
2. Clique na execução mais recente
3. Clique nos nodes **"Simular WhatsApp"** e **"Notificar Corretor"**
4. Na aba **"Output"**, veja o campo `whatsapp_mensagem`

---

## PASSO 5: Criar Formulário de Teste (Typeform)

Para simular um formulário real:

### 5.1 Crie conta no Typeform
👉 [https://typeform.com](https://typeform.com)

### 5.2 Crie um novo formulário com os campos:
1. **Nome completo** (Short text)
2. **Telefone com DDD** (Phone number)
3. **E-mail** (Email)
4. **O que você busca?** (Multiple choice: Comprar, Alugar)
5. **Qual região?** (Short text)
6. **Faixa de preço/valor** (Short text)

### 5.3 Configure o Webhook
1. Vá em **Connect** → **Webhooks**
2. Cole a URL do seu webhook n8n
3. Ative

### 5.4 Mapeamento de Campos
No n8n, ajuste o node "Formatar Dados do Lead" para os nomes de campo do Typeform.

---

## 🎯 Próximos Passos (Evolução do Projeto)

### Nível 2: Adicionar WhatsApp Real
1. Criar conta na **Evolution API** ou **Z-API**
2. Substituir o node "Simular WhatsApp" por HTTP Request
3. Configurar webhook de resposta do WhatsApp

### Nível 3: Adicionar IA para Qualificação
1. Adicionar node **OpenAI**
2. Classificar intenção do lead automaticamente
3. Calcular score de qualidade

### Nível 4: Integrar CRM Real
1. Substituir Airtable por **RD Station**, **Pipedrive** ou **HubSpot**
2. Criar deals/oportunidades automaticamente

---

## 🆘 Troubleshooting

### "Webhook não recebe dados"
- Verifique se o workflow está **Ativo**
- Use a URL de **Production**, não de Test
- Confirme que o Content-Type é `application/json`

### "Airtable dá erro"
- Verifique se o token tem permissões de escrita
- Confirme que os nomes das colunas estão exatamente iguais
- Verifique se a Base está compartilhada corretamente

### "Campos chegam vazios"
- O Typeform envia em formato diferente
- Ajuste o node "Formatar Dados" para `$json.form_response.answers`

---

*Guia criado para Projeto de Treino #1 - Janeiro/2026*
