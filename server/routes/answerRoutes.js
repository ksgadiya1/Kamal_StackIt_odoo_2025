const express = require('express');
const router = express.Router();
const { postAnswer, getAnswers } = require('../controllers/answerController');
const protect = require('../middleware/authMiddleware');

// Route to POST an answer
router.post('/:questionId', protect, postAnswer);

// Route to GET answers for a question
router.get('/:questionId', getAnswers);

module.exports = router;
