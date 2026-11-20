class Interface{

  constructor(){
  
  }
  static salvarTurma() {
    let professor = document.getElementById('professor').value;
    let curso = document.getElementById('curso').value;
    let t1 = new Turma(professor, curso);
    alert('turma cadastrada');
    return t1;
  }
  static salvar(turmas) {
    let indiceTurma = document.getElementById('select-turma').value;
    if (turmas.length === 0 || indiceTurma === '') {
      alert('Cadastre uma turma primeiro.');
      return;
    }
    let turmaSelecionada = turmas[indiceTurma];
    let nome = document.getElementById('nome').value;
    let n1 = Number(document.getElementById('n1').value);
    let n2 = Number(document.getElementById('n2').value);
    let n3 = Number(document.getElementById('n3').value);
    let a1 = new Aluno(nome, n1, n2, n3, turmaSelecionada);
    let m = a1.gerarMedia(n1, n2, n3);
    a1.gerarEstado(m);
    turmaSelecionada.adicionarAluno(a1);
    //turma[turma.length] = a1;
    alert('aluno cadastrado');
    return a1;
  }
  static listar(turmas) {
    const btnTurma = document.getElementById('btn-turma');
    const tabTurma = document.getElementById('tab-turma');
    const btnCadastrar = document.getElementById('btn-cadastrar');
    const tabCadastrar = document.getElementById('tab-cadastrar');
    const btnListar = document.getElementById('btn-listar');
    const tabListar = document.getElementById('tab-listar');
  
    btnListar.classList.add('active');
    btnCadastrar.classList.remove('active');
    btnTurma.classList.remove('active');
  
    // Ajusta o conteúdo visível
    tabListar.classList.add('active');
    tabCadastrar.classList.remove('active');
    tabTurma.classList.remove('active');

    const selectListar = document.getElementById('select-turma-listar');
    const indiceSelecionado = selectListar.value;

    selectListar.innerHTML = '';
    for (let i = 0; i < turmas.length; i++) {
      selectListar.innerHTML += '<option value="' + i + '">' + turmas[i].getCurso() + ' - Prof. ' + turmas[i].getProfessor() + '</option>';
    }

    if (turmas.length === 0) {
      document.getElementById('alunos').innerHTML = '<li>Nenhuma turma cadastrada ainda.</li>';
      return;
    }

    const indice = indiceSelecionado !== '' && turmas[indiceSelecionado] ? indiceSelecionado : 0;
    selectListar.value = indice;
    const turma = turmas[indice].getAlunos();

    let lista = '<table>';
    lista += '<tr><th>Nome</th> <th>Nota 1</th> <th>Nota 2</th> <th>Nota 3</th> <th>Media</th> <th>Situação</th> <th>Ações</th></tr>';
    for (let i = 0; i < turma.length; i++) {
      lista =
        lista +
        "<tr id='linha-aluno-" + i + "'>"+
        "<td>"+turma[i].getNome() +"</td>"+
        "<td id='celula-n1-" + i + "'>"+turma[i].getNota1().toFixed(2) +"</td>"+
        "<td id='celula-n2-" + i + "'>"+turma[i].getNota2().toFixed(2) +"</td>"+
        "<td id='celula-n3-" + i + "'>"+turma[i].getNota3().toFixed(2) +"</td>"+
        "<td>"+turma[i].media.toFixed(2) +"</td>"+
        "<td>"+turma[i].estado +"</td>"+
        "<td id='celula-acao-" + i + "'><button onclick='editarNotas(" + indice + ", " + i + ")'>Editar</button></td>"+
        "</tr>";
    }
    lista += "</table>"
    document.getElementById('alunos').innerHTML = lista;
  }

  static habilitarEdicao(turmas, indiceTurma, indiceAluno) {
    const aluno = turmas[indiceTurma].getAlunos()[indiceAluno];
    document.getElementById('celula-n1-' + indiceAluno).innerHTML = "<input id='edit-n1-" + indiceAluno + "' type='number' step='0.1' value='" + aluno.getNota1() + "' style='width: 60px;' />";
    document.getElementById('celula-n2-' + indiceAluno).innerHTML = "<input id='edit-n2-" + indiceAluno + "' type='number' step='0.1' value='" + aluno.getNota2() + "' style='width: 60px;' />";
    document.getElementById('celula-n3-' + indiceAluno).innerHTML = "<input id='edit-n3-" + indiceAluno + "' type='number' step='0.1' value='" + aluno.getNota3() + "' style='width: 60px;' />";
    document.getElementById('celula-acao-' + indiceAluno).innerHTML = "<button onclick='salvarEdicaoNotas(" + indiceTurma + ", " + indiceAluno + ")'>Salvar</button>";
  }

  static salvarEdicao(turmas, indiceTurma, indiceAluno) {
    const aluno = turmas[indiceTurma].getAlunos()[indiceAluno];
    const n1 = Number(document.getElementById('edit-n1-' + indiceAluno).value);
    const n2 = Number(document.getElementById('edit-n2-' + indiceAluno).value);
    const n3 = Number(document.getElementById('edit-n3-' + indiceAluno).value);

    aluno.setNota1(n1);
    aluno.setNota2(n2);
    aluno.setNota3(n3);

    const m = aluno.gerarMedia(n1, n2, n3);
    aluno.gerarEstado(m);

    this.listar(turmas);
  }
  
  static cadastrar(turmas) {
    if (turmas.length === 0) {
      alert('É necessário cadastrar uma turma antes de cadastrar alunos.');
      return;
    }

    const btnTurma = document.getElementById('btn-turma');
    const tabTurma = document.getElementById('tab-turma');
    const btnCadastrar = document.getElementById('btn-cadastrar');
    const tabCadastrar = document.getElementById('tab-cadastrar');
    const btnListar = document.getElementById('btn-listar');
    const tabListar = document.getElementById('tab-listar');
  
    btnListar.classList.remove('active');
    btnTurma.classList.remove('active');
    btnCadastrar.classList.add('active');
  
    // Ajusta o conteúdo visível
    tabListar.classList.remove('active');
    tabTurma.classList.remove('active');
    tabCadastrar.classList.add('active');

    const selectTurma = document.getElementById('select-turma');
    selectTurma.innerHTML = '';
    for (let i = 0; i < turmas.length; i++) {
      selectTurma.innerHTML += '<option value="' + i + '">' + turmas[i].getCurso() + ' - Prof. ' + turmas[i].getProfessor() + '</option>';
    }
    //document.getElementById("media").innerHTML = m;
  }

  static cadastrarTurma() {
    const btnTurma = document.getElementById('btn-turma');
    const tabTurma = document.getElementById('tab-turma');
    const btnCadastrar = document.getElementById('btn-cadastrar');
    const tabCadastrar = document.getElementById('tab-cadastrar');
    const btnListar = document.getElementById('btn-listar');
    const tabListar = document.getElementById('tab-listar');
  
    btnListar.classList.remove('active');
    btnCadastrar.classList.remove('active');
    btnTurma.classList.add('active');
  
    // Ajusta o conteúdo visível
    tabListar.classList.remove('active');
    tabCadastrar.classList.remove('active');
    tabTurma.classList.add('active');
  }
  }//fim da classe