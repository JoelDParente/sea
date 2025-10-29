-- SQL ANSI 2003 compatível com MySQL/MariaDB
CREATE DATABASE QuestEdu;
USE QuestEdu;

CREATE TABLE Escola (
  id_escola INT PRIMARY KEY AUTO_INCREMENT,
  nome_escola VARCHAR(120) NOT NULL,
  email VARCHAR(320) NOT NULL,
  logo VARCHAR(1024),
  cep VARCHAR(9),
  bairro VARCHAR(50),
  rua VARCHAR(50),
  num VARCHAR(100),
  estado VARCHAR(50),
  inep VARCHAR(12),
  telefone VARCHAR(15)
);

CREATE TABLE Turma (
  id_turma INT PRIMARY KEY AUTO_INCREMENT,
  id_escola INT NOT NULL,
  turno VARCHAR(8) NOT NULL,
  serie VARCHAR(1) NOT NULL,
  nome_turma VARCHAR(100) NOT NULL,
  FOREIGN KEY(id_escola) REFERENCES Escola(id_escola)
);

CREATE TABLE Usuario (
  uid INT PRIMARY KEY AUTO_INCREMENT,
  id_escola INT NOT NULL,
  tipo VARCHAR(9) NOT NULL, -- 'professor', 'aluno', 'admin'
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(320) NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  telefone VARCHAR(15),
  FOREIGN KEY(id_escola) REFERENCES Escola(id_escola)
);

CREATE TABLE Disciplina (
  id_disciplina INT PRIMARY KEY AUTO_INCREMENT,
  nome_disciplina VARCHAR(50) NOT NULL,
  descricao TEXT
);

CREATE TABLE Assunto (
  id_assunto INT PRIMARY KEY AUTO_INCREMENT,
  id_disciplina INT NOT NULL,
  nome_assunto VARCHAR(50) NOT NULL,
  FOREIGN KEY(id_disciplina) REFERENCES Disciplina(id_disciplina)
);

CREATE TABLE ProfessorDisciplina (
  id_disciplina INT NOT NULL,
  uid INT NOT NULL,
  PRIMARY KEY (id_disciplina, uid),
  FOREIGN KEY(id_disciplina) REFERENCES Disciplina(id_disciplina),
  FOREIGN KEY(uid) REFERENCES Usuario(uid)
);

CREATE TABLE ProfessorTurma (
  id_turma INT NOT NULL,
  uid_professor INT NOT NULL,
  PRIMARY KEY (id_turma, uid_professor),
  FOREIGN KEY(id_turma) REFERENCES Turma(id_turma),
  FOREIGN KEY(uid_professor) REFERENCES Usuario(uid)
);

CREATE TABLE Questao (
  id_questao INT PRIMARY KEY AUTO_INCREMENT,
  id_assunto INT NOT NULL,
  uid_professor INT NOT NULL,
  enunciado TEXT NOT NULL,
  tipo VARCHAR(15) NOT NULL,
  resposta_correta TEXT,
  status VARCHAR(7),
  publico BOOLEAN DEFAULT FALSE,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(id_assunto) REFERENCES Assunto(id_assunto),
  FOREIGN KEY(uid_professor) REFERENCES Usuario(uid)
);

CREATE TABLE Alternativas (
  id_alternativa INT PRIMARY KEY AUTO_INCREMENT,
  id_questao INT NOT NULL,
  texto TEXT NOT NULL,
  correta BOOLEAN DEFAULT FALSE,
  FOREIGN KEY(id_questao) REFERENCES Questao(id_questao)
);

CREATE TABLE Tags (
  id_tag INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL
);

CREATE TABLE Prova (
  id_prova INT PRIMARY KEY AUTO_INCREMENT,
  uid_professor INT NOT NULL,
  titulo VARCHAR(100) NOT NULL,
  versao VARCHAR(6),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(uid_professor) REFERENCES Usuario(uid)
);

CREATE TABLE ProvaQuestao (
  id_prova INT NOT NULL,
  id_questao INT NOT NULL,
  PRIMARY KEY (id_prova, id_questao),
  FOREIGN KEY(id_prova) REFERENCES Prova(id_prova),
  FOREIGN KEY(id_questao) REFERENCES Questao(id_questao)
);

CREATE TABLE ProvaTurma (
  id_turma INT NOT NULL,
  id_prova INT NOT NULL,
  PRIMARY KEY (id_turma, id_prova),
  FOREIGN KEY(id_turma) REFERENCES Turma(id_turma),
  FOREIGN KEY(id_prova) REFERENCES Prova(id_prova)
);

CREATE TABLE Gabarito (
  id_gabarito INT PRIMARY KEY AUTO_INCREMENT,
  id_prova INT NOT NULL,
  id_questao INT NOT NULL,
  alternativa TEXT NOT NULL,
  versao VARCHAR(6),
  FOREIGN KEY(id_prova) REFERENCES Prova(id_prova),
  FOREIGN KEY(id_questao) REFERENCES Questao(id_questao)
);

CREATE TABLE Aluno (
  id_aluno INT PRIMARY KEY AUTO_INCREMENT,
  id_turma INT NOT NULL,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(320),
  matricula VARCHAR(7) NOT NULL UNIQUE,
  FOREIGN KEY(id_turma) REFERENCES Turma(id_turma)
);

CREATE TABLE GabaritoAluno (
  id_prova INT NOT NULL,
  id_aluno INT NOT NULL,
  id_questao INT NOT NULL,
  resposta_aluno VARCHAR(1),
  PRIMARY KEY (id_prova, id_aluno, id_questao),
  FOREIGN KEY(id_prova) REFERENCES Prova(id_prova),
  FOREIGN KEY(id_aluno) REFERENCES Aluno(id_aluno),
  FOREIGN KEY(id_questao) REFERENCES Questao(id_questao)
);

CREATE TABLE AdminGeral (
  uid INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(320) NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  telefone VARCHAR(15)
);
