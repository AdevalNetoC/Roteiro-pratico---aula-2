const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const questoes = [
  "Questão 1: Descreva o conceito de algoritmos.",
  "Questão 2: Explique a diferença entre compiladores e interpretadores.",
  "Questão 3: O que é complexidade de tempo em algoritmos?",
  "Questão 4: Explique o conceito de recursão.",
  "Questão 5: O que são estruturas de dados?",
];

function atribuirQuestoesAleatorias(estudantes) {
  return estudantes.map(estudante => {
    const questoesDisponiveis = [...questoes];
    const randomIndex = Math.floor(Math.random() * questoesDisponiveis.length);
    const questaoSelecionada = questoesDisponiveis.splice(randomIndex, 1)[0];

    return {
      nome: estudante,
      questao: questaoSelecionada  
    };
  });
}

const estudantes = [];


fs.createReadStream('Estudante.csv')
  .pipe(csv())
  .on('data', (row) => {
    estudantes.push(row.Nome);  
  })
  .on('end', () => {
    const estudantesComQuestoes = atribuirQuestoesAleatorias(estudantes);
    salvarResultados(estudantesComQuestoes);  
    console.log('Sorteio de questões completo e resultados salvos!');
  });


function salvarResultados(estudantesComQuestoes) {
  const csvWriter = createCsvWriter({
    path: 'estudantes_com_questoes.csv',
    header: [
      { id: 'nome', title: 'Nome' },
      { id: 'questao', title: 'Questão' }
    ]
  });

  csvWriter.writeRecords(estudantesComQuestoes)
    .then(() => {
      console.log('Arquivo CSV com as questões atribuídas foi salvo.');
    });
}
