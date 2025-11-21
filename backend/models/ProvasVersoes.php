<?php
namespace Models;

class ProvasVersoes {
    private $id_versao;
    private $id_prova;
    private $codigo_versao;
    private $data_criacao;

    public function getIdVersao() {
        return $this->id_versao;
    }

    public function setIdVersao($id) {
        $this->id_versao = $id;
    }

    public function getIdProva() {
        return $this->id_prova;
    }

    public function setIdProva($id) {
        $this->id_prova = $id;
    }

    public function getCodigoVersao() {
        return $this->codigo_versao;
    }

    public function setCodigoVersao($codigo) {
        $this->codigo_versao = $codigo;
    }

    public function getDataCriacao() {
        return $this->data_criacao;
    }

    public function setDataCriacao($data) {
        $this->data_criacao = $data;
    }
}
