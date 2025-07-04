# 🛒 Listify - Gerenciador de Listas de Compras

Uma aplicação web simples e prática para criar e gerenciar suas listas de compras.

## 👥 Autores

- **Fernando** - [fernando.divino@gmail.com](https://github.com/FernaandoJr)
- **Luis Felipe Piasentini** - [luis.piasentini@gmail.com](https://github.com/LuisPiasentini)


## 📱 O que faz

- ✅ Criar e organizar listas de compras
- ✅ Adicionar itens com quantidade
- ✅ Marcar itens como comprados
- ✅ Acompanhar progresso das compras
- ✅ Sistema de login seguro

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

## 📁 Estrutura do projeto

```
src/
├── app.ts              # Servidor principal
├── controllers/        # Lógica de negócio
├── models/            # Acesso ao banco de dados  
├── routes/            # Rotas da API
├── middleware/        # Validações e autenticação
└── database/          # Configuração do banco

public/
├── *.html             # Páginas da aplicação
└── js/               # JavaScript do frontend
```

## 🔒 Segurança

- Senhas criptografadas com bcrypt
- Autenticação por sessões
- Validação de dados de entrada
- Proteção contra SQL injection

## 📄 Licença

Este projeto está licenciado sob a licença MIT.
