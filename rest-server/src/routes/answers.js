const express = require('express');
const router = express.Router();

const AnswersService = require('../services/AnswersService');
const checkAuth = require('../middleware/check-auth');
const notFound = require('../middleware/not-found');

router.post('/', checkAuth, async (request, response) => {
  const answers = await AnswersService.add(request.body);
  response
    .status(201)
    .json(answers);
});

router.get('/', checkAuth, async (request, response) => {
  const answers = await AnswersService.getAll();
  answers && answers.length
    ? response.json(answers)
    : response.status(204).end();
});

router.get('/:answersId', async (request, response) => {
  const answers = await AnswersService.getById(request.params.answersId);
  answers
    ? response.json(answers)
    : notFound(request, response);
});

router.patch('/:answersId', async (request, response) => {
  const updatedAnswer = await AnswersService.update(
    request.params.answersId,
    request.body
  );
  updatedAnswer
    ? response.json(updatedAnswer)
    : notFound(request, response);
});

router.delete('/:answersId', async (request, response) => {
  const isDeleted = await AnswersService.delete(request.params.answersId);
  isDeleted
    ? response.end()
    : notFound(request, response)
});

module.exports = router;