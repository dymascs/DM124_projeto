const db = {}
let sequence = 0;




class UsersService {

  static add(newUser) {

    var timestamp = new Date().getTime();//pega a data e hora.
    var data = new Date(timestamp);     //formata a data e hora.

    return new Promise((resolve) => {
      const user = {
        id: ++sequence,
        name: newUser.name,
        role: newUser.role,
        creationDate: newUser.creationDate || data.toUTCString(), //seta a data de criação.
        modifiedDate: newUser.modifiedDate || data.toUTCString()  //seta a data de modifiação para a mesma da criação.
      };
      db[user.id] = user;
      resolve(user);
    });
  }

  static getAll() {
    const toArray = key => db[key];
    return new Promise((resolve) => {
      const users = Object.keys(db).map(toArray);
      resolve(users);
    });
  }

  static getById(id) {
    return new Promise((resolve) => {
      resolve(db[id]);
    });
  }

  static update(userId, updatedUser) {

    var timestamp_up = new Date().getTime();   //pega a data e hora.
    var data_up = new Date(timestamp_up);     //formata a data e hora.

    return new Promise(async (resolve) => {
      const user = await UsersService.getById(userId);
      if(user) {
        user.name = updatedUser.name || user.name;
        user.role = updatedUser.role || user.role;
        user.creationDate = user.creationDate;    // forma de manter o create date sem que usario altere mesmo tentando.
        user.modifiedDate = data_up.toUTCString();// atualiza a data.
        resolve(user);
      }
      resolve(null);
    })
  }

  static delete(id) {
    return new Promise((resolve) => {
      const user = db[id];
      if(user) {
        delete db[id];
        resolve(true);
      }
      resolve(false);
    });
  }
}

module.exports = UsersService;