<?php

    namespace Models;

    class Tags{
        private $idTag;
        private $nomeTag;

        /**
         * Get the value of idTag
         */ 
        public function getIdTag()
        {
                return $this->idTag;
        }

        /**
         * Set the value of idTag
         *
         * @return  self
         */ 
        public function setIdTag($idTag)
        {
                $this->idTag = $idTag;

                return $this;
        }

        /**
         * Get the value of nomeTag
         */ 
        public function getNomeTag()
        {
                return $this->nomeTag;
        }

        /**
         * Set the value of nomeTag
         *
         * @return  self
         */ 
        public function setNomeTag($nomeTag)
        {
                $this->nomeTag = $nomeTag;

                return $this;
        }
    }