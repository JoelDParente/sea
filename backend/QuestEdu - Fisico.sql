-- Modelo Físico - QuestEdu
-- Compatível com MySQL ANSI 2003

CREATE DATABASE QuestEdu;
USE QuestEdu;

CREATE TABLE Escola (
  id_escola INT PRIMARY KEY AUTO_INCREMENT,
  inep VARCHAR(12),
  nome_escola VARCHAR(120) NOT NULL,
  email VARCHAR(320) NOT NULL,
  telefone VARCHAR(15),
  logo VARCHAR(1024),
  estado VARCHAR(50),
  cep VARCHAR(9),
  bairro VARCHAR(50),
  rua VARCHAR(50),
  num VARCHAR(100),
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Turma (
  id_turma INT PRIMARY KEY AUTO_INCREMENT,
  id_escola INT,
  nome_turma VARCHAR(100),
  serie VARCHAR(1),
  turno VARCHAR(8),
  FOREIGN KEY (id_escola) REFERENCES Escola (id_escola)
);

CREATE TABLE Usuario (
  uid INT PRIMARY KEY AUTO_INCREMENT,
  id_escola INT,
  nome VARCHAR(100),
  email VARCHAR(320) UNIQUE,
  senha VARCHAR(255),
  telefone VARCHAR(15),
  tipo VARCHAR(9),
  ativo BOOLEAN DEFAULT TRUE,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_escola) REFERENCES Escola (id_escola)
);

CREATE TABLE Disciplina (
  id_disciplina INT PRIMARY KEY AUTO_INCREMENT,
  nome_disciplina VARCHAR(50),
  descricao TEXT
);

CREATE TABLE Assunto (
  id_assunto INT PRIMARY KEY AUTO_INCREMENT,
  id_disciplina INT,
  nome_assunto VARCHAR(50),
  FOREIGN KEY (id_disciplina) REFERENCES Disciplina (id_disciplina)
);

CREATE TABLE Questao (
  id_questao INT PRIMARY KEY AUTO_INCREMENT,
  id_assunto INT,
  uid_professor INT,
  enunciado TEXT,
  resposta_correta TEXT,
  tipo VARCHAR(15),
  publico BOOLEAN DEFAULT FALSE,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_assunto) REFERENCES Assunto (id_assunto),
  FOREIGN KEY (uid_professor) REFERENCES Usuario (uid)
);

CREATE TABLE Alternativas (
  id_alternativa INT PRIMARY KEY AUTO_INCREMENT,
  id_questao INT,
  texto TEXT,
  FOREIGN KEY (id_questao) REFERENCES Questao (id_questao)
);

CREATE TABLE Prova (
  id_prova INT PRIMARY KEY AUTO_INCREMENT,
  uid_professor INT,
  titulo VARCHAR(100),
  versao VARCHAR(6),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (uid_professor) REFERENCES Usuario (uid)
);

CREATE TABLE ProvaQuestao (
  id_prova INT,
  id_questao INT,
  PRIMARY KEY (id_prova, id_questao),
  FOREIGN KEY (id_prova) REFERENCES Prova (id_prova),
  FOREIGN KEY (id_questao) REFERENCES Questao (id_questao)
);

CREATE TABLE ProvaTurma (
  id_prova INT,
  id_turma INT,
  PRIMARY KEY (id_prova, id_turma),
  FOREIGN KEY (id_prova) REFERENCES Prova (id_prova),
  FOREIGN KEY (id_turma) REFERENCES Turma (id_turma)
);

CREATE TABLE ProfessorDisciplina (
  id_disciplina INT,
  uid INT,
  PRIMARY KEY (id_disciplina, uid),
  FOREIGN KEY (id_disciplina) REFERENCES Disciplina (id_disciplina),
  FOREIGN KEY (uid) REFERENCES Usuario (uid)
);

CREATE TABLE ProfessorTurma (
  id_turma INT,
  uid_professor INT,
  PRIMARY KEY (id_turma, uid_professor),
  FOREIGN KEY (id_turma) REFERENCES Turma (id_turma),
  FOREIGN KEY (uid_professor) REFERENCES Usuario (uid)
);

CREATE TABLE Gabarito (
  id_gabarito INT PRIMARY KEY AUTO_INCREMENT,
  id_prova INT,
  questao INT,
  alternativa TEXT,
  versao VARCHAR(6),
  FOREIGN KEY (id_prova) REFERENCES Prova (id_prova),
  FOREIGN KEY (questao) REFERENCES Questao (id_questao)
);

CREATE TABLE Aluno (
  id_aluno INT PRIMARY KEY AUTO_INCREMENT,
  id_turma INT,
  matricula VARCHAR(7),
  nome VARCHAR(100),
  email VARCHAR(320),
  FOREIGN KEY (id_turma) REFERENCES Turma (id_turma)
);

CREATE TABLE GabaritoAluno (
  id_prova INT,
  id_aluno INT,
  id_questao INT,
  resposta_aluno VARCHAR(1),
  PRIMARY KEY (id_prova, id_aluno, id_questao),
  FOREIGN KEY (id_prova) REFERENCES Prova (id_prova),
  FOREIGN KEY (id_aluno) REFERENCES Aluno (id_aluno),
  FOREIGN KEY (id_questao) REFERENCES Questao (id_questao)
);

CREATE TABLE Tags (
  id_tag INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50)
);

CREATE TABLE AdminGeral (
  uid INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  email VARCHAR(320),
  telefone VARCHAR(15),
  ativo BOOLEAN DEFAULT TRUE,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ultima_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

