const express = require('express');
const router = express.Router();
const { askQuestion, getAllQuestions, getSingleQuestion } = require('../controllers/questionController');
const protect = require('../middleware/authMiddleware');

router.post('/ask', protect, askQuestion);
router.get('/', getAllQuestions);
router.get('/:id', getSingleQuestion);


module.exports = router;