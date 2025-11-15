<?php

namespace Models;

class ImagemQuestao{
    private $idImagem;
    private $idQuestao;
    private $caminhoImagem;

    /**
     * Get the value of id
     */ 
    public function getIdImagem()
    {
        return $this->idImagem;
    }

    /**
     * Set the value of idImagem
     *
     * @return  self
     */ 
    public function setIdImagem($idImagem)
    {
        $this->idImagem = $idImagem;

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