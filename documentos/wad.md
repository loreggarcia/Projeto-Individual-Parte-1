# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## MyPlanner

#### Lorena Gabriela da Silva Garcia

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

## <a name="c1"></a>1. Introdução

Este projeto é uma aplicação web para gerenciamento de tarefas desenvolvido utilizando Node.js com Express.js como framework e PostgreSQL como banco de dados relacional, seguindo o padrão MVC (Model-View-Controller).

A aplicação permite funcionalidades tais quais como criar, editar e deletar tarefas, definir o status de prioridade por categorias, marcar tarefas como concluídas e filtrá-las por status ou data. 

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01 - opcional)

*Posicione aqui sua(s) Persona(s) em forma de texto markdown com imagens, ou como imagem de template preenchido. Atualize esta seção ao longo do módulo se necessário.*

### 2.2. User Stories (Semana 01 - opcional)

*Posicione aqui a lista de User Stories levantadas para o projeto. Siga o template de User Stories e utilize a referência USXX para numeração (US01, US02, US03, ...). Indique todas as User Stories mapeadas, mesmo aquelas que não forem implementadas ao longo do projeto. Não se esqueça de explicar o INVEST de 1 User Storie prioritária.*

---

## <a name="c3"></a>3. Projeto da Aplicação Web

A arquitetura do sistema MyPlanner segue o padrão MVC (Model-View-Controller), permitindo uma separação clara de responsabilidades e facilitando a manutenção e escalabilidade da aplicação.

### 3.1. Modelagem do banco de dados

A modelagem do banco de dados é o processo de criar uma representação estruturada das informações que serão armazenadas em um sistema de banco de dados. Este processo envolve a identificação das entidades principais, seus atributos e os relacionamentos entre elas, resultando em um esquema que serve como plano para a implementação física do banco de dados.

O modelo relacional do banco de dados da aplicação MyPlanner foi projetado para permitir um gerenciamento eficiente das tarefas diárias e suas relações com usuários. A estrutura do banco foi implementada usando PostgreSQL e segue os princípios de normalização para evitar redundâncias e garantir a integridade dos dados.

O diagrama abaixo apresenta a estrutura completa do banco de dados com todas as tabelas e seus relacionamentos:

#### Diagrama do banco no dbdiagram.io
<div align="center">
  <sup>Figura 1 - Diagrama do Banco de Dados no dbdiagram.io</sup>
  <img src="/documentos/assets/Captura de tela 2025-05-09 210145.png"/>
  <sup>Fonte: Autoria própria, 2025</sup>
</div>

#### Diagrama do banco no supabase

<div align="center">
  <sup>Figura 2 - Diagrama do Banco de Dados no Supabase</sup>
  <img src="/documentos/assets/Captura de tela 2025-05-09 213633.png"/>
  <sup>Fonte: Autoria própria, 2025</sup>
</div>

##### Resumo da Estrutura

- **Users**: Armazena informações de login e dados dos usuários 
- **Categorias**: Contém as categorias que classificam as tarefas
- **Tasks**: Armazena as tarefas, incluindo título, datas (criação, evento, término), prioridade, status de conclusão e referência ao usuário e à categoria associada.

##### Relações

- Um usuário pode ter várias tarefas;
- Cada tarefa pertence a uma categoria;
- Cada tarefa está associada a um único usuário;
- As categorias podem ser usadas por vários usuários, mas cada tarefa só pertence a uma categoria por vez

### 3.1.1 BD e Models 
A camada de Models em uma aplicação baseada na arquitetura MVC (Model-View-Controller) é responsável por lidar com a lógica de acesso a dados, abstraindo a interação direta com o banco de dados. No sistema de Gerenciamento de Tarefas, os Models servem como ponte entre os controladores e o banco de dados PostgreSQL, permitindo a manipulação segura, reutilizável e estruturada das informações.

Os Models garantem o encapsulamento das regras de negócio e facilitam a manutenção do sistema, isolando mudanças na base de dados e promovendo uma interface de acesso consistente para as demais camadas da aplicação.

### Models Implementados
#### Categoria Model: 
Responsável por todas as operações relacionadas à tabela `categorias`, permitindo a classificação de tarefas em diferentes tipos ou temas.

**Funcionalidades:**
- **CRUD completo:** métodos para criação, leitura, atualização e exclusão de categorias.
- **Organização das tarefas:** cada categoria pode ser associada a múltiplas tarefas, funcionando como uma tag organizacional.
- **Isolamento de lógica:** encapsula a manipulação da tabela `categorias`, promovendo independência entre banco e controle.

#### Task Model
Gerencia a tabela `tasks`, onde ficam armazenadas as informações das tarefas criadas pelos usuários.

**Funcionalidades:**
- **CRUD completo:** permite criar, consultar, atualizar e excluir tarefas.
- **Relacionamentos:** integra-se com os Models de `usuarios` e `categorias` por meio dos campos `id_usuario` e `id_categoria`.
- **Atributos ricos:** cada tarefa contém informações detalhadas como prioridade, status de conclusão, data de criação, prazo e evento associado.
#### Usuario Model
Responsável por lidar com os dados da tabela `usuarios`, englobando funcionalidades essenciais para o gerenciamento de perfis na aplicação.

**Funcionalidades:**
- **Operações CRUD:** cadastro, consulta, atualização e exclusão de usuários.
- **Campos sensíveis:** manipula atributos como `nome`, `email` e `senha`, que são fundamentais para autenticação e personalização.
- **Vínculo com tarefas:** cada usuário pode ser associado a diversas tarefas via chave estrangeira.


### 3.2. Arquitetura (Semana 5)

A arquitetura de software é o projeto de um sistema de software, que define normas, técnicas e o modo de interação entre os componentes do software. Ela estabelece a base para o desenvolvimento, a evolução e a manutenção do software. As arquiteturas possuem diversos padrões, que devem ser escolhidos de acordo com o modelo de negócio e os requisitos. Ou seja, a arquitetura de um software é a organização de um sistema, sendo responsável por definir tudo o que será utilizado dentro do projeto  
    
No caso do projeto MyPlanner, o padrão MVC (Model-View-Controller) foi escolhido para o projeto devido à sua flexibilidade, escalabilidade e reusabilidade. A arquitetura MVC é composta pelo _Model_, que estabelece a regra de negócio e as interações com os dados, o _View_, que define a apresentação da interface e dos dados para o usuário, e o _Controller_, responsável por conectar a _View_ ao _Model_. 

Abaixo está o o digrama de arquitetura desse projeto:

![!\[\[image.png\]\]](assets/image.png)

### 3.2.1.Fluxo da Arquitetura

1. **Cliente (Usuário e Navegador)**: O usuário interage com a aplicação por meio de uma interface no navegador. Essa interface envia requisições HTTP, como por exemplo o envio de formulários ou requisições de visualização de dados.
2. **View (frontRoutes.js)**: O arquivo `frontRoutes.js` é o ponto de entrada das requisições do navegador. Ele atua como intermediário, redirecionando o usuário para as rotas apropriadas de cada funcionalidade: tarefas, usuários ou categorias.
3. **Routes (CategoriaRoutes.js, TasksRoutes.js, UsuarioRoutes.js)**: Esses arquivos de rotas recebem as requisições vindas do `frontRoutes.js` e as encaminham para os respectivos controladores. Cada rota é responsável por mapear os endpoints da aplicação, como `GET /tarefas`, `POST /usuarios`, etc.
4. **Controllers (CategoriaController.js, TasksController.js, UsuarioController.js)**: Os controladores processam as requisições recebidas. Eles aplicam regras de negócio, fazem validações e interagem com os modelos. Por exemplo, o `TasksController.js` pode receber uma nova tarefa, validá-la e salvar no banco de dados por meio do `TasksModel.js`.
5. **Models (CategoriaModel.js, TasksModel.js, UsuarioModel.js)**: Os modelos representam a camada de dados da aplicação. Cada modelo é responsável por interagir com o banco de dados PostgreSQL, realizando operações como criação, leitura, atualização e exclusão (CRUD). Eles definem a estrutura das tabelas e encapsulam as consultas SQL.
6. **Banco de Dados (PostgreSQL)**: Todos os dados persistentes da aplicação são armazenados em um banco de dados PostgreSQL. Os modelos fazem consultas diretamente a esse banco, e os resultados são retornados aos controladores, que por sua vez os enviam para as rotas, até que cheguem de volta ao cliente como resposta da requisição.



### 3.3. Wireframes (Semana 03 - opcional)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05 - opcional)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05 - opcional)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e Endpoints

A Web API do sistema segue o modelo RESTful, permitindo a comunicação entre o frontend e o backend por meio de rotas HTTP organizadas em controladores (Controllers). Cada rota executa uma operação específica (GET, POST, PUT, DELETE), possibilitando funcionalidades como criação de usuários, listagem de tarefas, upload de arquivos, entre outras.

#### Tipos de Requisições HTTP Utilizadas

- **GET** – Recupera dados do servidor.
- **POST** – Envia dados para criar um novo recurso.
- **PUT** – Atualiza um recurso existente.
- **DELETE** – Remove um recurso.

#### Endpoints por Funcionalidade

##### Usuários

| Método | Rota                | Função                                   |
|--------|---------------------|------------------------------------------|
| GET    | /users              | Lista todos os usuários                  |
| GET    | /users/:id          | Retorna dados de um usuário específico   |
| POST   | /users              | Cria um novo usuário                     |
| PUT    | /users/:id          | Atualiza dados de um usuário             |
| DELETE | /users/:id          | Deleta um usuário                        |

##### Linhas de Montagem

| Método | Rota                   | Função                                      |
|--------|------------------------|---------------------------------------------|
| GET    | /assembleLines         | Lista todas as linhas de montagem           |
| POST   | /assembleLines         | Cria uma nova linha                         |
| DELETE | /assembleLines/:id     | Remove uma linha de montagem específica     |

##### Manuais

| Método | Rota                  | Função                                      |
|--------|-----------------------|---------------------------------------------|
| GET    | /handbooks            | Lista todos os manuais                      |
| GET    | /handbooks/:id        | Exibe detalhes de um manual específico      |
| POST   | /handbooks            | Cria um novo manual                         |
| PUT    | /handbooks/:id        | Atualiza um manual                          |
| DELETE | /handbooks/:id        | Remove um manual                            |

##### Tarefas

| Método | Rota               | Função                                     |
|--------|--------------------|--------------------------------------------|
| GET    | /tasks             | Lista todas as tarefas                     |
| GET    | /tasks/:id         | Exibe detalhes de uma tarefa específica    |
| POST   | /tasks             | Cria uma nova tarefa                       |
| PUT    | /tasks/:id         | Marca uma tarefa como concluída           |

##### Favoritos

| Método | Rota               | Função                                     |
|--------|--------------------|--------------------------------------------|
| GET    | /favorites         | Lista itens favoritados                    |
| POST   | /favorites         | Adiciona um novo favorito                  |
 

### 3.7 Interface e Navegação (Semana 07)

O frontend do sistema de gerenciamento de tarefas foi desenvolvido utilizando HTML5, CSS3 e JavaScript puro, respeitando a arquitetura MVC e consumindo dados dinamicamente via API RESTful integrada ao backend com PostgreSQL. A interface prioriza **clareza, responsividade e produtividade**, com um fluxo simples de interação entre usuário e sistema.

## 3.7.1 Área Principal

<div align="center" width="100%">
  <sub></sub>
    <img src="../documentos/assets/Captura de tela 2025-06-09 021543.png"/>
  <sup></sup>
</div>

**Funcionalidade**: Interface central que exibe as tarefas organizadas por categoria, com filtros, botões de ação e contadores de status.

**Features Principais**:

- Exibição dinâmica de tarefas filtradas por status e categoria;
    
- Botão de criação de nova tarefa;
    
- Contadores de tarefas "pendentes", "em andamento" e "concluídas";
    
- Estrutura de layout com colunas distintas;
    
- Feedback visual com cores por status;
    
- Organização automática das tarefas conforme o filtro ativo.
    

**Benefícios para o Usuário**:

- Visualização rápida do que precisa ser feito;
    
- Separação clara entre tipos de tarefa;
    
- Facilidade para criação e gerenciamento direto das atividades;
    
- Experiência limpa e sem distrações.
    

**Detalhes Técnicos**:

- HTML e CSS escritos de forma modular (dividido por áreas);
    
- Renderização das tarefas via JavaScript, utilizando `fetch` em endpoints `/tasks` com filtros;
    
- Manipulação de DOM para criar dinamicamente os cards de tarefa;
    
- Elementos com classes CSS reutilizáveis e responsivos.

## 3.7.2 Modal de Criação de Tarefa
<div align="center" width="100%">
  <sub></sub>
    <img src="../documentos/assets/Captura de tela 2025-06-09 021443.png"/>
  <sup></sup>
</div>

**Funcionalidade**: Modal flutuante que permite a criação de uma nova tarefa com título, descrição, prioridade, status e categoria.

**Features Principais**:

- Campos de entrada com validação (título obrigatório);
    
- Dropdowns para seleção de status, prioridade e categoria;
    
- Botões para "Criar Tarefa" e "Cancelar";
    
- Estilo limpo e responsivo com feedback visual;
    
- Pré-carregamento de categorias via API.
    

**Benefícios para o Usuário**:

- Criação rápida e orientada;
    
- Prevenção de erros com validações visuais;
    
- Interface familiar e prática.
    

**Detalhes Técnicos**:

- Modal criado dinamicamente com JavaScript;
    
- Requisição POST para `/tasks` com os dados do formulário;
    
- Fechamento automático e limpeza do formulário após criação;
    
- Integração com `localStorage` para salvar a última categoria usada.
    

<!-- imagem: modal-criacao-tarefa.png -->

## 3.7.3 Modal de Confirmação de Exclusão

<div align="center" width="100%">
  <sub></sub>
    <img src="../documentos/assets/Captura de tela 2025-06-09 030045.png"/>
  <sup></sup>
</div>

**Funcionalidade**: Modal simples exibido ao tentar excluir uma tarefa, solicitando confirmação do usuário.

**Features Principais**:

- Mensagem clara de confirmação;
    
- Botões “Cancelar” e “Confirmar”;
    
- Feedback visual ao usuário após confirmação;
    
- Bloqueio da tela de fundo (overlay escuro).
    

**Benefícios para o Usuário**:

- Prevenção de exclusões acidentais;
    
- Fluxo simples e direto.
    

**Detalhes Técnicos**:

- Modal implementado com manipulação direta do DOM;
    
- Ao confirmar, envia DELETE para `/tasks/:id`;
    
- Após resposta do servidor, recarrega a lista de tarefas.

## 3.7.4 Área de Filtros e Contadores
<div align="center" width="100%">
  <sub></sub>
    <img src="../documentos/assets/Captura de tela 2025-06-09 021507.png"/>
  <sup></sup>
</div>
**Funcionalidade**: Bloco superior com filtros por status e contadores de tarefas em cada categoria.

**Features Principais**:

- Botões para filtrar tarefas (todas, pendentes, em andamento, concluídas);
    
- Contadores dinâmicos por status;
    
- Destaque visual do filtro ativo;
    
- Feedback visual em tempo real ao alterar o filtro.
    

**Benefícios para o Usuário**:

- Visão geral clara da carga de trabalho;
    
- Navegação fluida e segmentada.
    

**Detalhes Técnicos**:

- Manipulação de classes CSS para aplicar destaque;
    
- Atualização do DOM com base em filtros via JavaScript;
    
- Filtros armazenados localmente com `localStorage` para persistência.
    

<!-- imagem: area-filtros-e-contadores.png -->

## 3.7.5 Modal de Edição de Tarefa

**Funcionalidade**: Modal semelhante ao de criação, utilizado para atualizar os dados de uma tarefa existente.

**Features Principais**:

- Campos pré-preenchidos com dados da tarefa;
    
- Botões para salvar alterações ou cancelar;
    
- Validação visual e interativa;
    
- Atualização automática da exibição após edição.
    

**Benefícios para o Usuário**:

- Alterações simples sem sair da visualização atual;
    
- Evita erros e duplicações.
    

**Detalhes Técnicos**:

- Modal com dados preenchidos via API (`GET /tasks/:id`);
    
- Atualização via PUT para o endpoint correspondente;
    
- Atualização local da DOM para evitar recarregamento da página.
    

<!-- imagem: modal-edicao-tarefa.png -->

## 3.7.6 Estrutura Técnica do Frontend

**Tecnologias Utilizadas**:

- HTML5 sem bibliotecas externas;
    
- CSS3 com classes semânticas e responsividade básica;
    
- JavaScript ES6 para lógica de requisições, manipulação de DOM e interação com API RESTful;
    
- Integração com o backend Express/PostgreSQL via `fetch()`.
    

**Padrões Implementados**:

- Separação de responsabilidades por arquivos: `index.html`, `style.css`, `script.js`;
    
- Componentização sem frameworks, baseada em templates dinâmicos;
    
- Feedback visual com classes condicionais e animações CSS;
    
- Controle de estado mínimo com objetos JS e `localStorage`.

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que o leitor possa consultar caso ele se interessar em aprofundar._<br>

---