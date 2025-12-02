<?php

namespace Models;

class Turma {
    private $idTurma;
    private $idEscola;
    private $nomeTurma;
    private $serie;
    private $turno;

    public function getIdTurma() { return $this->idTurma; }
    public function setIdTurma($id) { $this->idTurma = $id; return $this; }

    public function getIdEscola() { return $this->idEscola; }
    public function setIdEscola($id) { $this->idEscola = $id; return $this; }

    public function getNomeTurma() { return $this->nomeTurma; }
    public function setNomeTurma($nome) { $this->nomeTurma = $nome; return $this; }

    public function getSerie() { return $this->serie; }
    public function setSerie($serie) { $this->serie = $serie; return $this; }

    public function getTurno() { return $this->turno; }
    public function setTurno($turno) { $this->turno = $turno; return $this; }
}