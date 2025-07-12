const express = require('express');
const router = express.Router();
const { postAnswer, getAnswers } = require('../controllers/answerController');
const protect = require('../middleware/authMiddleware');

router.post('/post', protect, postAnswer);
router.get('/:questionId', getAnswers);

module.exports = router;
