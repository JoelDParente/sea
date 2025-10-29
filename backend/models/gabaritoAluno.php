<?php

    namespace Models;

    class GabaritoAluno{
        private $idAluno;
        private $idProva;
        private $idQuestao;
        private $respostaAluno;

        /**
         * Get the value of respostaAluno
         */ 
        public function getRespostaAluno()
        {
                return $this->respostaAluno;
        }

        /**
         * Set the value of respostaAluno
         *
         * @return  self
         */ 
        public function setRespostaAluno($respostaAluno)
        {
                $this->respostaAluno = $respostaAluno;

                return $this;
        }

        /**
         * Get the value of idQuestao
         */ 
        public function getIdQuestao()
        {
                return $this->idQuestao;
        }

        /**
         * Set the value of idQuestao
         *
         * @return  self
         */ 
        public function setIdQuestao($idQuestao)
        {
                $this->idQuestao = $idQuestao;

                return $this;
        }

        /**
         * Get the value of idProva
         */ 
        public function getIdProva()
        {
                return $this->idProva;
        }

        /**
         * Set the value of idProva
         *
         * @return  self
         */ 
        public function setIdProva($idProva)
        {
                $this->idProva = $idProva;

                return $this;
        }

        /**
         * Get the value of idAluno
         */ 
        public function getIdAluno()
        {
                return $this->idAluno;
        }

        /**
         * Set the value of idAluno
         *
         * @return  self
         */ 
        public function setIdAluno($idAluno)
        {
                $this->idAluno = $idAluno;

                return $this;
        }
    }