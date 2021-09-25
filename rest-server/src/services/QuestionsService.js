const Question = require('../models/question');





class QuestionsService {

  static add(newQuestion) {

    var timestamp = new Date().getTime();//pega a data e hora.
    var data = new Date(timestamp);      //formata a data e hora.

    return new Promise((resolve) => {
      newQuestion.status = newQuestion.status || 'new';
      newQuestion.creationDate = newQuestion.creationDate || data.toUTCString(), //seta a data de criação.
      newQuestion.modifiedDate = newQuestion.modifiedDate || data.toUTCString()  //seta a data de modifiação para a mesma da criação.
      
      
      resolve(new Question(newQuestion).save());
    });
  }

  static getAll() {
    return new Promise((resolve) => {
      resolve(Question.find());
    });
  }

  static getById(id) {
    return new Promise((resolve) => {
      resolve(Question.findById(id));
    });
  }

  static update(questionId, updatedQuestion) {

    var timestamp_up = new Date().getTime();   //pega a data.
    var data_up = new Date(timestamp_up);     //formata a data.

    return new Promise(async (resolve) => {
      Question.findById(questionId)
        .then(question => {
        question.status = updatedQuestion.status || question.status;
        question.description = updatedQuestion.description || question.description;
        question.options = updatedQuestion.options || question.options;
        question.creationDate = question.creationDate;    // forma de manter o create date sem que usario altere mesmo tentando.
        question.modifiedDate = data_up.toUTCString();    // atualiza a data.
        resolve(question.save());
      })
    });
  }

  static delete(questionId) {
    return new Promise((resolve) => {
      resolve(Question.findByIdAndRemove(questionId));
    });
  }
}

module.exports = QuestionsService;