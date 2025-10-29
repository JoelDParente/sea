<?php

namespace Models;

class ProvaTurma{
    private $idProva;
    private $idTurma;

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
}