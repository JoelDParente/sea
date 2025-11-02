<?php

namespace Models;

class Assunto {
    private $idAssunto;
    private $idCategoria;
    private $nomeAssunto;


    /**
     * Get the value of id
     */ 
    public function getIdAssunto()
    {
        return $this->idAssunto;
    }

    /**
     * Set the value of idAssunto
     *
     * @return  self
     */ 
    public function setIdAssunto($idAssunto)
    {
        $this->idAssunto = $idAssunto;

        return $this;
    }

    /**
     * Get the value of IdCategoria
     */ 
    public function getIdCategoria()
    {
        return $this->idCategoria;
    }

    /**
     * Set the value of IdCategoria
     *
     * @return  self
     */ 
    public function setIdCategoria($idCategoria)
    {
        $this->idCategoria = $idCategoria;

        return $this;
    }

    /**
     * Get the value of nomeAssunto
     */ 
    public function getNomeAssunto()
    {
        return $this->nomeAssunto;
    }

    /**
     * Set the value of nomeAssunto
     *
     * @return  self
     */ 
    public function setNomeAssunto($nomeAssunto)
    {
        $this->nomeAssunto = $nomeAssunto;

        return $this;
    }
}