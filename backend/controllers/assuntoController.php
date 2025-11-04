<?php
require_once __DIR__ . '/../dao/AssuntoDAO.php';

class AssuntoController {
    private $dao;

    public function __construct() {
        $this->dao = new AssuntoDAO();
    }

    public function listarTodos() {
        return $this->dao->listarTodos();
    }

    public function listarPorCategoria($id_categoria) {
        return $this->dao->listarPorCategoria($id_categoria);
    }

    public function criar($dados) {
        $assunto = new Models\Assunto(null, $dados['id_categoria'], $dados['nome_assunto']);
        return $this->dao->criar($assunto);
    }
}
