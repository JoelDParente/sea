<?php

namespace Models;

class Disciplina
{
    private $idDisciplina;
    private $nomeDisciplina;
    private $descricao;
    private $categoria;

    /**
     * Get the value of id
     */ 
    public function getIdDisciplina()
    {
        return $this->idDisciplina;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setIdDisciplina($idDisciplina)
    {
        $this->idDisciplina = $idDisciplina;

        return $this;
    }

    /**
     * Get the value of nomeDisciplina
     */ 
    public function getNomeDisciplina()
    {
        return $this->nomeDisciplina;
    }

    /**
     * Set the value of nomeDisciplina
     *
     * @return  self
     */ 
    public function setNomeDisciplina($nomeDisciplina)
    {
        $this->nomeDisciplina = $nomeDisciplina;

        return $this;
    }

    /**
     * Get the value of descricao
     */ 
    public function getDescricao()
    {
        return $this->descricao;
    }

    /**
     * Set the value of descricao
     *
     * @return  self
     */ 
    public function setDescricao($descricao)
    {
        $this->descricao = $descricao;

        return $this;
    }

    /**
     * Get the value of categoria
     */ 
    public function getCategoria()
    {
        return $this->categoria;
    }

    /**
     * Set the value of categoria
     *
     * @return  self
     */ 
    public function setCategoria($categoria)
    {
        $this->categoria = $categoria;

        return $this;
    }
}
