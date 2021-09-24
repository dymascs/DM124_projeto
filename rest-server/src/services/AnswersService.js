const db = {}
let sequence = 0;



class AnswersService {

  static add(newAnswer) {

    var timestamp = new Date().getTime();//pega a data e hora.
    var data = new Date(timestamp);      //formata a data e hora.

    return new Promise((resolve) => {
      const answer = {
        id: ++sequence,
        key: newAnswer.key,
        name: newAnswer.name,
        answer: newAnswer.answer,
        questionId: newAnswer.questionId,
        creationDate: newAnswer.creationDate || data.toUTCString(), //seta a data de criação.
        modifiedDate: newAnswer.modifiedDate || data.toUTCString() //seta a data de modifiação para a mesma da criação.
      };
      db[answer.id] = answer;
      resolve(answer);
    });
  }

  static getAll() {
    const toArray = key => db[key];
    return new Promise((resolve) => {
      const answers = Object.keys(db).map(toArray);
      resolve(answers);
    });
  }

  static getById(id) {
    return new Promise((resolve) => {
      resolve(db[id]);
    });
  }

  static update(answerId, updatedAnswer) {

    var timestamp_up = new Date().getTime(); //pega a data e hora.
    var data_up = new Date(timestamp_up);    //formata a data e hora.

    return new Promise(async (resolve) => {
      const answer = await AnswersService.getById(answerId);
      if(answer) {
        
        answer.key = updatedAnswer.key || answer.key;
        answer.name = updatedAnswer.name || answer.name;
        answer.questionId = updatedAnswer.questionId || answer.questionId;
        answer.answer = updatedAnswer.answer || answer.answer;
        answer.creationDate = answer.creationDate; // forma de manter o create date sem que usario altere mesmo tentando.
        answer.modifiedDate = data_up.toUTCString(); // atualiza a data.
        resolve(answer);
      }
      resolve(null);
    })
  }

  static delete(id) {
    return new Promise((resolve) => {
      const answer = db[id];
      if(answer) {
        delete db[id];
        resolve(true);
      }
      resolve(false);
    });
  }
}

module.exports = AnswersService;