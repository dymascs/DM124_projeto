const express = require('express');
const router = express.Router();

const UsersService = require('../services/UsersService');
const checkAuth = require('../middleware/check-auth');
const notFound = require('../middleware/not-found');

router.post('/', checkAuth, async (request, response) => {
  const users = await UsersService.add(request.body);
  response
    .status(201)
    .json(users);
});

router.get('/', checkAuth, async (request, response) => {
  const users = await UsersService.getAll();
  users && users.length
    ? response.json(users)
    : response.status(204).end();
});

router.get('/:usersId', async (request, response) => {
  const users = await UsersService.getById(request.params.usersId);
  users
    ? response.json(users)
    : notFound(request, response);
});

router.patch('/:usersId', async (request, response) => {
  const updatedUser = await UsersService.update(
    request.params.usersId,
    request.body
  );
  updatedUser
    ? response.json(updatedUser)
    : notFound(request, response);
});

router.delete('/:usersId', async (request, response) => {
  const isDeleted = await UsersService.delete(request.params.usersId);
  isDeleted
    ? response.end()
    : notFound(request, response)
});

module.exports = router;