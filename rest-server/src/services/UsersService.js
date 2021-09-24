const db = {}
let sequence = 0;

// Pegar do horário atual
//var timestamp = new Date().getTime();
//var data = new Date(timestamp);


class UsersService {

  static add(newUser) {

    var timestamp = new Date().getTime();
    var data = new Date(timestamp);

    return new Promise((resolve) => {
      const user = {
        id: ++sequence,
        name: newUser.name,
        role: newUser.role,
        creationDate: newUser.creationDate || data.toUTCString(),
        modifiedDate: newUser.modifiedDate || data.toUTCString()
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

    var timestamp_up = new Date().getTime();
    var data_up = new Date(timestamp_up);

    return new Promise(async (resolve) => {
      const user = await UsersService.getById(userId);
      if(user) {
        user.name = updatedUser.name || user.name;
        user.role = updatedUser.role || user.role;
        user.creationDate = user.creationDate;
        user.modifiedDate = data_up.toUTCString();
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