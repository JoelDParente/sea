<?php

namespace Models;

class Alternativa{
    private $idAlternativa;
    private $idQuestao;
    private $texto;
    private $caminhoImagem;
    private $correta;

    /**
     * Get the value of id
     */ 
    public function getIdAlternativa()
    {
        return $this->idAlternativa;
    }

    /**
     * Set the value of idAlternativa
     *
     * @return  self
     */ 
    public function setIdAlternativa($idAlternativa)
    {
        $this->idAlternativa = $idAlternativa;

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
     * Get the value of texto
     */ 
    public function getTexto()
    {
        return $this->texto;
    }

    /**
     * Set the value of texto
     *
     * @return  self
     */ 
    public function setTexto($texto)
    {
        $this->texto = $texto;

        return $this;
    }

    /**
     * Get the value of correta
     */ 
    public function getCorreta()
    {
        return $this->correta;
    }

    /**
     * Set the value of correta
     *
     * @return  self
     */ 
    public function setCorreta($correta)
    {
        $this->correta = $correta;

        return $this;
    }

    /**
     * Get the value of caminhoImagem
     */ 
    public function getCaminhoImagem()
    {
        return $this->caminhoImagem;
    }

    /**
     * Set the value of caminhoImagem
     *
     * @return  self
     */ 
    public function setCaminhoImagem($caminhoImagem)
    {
        $this->caminhoImagem = $caminhoImagem;

        return $this;
    }
}