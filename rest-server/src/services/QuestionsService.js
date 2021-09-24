const db = {}
let sequence = 0;

// Pegar do horário atual
//var timestamp = new Date().getTime();
//var data = new Date(timestamp);


class QuestionsService {

  static add(newQuestion) {

    var timestamp = new Date().getTime();
    var data = new Date(timestamp);

    return new Promise((resolve) => {
      const question = {
        id: ++sequence,
        status: newQuestion.status || 'new',
        description: newQuestion.description,
        options: newQuestion.options,
        creationDate: newQuestion.creationDate || data.toUTCString(),
        modifiedDate: newQuestion.modifiedDate || data.toUTCString()
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

    var timestamp_up = new Date().getTime();
    var data_up = new Date(timestamp_up);

    return new Promise(async (resolve) => {
      const question = await QuestionsService.getById(questionId);
      if(question) {
        const hasValue = updatedQuestion.status != null;
        question.status = hasValue ? updatedQuestion.status : question.status;
        question.description = updatedQuestion.description || question.description;
        question.options = updatedQuestion.options || question.options;
        question.creationDate = question.creationDate;
        question.modifiedDate = data_up.toUTCString();
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