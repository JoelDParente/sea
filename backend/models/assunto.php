<?php

namespace Models;

class Assunto {
    private $id;
    private $idDisciplina;
    private $nomeAssunto;


    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId($id)
    {
        $this->id = $id;

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