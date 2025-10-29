<?php

namespace Models;

class ProvaQuestao{
    private $idProva;
    private $idQuestao;

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
}