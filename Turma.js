class Turma {
    #professor;
    #curso;
    #alunos;
  
    constructor(professor, curso) {
      this.#professor = professor;
      this.#curso = curso;
      this.#alunos = [];
    }
  
    getProfessor() {
      return this.#professor;
    }
  
    setProfessor(professor) {
      this.#professor = professor;
    }
  
    getCurso() {
      return this.#curso;
    }
  
    setCurso(curso) {
      this.#curso = curso;
    }
  
    getAlunos() {
      return this.#alunos;
    }
  
    adicionarAluno(aluno) {
      this.#alunos.push(aluno);
    }
  }