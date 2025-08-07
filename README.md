# 🌍 Projeto de Monitoramento Ambiental

Bem-vindo ao projeto de Monitoramento Ambiental! Esta aplicação é uma ferramenta para gerenciar e visualizar projetos de pesquisa, permitindo a criação, edição e exclusão de projetos, bem como a sua visualização em um mapa interativo.

A aplicação está disponível em: [https://environmental-monitoring-lilac.vercel.app/](https://environmental-monitoring-lilac.vercel.app/)

## ✨ Funcionalidades

* **Listagem e Busca:** Uma barra lateral com a listagem de todos os projetos, com a opção de buscar por nome.
* **Gestão de Projetos:** Crie novos projetos com informações como nome, responsável e status (Ativo, Pendente, Finalizado).
* **Visualização no Mapa:** Os projetos são exibidos em um mapa interativo, onde é possível desenhar e visualizar as áreas de interesse.
* **Exclusão de Projetos:** Capacidade de remover projetos existentes.

## 🛠️ Tecnologias Utilizadas

### Backend

O backend foi desenvolvido com **Node.js** e **NestJS**, utilizando **TypeScript**. A persistência de dados é gerenciada com **TypeORM** em um banco de dados **PostgreSQL**.

* **Framework:** NestJS
* **Linguagem:** TypeScript
* **ORM:** TypeORM
* **Banco de Dados:** PostgreSQL
* **Geração de IDs:** nanoid
* **Hospedagem:** Railway

### Frontend

O frontend é uma aplicação **React** moderna, criada com **Vite**, que consome a API do backend.

* **Framework:** React
* **Build Tool:** Vite
* **Linguagem:** TypeScript
* **HTTP Client:** Axios
* **Mapeamento:** Leaflet e leaflet-draw
* **Estilização:** Tailwind CSS
* **Componentes de UI:** shadcn/ui
* **Validação:** Zod 
* **Ícones:** Lucide React

---

## 🚀 Como Executar o Projeto Localmente

Siga os passos abaixo para configurar e rodar a aplicação em sua máquina.

### Pré-requisitos

Certifique-se de ter o **Docker** e o **Node.js** instalados em seu sistema.

### 1. Configuração do Backend

1.  Navegue até a pasta `backend/`:

    ```bash
    cd backend/
    ```

2.  Crie um arquivo `.env` a partir do `.env.example` e ajuste as variáveis de ambiente, se necessário. Para o ambiente de desenvolvimento, a configuração padrão é suficiente.

    ```bash
    cp .env.example .env
    ```

    Exemplo do `.env` para desenvolvimento local:
    ```
    NODE_ENV=development

    # Configurações do Docker Compose
    POSTGRES_DB=monitoring
    POSTGRES_USER=abcd
    POSTGRES_PASSWORD=abcdef
    DB_PORT=5433
    DB_HOST=localhost

    CORS_ORIGIN=http://localhost:5173
    PORT=3000
    ```
    ⚠️ **Nota:** A variável `CORS_ORIGIN` deve corresponder à URL do seu frontend, que por padrão é `http://localhost:5173`.\

3.  Instale as dependências:

    ```bash
    npm install
    ```

4.  Inicie o contêiner do banco de dados com Docker Compose:

    ```bash
    docker compose up -d
    ```

5.  Inicie a aplicação do backend em modo de desenvolvimento:

    ```bash
    npm run start:dev
    ```
    O backend estará rodando em `http://localhost:3000`.

### 2. Configuração do Frontend

1.  Em um novo terminal, navegue até a pasta `frontend/web-app/`:

    ```bash
    cd frontend/web-app/
    ```

2.  Crie um arquivo `.env.local` e defina a URL da API, que deve apontar para o seu backend local:

    ```bash
    VITE_API_BASE_URL=http://localhost:3000/api
    ```

3.  Instale as dependências:

    ```bash
    npm install
    ```

4.  Inicie a aplicação do frontend:

    ```bash
    npm run dev
    ```
    O frontend estará disponível em `http://localhost:5173`.

---

## 💻 Endpoints da API

Todos os endpoints da API são prefixados com `/api/projects`.

| Método | Endpoint         | Descrição                            |
| :----- | :--------------- | :----------------------------------- |
| `POST` | `/projects`      | Cria um novo projeto.                |
| `GET`  | `/projects`      | Retorna todos os projetos.           |
| `GET`  | `/projects?name=...`| Busca projetos pelo nome.         |
| `GET`  | `/projects/:id`  | Retorna um projeto específico pelo ID. |
| `DELETE`| `/projects/:id` | Remove um projeto pelo ID.           |

---

## 🛠️ Testes Unitários (Backend)

O backend do projeto possui uma cobertura de testes unitários robusta para garantir a estabilidade e o comportamento esperado da lógica de negócios. Os testes, escritos com **Jest** e **@nestjs/testing**, cobrem as principais funcionalidades do `ProjectsService`, como a criação, busca, exclusão e a contagem de projetos por status.

## 📂 Estrutura do Projeto

### Backend

A arquitetura do backend segue os princípios do NestJS, com a estrutura modular para organizar o código.

* **`projects/`**: Módulo dedicado à entidade de projetos, contendo os controladores, serviços, entidades e testes.
    * **`dto/`**: Contém os **Data Transfer Objects (DTOs)**, usados para tipar os dados que chegam e saem dos endpoints. Por exemplo, `create-project.dto.ts` define a estrutura para a criação de um projeto.
    * **`entities/`**: Define a estrutura da entidade `Project` com as colunas do banco de dados, utilizando os decorators do TypeORM.
    * **`enums/`**: Contém enums como `ProjectStatus`, que define os estados possíveis de um projeto.
    * **`projects.controller.ts`**: Lida com as requisições HTTP e as direciona para o serviço correspondente.
    * **`projects.module.ts`**: Módulo que agrupa todos os componentes do `projects`.
    * **`projects.service.spec.ts`**: Arquivo de **testes unitários** para o serviço de projetos, garantindo que a lógica de negócios funcione conforme o esperado.
    * **`projects.service.ts`**: Contém a lógica de negócios para a entidade `Project`.
* **`utils/validators/`**: Armazena validadores personalizados, como o `geojson.validator.ts`, que garante que o formato da geometria seja válido.
* **`app.module.ts`**: Módulo raiz da aplicação que importa e organiza os outros módulos.
* **`main.ts`**: Ponto de entrada da aplicação, onde o servidor é inicializado.


### Frontend

O frontend adota uma arquitetura baseada em componentes e contexto, facilitando a reutilização e o gerenciamento de estado.

* `components/`: Pasta para todos os componentes da interface do usuário.
    * `map/`: Componentes específicos para a visualização e interação com o mapa.
    * `project/`: Componentes da barra lateral e modal de gerenciamento de projetos.
    * `ui/`: Componentes reutilizáveis do shadcn.
* `contexts/`: Contém o **ProjectsContext**, que gerencia o estado global dos projetos na aplicação, evitando a necessidade de passar props manualmente entre muitos componentes.
* `hooks/`: Ganchos personalizados, como `useProjects`, que encapsulam a lógica de interação com o contexto de projetos.
* `pages/`: Componentes de página, como `MonitoringPage.tsx`, que unem todos os componentes da interface para formar a página principal.
* `services/`: Contém o `project.service.ts`, responsável por todas as chamadas à API, abstraindo a lógica de requisição do restante da aplicação.
* `schemas/`: Schemas de validação Zod, como `project.schema.ts`, que garantem que os dados de entrada estejam no formato correto antes de serem enviados à API.
* `styles/`: Arquivos de estilização global.
* `utils/`: Funções utilitárias.


---
### 📌 Considerações Finais

Esta aplicação foi desenvolvida como um desafio técnico, com foco em organização de código, boas práticas de arquitetura e integração entre frontend e backend. O projeto também explora a manipulação geoespacial com mapas interativos e controle de dados via API REST.


---
### 👨‍💻 Autor

**João Pedro Santos**

* [LinkedIn](https://www.linkedin.com/in/joaopedrosantosdev/)
* [GitHub](https://github.com/joaopedromsantos)