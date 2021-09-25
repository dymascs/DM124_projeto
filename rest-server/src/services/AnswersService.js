const Answer = require('../models/answer');




class AnswersService {

  static add(newAnswer) {

    var timestamp = new Date().getTime();//pega a data e hora.
    var data = new Date(timestamp);      //formata a data e hora.

    return new Promise((resolve) => { 
       
      newAnswer.creationDate = newAnswer.creationDate || data.toUTCString(); //seta a data de criação.
      newAnswer.modifiedDate = newAnswer.modifiedDate || data.toUTCString(); //seta a data de modifiação para a mesma da criação.      
      resolve(new Answer(newAnswer).save());
    });
  }

  static getAll() {
    return new Promise((resolve) => {
      resolve(Answer.find());
    });
  }

  static getById(id) {
    return new Promise((resolve) => {
      resolve(Answer.findById(id));
    });
  }

  static update(answerId, updatedAnswer) {

    var timestamp_up = new Date().getTime(); //pega a data e hora.
    var data_up = new Date(timestamp_up);    //formata a data e hora.

    return new Promise(async (resolve) => {
      
      Answer.findById(answerId)
        .then(answer => { 
        answer.key = updatedAnswer.key || answer.key;
        answer.name = updatedAnswer.name || answer.name;
        answer.questionId = updatedAnswer.questionId || answer.questionId;
        answer.answer = updatedAnswer.answer || answer.answer;
        answer.creationDate = answer.creationDate; // forma de manter o create date sem que usario altere mesmo tentando.
        answer.modifiedDate = data_up.toUTCString(); // atualiza a data.
        resolve(answer.save());
      })
    });
  }

  
  static delete(answerId) {
    return new Promise((resolve) => {
      resolve(Answer.findByIdAndRemove(answerId));
    });
  }
}

module.exports = AnswersService;