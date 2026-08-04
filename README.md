# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

#  Escala SEMURB

Sistema web de gestão de escalas de trabalho desenvolvido para a **Secretaria de Mobilidade Urbana (SEMURB)** da Prefeitura de Barueri. Permite que administradores cadastrem funcionários, equipes, setores, escalas e turnos, enquanto cada funcionário acompanha sua própria escala, folgas e feriados em um calendário interativo.

## Sumário

- [Funcionalidades](##-Funcionalidades)
- [Tecnologias](#-Tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Variáveis de ambiente](#-Variáveis-de-ambiente)
- [Rodando o projeto](#-Rodando-o-projeto)
- [Estrutura de pastas](#-estrutura-de-pastas)
- [Repositório do backend](#-repositório-do-backend)
- [Licença](#-licença)

## Funcionalidades

### Para funcionários
- Login com matrícula e senha
- Recuperação de senha por código enviado ao email
- Visualização da própria escala em um calendário (dias de trabalho, folga e feriados destacados)
- Consulta de horário de turno, intervalo e folgas do mês
- Histórico de alterações pontuais na escala (dias esporádicos)
- Visualização de funcionários ativos em um dia específico
- Notificações de mudanças na escala/turno
- Alternância entre tema claro e escuro

### Para administradores de setor
- Cadastro e edição de funcionários, equipes e escalas do próprio setor
- Cadastro de turnos (horário de início, término, duração e intervalo)
- Painel com gráfico de funcionários por tipo de escala
- Geração de relatórios em PDF (geral do setor, por equipe ou por funcionário)
- Acompanhamento de confirmações de leitura de escala por funcionário

### Para devs
- Gestão de todos os setores, equipes, escalas, turnos e funcionários do sistema
- Cadastro e remoção de setores
- Cadastro de feriados
- Painel com gráfico de funcionários por setor

## Tecnologias

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Flowbite React](https://flowbite-react.com/)
- [React Calendar](https://github.com/wojtekmaj/react-calendar)
- [React Google Charts](https://react-google-charts.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Spinners](https://www.davidhu.io/react-spinners/)
- [ESLint](https://eslint.org/)

##  Pré-requisitos

- [Node.js](https://nodejs.org/) 20.19+ ou 22.12+
- npm (instalado junto com o Node)

##  Instalação

```bash
# Clone o repositório
git clone https://github.com/<seu-usuario>/escala-semurb-website.git

# Entre na pasta do projeto
cd escala-semurb-website

# Instale as dependências
npm install
```

##  Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`:

```env
VITE_API_URL=< url da sua api >
```

> Todas as variáveis usadas no front precisam começar com `VITE_` (regra do Vite).

##  Rodando o projeto

```bash
# Ambiente de desenvolvimento (http://localhost:5173)
npm run dev

# Build de produção (gera a pasta /dist)
npm run build

# Pré-visualizar o build de produção localmente
npm run preview

# Rodar o linter
npm run lint
```

## Estrutura de pastas

```
src/
├── api/            # instância do axios e interceptors
├── assets/         # imagens e fontes
├── components/     # componentes reutilizáveis (Header, Graph, modals/...)
├── context/        # contexts do React (Auth, Theme)
├── hook/           # hooks customizados (useAuth, useTheme)
├── pages/          # páginas/rotas da aplicação
├── services/       # chamadas à API organizadas por domínio
├── styles/         # arquivos CSS por página/componente
├── theme/          # definição dos temas claro/escuro
└── utils/          # funções auxiliares (feriados, dias de folga)
```

## 🔗 Repositório do backend

A API consumida por este projeto está em um repositório separado:
[`backend-escala-semurb`](#) — Node.js + Express + Supabase.

## 📄 Licença

Projeto interno desenvolvido para a Secretaria de Moblilidade Urbana de Barueri — SEMURB.
