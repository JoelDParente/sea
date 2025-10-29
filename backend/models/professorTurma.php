<?php

namespace Models;

class ProfessorTurma{
    private $idProfessor;
    private $idTurma;
    

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
     * Get the value of idProfessor
     */ 
    public function getIdProfessor()
    {
        return $this->idProfessor;
    }

    /**
     * Set the value of idProfessor
     *
     * @return  self
     */ 
    public function setIdProfessor($idProfessor)
    {
        $this->idProfessor = $idProfessor;

        return $this;
    }
}