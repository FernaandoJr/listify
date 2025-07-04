# 🛒 Listify - Gerenciador de Listas de Compras

Uma aplicação web simples e prática para criar e gerenciar suas listas de compras, seguindo a arquitetura **MVC (Model-View-Controller)**.

## 👥 Autores

- **Fernando Divino** - [GitHub](https://github.com/FernaandoJr)
- **Luis Felipe Piasentini** - [GitHub](https://github.com/LuisPiasentini)


## 🛠️ Tecnologias

**Backend:**
- Node.js + Express + TypeScript
- SQLite (banco de dados)
- Autenticação com sessões

**Frontend:**
- HTML, CSS e JavaScript
- Tailwind CSS para estilização
- Interface responsiva


## 🚀 Como usar

### ⚡ Instalação Rápida (Tudo em um comando)

```bash
git clone https://github.com/FernaandoJr/listify.git
cd listify
npm run setup-all
```

Este comando faz **tudo automaticamente**:
- ✅ Instala todas as dependências
- ✅ Compila o código TypeScript  
- ✅ Configura o banco de dados
- ✅ Inicia o servidor em produção

### 🛠️ Instalação Passo a Passo

1. **Clone o projeto**
   ```bash
   git clone https://github.com/FernaandoJr/listify.git
   cd listify
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o banco de dados**
   ```bash
   npm run setup
   ```

4. **Inicie o servidor**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**
   
   Abra o navegador em: `http://localhost:3000`

### Usando a aplicação

1. **Registre-se** criando uma conta
2. **Faça login** com suas credenciais  
3. **Crie listas** de compras
4. **Adicione itens** às suas listas
5. **Marque itens** como comprados durante as compras


## 🏗️ Arquitetura MVC

### **Model** (`src/models/`)
Responsável pelos dados e lógica de negócio

### **View** (`src/views/`)
Interface do usuário (templates EJS)

### **Controller** (`src/controllers/`)
Lógica de controle da aplicação

## 📱 O que faz

- ✅ Criar e organizar listas de compras
- ✅ Adicionar itens com quantidade
- ✅ Marcar itens como comprados
- ✅ Acompanhar progresso das compras
- ✅ Sistema de login seguro



## 📋 Comandos disponíveis

### 🚀 Comandos de Setup Rápido
```bash
npm run setup-all       # Instala, builda, configura DB e roda em produção
npm run setup-dev       # Instala, configura DB e roda em desenvolvimento  
npm run complete-setup   # Instala, builda, configura DB e roda em dev
```

### ⚙️ Comandos Individuais
```bash
npm install             # Instala dependências
npm run setup          # Configura o banco de dados apenas
npm run build          # Compila TypeScript para JavaScript
npm run dev            # Inicia em modo desenvolvimento (hot reload)
npm start              # Inicia em modo produção (código compilado)
```

## 📁 Estrutura do Projeto

```
listify/
├── src/                    # Código fonte TypeScript
│   ├── controllers/        # Controllers MVC
│   ├── models/            # Models MVC
│   ├── views/             # Views MVC (HTML)
│   ├── routes/            # Roteamento
│   ├── middleware/        # Middlewares
│   ├── database/          # Configuração do banco
│   └── app.ts             # Aplicação principal
├── public/                # Arquivos estáticos
│   └── assets/            # CSS, JS, imagens
│       └── js/            # JavaScript do frontend
└── dist/                  # Código compilado
```

## 🔒 Segurança

- Senhas criptografadas com bcrypt
- Autenticação por sessões
- Validação de dados de entrada
- Proteção contra SQL injection

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

## 📊 Avaliação do Projeto

### ✅ **Critérios Atendidos:**

1. **✅ Banco de Dados (SQLite)**
   - SQLite configurado e funcionando
   - Duas tabelas principais: `users` e `shopping_lists`
   - Funcionalidades de cadastro e login implementadas
   - Interação completa com múltiplas tabelas

2. **✅ Node.js + Express**
   - Servidor Node.js com Express funcionando
   - Arquitetura robusta e escalável
   - Middleware configurado corretamente

3. **✅ MVC (Model-View-Controller)**
   - **Model**: Lógica de dados em `src/models/`
   - **View**: Templates EJS em `src/views/`
   - **Controller**: Lógica de negócio em `src/controllers/`
   - Separação clara de responsabilidades

4. **✅ TypeScript**
   - Todo backend em TypeScript
   - Tipagem forte e compilação correta
   - Código mais seguro e maintível

5. **✅ EJS (Templates)**
   - Todas as views convertidas para EJS
   - Funcionalidades JavaScript integradas nos templates:
     - Validação em tempo real
     - Contador dinâmico de listas
     - Estatísticas de progresso
     - Formatação de datas
     - Indicador de força de senha
     - Auto-save de rascunhos

6. **✅ UX (Experiência do Usuário)**
   - Interface moderna e responsiva
   - Navegação intuitiva
   - Feedback visual imediato
   - Design consistente em todas as páginas
  


Obrigado pela atenção ♥️
