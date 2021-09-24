const checkAuth = (request, response, next) => {
  const token_1 = request.headers.authorization;

  var token = require('basic-auth-token');
  
  //token("dm124", "notW34kP@ss");
  //console.log("Basic "+token("dm124", "notW34kP@ss"));
  //console.log(token_1);


  if(("Basic "+token("dm124", "notW34kP@ss"))==(token_1)) {
    next();
  } else {
    const HttpStatusNotAuthorized = 401;
    const errorInfo = {
      status: HttpStatusNotAuthorized,
      message: 'Not authorized'
    };

    response
      .status(HttpStatusNotAuthorized)
      .json(errorInfo);
  }
}

module.exports = checkAuth;