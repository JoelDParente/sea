-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 25/11/2025 às 01:16
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

CREATE DATABASE sea;
USE sea;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `sea`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `admingeral`
--

CREATE TABLE `admingeral` (
  `uid` int(11) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `email` varchar(320) DEFAULT NULL,
  `telefone` varchar(15) DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT 1,
  `data_cadastro` timestamp NOT NULL DEFAULT current_timestamp(),
  `ultima_atualizacao` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `alternativas`
--

CREATE TABLE `alternativas` (
  `id_alternativa` int(11) NOT NULL,
  `id_questao` int(11) DEFAULT NULL,
  `texto` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `alternativas`
--

INSERT INTO `alternativas` (`id_alternativa`, `id_questao`, `texto`) VALUES
(41, 9, '“a singularidade”.'),
(42, 9, '“tais vantagens”.'),
(43, 9, '“os gabos”.'),
(44, 9, '“Longe disso”.'),
(45, 9, '“Em geral”.'),
(46, 10, ' criar relação de subordinação entre leitor e autor, já que ambos usam as novas tecnologias.'),
(47, 10, 'enfatizar a probabilidade de que toda população brasileira esteja aprisionada às novas tecnologias.'),
(48, 10, 'indicar, de forma clara, o ponto de vista de que hoje as pessoas são controladas pelas novas tecnologias.'),
(49, 10, 'tornar o leitor copartícipe do ponto de vista de que ele manipula as novas tecnologias e por elas é manipulado.'),
(50, 10, 'demonstrar ao leitor sua parcela de responsabilidade por deixar que as novas tecnologias controlem as pessoas. ');

-- --------------------------------------------------------

--
-- Estrutura para tabela `aluno`
--

CREATE TABLE `aluno` (
  `id_aluno` int(11) NOT NULL,
  `id_turma` int(11) DEFAULT NULL,
  `matricula` varchar(7) DEFAULT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `email` varchar(320) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `assunto`
--

CREATE TABLE `assunto` (
  `id_assunto` int(11) NOT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `nome_assunto` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `assunto`
--

INSERT INTO `assunto` (`id_assunto`, `id_categoria`, `nome_assunto`) VALUES
(1, 17, 'operações com números reais'),
(2, 9, 'equações de 1º grau'),
(3, 9, 'equações de 2º grau'),
(4, 9, 'inequações de 1º grau'),
(5, 9, 'inequações de 2º grau'),
(6, 10, 'geometria plana: áreas e perímetros'),
(7, 10, 'geometria espacial: volume e área de sólidos geomé'),
(8, 10, 'propriedades de figuras planas e espaciais'),
(9, 10, 'geometria analítica: (distância entre pontos)'),
(10, 10, 'geometria analítica: (equação da reta)'),
(11, 10, 'geometria analítica: (circunferência)'),
(12, 11, 'funções trigonométricas'),
(13, 11, 'lei dos senos e cossenos'),
(14, 11, 'razões trigonométricas no triângulo retângulo'),
(15, 12, 'progressões: aritméticas'),
(16, 12, 'progressões: geométricas'),
(17, 13, 'função afim'),
(18, 13, 'função quadrática'),
(19, 13, 'função exponencial'),
(20, 13, 'função logarítmica'),
(21, 13, 'interpretação de gráficos e tabelas'),
(22, 14, 'medidas centrais (moda)'),
(23, 14, 'medidas centrais (média)'),
(24, 14, 'medidas centrais (mediana)'),
(25, 14, 'medidas de dispersão (desvio-padrão)'),
(26, 14, 'medidas de dispersão (amplitude)'),
(27, 14, 'medidas de dispersão (desvio-médio)'),
(28, 15, 'probabilidades em eventos simples'),
(29, 15, 'princípio fundamental da contagem'),
(30, 15, 'permutações'),
(31, 15, 'combinações'),
(32, 15, 'arranjos'),
(33, 16, 'juros simples'),
(34, 16, 'juros compostos'),
(35, 16, 'valor presente'),
(36, 16, 'valor futuro'),
(37, 18, 'Morfologia'),
(38, 18, 'Sintaxe'),
(39, 18, 'Semântica'),
(40, 18, 'Pontuação'),
(41, 18, 'Concordância'),
(42, 18, 'Regência'),
(43, 18, 'Colocação Pronominal'),
(44, 18, 'Formação de Palavras'),
(45, 19, 'Leitura e Compreensão'),
(46, 19, 'Coesão e Coerência'),
(47, 19, 'Tipos de Texto'),
(48, 19, 'Estratégias de Interpretação'),
(49, 20, 'Escolas Literárias'),
(50, 20, 'Autores e Obras'),
(51, 20, 'Figuras de Linguagem'),
(52, 20, 'Gêneros Literários'),
(53, 21, 'Estrutura Textual'),
(54, 21, 'Coesão e Coerência'),
(55, 21, 'Argumentação'),
(56, 21, 'Tipos e Gêneros Textuais'),
(57, 21, 'Erros Comuns'),
(58, 22, 'Acentuação Gráfica'),
(59, 22, 'Emprego de S/Z/X'),
(60, 22, 'Acordo Ortográfico'),
(61, 23, 'Linguagem Formal e Informal'),
(62, 23, 'Regionalismos e Dialetos'),
(63, 23, 'Variação Histórica'),
(64, 23, 'Variação Social');

-- --------------------------------------------------------

--
-- Estrutura para tabela `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `id_disciplina` int(11) DEFAULT NULL,
  `nome_categoria` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `id_disciplina`, `nome_categoria`) VALUES
(9, 1, 'Álgebra'),
(10, 1, 'Geometria'),
(11, 1, 'Trigonometria'),
(12, 1, 'progressões'),
(13, 1, 'Funções'),
(14, 1, 'Estatística'),
(15, 1, 'Análise Combinatória e Probabilidade'),
(16, 1, 'Matemática Financeira'),
(17, 1, 'Aritmética'),
(18, 2, 'Gramática'),
(19, 2, 'Interpretação de Texto'),
(20, 2, 'Literatura'),
(21, 2, 'Redação'),
(22, 2, 'Ortografia e Acentuação'),
(23, 2, 'Variação Linguística');

-- --------------------------------------------------------

--
-- Estrutura para tabela `disciplina`
--

CREATE TABLE `disciplina` (
  `id_disciplina` int(11) NOT NULL,
  `nome_disciplina` varchar(50) DEFAULT NULL,
  `descricao` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `disciplina`
--

INSERT INTO `disciplina` (`id_disciplina`, `nome_disciplina`, `descricao`) VALUES
(1, 'Matemática', 'A matemática é uma ciência formal que estuda propriedades e relações de entidades abstratas, como números, formas e sequências. Ela é dividida em várias áreas, incluindo álgebra, geometria, análise e teoria dos números.'),
(2, 'Português', 'Conteúdos referentes à língua portuguesa.');

-- --------------------------------------------------------

--
-- Estrutura para tabela `escola`
--

CREATE TABLE `escola` (
  `id_escola` int(11) NOT NULL,
  `inep` varchar(12) DEFAULT NULL,
  `nome_escola` varchar(120) NOT NULL,
  `email` varchar(320) DEFAULT NULL,
  `telefone` varchar(15) DEFAULT NULL,
  `logo` varchar(1024) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `cidade` varchar(9) DEFAULT NULL,
  `bairro` varchar(50) DEFAULT NULL,
  `rua` varchar(50) DEFAULT NULL,
  `num` varchar(100) DEFAULT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `escola`
--

INSERT INTO `escola` (`id_escola`, `inep`, `nome_escola`, `email`, `telefone`, `logo`, `estado`, `cidade`, `bairro`, `rua`, `num`, `data_criacao`) VALUES
(7, '23236078', 'Osmira Eduardo de Castro', 'osmira@gmail.com', '(51) 91951-9619', NULL, 'CE', 'Morada No', '02 DE AGOSTO', 'RUA ALUIZIO GONZAGA LIMA', 'SN PREDIO', '2025-11-08 14:48:47'),
(8, '23236078', 'Osmira Eduardo de Castro', 'osmira@gmail.com', '(51) 91951-9619', NULL, 'CE', 'Morada No', '02 DE AGOSTO', 'RUA ALUIZIO GONZAGA LIMA', 'SN PREDIO', '2025-11-08 14:49:19'),
(9, '23236078', 'Osmira Eduardo de Castro', 'osmira@gmail.com', '(51) 91951-9619', NULL, 'CE', 'Morada No', '02 DE AGOSTO', 'RUA ALUIZIO GONZAGA LIMA', 'SN PREDIO', '2025-11-08 14:50:00'),
(10, '23236078', 'Osmira Eduardo de Castro', 'osmira@gmail.com', '(51) 91951-9619', NULL, 'CE', 'Morada No', '02 DE AGOSTO', 'RUA ALUIZIO GONZAGA LIMA', 'SN PREDIO', '2025-11-08 14:52:15'),
(11, '23060700', 'Paulo Sarasate EEF', 'paulo.sarasate@gmail.com', '(51) 91951-9619', NULL, 'CE', 'Cascavel ', 'CRISTAIS,', 'AV. SANTOS DUMONT- KM 92', '232', '2025-11-08 16:28:38'),
(12, '12365478', 'EEEP Escola Teste', 'teste.escola@gmail.com', '(98) 76543-2103', NULL, 'CE', 'Cascavel ', 'CRISTAIS,', 'AV. SANTOS DUMONT- KM 92', '232', '2025-11-15 16:01:03');

-- --------------------------------------------------------

--
-- Estrutura para tabela `gabarito`
--

CREATE TABLE `gabarito` (
  `id_gabarito` int(11) NOT NULL,
  `id_prova` int(11) DEFAULT NULL,
  `questao` int(11) DEFAULT NULL,
  `alternativa` text DEFAULT NULL,
  `versao` varchar(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `gabaritoaluno`
--

CREATE TABLE `gabaritoaluno` (
  `id_prova` int(11) DEFAULT NULL,
  `id_aluno` int(11) DEFAULT NULL,
  `id_questao` int(11) DEFAULT NULL,
  `resposta_aluno` varchar(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `imagemquestao`
--

CREATE TABLE `imagemquestao` (
  `id_imagem` int(11) NOT NULL,
  `id_questao` int(11) DEFAULT NULL,
  `caminho_imagem` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `professordisciplina`
--

CREATE TABLE `professordisciplina` (
  `id_disciplina` int(11) DEFAULT NULL,
  `id_professor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `professordisciplina`
--

INSERT INTO `professordisciplina` (`id_disciplina`, `id_professor`) VALUES
(1, 6),
(2, 6);

-- --------------------------------------------------------

--
-- Estrutura para tabela `professorturma`
--

CREATE TABLE `professorturma` (
  `id_turma` int(11) DEFAULT NULL,
  `id_professor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `prova`
--

CREATE TABLE `prova` (
  `id_prova` int(11) NOT NULL,
  `id_professor` int(11) DEFAULT NULL,
  `id_disciplina` int(11) DEFAULT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `serie` varchar(20) DEFAULT NULL,
  `versao` varchar(6) DEFAULT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ultima_atualizacao` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `prova`
--

INSERT INTO `prova` (`id_prova`, `id_professor`, `id_disciplina`, `titulo`, `serie`, `versao`, `data_criacao`, `ultima_atualizacao`) VALUES
(1, 6, NULL, 'teste', NULL, '1º ano', '2025-11-21 20:34:25', '2025-11-21 20:34:25'),
(2, 6, NULL, 'teste', NULL, '1º ano', '2025-11-21 20:38:34', '2025-11-21 20:38:34'),
(3, 6, NULL, 'teste', NULL, '1º ano', '2025-11-21 20:41:12', '2025-11-21 20:41:12'),
(4, 6, NULL, 'teste', NULL, '1º ano', '2025-11-21 20:42:41', '2025-11-21 20:42:41'),
(5, 6, NULL, 'Prova de Português', NULL, '1º ano', '2025-11-21 21:25:19', '2025-11-21 21:25:19'),
(6, 6, NULL, 'Prova de Português', NULL, '1º ano', '2025-11-21 21:25:44', '2025-11-21 21:25:44');

-- --------------------------------------------------------

--
-- Estrutura para tabela `provaquestao`
--

CREATE TABLE `provaquestao` (
  `id_questao` int(11) DEFAULT NULL,
  `id_prova` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `provas_versoes`
--

CREATE TABLE `provas_versoes` (
  `id_versao` int(11) NOT NULL,
  `id_prova` int(11) NOT NULL,
  `codigo_versao` enum('Azul','Branca','Rosa','Verde') NOT NULL,
  `data_criacao` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `provas_versoes_questoes`
--

CREATE TABLE `provas_versoes_questoes` (
  `id_versao_questao` int(11) NOT NULL,
  `id_versao` int(11) NOT NULL,
  `id_questao` int(11) NOT NULL,
  `ordem` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `provaturma`
--

CREATE TABLE `provaturma` (
  `id_turma` int(11) DEFAULT NULL,
  `id_prova` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `questao`
--

CREATE TABLE `questao` (
  `id_questao` int(11) NOT NULL,
  `id_assunto` int(11) DEFAULT NULL,
  `id_professor` int(11) DEFAULT NULL,
  `serie` varchar(10) DEFAULT NULL,
  `enunciado` text DEFAULT NULL,
  `resposta_correta` text DEFAULT NULL,
  `tipo` varchar(15) DEFAULT NULL,
  `publico` tinyint(1) DEFAULT 0,
  `data_criacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ultima_atualizacao` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `questao`
--

INSERT INTO `questao` (`id_questao`, `id_assunto`, `id_professor`, `serie`, `enunciado`, `resposta_correta`, `tipo`, `publico`, `data_criacao`, `ultima_atualizacao`) VALUES
(9, 45, 6, NULL, '<p>Essas moças tinham o vezo de afirmar o contrário do que desejavam. Notei a singularidade quando principiaram a elogiar o meu paletó cor de macaco. Examinavam-no sérias, achavam o pano e os aviamentos de qualidade superior, o feitio admirável. Envaideci-me: nunca havia reparado em tais vantagens. Mas os gabas se prolongaram, trouxeram-me desconfiança. Percebi afinal que elas zombavam e não me susceptibilizei. Longe disso: achei curiosa aquela maneira de falar pelo avesso, diferente das grosserias a que me habituara. Em geral me diziam com franqueza que a roupa não me assentava no corpo, sobrava nos sovacos.</p><p>RAMOS, G. Infância. Rio de Janeiro: Record, 1994.</p><p>Por meio de recursos linguísticos, os textos mobilizam estratégias para introduzir e retomar ideias, promovendo a progressão do tema. No fragmento transcrito, um novo aspecto do tema é introduzido pela expressão</p>', 'A', 'objetiva', 0, '2025-11-22 12:24:00', '2025-11-22 13:19:46'),
(10, 45, 6, NULL, '<p>Novas tecnologias</p><p>Atualmente, prevalece na mídia um discurso de exaltação das novas tecnologias, principalmente aquelas ligadas às atividades de telecomunicações. Expressões frequentes como “o futuro já chegou”, “maravilhas tecnológicas” e “conexão total com o mundo» «fetichizam” novos produtos, transformando-os em objetos do desejo, de consumo obrigatório. Por esse motivo carregamos hoje nos bolsos, bolsas e mochilas o “futuro” tão festejado. Todavia, não podemos reduzir-nos a meras vítimas de um aparelho midiático perverso, ou de um aparelho capitalista controlador. Há perversão, certamente, e controle, sem sombra de dúvida. Entretanto, desenvolvemos uma relação simbiótica de dependência mútua com os veículos de comunicação, que se estreita a cada imagem compartilhada e a cada dossiê pessoal transformado em objeto público de entretenimento. Não mais como aqueles acorrentados na caverna de Platão, somos livres para nos aprisionar, por espontânea vontade, a esta relação sadomasoquista com as estruturas midiáticas, na qual tanto controlamos quanto somos controlados.</p><p>SAMPAIO A. S. A microfísica do espetáculo. Disponível em: <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"http://observatoriodaimprensa.com\">http://observatoriodaimprensa.com</a>. br. Acesso em: 1 mar 2013 (adaptado).</p><p>Ao escrever um artigo de opinião, o produtor precisa criar uma base de orientação linguística que permita alcançar os leitores e convencê-los com relação ao ponto de vista defendido. Diante disso, nesse texto, a escolha das formas verbais em destaque objetiva</p>', 'A', 'objetiva', 0, '2025-11-22 13:15:19', '2025-11-22 13:19:28');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tags`
--

CREATE TABLE `tags` (
  `id_tag` int(11) NOT NULL,
  `nome` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `turma`
--

CREATE TABLE `turma` (
  `id_turma` int(11) NOT NULL,
  `id_escola` int(11) DEFAULT NULL,
  `nome_turma` varchar(100) DEFAULT NULL,
  `serie` varchar(1) DEFAULT NULL,
  `turno` varchar(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `id_escola` int(11) DEFAULT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(320) DEFAULT NULL,
  `senha` varchar(255) DEFAULT NULL,
  `telefone` varchar(15) DEFAULT NULL,
  `tipo` varchar(9) DEFAULT NULL,
  `ativo` tinyint(1) DEFAULT 1,
  `data_cadastro` timestamp NOT NULL DEFAULT current_timestamp(),
  `ultima_atualizacao` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `id_escola`, `nome`, `email`, `senha`, `telefone`, `tipo`, `ativo`, `data_cadastro`, `ultima_atualizacao`) VALUES
(6, 10, 'Joel Damasceno Parente', 'jo3ldamasceno@gmail.com', '$2y$10$wlPhXbc4hLilhs62wGwABeVcosuBR/SOnYKiB4oGs/EpuVvG7TjVy', '(85) 99125-9840', 'gestor', 1, '2025-11-08 14:52:15', '2025-11-08 14:52:15'),
(7, 11, 'Ana Rebeca Damasceno Mastracusa', 'ana.mastracusa01@gmail.com', '$2y$10$eF8TVb.67eWJ17YHAVtnduDdujW.EfXDy/wUG4pnGakph22IsOHY6', '(85) 99971-5867', 'gestor', 1, '2025-11-08 16:28:38', '2025-11-08 16:28:38'),
(8, 12, 'teste da escola', 'teste@gmail.com', '$2y$10$nTZ0K2p2.iDQOaLFQLnoVuqXzlOBd1zDjHUUnNQPkksMphUyes.3i', '(01) 23456-7890', 'gestor', 1, '2025-11-15 16:01:03', '2025-11-15 16:01:03');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `admingeral`
--
ALTER TABLE `admingeral`
  ADD PRIMARY KEY (`uid`);

--
-- Índices de tabela `alternativas`
--
ALTER TABLE `alternativas`
  ADD PRIMARY KEY (`id_alternativa`),
  ADD KEY `id_questao` (`id_questao`);

--
-- Índices de tabela `aluno`
--
ALTER TABLE `aluno`
  ADD PRIMARY KEY (`id_aluno`),
  ADD KEY `id_turma` (`id_turma`);

--
-- Índices de tabela `assunto`
--
ALTER TABLE `assunto`
  ADD PRIMARY KEY (`id_assunto`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Índices de tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`),
  ADD KEY `id_disciplina` (`id_disciplina`);

--
-- Índices de tabela `disciplina`
--
ALTER TABLE `disciplina`
  ADD PRIMARY KEY (`id_disciplina`);

--
-- Índices de tabela `escola`
--
ALTER TABLE `escola`
  ADD PRIMARY KEY (`id_escola`);

--
-- Índices de tabela `gabarito`
--
ALTER TABLE `gabarito`
  ADD PRIMARY KEY (`id_gabarito`),
  ADD KEY `id_prova` (`id_prova`),
  ADD KEY `questao` (`questao`);

--
-- Índices de tabela `gabaritoaluno`
--
ALTER TABLE `gabaritoaluno`
  ADD KEY `id_prova` (`id_prova`),
  ADD KEY `id_aluno` (`id_aluno`),
  ADD KEY `id_questao` (`id_questao`);

--
-- Índices de tabela `imagemquestao`
--
ALTER TABLE `imagemquestao`
  ADD PRIMARY KEY (`id_imagem`),
  ADD KEY `id_questao` (`id_questao`);

--
-- Índices de tabela `professordisciplina`
--
ALTER TABLE `professordisciplina`
  ADD KEY `id_disciplina` (`id_disciplina`),
  ADD KEY `id_professor` (`id_professor`);

--
-- Índices de tabela `professorturma`
--
ALTER TABLE `professorturma`
  ADD KEY `id_turma` (`id_turma`),
  ADD KEY `id_professor` (`id_professor`);

--
-- Índices de tabela `prova`
--
ALTER TABLE `prova`
  ADD PRIMARY KEY (`id_prova`),
  ADD KEY `id_professor` (`id_professor`),
  ADD KEY `id_disciplina` (`id_disciplina`);

--
-- Índices de tabela `provaquestao`
--
ALTER TABLE `provaquestao`
  ADD KEY `id_questao` (`id_questao`),
  ADD KEY `id_prova` (`id_prova`);

--
-- Índices de tabela `provas_versoes`
--
ALTER TABLE `provas_versoes`
  ADD PRIMARY KEY (`id_versao`),
  ADD KEY `id_prova` (`id_prova`);

--
-- Índices de tabela `provas_versoes_questoes`
--
ALTER TABLE `provas_versoes_questoes`
  ADD PRIMARY KEY (`id_versao_questao`),
  ADD UNIQUE KEY `id_versao` (`id_versao`,`ordem`),
  ADD UNIQUE KEY `id_versao_2` (`id_versao`,`id_questao`),
  ADD KEY `id_questao` (`id_questao`);

--
-- Índices de tabela `provaturma`
--
ALTER TABLE `provaturma`
  ADD KEY `id_turma` (`id_turma`),
  ADD KEY `id_prova` (`id_prova`);

--
-- Índices de tabela `questao`
--
ALTER TABLE `questao`
  ADD PRIMARY KEY (`id_questao`),
  ADD KEY `id_assunto` (`id_assunto`),
  ADD KEY `id_professor` (`id_professor`);

--
-- Índices de tabela `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id_tag`);

--
-- Índices de tabela `turma`
--
ALTER TABLE `turma`
  ADD PRIMARY KEY (`id_turma`),
  ADD KEY `id_escola` (`id_escola`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id_escola` (`id_escola`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `admingeral`
--
ALTER TABLE `admingeral`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `alternativas`
--
ALTER TABLE `alternativas`
  MODIFY `id_alternativa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de tabela `aluno`
--
ALTER TABLE `aluno`
  MODIFY `id_aluno` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `assunto`
--
ALTER TABLE `assunto`
  MODIFY `id_assunto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de tabela `disciplina`
--
ALTER TABLE `disciplina`
  MODIFY `id_disciplina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `escola`
--
ALTER TABLE `escola`
  MODIFY `id_escola` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de tabela `gabarito`
--
ALTER TABLE `gabarito`
  MODIFY `id_gabarito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `prova`
--
ALTER TABLE `prova`
  MODIFY `id_prova` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `provas_versoes`
--
ALTER TABLE `provas_versoes`
  MODIFY `id_versao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `provas_versoes_questoes`
--
ALTER TABLE `provas_versoes_questoes`
  MODIFY `id_versao_questao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de tabela `questao`
--
ALTER TABLE `questao`
  MODIFY `id_questao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `tags`
--
ALTER TABLE `tags`
  MODIFY `id_tag` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `turma`
--
ALTER TABLE `turma`
  MODIFY `id_turma` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `alternativas`
--
ALTER TABLE `alternativas`
  ADD CONSTRAINT `alternativas_ibfk_1` FOREIGN KEY (`id_questao`) REFERENCES `questao` (`id_questao`);

--
-- Restrições para tabelas `aluno`
--
ALTER TABLE `aluno`
  ADD CONSTRAINT `aluno_ibfk_1` FOREIGN KEY (`id_turma`) REFERENCES `turma` (`id_turma`);

--
-- Restrições para tabelas `assunto`
--
ALTER TABLE `assunto`
  ADD CONSTRAINT `assunto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`);

--
-- Restrições para tabelas `categoria`
--
ALTER TABLE `categoria`
  ADD CONSTRAINT `categoria_ibfk_1` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplina` (`id_disciplina`);

--
-- Restrições para tabelas `gabarito`
--
ALTER TABLE `gabarito`
  ADD CONSTRAINT `gabarito_ibfk_1` FOREIGN KEY (`id_prova`) REFERENCES `prova` (`id_prova`),
  ADD CONSTRAINT `gabarito_ibfk_2` FOREIGN KEY (`questao`) REFERENCES `questao` (`id_questao`);

--
-- Restrições para tabelas `gabaritoaluno`
--
ALTER TABLE `gabaritoaluno`
  ADD CONSTRAINT `gabaritoaluno_ibfk_1` FOREIGN KEY (`id_prova`) REFERENCES `prova` (`id_prova`),
  ADD CONSTRAINT `gabaritoaluno_ibfk_2` FOREIGN KEY (`id_aluno`) REFERENCES `aluno` (`id_aluno`),
  ADD CONSTRAINT `gabaritoaluno_ibfk_3` FOREIGN KEY (`id_questao`) REFERENCES `questao` (`id_questao`);

--
-- Restrições para tabelas `professordisciplina`
--
ALTER TABLE `professordisciplina`
  ADD CONSTRAINT `professordisciplina_ibfk_1` FOREIGN KEY (`id_disciplina`) REFERENCES `disciplina` (`id_disciplina`),
  ADD CONSTRAINT `professordisciplina_ibfk_2` FOREIGN KEY (`id_professor`) REFERENCES `usuario` (`id_usuario`);

--
-- Restrições para tabelas `professorturma`
--
ALTER TABLE `professorturma`
  ADD CONSTRAINT `professorturma_ibfk_1` FOREIGN KEY (`id_turma`) REFERENCES `turma` (`id_turma`),
  ADD CONSTRAINT `professorturma_ibfk_2` FOREIGN KEY (`id_professor`) REFERENCES `usuario` (`id_usuario`);

--
-- Restrições para tabelas `prova`
--
ALTER TABLE `prova`
  ADD CONSTRAINT `prova_ibfk_1` FOREIGN KEY (`id_professor`) REFERENCES `usuario` (`id_usuario`);

--
-- Restrições para tabelas `provaquestao`
--
ALTER TABLE `provaquestao`
  ADD CONSTRAINT `provaquestao_ibfk_1` FOREIGN KEY (`id_questao`) REFERENCES `questao` (`id_questao`),
  ADD CONSTRAINT `provaquestao_ibfk_2` FOREIGN KEY (`id_prova`) REFERENCES `prova` (`id_prova`);

--
-- Restrições para tabelas `provas_versoes`
--
ALTER TABLE `provas_versoes`
  ADD CONSTRAINT `provas_versoes_ibfk_1` FOREIGN KEY (`id_prova`) REFERENCES `prova` (`id_prova`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `provas_versoes_questoes`
--
ALTER TABLE `provas_versoes_questoes`
  ADD CONSTRAINT `provas_versoes_questoes_ibfk_1` FOREIGN KEY (`id_versao`) REFERENCES `provas_versoes` (`id_versao`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `provas_versoes_questoes_ibfk_2` FOREIGN KEY (`id_questao`) REFERENCES `questao` (`id_questao`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `provaturma`
--
ALTER TABLE `provaturma`
  ADD CONSTRAINT `provaturma_ibfk_1` FOREIGN KEY (`id_turma`) REFERENCES `turma` (`id_turma`),
  ADD CONSTRAINT `provaturma_ibfk_2` FOREIGN KEY (`id_prova`) REFERENCES `prova` (`id_prova`);

--
-- Restrições para tabelas `questao`
--
ALTER TABLE `questao`
  ADD CONSTRAINT `questao_ibfk_1` FOREIGN KEY (`id_assunto`) REFERENCES `assunto` (`id_assunto`),
  ADD CONSTRAINT `questao_ibfk_2` FOREIGN KEY (`id_professor`) REFERENCES `usuario` (`id_usuario`);

--
-- Restrições para tabelas `turma`
--
ALTER TABLE `turma`
  ADD CONSTRAINT `turma_ibfk_1` FOREIGN KEY (`id_escola`) REFERENCES `escola` (`id_escola`);

--
-- Restrições para tabelas `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_escola`) REFERENCES `escola` (`id_escola`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
