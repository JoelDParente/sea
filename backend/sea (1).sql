-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 04/12/2025 às 01:22
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
(69, 14, '<img src=\"http://localhost/sea/backend/uploads/alternativas/f17b7b8c-2048-4b80-8da8-d99e7a0a4286.png\"><p></p>', 'http://localhost/sea/backend/uploads/alternativas/f17b7b8c-2048-4b80-8da8-d99e7a0a4286.png'),
(70, 15, '<p>21</p>', NULL),
(71, 15, '<p>25</p>', NULL),
(72, 15, '<p>55</p>', NULL),
(73, 15, '<p>80</p>', NULL),
(74, 15, '<p>110</p>', NULL),
(75, 16, '<p>800</p>', NULL),
(76, 16, '<p>1080</p>', NULL),
(77, 16, '<p>1200</p>', NULL),
(78, 16, '<p>1800</p>', NULL),
(79, 16, '<p>2520</p>', NULL),
(80, 17, '<p>0109082.</p>', NULL),
(81, 17, '<p>0281090.</p>', NULL),
(82, 17, '<p>1010982.</p>', NULL),
(83, 17, '<p>2081090.</p>', NULL),
(84, 17, '<p>2810910.</p>', NULL),
(85, 18, '<p>Batata chips.</p>', NULL),
(86, 18, '<p>Palitos salgados.</p>', NULL),
(87, 18, '<p>Biscoito multigrãos.</p>', NULL),
(88, 18, '<p>Biscoito de polvilho.</p>', NULL),
(89, 18, '<p>Biscoito de água e sal.</p>', NULL),
(90, 19, '<p>20 100</p>', NULL),
(91, 19, '<p>20 200</p>', NULL),
(92, 19, '<p>20 300</p>', NULL),
(93, 19, '<p>20 400</p>', NULL),
(94, 19, '<p>20 600</p>', NULL);

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

--
-- Despejando dados para a tabela `aluno`
--

INSERT INTO `aluno` (`id_aluno`, `id_turma`, `matricula`, `nome`, `foto`, `email`) VALUES
(3, 11, '2259897', 'ALBERICO CASTELO BRANCO NETO', 'http://localhost/sea/backend/uploads/alunos/682382fc-763d-434f-b6a8-9f0517077d7e.jpg', 'alberico.neto@aluno.ce.gov.br'),
(4, 11, '2112602', 'ALEXANDRE BEZERRA DA SILVA', 'http://localhost/sea/backend/uploads/alunos/56759019-2b06-43d2-90fd-80c2c5b8448d.jpg', 'alexandre.silva@aluno.ce.gov.br'),
(5, 11, '3384384', 'ANA ALICE SILVA DE SOUSA', 'http://localhost/sea/backend/uploads/alunos/afd0fbcf-8887-4225-a53e-019c8de3e1d3.jpg', 'ana.sousa@aluno.ce.gov.br'),
(6, 11, '4687227', 'ARTHUR GIRAO TOMAS', 'http://localhost/sea/backend/uploads/alunos/ce640e1e-1e70-485d-b94e-629ce9ecc20b.jpg', 'arthur.tomas@aluno.ce.gov.br'),
(7, 11, '3284864', 'CARLA INGRID DE SOUSA SILVA', 'http://localhost/sea/backend/uploads/alunos/e684a336-5a83-4a2c-b62b-429b628b96c0.jpg', 'carla.silva@aluno.ce.gov.br'),
(8, 11, '1486846', 'CAUE SAMPAIO FREITAS', 'http://localhost/sea/backend/uploads/alunos/d8972826-6dc7-4127-adcd-ea803c1eff0a.jpg', 'caue.freitas@aluno.ce.gov.br'),
(9, 11, '3552634', 'DEYVISON MENDES FELICIANO', 'http://localhost/sea/backend/uploads/alunos/6c2b8b76-4f34-40be-916e-410d16fa8484.jpg', 'deyvison.feliciano@aluno.ce.gov.br'),
(10, 11, '2970363', 'EDER DAVI ANGELO MOISES', 'http://localhost/sea/backend/uploads/alunos/f9f0533f-9e02-4761-91a9-5e84e67625cf.jpg', 'eder.moises@aluno.ce.gov.br'),
(11, 11, '1921011', 'FRANCISCO ALEX MILLER SILVA RABELO', 'http://localhost/sea/backend/uploads/alunos/3f1e5c13-6da2-4c83-b461-aece83b0a39b.jpg', 'francisco.rabelo@aluno.ce.gov.br'),
(12, 11, '3289296', 'GISELE SILVA SOUSA', 'http://localhost/sea/backend/uploads/alunos/fcf9f6c6-cd97-4a4d-b844-986c03cdf75b.jpg', 'gisele.sousa@aluno.ce.gov.br'),
(13, 11, '3407264', 'IGOR NOBRE TELES', 'http://localhost/sea/backend/uploads/alunos/fee88a0a-0407-457f-abf3-a5e112cc9a17.jpg', 'igor.teles@aluno.ce.gov.br'),
(14, 11, '5245372', 'JARDSON BARRETO MUNIZ', 'http://localhost/sea/backend/uploads/alunos/fbb49081-3433-4bb3-a2db-634ea1d32170.jpg', 'jardson.muniz@aluno.ce.gov.br'),
(15, 11, '3283839', 'JOAO GUILHERME DE OLIVEIRA MAIA', 'http://localhost/sea/backend/uploads/alunos/3504771a-e21a-44af-be44-f0c9f75f9684.jpg', 'joao.maia@auno.ce.gov.br'),
(16, 11, '2877097', 'JOAO PEDRO DE OLIVEIRA CAVALCANTE', 'http://localhost/sea/backend/uploads/alunos/85b6487e-86bb-4bb5-9103-91ceaff006c8.jpg', 'joao.cavalcante@aluno.ce.gov.br'),
(17, 11, '2844748', 'JOEL DAMASCENO PARENTE', 'http://localhost/sea/backend/uploads/alunos/9351134d-c6d8-4afd-9766-44b5491ec5cc.jpg', 'joel.parente@aluno.ce.gov.br'),
(18, 11, '3406873', 'JOSE ARTHUR GOMES DA SILVA', 'http://localhost/sea/backend/uploads/alunos/318a6c16-239b-49c7-b7ed-66a30d678b4e.jpg', 'jose.silva@aluno.ce.gov.br'),
(19, 11, '3388096', 'JOSE DARLISON ANDRADE DE OLIVEIRA', 'http://localhost/sea/backend/uploads/alunos/d66e20b3-629d-4d41-a7c3-c56fa74edc16.jpg', 'jose.oliveira@aluno.ce.gov.br'),
(20, 11, 'foto304', 'KAILANNE GIRAO MAIA', 'http://localhost/sea/backend/uploads/alunos/58fb1b08-d53c-4252-934b-17b1e55ac5f3.jpg', 'kailanne.maia@aluno.ce.gov.br'),
(21, 11, '3032157', 'KAIO GUSTAVO ALVES DOS REIS', 'http://localhost/sea/backend/uploads/alunos/30e40b4f-d584-4876-b3a9-6892fe53e811.jpg', 'kaio.reis@aluno.ce.gov.br'),
(22, 11, '3406904', 'LAURA VITORIA MORAIS SILVA', 'http://localhost/sea/backend/uploads/alunos/33354db1-30db-4a3f-a759-1b94dab2807d.jpg', 'laura.silva@aluno.ce.gov.br'),
(23, 11, '5244947', 'LAVINIA ANIBAL PINHEIRO', 'http://localhost/sea/backend/uploads/alunos/0a842532-9420-4df8-8656-9bcad3141cd9.jpg', 'lavinia.pinheiro@aluno.ce.gov.br'),
(24, 11, '5245076', 'LOHANA KELLY RODRIGUES GIRAO', 'http://localhost/sea/backend/uploads/alunos/b880815b-5747-4ab9-88bb-2a43fbf66129.jpg', 'lohana.girao@aluno.ce.gov.br'),
(25, 11, '3292435', 'LORRAN SILVA MOREIRA', 'http://localhost/sea/backend/uploads/alunos/b5cf171d-a504-4c8b-b9e1-864017d48eb3.jpg', 'lorran.moreira@aluno.ce.gov.br'),
(26, 11, '2877129', 'LUIS OTAVIO DE MOURA PONTES', 'http://localhost/sea/backend/uploads/alunos/f4732a3e-0c1e-4f3a-b3ad-46165359bb55.jpg', 'luis.pontes@aluno.ce.gov.br'),
(27, 11, '3052515', 'MARCOS ANDRE DE FREITAS FILHO', 'http://localhost/sea/backend/uploads/alunos/83ba42e3-8399-46d0-acc8-839bb9f7d78e.jpg', 'marcos.filho@aluno.ce.gov.br'),
(28, 11, '3384865', 'MARIA RAQUELE FREITAS CARNEIRO', 'http://localhost/sea/backend/uploads/alunos/a7b628fe-fcd2-4795-ab2b-4a4e4c713352.jpg', 'maria.carneiro@aluno.ce.gov.br'),
(29, 11, '4623042', 'MARIO LUIS SARAIVA CAVALCANTE', 'http://localhost/sea/backend/uploads/alunos/20fbcb6a-adce-418e-b398-45c03ab9969e.jpg', 'mario.cavalcante@aluno.ce.gov.br'),
(30, 11, '4898839', 'MELISSA VICTORIA LIMA COSTA', 'http://localhost/sea/backend/uploads/alunos/28af4c50-20ba-4d99-8d6d-7169b4d9ed76.jpg', 'melissa.costa@aluno.ce.gov.br'),
(31, 11, '3407382', 'MIKAEL YACE GOMES NOGUEIRA', NULL, 'mikael.nogueira@aluno.ce.gov.br'),
(32, 11, '3407400', 'PALOMA NOGUEIRA CAVALCANTE', 'http://localhost/sea/backend/uploads/alunos/ff268952-263c-4cb5-ad06-2b58cecfd608.jpg', 'paloma.cavalcante@aluno.ce.gov.br'),
(33, 11, '3612156', 'PAULO EDUARDO SANTOS DE JESUS', 'http://localhost/sea/backend/uploads/alunos/2346d7d5-8a9f-40be-af2c-2045df8784fe.jpg', 'paulo.jesus@aluno.ce.gov.br'),
(34, 11, '3285555', 'PEDRO JORGE FREITAS DA SILVA', 'http://localhost/sea/backend/uploads/alunos/7ab26644-b8b4-47b1-8da8-7d3e183b3509.jpg', 'pedro.silva@aluno.ce.gov.br'),
(35, 11, '2892251', 'PEDRO LUCAS DA SILVA LIMA', 'http://localhost/sea/backend/uploads/alunos/ce9699ee-9f1c-4f1d-94de-f29eb60ba611.jpg', 'pedro.lima@aluno.ce.gov.br'),
(36, 11, '5245474', 'PEDRO LUCAS FREITAS DE OLIVEIRA', 'http://localhost/sea/backend/uploads/alunos/ba9fbe80-5465-4683-a75a-6878385a2119.jpg', 'pedro.oliveira@aluno.ce.gov.br'),
(37, 11, '5252545', 'RENAN SILVA AGUIAR', 'http://localhost/sea/backend/uploads/alunos/ebfebee1-0aeb-4d76-889b-b19be380f4eb.jpg', 'renan.aguiar@aluno.ce.gov.br'),
(38, 11, '3287571', 'RYANNA HELLEN DE SOUSA CASTRO', 'http://localhost/sea/backend/uploads/alunos/fde3259d-71d6-4eb4-b092-bdab6148e503.jpg', 'ryanna.castro@aluno.ce.gov.br'),
(39, 11, '5245105', 'RYAN VIANA OLIVEIRA', NULL, 'ryan.oliveira@aluno.ce.gov.br'),
(40, 11, '3033402', 'SAMUA HELEN MAIA PEREIRA', 'http://localhost/sea/backend/uploads/alunos/34e5cd9d-32bb-42eb-971a-a7f34a001a2c.jpg', 'samua.pereira'),
(41, 11, '3375288', 'VICENTE ALEXANDRE LARANJEIRA SILVA COSTA', 'http://localhost/sea/backend/uploads/alunos/a952b65c-4dcd-475c-bba2-7bfb9a87e13f.jpg', 'vicente.costa@aluno.ce.gov.br'),
(42, 11, '2295006', 'VITORIA EVELLY RUBENS DE SENA', 'http://localhost/sea/backend/uploads/alunos/1c61211d-bf88-4dac-bf66-af2b79a44af7.jpg', 'vitoria.sena@aluno.ce.gov.br');

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
(12, '12365478', 'EEEP Escola Teste', 'teste.escola@gmail.com', '(98) 76543-2103', NULL, 'CE', 'Cascavel ', 'CRISTAIS,', 'AV. SANTOS DUMONT- KM 92', '232', '2025-11-15 16:01:03'),
(13, '23565879', 'Vestido Florido', 'sofia@devias.io', '(85) 99125-9840', NULL, 'CE', 'Morada No', '2 de Agosto', 'ALUIZIO GONZAGA LIMA', 'SN PREDIO', '2025-12-03 16:30:27');

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
(2, 6),
(2, 20);

-- --------------------------------------------------------

--
-- Estrutura para tabela `professorturma`
--

CREATE TABLE `professorturma` (
  `id_turma` int(11) DEFAULT NULL,
  `id_professor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `professorturma`
--

INSERT INTO `professorturma` (`id_turma`, `id_professor`) VALUES
(11, 20);

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
(33, 6, 1, 'teste', '2º ano', 'Azul', '2025-11-29 04:33:54', '2025-11-29 04:33:54'),
(34, 6, 1, 'Prova de Matemática', '2º ano', 'Branco', '2025-12-02 20:36:38', '2025-12-02 20:36:38'),
(35, 6, 2, 'Prova de Português', '2º ano', 'Branco', '2025-12-02 20:39:36', '2025-12-02 20:39:36'),
(36, 6, 1, 'Matemática', '2º ano', 'Branco', '2025-12-02 20:40:45', '2025-12-02 20:40:45'),
(37, 6, 2, 'Avaliação Bimestral', '2º ano', 'Branco', '2025-12-03 21:22:57', '2025-12-03 21:22:57');

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
(14, 33),
(15, 34),
(18, 34),
(17, 34),
(16, 34),
(13, 35),
(9, 35),
(12, 35),
(10, 35),
(18, 36),
(15, 36),
(17, 36),
(16, 36),
(13, 37),
(9, 37),
(12, 37),
(10, 37);

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
(38, 33, 'Azul', '2025-11-28 21:33:55'),
(39, 34, 'Azul', '2025-12-02 13:36:38'),
(40, 34, '', '2025-12-02 13:36:38'),
(41, 34, 'Verde', '2025-12-02 13:36:38'),
(42, 34, '', '2025-12-02 13:36:38'),
(43, 35, 'Azul', '2025-12-02 13:39:36'),
(44, 35, '', '2025-12-02 13:39:36'),
(45, 35, 'Verde', '2025-12-02 13:39:36'),
(46, 35, '', '2025-12-02 13:39:36'),
(47, 36, 'Azul', '2025-12-02 13:40:45'),
(48, 36, '', '2025-12-02 13:40:45'),
(49, 36, 'Verde', '2025-12-02 13:40:45'),
(50, 36, '', '2025-12-02 13:40:45'),
(51, 37, 'Azul', '2025-12-03 14:22:57'),
(52, 37, '', '2025-12-03 14:22:57'),
(53, 37, 'Verde', '2025-12-03 14:22:57'),
(54, 37, '', '2025-12-03 14:22:57');

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
(98, 38, 14, 1),
(99, 39, 18, 1),
(100, 39, 16, 2),
(101, 39, 17, 3),
(102, 39, 15, 4),
(103, 40, 18, 1),
(104, 40, 15, 2),
(105, 40, 16, 3),
(106, 40, 17, 4),
(107, 41, 16, 1),
(108, 41, 15, 2),
(109, 41, 17, 3),
(110, 41, 18, 4),
(111, 42, 18, 1),
(112, 42, 17, 2),
(113, 42, 15, 3),
(114, 42, 16, 4),
(115, 43, 13, 1),
(116, 43, 10, 2),
(117, 43, 9, 3),
(118, 43, 12, 4),
(119, 44, 13, 1),
(120, 44, 10, 2),
(121, 44, 9, 3),
(122, 44, 12, 4),
(123, 45, 12, 1),
(124, 45, 10, 2),
(125, 45, 9, 3),
(126, 45, 13, 4),
(127, 46, 12, 1),
(128, 46, 13, 2),
(129, 46, 10, 3),
(130, 46, 9, 4),
(131, 47, 16, 1),
(132, 47, 17, 2),
(133, 47, 15, 3),
(134, 47, 18, 4),
(135, 48, 18, 1),
(136, 48, 16, 2),
(137, 48, 17, 3),
(138, 48, 15, 4),
(139, 49, 18, 1),
(140, 49, 15, 2),
(141, 49, 17, 3),
(142, 49, 16, 4),
(143, 50, 15, 1),
(144, 50, 16, 2),
(145, 50, 17, 3),
(146, 50, 18, 4),
(147, 51, 9, 1),
(148, 51, 13, 2),
(149, 51, 10, 3),
(150, 51, 12, 4),
(151, 52, 10, 1),
(152, 52, 12, 2),
(153, 52, 9, 3),
(154, 52, 13, 4),
(155, 53, 12, 1),
(156, 53, 10, 2),
(157, 53, 9, 3),
(158, 53, 13, 4),
(159, 54, 9, 1),
(160, 54, 13, 2),
(161, 54, 10, 3),
(162, 54, 12, 4);

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
(14, 2, 6, NULL, '<img src=\"http://localhost/sea/backend/uploads/alternativas/cde4bfea-1f01-490b-ac3e-0c7a089e5614.jpg\" alt=\"469595376_546231244907997_5305388839316232476_n\" title=\"469595376_546231244907997_5305388839316232476_n\"><p>Analise a imagem e marque a que achar adequado</p>', '<img src=\"http://localhost/sea/backend/uploads/alternativas/afbaa499-3275-4423-ba04-7f88952cd213.png\"><p></p>', 'objetiva', 0, '2025-11-29 00:21:03', '2025-11-29 00:21:03'),
(15, 8, 6, NULL, '<p>A cúpula pentagonal giralongada é um poliedro de Johnson, cujas faces são polígonos regulares, mas que não é um poliedro de Platão, de Arquimedes, prisma ou antiprisma. As figuras apresentam esse poliedro em duas posições e uma de suas planificações.<br></p><img src=\"http://localhost/sea/backend/uploads/alternativas/9fd17efe-9c44-4b94-97c0-97f8b21d56ea.png\" alt=\"Captura de tela 2025-12-02 132635\" title=\"Captura de tela 2025-12-02 132635\"><p>Quantos vértices tem esse poliedro?</p>', '<p>25</p>', 'objetiva', 0, '2025-12-02 16:29:23', '2025-12-02 16:29:23'),
(16, 1, 6, NULL, '<p>Uma fábrica de tijolos ecológicos com 3 funcionários, cada um trabalhando 6 horas diárias, produz 720 unidades por dia. Para atender ao crescimento da demanda por esse tipo de tijolo, essa fábrica passou a ter 5 funcionários, cada um trabalhando 9 horas por dia, aumentando, assim, sua capacidade de produção. Todos os funcionários produzem igual quantidade de tijolos a cada hora, independentemente de trabalharem 6 ou 9 horas diárias. O número de tijolos fabricados diariamente após o aumento da capacidade de produção é</p>', '<p>800</p>', 'objetiva', 0, '2025-12-02 16:30:43', '2025-12-02 16:30:43'),
(17, 1, 6, NULL, '<p>Para acompanhar o fluxo de visitantes em seu prédio, uma empresa estabeleceu um código de identificação para a visitação. De acordo com a regra estabelecida, cada visitante será identificado com um código sequencial numérico com 7 dígitos, determinado, da esquerda para a direita, da seguinte forma: </p><ul><li><p>o primeiro dígito indica o andar ao qual o visitante se dirige, que é um número de 1 a 4; </p></li><li><p>os dois próximos dígitos correspondem ao número do setor da empresa ao qual o visitante se destina. Esse número varia de 01 a 20; </p></li><li><p>os três dígitos seguintes correspondem ao número do funcionário da empresa com quem o visitante irá se reunir. Esse número varia de 001 a 135; </p></li><li><p>o último dígito indica se o visitante chegou à empresa pela manhã, dígito 0, ou à tarde, dígito 1.</p></li></ul><p>Um visitante chegou à empresa às 10 horas da manhã para se reunir com o funcionário identificado pelo número 109, que trabalha no setor 08 da empresa, localizado no 2º andar. </p><p>O código de identificação desse visitante é</p>', '<p>0109082.</p>', 'objetiva', 0, '2025-12-02 16:33:34', '2025-12-02 16:33:34'),
(18, 1, 6, NULL, '<p>Na cantina de uma escola, há cinco alimentos vendidos em pacotes com diferentes quantidades de porções. As informações nutricionais contidas nos rótulos desses produtos estão indicadas nas imagens. </p><img src=\"http://localhost/sea/backend/uploads/alternativas/fccbd6b1-b8c3-47a0-b9ed-90effc5dc165.png\" alt=\"Captura de tela 2025-12-02 133408\" title=\"Captura de tela 2025-12-02 133408\"><p></p><p>Uma estudante opta sempre pelo alimento com a menor quantidade total de sódio por pacote. Qual desses produtos deve ser o escolhido pela estudante?</p>', '<p>Batata chips.</p>', 'objetiva', 0, '2025-12-02 16:35:22', '2025-12-02 16:35:22'),
(19, 1, 6, NULL, '<p>Uma distribuidora de combustível possui caminhões-tanque com capacidade de 30 000 litros cada. Em qualquer transporte realizado por esses caminhões, um mesmo volume de combustível é descartado, pois fica com muitas impurezas. Esse volume descartado independe da quantidade transportada. Um posto de combustível encomendou 10 000 litros de gasolina dessa distribuidora, que enviou 10 200 litros, considerando o volume descartado no transporte. Mesmo assim, a quantidade de gasolina entregue ao posto foi de 9 900 litros. Em um novo pedido, esse posto solicitou que fosse entregue exatamente o dobro do volume de gasolina encomendado no pedido anterior. </p><p>Utilizando o mesmo caminhão da entrega anterior, qual é o volume mínimo de gasolina, em litro, que a distribuidora deverá enviar para garantir a entrega da quantidade encomendada nesse novo pedido?</p>', '<p>20 300</p>', 'objetiva', 0, '2025-12-02 16:44:30', '2025-12-02 16:44:30');

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

--
-- Despejando dados para a tabela `turma`
--

INSERT INTO `turma` (`id_turma`, `id_escola`, `nome_turma`, `serie`, `turno`) VALUES
(11, 10, 'Informática 2024', '2', 'integral');

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
(20, 10, 'Fernando Pessoa Oliveira de Sousa', 'fernandoufc2012@gmail.com', 'http://localhost/sea/backend/uploads/usuarios/user_20_1764781729.png', '$2y$10$S4YgLKc9zqUzapt08A62we2BxtKICJ1ey4aHF.AqBsU2OZG.Sjs5C', '(85) 99125-9840', 'professor', 1, '2025-12-03 17:03:00', '2025-12-03 17:08:49');

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
  MODIFY `id_alternativa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT de tabela `aluno`
--
ALTER TABLE `aluno`
  MODIFY `id_aluno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

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
  MODIFY `id_escola` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de tabela `gabarito`
--
ALTER TABLE `gabarito`
  MODIFY `id_gabarito` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `prova`
--
ALTER TABLE `prova`
  MODIFY `id_prova` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de tabela `provas_versoes`
--
ALTER TABLE `provas_versoes`
  MODIFY `id_versao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT de tabela `provas_versoes_questoes`
--
ALTER TABLE `provas_versoes_questoes`
  MODIFY `id_versao_questao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT de tabela `questao`
--
ALTER TABLE `questao`
  MODIFY `id_questao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de tabela `tags`
--
ALTER TABLE `tags`
  MODIFY `id_tag` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `turma`
--
ALTER TABLE `turma`
  MODIFY `id_turma` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

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
