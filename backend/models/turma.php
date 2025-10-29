<?php

    namespace Models;

    class Turma{
        private $idTurma;
        private $idEscola;
        private $nomeTurma;
        private $serie;
        private $turno;
        

        /**
         * Get the value of turno
         */ 
        public function getTurno()
        {
                return $this->turno;
        }

        /**
         * Set the value of turno
         *
         * @return  self
         */ 
        public function setTurno($turno)
        {
                $this->turno = $turno;

                return $this;
        }

        /**
         * Get the value of idTurma
         */ 
        public function getIdTurma()
        {
                return $this->idTurma;
        }

        /**
         * Set the value of idTurma
         *
         * @return  self
         */ 
        public function setIdTurma($idTurma)
        {
                $this->idTurma = $idTurma;

                return $this;
        }

        /**
         * Get the value of idEscola
         */ 
        public function getIdEscola()
        {
                return $this->idEscola;
        }

        /**
         * Set the value of idEscola
         *
         * @return  self
         */ 
        public function setIdEscola($idEscola)
        {
                $this->idEscola = $idEscola;

                return $this;
        }

        /**
         * Get the value of nomeTurma
         */ 
        public function getNomeTurma()
        {
                return $this->nomeTurma;
        }

        /**
         * Set the value of nomeTurma
         *
         * @return  self
         */ 
        public function setNomeTurma($nomeTurma)
        {
                $this->nomeTurma = $nomeTurma;

                return $this;
        }

        /**
         * Get the value of serie
         */ 
        public function getSerie()
        {
                return $this->serie;
        }

        /**
         * Set the value of serie
         *
         * @return  self
         */ 
        public function setSerie($serie)
        {
                $this->serie = $serie;

                return $this;
        }
    }