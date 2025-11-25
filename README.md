# AstroSense - SaaS de Horóscopo com IA

Plataforma SaaS de horóscopo online com sistema de créditos, consultas diárias e integração com Inteligência Artificial.

## 🚀 Funcionalidades

- **Autenticação**: Cadastro e Login com JWT.
- **Horóscopo Diário**: 1 crédito grátis por dia para consultas.
- **IA Astrológica**: Perguntas personalizadas e compatibilidade entre signos.
- **Sistema de Créditos**: Compra de pacotes de créditos (simulação de pagamento).
- **Dashboard**: Área do usuário com histórico e saldo.

## 🛠️ Tecnologias

- **Frontend**: React, Vite, TailwindCSS.
- **Backend**: Node.js, Express, Sequelize (PostgreSQL).
- **Infra**: Docker, Docker Compose.

## 📦 Como Rodar o Projeto

### Pré-requisitos
- Docker e Docker Compose instalados.
- Node.js (opcional, se quiser rodar fora do Docker).

### Passo a Passo

1.  **Clone o repositório** (se aplicável).

2.  **Configuração de Ambiente (.env)**
    - O projeto já possui configurações padrão no `docker-compose.yml` e nos arquivos de config.
    - Para produção, crie arquivos `.env` nas pastas `backend` e `frontend` baseados nos exemplos.

3.  **Subir a Aplicação com Docker**
    Execute na raiz do projeto:
    ```bash
    docker-compose up --build
    ```
    Isso irá subir:
    - Banco de dados Postgres (porta 5432)
    - Backend API (porta 3000)
    - Frontend (porta 5173)

4.  **Acessar a Aplicação**
    - Frontend: [http://localhost:5173](http://localhost:5173)
    - Backend API: [http://localhost:3000](http://localhost:3000)

### Rodando Localmente (Sem Docker)

**Backend:**
1.  Entre na pasta `backend`: `cd backend`
2.  Instale dependências: `npm install`
3.  Configure o banco de dados no `src/config/database.js` ou via variáveis de ambiente.
4.  Rode as migrations (se houver script configurado) ou deixe o `sequelize.sync()` rodar no start (configurado no `server.js` para dev).
5.  Inicie: `npm run dev`

**Frontend:**
1.  Entre na pasta `frontend`: `cd frontend`
2.  Instale dependências: `npm install`
3.  Inicie: `npm run dev`

## 🧪 Testes

**Backend:**
```bash
cd backend
npm test
```

## 📝 Próximos Passos para Produção

1.  **Integração Real com IA**: Substituir o mock no `HoroscopeService` pela API da OpenAI ou Gemini.
2.  **Gateway de Pagamento**: Substituir o mock no `PaymentService` por Stripe ou Mercado Pago.
3.  **Segurança**: Configurar HTTPS, rate limiting, e validação de inputs mais robusta (Joi/Zod).
4.  **Email**: Implementar envio real de emails para recuperação de senha.

---
Desenvolvido com 💜 por William Simas
