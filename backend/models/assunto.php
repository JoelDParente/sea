<?php

namespace Models;

class Assunto {
    private $idAssunto;
    private $idDisciplina;
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
     * Get the value of idDisciplina
     */ 
    public function getIdDisciplina()
    {
        return $this->idDisciplina;
    }

    /**
     * Set the value of idDisciplina
     *
     * @return  self
     */ 
    public function setIdDisciplina($idDisciplina)
    {
        $this->idDisciplina = $idDisciplina;

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