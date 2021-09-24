const db = {}
let sequence = 0;

// Pegar do horário atual
//var timestamp = new Date().getTime();
//var data = new Date(timestamp);


class AnswersService {

  static add(newAnswer) {

    var timestamp = new Date().getTime();
    var data = new Date(timestamp);

    return new Promise((resolve) => {
      const answer = {
        id: ++sequence,
        key: newAnswer.key,
        name: newAnswer.name,
        answer: newAnswer.answer,
        questionId: newAnswer.questionId,
        creationDate: newAnswer.creationDate || data.toUTCString(),
        modifiedDate: newAnswer.modifiedDate || data.toUTCString()
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

    var timestamp_up = new Date().getTime();
    var data_up = new Date(timestamp_up);

    return new Promise(async (resolve) => {
      const answer = await AnswersService.getById(answerId);
      if(answer) {
        const hasValue = updatedAnswer.status != null;
        answer.key = updatedAnswer.key || answer.key;
        answer.name = updatedAnswer.name || answer.name;
        answer.questionId = updatedAnswer.questionId || answer.questionId;
        answer.answer = updatedAnswer.answer || answer.answer;
        answer.creationDate = answer.creationDate;
        answer.modifiedDate = data_up.toUTCString();
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