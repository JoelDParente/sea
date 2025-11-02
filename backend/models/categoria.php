<?php

Namespace Models;

class Categoria {
    private $idCategoria;
    private $idDisciplina;
    private $nomeCategoria;

    /**
     * Get the value of idCategoria
     */ 
    public function getIdCategoria()
    {
        return $this->idCategoria;
    }

    /**
     * Set the value of idCategoria
     *
     * @return  self
     */ 
    public function setIdCategoria($idCategoria)
    {
        $this->idCategoria = $idCategoria;

        return $this;
    }

    /**
     * Get the value of nomeCategoria
     */ 
    public function getNomeCategoria()
    {
        return $this->nomeCategoria;
    }

    /**
     * Set the value of nomeCategoria
     *
     * @return  self
     */ 
    public function setNomeCategoria($nomeCategoria)
    {
        $this->nomeCategoria = $nomeCategoria;

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
}