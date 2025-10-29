<?php

namespace Models;

class Gabarito{
    private $idGabarito;
    private $idProva;
    private $idQuestao;
    private $alternativa;
    private $versao;

    /**
     * Get the value of versao
     */ 
    public function getVersao()
    {
        return $this->versao;
    }

    /**
     * Set the value of versao
     *
     * @return  self
     */ 
    public function setVersao($versao)
    {
        $this->versao = $versao;

        return $this;
    }

    /**
     * Get the value of alternativa
     */ 
    public function getAlternativa()
    {
        return $this->alternativa;
    }

    /**
     * Set the value of alternativa
     *
     * @return  self
     */ 
    public function setAlternativa($alternativa)
    {
        $this->alternativa = $alternativa;

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
     * Get the value of idGabarito
     */ 
    public function getIdGabarito()
    {
        return $this->idGabarito;
    }

    /**
     * Set the value of idGabarito
     *
     * @return  self
     */ 
    public function setIdGabarito($idGabarito)
    {
        $this->idGabarito = $idGabarito;

        return $this;
    }
}