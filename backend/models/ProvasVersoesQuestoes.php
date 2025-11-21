<?php
namespace Models;

class ProvasVersoesQuestoes {
    private $id_versao_questao;
    private $id_versao;
    private $id_questao;
    private $ordem;

    public function getIdVersaoQuestao() {
        return $this->id_versao_questao;
    }

    public function setIdVersaoQuestao($id) {
        $this->id_versao_questao = $id;
    }

    public function getIdVersao() {
        return $this->id_versao;
    }

    public function setIdVersao($id) {
        $this->id_versao = $id;
    }

    public function getIdQuestao() {
        return $this->id_questao;
    }

    public function setIdQuestao($id) {
        $this->id_questao = $id;
    }

    public function getOrdem() {
        return $this->ordem;
    }

    public function setOrdem($ordem) {
        $this->ordem = $ordem;
    }
}
