const User = require('../models/user');




class UsersService {

  static add(newUser) {

    var timestamp = new Date().getTime();//pega a data e hora.
    var data = new Date(timestamp);     //formata a data e hora.

    return new Promise((resolve) => {
      
      newUser.creationDate = newUser.creationDate || data.toUTCString(), //seta a data de criação.
      newUser.modifiedDate = newUser.modifiedDate || data.toUTCString()  //seta a data de modifiação para a mesma da criação.
      
      resolve(new User(newUser).save());
    });
  }

  static getAll() {
    
    return new Promise((resolve) => {
      resolve(User.find());
    });
  }

  static getById(id) {
    return new Promise((resolve) => {
      resolve(User.findById(id));
    });
  }

  static update(userId, updatedUser) {

    var timestamp_up = new Date().getTime();   //pega a data e hora.
    var data_up = new Date(timestamp_up);     //formata a data e hora.

    return new Promise(async (resolve) => {
      
      User.findById(userId)
      .then(user => {
      user.name = updatedUser.name || user.name;
      user.role = updatedUser.role || user.role;
      user.creationDate = user.creationDate;    // forma de manter o create date sem que usario altere mesmo tentando.
      user.modifiedDate = data_up.toUTCString();// atualiza a data.
      resolve(user.save());
      })
      
    });
  }

  
  static delete(userId) {
    return new Promise((resolve) => {
      resolve(User.findByIdAndRemove(userId));
    });
  }
}

module.exports = UsersService;