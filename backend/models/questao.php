<?php

namespace Models;

class Questao{
    private $idQuestao;
    private $idAssunto;
    private $idProfessor;
    private $enunciado;
    private $tipo;
    private $respostaCorreta;
    private $status;
    private $publico;
    private $dataCriacao; 
    private $ultimaAtualizacao;

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
     * Get the value of idAssunto
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
     * Get the value of enunciado
     */ 
    public function getEnunciado()
    {
        return $this->enunciado;
    }

    /**
     * Set the value of enunciado
     *
     * @return  self
     */ 
    public function setEnunciado($enunciado)
    {
        $this->enunciado = $enunciado;

        return $this;
    }

    /**
     * Get the value of tipo
     */ 
    public function getTipo()
    {
        return $this->tipo;
    }

    /**
     * Set the value of tipo
     *
     * @return  self
     */ 
    public function setTipo($tipo)
    {
        $this->tipo = $tipo;

        return $this;
    }

    /**
     * Get the value of respostaCorreta
     */ 
    public function getRespostaCorreta()
    {
        return $this->respostaCorreta;
    }

    /**
     * Set the value of respostaCorreta
     *
     * @return  self
     */ 
    public function setRespostaCorreta($respostaCorreta)
    {
        $this->respostaCorreta = $respostaCorreta;

        return $this;
    }

    /**
     * Get the value of status
     */ 
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set the value of status
     *
     * @return  self
     */ 
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get the value of publico
     */ 
    public function getPublico()
    {
        return $this->publico;
    }

    /**
     * Set the value of publico
     *
     * @return  self
     */ 
    public function setPublico($publico)
    {
        $this->publico = $publico;

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