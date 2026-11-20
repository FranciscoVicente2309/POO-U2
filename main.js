let turmas = [];

function listarAluno(){
  Interface.listar(turmas);
}

function btnSalvar(){
  Interface.salvar(turmas);
}

function btnSalvarTurma(){
  let t = Interface.salvarTurma();
  turmas.push(t);
}

function cadastroAluno(){
  Interface.cadastrar(turmas);
}

function cadastroTurma(){
  Interface.cadastrarTurma();
}

function editarNotas(indiceTurma, indiceAluno){
  Interface.habilitarEdicao(turmas, indiceTurma, indiceAluno);
}

function salvarEdicaoNotas(indiceTurma, indiceAluno){
  Interface.salvarEdicao(turmas, indiceTurma, indiceAluno);
}