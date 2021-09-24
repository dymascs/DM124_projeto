const db = {}
let sequence = 0;

// Pegar do horário atual
//var timestamp = new Date().getTime();
//var data = new Date(timestamp);


class QuestionsService {

  static add(newQuestion) {

    var timestamp = new Date().getTime();//pega a data e hora.
    var data = new Date(timestamp);      //formata a data e hora.

    return new Promise((resolve) => {
      const question = {
        id: ++sequence,
        status: newQuestion.status || 'new',
        description: newQuestion.description,
        options: newQuestion.options,
        creationDate: newQuestion.creationDate || data.toUTCString(), //seta a data de criação.
        modifiedDate: newQuestion.modifiedDate || data.toUTCString()  //seta a data de modifiação para a mesma da criação.
      };
      db[question.id] = question;
      resolve(question);
    });
  }

  static getAll() {
    const toArray = key => db[key];
    return new Promise((resolve) => {
      const questions = Object.keys(db).map(toArray);
      resolve(questions);
    });
  }

  static getById(id) {
    return new Promise((resolve) => {
      resolve(db[id]);
    });
  }

  static update(questionId, updatedQuestion) {

    var timestamp_up = new Date().getTime();   //pega a data.
    var data_up = new Date(timestamp_up);     //formata a data.

    return new Promise(async (resolve) => {
      const question = await QuestionsService.getById(questionId);
      if(question) {
        const hasValue = updatedQuestion.status != null;
        question.status = hasValue ? updatedQuestion.status : question.status;
        question.description = updatedQuestion.description || question.description;
        question.options = updatedQuestion.options || question.options;
        question.creationDate = question.creationDate;    // forma de manter o create date sem que usario altere mesmo tentando.
        question.modifiedDate = data_up.toUTCString();    // atualiza a data.
        resolve(question);
      }
      resolve(null);
    })
  }

  static delete(id) {
    return new Promise((resolve) => {
      const question = db[id];
      if(question) {
        delete db[id];
        resolve(true);
      }
      resolve(false);
    });
  }
}

module.exports = QuestionsService;