# 🛒 Listify - Listas de Compras Inteligentes

Uma aplicação web moderna e responsiva para gerenciar listas de compras, construída com Node.js, Express, TypeScript, SQLite e EJS, utilizando Tailwind CSS para um design moderno.

## ✨ Características Principais

-   **🔐 Autenticação de Usuários**: Sistema seguro de registro e login com criptografia
-   **📝 Gerenciamento de Listas**: Criar, visualizar, editar e excluir listas de compras
-   **🛍️ Gerenciamento de Itens**: Adicionar itens com quantidades, marcar como comprado e remover
-   **📊 Progresso em Tempo Real**: Acompanhamento visual do progresso de cada lista
-   **📱 Design Responsivo**: Interface moderna que funciona em desktop e dispositivos móveis
-   **🗄️ Banco SQLite**: Base de dados leve e baseada em arquivo para persistência
-   **🎨 Interface em Português**: Totalmente localizada para o português brasileiro
-   **⚡ Tailwind CSS**: Design system moderno para uma interface elegante

## 🚀 Stack Tecnológica

### Backend

-   **Node.js** - Runtime JavaScript server-side
-   **Express.js** - Framework web minimalista e flexível
-   **TypeScript** - JavaScript com tipagem estática
-   **SQLite** - Banco de dados relacional leve
-   **bcrypt** - Criptografia segura para senhas

### Frontend

-   **EJS** - Engine de templates para renderização server-side
-   **Tailwind CSS** - Framework CSS utility-first via CDN
-   **JavaScript Vanilla** - Interatividade do lado cliente

### Desenvolvimento

-   **ts-node-dev** - Hot reloading para desenvolvimento
-   **express-session** - Gerenciamento de sessões
-   **sqlite3** - Driver SQLite para Node.js

## 🏗️ Arquitetura

O projeto segue o padrão **MVC (Model-View-Controller)** com separação clara de responsabilidades:

### 📂 Estrutura de Pastas

```
src/
├── 🚀 app.ts                 # Ponto de entrada da aplicação
├── 🎮 controllers/           # Lógica de negócio
│   ├── auth.ts              # Controlador de autenticação
│   └── shoppingList.ts      # Controlador das listas
├── 🗄️ database/             # Configuração do banco de dados
│   ├── database.ts          # Conexão com o banco
│   └── initDb.ts            # Inicialização das tabelas
├── 🛡️ middleware/           # Middlewares do Express
│   ├── auth.ts              # Middleware de autenticação
│   └── validation.ts        # Middleware de validação
├── 📊 models/               # Modelos de dados
│   ├── user.ts              # Modelo e operações de usuário
│   └── shoppingList.ts      # Modelos das listas
├── 🛤️ routes/               # Roteamento de URLs
│   ├── auth.ts              # Rotas de autenticação
│   └── shoppingList.ts      # Rotas das listas
├── 🏷️ types/                # Definições TypeScript
│   └── session.ts           # Tipos de sessão
└── 🎨 views/                # Templates EJS
    ├── login.ejs            # Página de login
    ├── register.ejs         # Página de cadastro
    ├── shoppingLists.ejs    # Visão geral das listas
    └── listDetails.ejs      # Detalhes da lista
```

### 🔄 Fluxo da Aplicação

1. **Rota** recebe a requisição HTTP
2. **Middleware** processa autenticação/validação
3. **Controller** executa a lógica de negócio
4. **Model** interage com o banco de dados
5. **View** renderiza a resposta para o usuário

## 🗃️ Esquema do Banco de Dados

### 👤 Tabela Users (Usuários)

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
);
```

### 📋 Tabela Shopping Lists (Listas de Compras)

```sql
CREATE TABLE shopping_lists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### 🛒 Tabela Shopping List Items (Itens das Listas)

```sql
CREATE TABLE shopping_list_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,
    purchased BOOLEAN DEFAULT 0,
    shopping_list_id INTEGER NOT NULL,
    FOREIGN KEY (shopping_list_id) REFERENCES shopping_lists(id)
);
```

### 🔗 Relacionamentos

-   Um **usuário** pode ter múltiplas **listas de compras**
-   Uma **lista** pode ter múltiplos **itens**
-   Exclusão em cascata para manter integridade dos dados

## ⚙️ Instalação e Configuração

### Pré-requisitos

-   **Node.js** (versão 16 ou superior)
-   **npm** (vem com o Node.js)
-   **Git** (para clonar o repositório)

### 🚀 Passo a Passo

1. **📥 Clone o repositório**

    ```bash
    git clone https://github.com/FernaandoJr/listify.git
    cd listify
    ```

2. **📦 Instale as dependências**

    ```bash
    npm install
    ```

3. **🗄️ Inicialize o banco de dados**

    ```bash
    npx ts-node src/database/initDb.ts
    ```

4. **🔥 Inicie o servidor de desenvolvimento**

    ```bash
    npm run dev
    ```

5. **🌐 Acesse a aplicação**

    Abra seu navegador e navegue para `http://localhost:3000`

### 🐳 Alternativa com Docker (Opcional)

```bash
# Em breve - Docker configuration coming soon
```

## 📖 Como Usar

### 🔐 Registro e Login

1. 🏠 Visite a página inicial da aplicação
2. 📝 Crie uma nova conta clicando em "Cadastre-se aqui"
3. ✍️ Preencha seus dados e envie o formulário
4. 🔑 Faça login com suas credenciais

### 📋 Gerenciando Listas de Compras

1. 📊 Após o login, você verá seu painel de listas
2. ➕ Crie uma nova lista inserindo um nome e clicando em "Criar Lista"
3. 👆 Clique em qualquer lista para visualizar e gerenciar seus itens

### 🛍️ Gerenciando Itens

1. 📝 Na lista, adicione itens inserindo descrição e quantidade
2. ✅ Marque itens como comprados clicando na checkbox
3. 🗑️ Remova itens clicando no botão "Remover"
4. 📈 Visualize estatísticas de progresso no topo da lista

### 📊 Funcionalidades Avançadas

-   **Progresso Visual**: Acompanhe % de itens comprados
-   **Estatísticas**: Total, comprados, restantes
-   **Responsivo**: Use em qualquer dispositivo
-   **Seguro**: Seus dados são protegidos

## 🛠️ Scripts Disponíveis

| Script              | Comando                              | Descrição                           |
| ------------------- | ------------------------------------ | ----------------------------------- |
| **Desenvolvimento** | `npm run dev`                        | Inicia o servidor com hot reloading |
| **Banco de Dados**  | `npx ts-node src/database/initDb.ts` | Inicializa as tabelas do banco      |
| **Build**           | `npm run build`                      | Compila o TypeScript (em breve)     |
| **Produção**        | `npm start`                          | Inicia em modo produção (em breve)  |
| **Teste**           | `npm test`                           | Executa testes unitários (em breve) |

## 🎨 Características Detalhadas

### 🔒 Sistema de Autenticação

-   ✅ Hash seguro de senhas com bcrypt (salt rounds: 10)
-   ✅ Autenticação baseada em sessões
-   ✅ Rotas protegidas com middleware
-   ✅ Redirecionamento automático
-   ✅ Validação de entrada com express-validator

### 🎯 Experiência do Usuário

-   ✅ Design moderno e responsivo com **Tailwind CSS**
-   ✅ Interface completamente em **português brasileiro**
-   ✅ Elementos interativos com efeitos hover
-   ✅ Acompanhamento de progresso em tempo real
-   ✅ Validação de formulários e tratamento de erros
-   ✅ Interface otimizada para mobile
-   ✅ Feedback visual para ações do usuário

### 💾 Operações de Banco de Dados

-   ✅ Registro e login de usuários
-   ✅ Operações CRUD para listas de compras
-   ✅ Operações CRUD para itens das listas
-   ✅ Relacionamentos adequados com chaves estrangeiras
-   ✅ Exclusão em cascata para integridade dos dados
-   ✅ Consultas parametrizadas (prevenção SQL injection)

## 🔐 Características de Segurança

-   🛡️ **Criptografia de Senhas**: Hash com bcrypt e salt
-   🔒 **Autenticação por Sessão**: Gerenciamento seguro de sessões
-   🚪 **Rotas Protegidas**: Middleware de autorização
-   💉 **Prevenção SQL Injection**: Consultas parametrizadas
-   ✅ **Verificação de Autorização**: Usuários só acessam seus dados
-   🔄 **Regeneração de Sessão**: Nova sessão a cada login
