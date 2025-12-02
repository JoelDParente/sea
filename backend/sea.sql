-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 02/12/2025 às 01:44
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
  `texto` text DEFAULT NULL,
  `caminho_imagem` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `alternativas`
--

INSERT INTO `alternativas` (`id_alternativa`, `id_questao`, `texto`, `caminho_imagem`) VALUES
(41, 9, '“a singularidade”.', NULL),
(42, 9, '“tais vantagens”.', NULL),
(43, 9, '“os gabos”.', NULL),
(44, 9, '“Longe disso”.', NULL),
(45, 9, '“Em geral”.', NULL),
(46, 10, ' criar relação de subordinação entre leitor e autor, já que ambos usam as novas tecnologias.', NULL),
(47, 10, 'enfatizar a probabilidade de que toda população brasileira esteja aprisionada às novas tecnologias.', NULL),
(48, 10, 'indicar, de forma clara, o ponto de vista de que hoje as pessoas são controladas pelas novas tecnologias.', NULL),
(49, 10, 'tornar o leitor copartícipe do ponto de vista de que ele manipula as novas tecnologias e por elas é manipulado.', NULL),
(50, 10, 'demonstrar ao leitor sua parcela de responsabilidade por deixar que as novas tecnologias controlem as pessoas. ', NULL),
(56, 12, 'impessoalidade, na organização da objetividade das informações, como em “Este artigo tem por finalidade” e “Evidencia-se”.', NULL),
(57, 12, 'seleção lexical, no desenvolvimento sequencial do texto, como em “imaginário racista” e “estética do negro”.', NULL),
(58, 12, 'metaforização, relativa à construção dos sentidos figurados, como nas expressões “descolonização estética” e “discurso midiático-publicitário”.', NULL),
(59, 12, ' nominalização, produzida por meio de processos derivacionais na formação de palavras, como “inferiorização” e “desvalorização”', NULL),
(60, 12, 'adjetivação, organizada para criar uma terminologia antirracista, como em “ética da diversidade” e “descolonização estética”.', NULL),
(61, 13, 'reportagem, pois busca convencer o interlocutor da tese defendida ao longo do texto.', NULL),
(62, 13, 'resumo, pois promove o contato rápido do leitor com uma informação desconhecida.', NULL),
(63, 13, 'sinopse, pois sintetiza as informações relevantes de uma obra de modo impessoal.', NULL),
(64, 13, 'instrução, pois ensina algo por meio de explicações sobre uma obra específica.', NULL),
(65, 13, 'resenha, pois apresenta uma produção intelectual de forma crítica.', NULL),
(66, 14, '<img src=\"http://localhost/sea/backend/uploads/alternativas/7296dfc4-0cb8-422e-9eef-0894081ed5f2.jpg\"><p></p>', 'http://localhost/sea/backend/uploads/alternativas/7296dfc4-0cb8-422e-9eef-0894081ed5f2.jpg'),
(67, 14, '<img src=\"http://localhost/sea/backend/uploads/alternativas/afbaa499-3275-4423-ba04-7f88952cd213.png\"><p></p>', 'http://localhost/sea/backend/uploads/alternativas/afbaa499-3275-4423-ba04-7f88952cd213.png'),
(68, 14, '<img src=\"http://localhost/sea/backend/uploads/alternativas/ca3d7615-27c0-4c08-b727-a1045cf025e3.png\"><p></p>', 'http://localhost/sea/backend/uploads/alternativas/ca3d7615-27c0-4c08-b727-a1045cf025e3.png'),
(69, 14, '<img src=\"http://localhost/sea/backend/uploads/alternativas/f17b7b8c-2048-4b80-8da8-d99e7a0a4286.png\"><p></p>', 'http://localhost/sea/backend/uploads/alternativas/f17b7b8c-2048-4b80-8da8-d99e7a0a4286.png');

-- --------------------------------------------------------

--
-- Estrutura para tabela `aluno`
--

CREATE TABLE `aluno` (
  `id_aluno` int(11) NOT NULL,
  `id_turma` int(11) DEFAULT NULL,
  `matricula` varchar(7) DEFAULT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `foto` varchar(500) DEFAULT NULL,
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
(7, 6, NULL, 'tese', NULL, '1º ano', '2025-11-25 18:42:13', '2025-11-25 18:42:13'),
(8, 6, NULL, 'Teste', NULL, '1º ano', '2025-11-25 18:46:23', '2025-11-25 18:46:23'),
(9, 6, NULL, 'poiuytre', NULL, '1º ano', '2025-11-25 20:34:44', '2025-11-25 20:34:44'),
(10, 6, NULL, 'poiuytre', NULL, '1º ano', '2025-11-25 20:35:30', '2025-11-25 20:35:30'),
(11, 6, NULL, 'poiuytre', NULL, '1º ano', '2025-11-25 20:36:04', '2025-11-25 20:36:04'),
(12, 6, NULL, 'poiuytre', NULL, '1º ano', '2025-11-25 20:39:13', '2025-11-25 20:39:13'),
(13, 6, NULL, 'poiuytre', NULL, '1º ano', '2025-11-25 20:39:44', '2025-11-25 20:39:44'),
(14, 6, NULL, 'poiuytre', NULL, '1º ano', '2025-11-25 20:42:28', '2025-11-25 20:42:28'),
(15, 6, NULL, 'poiuytre', NULL, '1º ano', '2025-11-25 20:43:54', '2025-11-25 20:43:54'),
(16, 6, NULL, 'poiuytre', NULL, '1º ano', '2025-11-25 20:46:58', '2025-11-25 20:46:58'),
(17, 6, NULL, 'poiuytre', NULL, '1º ano', '2025-11-25 20:47:29', '2025-11-25 20:47:29'),
(18, 6, NULL, 'poiuytre', NULL, '1º ano', '2025-11-25 20:47:51', '2025-11-25 20:47:51'),
(19, 6, NULL, 'poiuytre', NULL, '1º ano', '2025-11-25 20:48:18', '2025-11-25 20:48:18'),
(20, 6, NULL, 'poiuytre', NULL, '1º ano', '2025-11-25 20:48:30', '2025-11-25 20:48:30'),
(21, 6, NULL, 'poiuytre', NULL, '1º ano', '2025-11-25 20:48:40', '2025-11-25 20:48:40'),
(22, 6, NULL, 'poiuytre', NULL, '1º ano', '2025-11-25 20:48:48', '2025-11-25 20:48:48'),
(23, 6, NULL, 'poiuytre', NULL, '1º ano', '2025-11-25 21:00:15', '2025-11-25 21:00:15'),
(24, 6, NULL, 'poiuytre', NULL, '1º ano', '2025-11-25 21:01:29', '2025-11-25 21:01:29'),
(25, 6, NULL, 'poiuytre', NULL, '1º ano', '2025-11-25 21:10:05', '2025-11-25 21:10:05'),
(26, 6, NULL, 'poiuytre', NULL, '1º ano', '2025-11-25 21:14:39', '2025-11-25 21:14:39'),
(27, 6, NULL, 'Teste', NULL, '1º ano', '2025-11-25 21:15:26', '2025-11-25 21:15:26'),
(28, 6, NULL, 'Teste 1', NULL, '1º ano', '2025-11-25 21:39:22', '2025-11-25 21:39:22'),
(29, 6, NULL, 'Teste 3', NULL, '1º ano', '2025-11-25 21:43:02', '2025-11-25 21:43:02'),
(30, 6, NULL, 'Teste', NULL, '1º ano', '2025-11-26 03:41:53', '2025-11-26 03:41:53'),
(31, 6, 2, 'Avaliação de Teste', NULL, '2º ano', '2025-11-27 03:28:24', '2025-11-27 03:28:24'),
(32, 6, 2, 'Teste', NULL, '2º ano', '2025-11-28 04:40:20', '2025-11-28 04:40:20'),
(33, 6, 1, 'teste', '2º ano', 'Azul', '2025-11-29 04:33:54', '2025-11-29 04:33:54');

-- --------------------------------------------------------

--
-- Estrutura para tabela `provaquestao`
--

CREATE TABLE `provaquestao` (
  `id_questao` int(11) DEFAULT NULL,
  `id_prova` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `provaquestao`
--

INSERT INTO `provaquestao` (`id_questao`, `id_prova`) VALUES
(9, 7),
(10, 7),
(10, 8),
(9, 8),
(10, 9),
(9, 9),
(10, 10),
(9, 10),
(10, 11),
(9, 11),
(10, 12),
(9, 12),
(10, 13),
(9, 13),
(10, 14),
(9, 14),
(10, 15),
(9, 15),
(10, 16),
(9, 16),
(10, 17),
(9, 17),
(10, 18),
(9, 18),
(10, 19),
(9, 19),
(10, 20),
(9, 20),
(10, 21),
(9, 21),
(10, 22),
(9, 22),
(10, 23),
(9, 23),
(10, 24),
(9, 24),
(10, 25),
(9, 25),
(10, 26),
(9, 26),
(10, 27),
(9, 27),
(12, 28),
(10, 28),
(9, 28),
(13, 29),
(9, 29),
(12, 29),
(10, 29),
(13, 30),
(12, 30),
(10, 30),
(9, 30),
(13, 31),
(9, 31),
(12, 31),
(10, 31),
(13, 32),
(9, 32),
(12, 32),
(10, 32),
(14, 33);

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

--
-- Despejando dados para a tabela `provas_versoes`
--

INSERT INTO `provas_versoes` (`id_versao`, `id_prova`, `codigo_versao`, `data_criacao`) VALUES
(10, 7, '', '2025-11-25 11:42:13'),
(11, 8, '', '2025-11-25 11:46:23'),
(12, 9, '', '2025-11-25 13:34:44'),
(13, 10, '', '2025-11-25 13:35:30'),
(14, 11, '', '2025-11-25 13:36:04'),
(15, 12, '', '2025-11-25 13:39:13'),
(16, 13, '', '2025-11-25 13:39:44'),
(17, 14, '', '2025-11-25 13:42:28'),
(18, 15, '', '2025-11-25 13:43:55'),
(19, 16, '', '2025-11-25 13:46:58'),
(20, 17, '', '2025-11-25 13:47:29'),
(21, 18, '', '2025-11-25 13:47:51'),
(22, 19, '', '2025-11-25 13:48:18'),
(23, 20, '', '2025-11-25 13:48:30'),
(24, 21, '', '2025-11-25 13:48:40'),
(25, 22, '', '2025-11-25 13:48:48'),
(26, 23, '', '2025-11-25 14:00:15'),
(27, 24, '', '2025-11-25 14:01:29'),
(28, 25, '', '2025-11-25 14:10:05'),
(29, 26, '', '2025-11-25 14:14:39'),
(30, 27, '', '2025-11-25 14:15:26'),
(31, 28, '', '2025-11-25 14:39:22'),
(32, 29, '', '2025-11-25 14:43:02'),
(33, 29, '', '2025-11-25 14:43:02'),
(34, 29, '', '2025-11-25 14:43:02'),
(35, 30, '', '2025-11-25 20:41:53'),
(36, 31, '', '2025-11-26 20:28:24'),
(37, 32, '', '2025-11-27 21:40:20'),
(38, 33, 'Azul', '2025-11-28 21:33:55');

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

--
-- Despejando dados para a tabela `provas_versoes_questoes`
--

INSERT INTO `provas_versoes_questoes` (`id_versao_questao`, `id_versao`, `id_questao`, `ordem`) VALUES
(29, 10, 9, 1),
(30, 10, 10, 2),
(31, 11, 10, 1),
(32, 11, 9, 2),
(33, 12, 10, 1),
(34, 12, 9, 2),
(35, 13, 9, 1),
(36, 13, 10, 2),
(37, 14, 10, 1),
(38, 14, 9, 2),
(39, 15, 9, 1),
(40, 15, 10, 2),
(41, 16, 9, 1),
(42, 16, 10, 2),
(43, 17, 10, 1),
(44, 17, 9, 2),
(45, 18, 9, 1),
(46, 18, 10, 2),
(47, 19, 9, 1),
(48, 19, 10, 2),
(49, 20, 9, 1),
(50, 20, 10, 2),
(51, 21, 9, 1),
(52, 21, 10, 2),
(53, 22, 9, 1),
(54, 22, 10, 2),
(55, 23, 9, 1),
(56, 23, 10, 2),
(57, 24, 9, 1),
(58, 24, 10, 2),
(59, 25, 10, 1),
(60, 25, 9, 2),
(61, 26, 10, 1),
(62, 26, 9, 2),
(63, 27, 9, 1),
(64, 27, 10, 2),
(65, 28, 9, 1),
(66, 28, 10, 2),
(67, 29, 10, 1),
(68, 29, 9, 2),
(69, 30, 9, 1),
(70, 30, 10, 2),
(71, 31, 9, 1),
(72, 31, 12, 2),
(73, 31, 10, 3),
(74, 32, 13, 1),
(75, 32, 9, 2),
(76, 32, 10, 3),
(77, 32, 12, 4),
(78, 33, 13, 1),
(79, 33, 9, 2),
(80, 33, 12, 3),
(81, 33, 10, 4),
(82, 34, 10, 1),
(83, 34, 12, 2),
(84, 34, 9, 3),
(85, 34, 13, 4),
(86, 35, 13, 1),
(87, 35, 12, 2),
(88, 35, 9, 3),
(89, 35, 10, 4),
(90, 36, 10, 1),
(91, 36, 9, 2),
(92, 36, 12, 3),
(93, 36, 13, 4),
(94, 37, 12, 1),
(95, 37, 13, 2),
(96, 37, 10, 3),
(97, 37, 9, 4),
(98, 38, 14, 1);

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
(10, 45, 6, NULL, '<p>Novas tecnologias</p><p>Atualmente, prevalece na mídia um discurso de exaltação das novas tecnologias, principalmente aquelas ligadas às atividades de telecomunicações. Expressões frequentes como “o futuro já chegou”, “maravilhas tecnológicas” e “conexão total com o mundo» «fetichizam” novos produtos, transformando-os em objetos do desejo, de consumo obrigatório. Por esse motivo carregamos hoje nos bolsos, bolsas e mochilas o “futuro” tão festejado. Todavia, não podemos reduzir-nos a meras vítimas de um aparelho midiático perverso, ou de um aparelho capitalista controlador. Há perversão, certamente, e controle, sem sombra de dúvida. Entretanto, desenvolvemos uma relação simbiótica de dependência mútua com os veículos de comunicação, que se estreita a cada imagem compartilhada e a cada dossiê pessoal transformado em objeto público de entretenimento. Não mais como aqueles acorrentados na caverna de Platão, somos livres para nos aprisionar, por espontânea vontade, a esta relação sadomasoquista com as estruturas midiáticas, na qual tanto controlamos quanto somos controlados.</p><p>SAMPAIO A. S. A microfísica do espetáculo. Disponível em: <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"http://observatoriodaimprensa.com\">http://observatoriodaimprensa.com</a>. br. Acesso em: 1 mar 2013 (adaptado).</p><p>Ao escrever um artigo de opinião, o produtor precisa criar uma base de orientação linguística que permita alcançar os leitores e convencê-los com relação ao ponto de vista defendido. Diante disso, nesse texto, a escolha das formas verbais em destaque objetiva</p>', 'A', 'objetiva', 0, '2025-11-22 13:15:19', '2025-11-22 13:19:28'),
(12, 45, 6, NULL, '<p style=\"text-align: center;\"><strong>A imagem da negra e do negro em produtos de beleza e a estética do racismo </strong></p><p><strong>Resumo</strong>: Este artigo tem por finalidade discutir a representação da população negra, especialmente da mulher negra, em imagens de produtos de beleza presentes em comércios do nordeste goiano. Evidencia-se que a presença de estereótipos negativos nessas imagens dissemina um imaginário racista apresentado sob a forma de uma estética racista que camufla a exclusão e normaliza a inferiorização sofrida pelos(as) negros(as) na sociedade brasileira. A análise do material imagético aponta a desvalorização estética do negro, especialmente da mulher negra, e a idealização da beleza e do branqueamento a serem alcançados por meio do uso dos produtos apresentados. O discurso midiático-publicitário dos produtos de beleza rememora e legitima a prática de uma ética racista construída e atuante no cotidiano. Frente a essa discussão, sugere-se que o trabalho antirracismo, feito nos diversos espaços sociais, considere o uso de estratégias para uma “descolonização estética” que empodere os sujeitos negros por meio de sua valorização estética e protagonismo na construção de uma ética da diversidade. </p><p>Palavras-chave: Estética, racismo, mídia, educação, diversidade. </p><p>SANT’ANA, J. A imagem da negra e do negro em produtos de beleza e a estética do racismo. Dossiê: trabalho e educação básica. Margens Interdisciplinar. Versão digital. Abaetetuba, n.16, jun. 2017 (adaptado). </p><p>O cumprimento da função referencial da linguagem é uma marca característica do gênero resumo de artigo acadêmico. Na estrutura desse texto, essa função é estabelecida pela</p>', 'A', 'objetiva', 0, '2025-11-25 17:38:56', '2025-11-25 17:38:56'),
(13, 45, 6, NULL, '<p>A trajetória de Liesel Meminger é contada por uma narradora mórbida, surpreendentemente simpática. Ao perceber que a pequena ladra de livros lhe escapa, a Morte afeiçoa-se à menina e rastreia suas pegadas de 1939 a 1943. Traços de uma sobrevivente: a mãe comunista, perseguida pelo nazismo, envia Liesel e o irmão para o subúrbio pobre de uma cidade alemã, onde um casal se dispõe a adotá-los por dinheiro. O garoto morre no trajeto e é enterrado por um coveiro que deixa cair um livro na neve. É o primeiro de uma série que a menina vai surrupiar ao longo dos anos. O único vínculo com a família é esta obra, que ela ainda não sabe ler. A vida ao redor é a pseudorrealidade criada em torno do culto a Hitler na Segunda Guerra. Ela assiste à eufórica celebração do aniversário do Führer pela vizinhança. A Morte, perplexa diante da violência humana, dá um tom leve e divertido à narrativa deste duro confronto entre a infância perdida e a crueldade do mundo adulto, um sucesso absoluto – e raro – de crítica e público. </p><p>Disponível em: <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" href=\"http://www.odevoradordelivros.com\">www.odevoradordelivros.com</a>. Acesso em: 24 jun. 2014. </p><p>Os gêneros textuais podem ser caracterizados, dentre outros fatores, por seus objetivos. Esse fragmento é um(a)</p>', 'D', 'objetiva', 0, '2025-11-25 17:42:40', '2025-11-25 17:42:40'),
(14, 2, 6, NULL, '<img src=\"http://localhost/sea/backend/uploads/alternativas/cde4bfea-1f01-490b-ac3e-0c7a089e5614.jpg\" alt=\"469595376_546231244907997_5305388839316232476_n\" title=\"469595376_546231244907997_5305388839316232476_n\"><p>Analise a imagem e marque a que achar adequado</p>', '<img src=\"http://localhost/sea/backend/uploads/alternativas/afbaa499-3275-4423-ba04-7f88952cd213.png\"><p></p>', 'objetiva', 0, '2025-11-29 00:21:03', '2025-11-29 00:21:03');

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
  `foto` varchar(500) DEFAULT NULL,
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

INSERT INTO `usuario` (`id_usuario`, `id_escola`, `nome`, `email`, `foto`, `senha`, `telefone`, `tipo`, `ativo`, `data_cadastro`, `ultima_atualizacao`) VALUES
(6, 10, 'Joel Damasceno Parente', 'jo3ldamasceno@gmail.com', 'http://localhost/sea/backend/uploads/usuarios/user_6_1764286354.jpg', '$2y$10$wlPhXbc4hLilhs62wGwABeVcosuBR/SOnYKiB4oGs/EpuVvG7TjVy', '(85) 99125-9840', 'gestor', 1, '2025-11-08 14:52:15', '2025-11-27 23:32:34'),
(7, 11, 'Ana Rebeca Damasceno Mastracusa', 'ana.mastracusa01@gmail.com', NULL, '$2y$10$eF8TVb.67eWJ17YHAVtnduDdujW.EfXDy/wUG4pnGakph22IsOHY6', '(85) 99971-5867', 'gestor', 1, '2025-11-08 16:28:38', '2025-11-08 16:28:38'),
(8, 12, 'teste da escola', 'teste@gmail.com', NULL, '$2y$10$nTZ0K2p2.iDQOaLFQLnoVuqXzlOBd1zDjHUUnNQPkksMphUyes.3i', '(01) 23456-7890', 'gestor', 1, '2025-11-15 16:01:03', '2025-11-15 16:01:03');

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
  MODIFY `id_alternativa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

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
  MODIFY `id_prova` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de tabela `provas_versoes`
--
ALTER TABLE `provas_versoes`
  MODIFY `id_versao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de tabela `provas_versoes_questoes`
--
ALTER TABLE `provas_versoes_questoes`
  MODIFY `id_versao_questao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT de tabela `questao`
--
ALTER TABLE `questao`
  MODIFY `id_questao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `tags`
--
ALTER TABLE `tags`
  MODIFY `id_tag` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `turma`
--
ALTER TABLE `turma`
  MODIFY `id_turma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
