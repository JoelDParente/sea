<?php

namespace Models;

class Prova{
    private $idProva;
    private $idProfessor;
    private $idDisciplina;
    private $titulo;
    private $versao;
    private $dataCriacao;
    private $ultimaAtualizacao;

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
     * Get the value of titulo
     */ 
    public function getTitulo()
    {
        return $this->titulo;
    }

    /**
     * Set the value of titulo
     *
     * @return  self
     */ 
    public function setTitulo($titulo)
    {
        $this->titulo = $titulo;

        return $this;
    }

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
     * Get the value of dataCriacao
     */ 
    public function getDataCriacao()
    {
        return $this->dataCriacao;
    }

    /**
     * Set the value of dataCriacao
     *
     * @return  self
     */ 
    public function setDataCriacao($dataCriacao)
    {
        $this->dataCriacao = $dataCriacao;

        return $this;
    }

    /**
     * Get the value of ultimaAtualizacao
     */ 
    public function getUltimaAtualizacao()
    {
        return $this->ultimaAtualizacao;
    }

    /**
     * Set the value of ultimaAtualizacao
     *
     * @return  self
     */ 
    public function setUltimaAtualizacao($ultimaAtualizacao)
    {
        $this->ultimaAtualizacao = $ultimaAtualizacao;

        return $this;
    }
}