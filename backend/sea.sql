-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 23/11/2025 às 18:36
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

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
(1, 1, 'y = 250x'),
(2, 1, 'y = 500x'),
(3, 1, 'y = 750x'),
(4, 1, 'y = 250x + 500'),
(5, 1, 'y = 500x + 250'),
(6, 2, ' 8 250.'),
(9, 2, ' 7 920.'),
(10, 2, ' 6 545'),
(12, 2, ' 5 500'),
(14, 2, '5 280'),
(16, 4, 'revelar a imposição de crenças religiosas a pessoas escravizadas.'),
(17, 4, 'apontar a hipocrisia do discurso conservador na defesa da escravidão.'),
(18, 4, 'sugerir práticas de violência física e moral em nome do progresso material.'),
(19, 4, 'relacionar o declínio da produção agrícola e comercial a questões raciais.'),
(20, 4, ' ironizar o comportamento dos proprietários de terra na exploração do trabalho.'),
(21, 5, 'relação distanciada entre os interlocutores.'),
(22, 5, ' articulação de vários núcleos narrativos.'),
(23, 5, 'brevidade no tratamento da temática.'),
(24, 5, 'descrição minuciosa dos personagens.'),
(25, 5, 'público leitor exclusivo.'),
(26, 6, 'ter mais de mil palavras conhecidas.'),
(27, 6, 'ter palavras diferentes de uma linguagem secreta.'),
(28, 6, 'ser consolidado por objetos formais de registro.'),
(29, 6, 'ser utilizado por advogados em situações formais.'),
(30, 6, 'ser comum em conversas no ambiente de trabalho.'),
(31, 7, 'alternância das pessoas do discurso que determinam o foco narrativo.'),
(32, 7, 'utilização de formas verbais que marcam tempos narrativos variados.'),
(33, 7, 'indeterminação dos sujeitos de ações que caracterizam os eventos narrados.'),
(34, 7, 'justaposição de frases que relacionam semanticamente os acontecimentos narrados.'),
(35, 7, ' recorrência de expressões adverbiais que organizam temporalmente a narrativa.   Questão 6 (Enem/2018)  questão de intertextualidade enem ROSA, R. Grande sertão: veredas: adaptação da obra de João Guimarães Rosa. São Paulo: Globo, 2014 (adaptado) A imagem integra uma adaptação em quadrinhos da obra Grande sertão: veredas, de Guimarães Rosa. Na representação gráfica, a inter-relação de diferentes linguagens caracteriza-se por  a) romper com a linearidade das ações da narrativa literária. b) ilustrar de modo fidedigno passagens representativas da história. c) articular a tensão do romance à desproporcionalidade das formas. d) potencializar a dramaticidade do episódio com recursos das artes visuais. e) desconstruir a diagramação do texto literário pelo desequilíbrio da composição.   Questão 7 (Enem/2018)  Mais big do que bang  Conteúdo exclusivo para assinantes Toda Matéria+ Além de mais exercícios, tenha acesso a mais recursos para dar um up nos seus estudos. Corretor de Redação para o Enem Exercícios exclusivos Estude sem publicidade Assinar Toda Matéria+ Já é Toda Matéria+? Faça seu login Aprofunde os seus estudos para tirar a nota perfeita no ENEM:  Assuntos que mais caem no Enem Exercícios de interpretação de texto Exercícios de interpretação de texto nas tirinhas da Mafalda (ENEM) Os simulados são aliados poderosos nos estudos, especialmente para quem está se preparando para o Enem. Confira o que preparamos para você:  Simulado Enem (questões comentadas por especialistas)  Mini simulado de Linguagens, Códigos e suas tecnologias (Enem 2025)  Simulado ENEM (prova de Linguagens, Códigos e suas Tecnologias 2024)  Simulado de Linguagens, Códigos e suas Tecnologias (ENEM 2023)  Este conteúdo foi útil?simnão Márcia Fernandes Márcia Fernandes Professora, produz conteúdos educativos desde 2015. Licenciada em Letras pela Universidade Católica de Santos (habilitação para Ensino Fundamental II e Ensino Médio) e formada no Curso de Magistério (habilitação para Educação Infantil e Ensino Fundamental I). Como citar? Veja também Simulado Enem (questões comentadas por especialistas) Assuntos que mais caem no Enem Exercícios de interpretação de texto (com gabarito) Mini simulado de Linguagens, Códigos e suas tecnologias (Enem 2025) Português no Enem: o que mais cai na prova (2025) Exercícios de interpretação de texto nas tirinhas da Mafalda (ENEM) Simulado de Linguagens, Códigos e suas Tecnologias (ENEM 2024) Questões do Enem comentadas por especialistas'),
(36, 8, 'fixação de táticas, que define a padronização para maior alcance popular.'),
(37, 8, 'competitividade, que impulsiona o interesse pelo sucesso.'),
(38, 8, 'refinamento técnico, que gera resultados satisfatórios.'),
(39, 8, 'caráter lúdico, que permite experiências inusitadas.'),
(40, 8, 'uso tecnológico, que amplia as opções de lazer.'),
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

--
-- Despejando dados para a tabela `provaquestao`
--

INSERT INTO `provaquestao` (`id_questao`, `id_prova`) VALUES
(2, 1),
(1, 1),
(2, 2),
(1, 2),
(2, 3),
(1, 3),
(2, 4),
(1, 4),
(7, 5),
(6, 5),
(5, 5),
(4, 5),
(7, 6),
(6, 6),
(5, 6),
(4, 6);

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
(1, 1, '', '2025-11-21 13:34:25'),
(2, 2, '', '2025-11-21 13:38:34'),
(3, 3, '', '2025-11-21 13:41:12'),
(4, 4, '', '2025-11-21 13:42:41'),
(5, 5, '', '2025-11-21 14:25:19'),
(6, 5, '', '2025-11-21 14:25:19'),
(7, 5, '', '2025-11-21 14:25:19'),
(8, 5, '', '2025-11-21 14:25:19'),
(9, 6, '', '2025-11-21 14:25:44');

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
(1, 1, 2, 1),
(2, 1, 1, 2),
(3, 2, 2, 1),
(4, 2, 1, 2),
(5, 3, 2, 1),
(6, 3, 1, 2),
(7, 4, 1, 1),
(8, 4, 2, 2),
(9, 5, 7, 1),
(10, 5, 6, 2),
(11, 5, 4, 3),
(12, 5, 5, 4),
(13, 6, 5, 1),
(14, 6, 6, 2),
(15, 6, 7, 3),
(16, 6, 4, 4),
(17, 7, 4, 1),
(18, 7, 7, 2),
(19, 7, 6, 3),
(20, 7, 5, 4),
(21, 8, 4, 1),
(22, 8, 5, 2),
(23, 8, 7, 3),
(24, 8, 6, 4),
(25, 9, 6, 1),
(26, 9, 7, 2),
(27, 9, 5, 3),
(28, 9, 4, 4);

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
(1, 2, NULL, NULL, 'Para concretar a laje de sua residência, uma pessoa contratou uma construtora. Tal empresa informa que o preço y do concreto bombeado é composto de duas partes: uma fixa, chamada de taxa de bombeamento, e uma variável, que depende do volume x de concreto utilizado. Sabe-se que a taxa de bombeamento custa R$ 500,00 e que o metro cúbico do concreto bombeado é de R$ 250,00. A expressão que representa o preço y em função do volume x, em metro cúbico, é', 'A', 'objetiva', 0, '2025-11-11 22:38:40', '2025-11-11 22:38:40'),
(2, 2, NULL, NULL, 'Uma piscina tem capacidade de 2 500 000 litros. Seu sistema de abastecimento foi regulado para ter uma vazão constante de 6 000 litros de água por minuto. O mesmo sistema foi instalado em uma segunda piscina, com capacidade de 2 750 000 litros, e regulado para ter uma vazão, também constante, capaz de enchê-la em um tempo 20% maior que o gasto para encher a primeira piscina. A vazão do sistema de abastecimento da segunda piscina, em litro por minuto, é', 'A', 'objetiva', 0, '2025-11-12 23:29:23', '2025-11-12 23:29:23'),
(4, 45, NULL, NULL, 'A escrava— Admira-me —, disse uma senhora de sentimentos sinceramente abolicionistas —; faz-me até pasmar como se possa sentir, e expressar sentimentos escravocratas, no presente século, no século dezenove! A moral religiosa e a moral cívica aí se erguem, e falam bem alto esmagando a hidra que envenena a família no mais sagrado santuário seu, e desmoraliza, e avilta a nação inteira! Levantai os olhos ao Gólgota, ou percorrei-os em torno da sociedade, e dizei-me:— Para que se deu em sacrifício o Homem Deus, que ali exalou seu derradeiro alento? Ah! Então não é verdade que seu sangue era o resgate do homem! É então uma mentira abominável ter esse sangue comprado a liberdade!? E depois, olhai a sociedade... Não vedes o abutre que a corrói constantemente!… Não sentis a desmoralização que a enerva, o cancro que a destrói?Por qualquer modo que encaremos a escravidão, ela é, e será sempre um grande mal. Dela a decadência do comércio; porque o comércio e a lavoura caminham de mãos dadas, e o escravo não pode fazer florescer a lavoura; porque o seu trabalho é forçado.REIS, M. F. Úrsula e outras obras. Brasília: Câmara dos Deputados, 2018.Inscrito na estética romântica da literatura brasileira, o conto descortina aspectos da realidade nacional no século XIX ao', 'A', 'objetiva', 0, '2025-11-21 17:13:26', '2025-11-21 17:13:26'),
(5, 45, NULL, NULL, 'Ser cronistaSei que não sou, mas tenho meditado ligeiramente no assunto.Crônica é um relato? É uma conversa? É um resumo de um estado de espírito? Não sei, pois antes de começar a escrever para o Jornal do Brasil, eu só tinha escrito romances e contos.E também sem perceber, à medida que escrevia para aqui, ia me tornando pessoal demais, correndo o risco de em breve publicar minha vida passada e presente, o que não pretendo. Outra coisa notei: basta eu saber que estou escrevendo para o jornal, isto é, para algo aberto facilmente por todo o mundo, e não para um livro, que só é aberto por quem realmente quer, para que, sem mesmo sentir, o modo de escrever se transforme. Não é que me desagrade mudar, pelo contrário. Mas queria que fossem mudanças mais profundas e interiores que não viessem a se refletir no escrever. Mas mudar só porque isso é uma coluna ou uma crônica? Ser mais leve só porque o leitor assim o quer? Divertir? Fazer passar uns minutos de leitura? E outra coisa: nos meus livros quero profundamente a comunicação profunda comigo e com o leitor. Aqui no jornal apenas falo com o leitor e agrada-me que ele fique agradado. Vou dizer a verdade: não estou contente.LISPECTOR, C. In: A descoberta do mundo. Rio de Janeiro: Rocco, 1999.No texto, ao refletir sobre a atividade de cronista, a autora questiona características do gênero crônica, como', 'C', 'objetiva', 0, '2025-11-21 17:17:11', '2025-11-21 17:17:11'),
(6, 45, NULL, NULL, '“Acuenda o Pajubá”: conheça o “dialeto secreto” utilizado por gays e travestisCom origem no iorubá, linguagem foi adotada por travestis e ganhou a comunidade“Nhaí, amapô! Não faça a loka e pague meu acué, deixe de equê se não eu puxo teu picumã!” Entendeu as palavras dessa frase? Se sim, é porque você manja alguma coisa de pajubá, o “dialeto secreto” dos gays e travestis.Adepto do uso das expressões, mesmo nos ambientes mais formais, um advogado afirma: “É claro que eu não vou falar durante uma audiência ou uma reunião, mas na firma, com meus colegas de trabalho, eu falo de ‘acué’ o tempo inteiro”, brinca. “A gente tem que ter cuidado de falar outras palavras porque hoje o pessoal já entende, né? Tá na internet, tem até dicionário...”, comenta.O dicionário a que ele se refere é o Aurélia, a dicionária da língua afiada, lançado no ano de 2006 e escrito pelo jornalista Angelo Vip e por Fred Libi. Na obra, há mais de 1 300 verbetes revelando o significado das palavras do pajubá.Não se sabe ao certo quando essa linguagem surgiu, mas sabe-se que há claramente uma relação entre o pajubá e a cultura africana, numa costura iniciada ainda na época do Brasil colonial.Disponível em: www.midiamax.com.br. Acesso em: 4 abr. 2017 (adaptado).Da perspectiva do usuário, o pajubá ganha status de dialeto, caracterizando-se como elemento de patrimônio linguístico, especialmente por', 'C', 'objetiva', 0, '2025-11-21 17:21:04', '2025-11-21 17:21:04'),
(7, 45, NULL, NULL, 'Certa vez minha mãe surrou-me com uma corda nodosa que me pintou as costas de manchas sangrentas. Moído, virando a cabeça com dificuldade, eu distinguia nas costelas grandes lanhos vermelhos. Deitaram-me, enrolaram-me em panos molhados com água de sal – e houve uma discussão na família. Minha avó, que nos visitava, condenou o procedimento da filha e esta afligiu-se. Irritada, ferira-me à toa, sem querer. Não guardei ódio a minha mãe: o culpado era o nó.RAMOS, G. Infância. Rio de Janeiro. Record, 1998.Num texto narrativo, a sequência dos fatos contribui para a progressão temática. No fragmento, esse processo é indicado pela', 'B', 'objetiva', 0, '2025-11-21 17:23:02', '2025-11-21 17:23:02'),
(8, 45, NULL, NULL, 'O jogo é uma atividade ou ocupação voluntária, exercida dentro de certos e determinados limites de tempo e de espaço, segundo regras livremente consentidas, mas absolutamente obrigatórias, dotado de um fim em si mesmo, acompanhado de um sentimento de tensão e de alegria e de uma consciência de ser diferente da “vida quotidiana”.HUIZINGA, J. Homo ludens: o jogo como elemento da cultura. São Paulo: Perspectiva, 2004.Segundo o texto, o jogo comporta a possibilidade de fruição. Do ponto de vista das práticas corporais, essa fruição se estabelece por meio do(a)', 'A', 'objetiva', 0, '2025-11-22 12:11:14', '2025-11-22 12:11:14'),
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
  MODIFY `id_alternativa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

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
  MODIFY `id_questao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
