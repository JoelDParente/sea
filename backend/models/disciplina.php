<?php

namespace Models;

class Disciplina
{
    private $id;
    private $nomeDisciplina;
    private $descricao;

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
}
