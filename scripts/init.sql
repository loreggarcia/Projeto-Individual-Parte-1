/* Gerenciador de Tarefas:
Funcionalidades:
Criar, editar e deletar tarefas - futuro 
Definir prioridade e status (ok)
Organizar por categorias (ok)
Marcar tarefas como concluídas 
Filtrar tarefas por status ou data */

CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL, 
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE categorias (
    id_categoria INT PRIMARY KEY, 
    nome_categoria VARCHAR(100) NOT NULL
);

CREATE TABLE tasks (
    id_task INT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    data_evento DATE,
    prioridade VARCHAR(10) CHECK (prioridade IN ('baixa', 'média', 'alta')) NOT NULL,
    data_criacao DATE DEFAULT CURRENT_DATE,
    data_termino DATE,
    concluida BOOLEAN DEFAULT FALSE,
    id_usuario INT,
    id_categoria INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- Inserir categorias padrão
INSERT INTO categorias (nome_categoria) VALUES 
('trabalho'),
('pessoal'),
('estudos'),
('saude'),
('outros')
ON CONFLICT DO NOTHING;
