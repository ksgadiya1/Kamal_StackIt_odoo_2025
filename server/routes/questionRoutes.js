const express = require('express');
const router = express.Router();
const { askQuestion, getAllQuestions } = require('../controllers/questionController');
const protect = require('../middleware/authMiddleware');

router.post('/ask', protect, askQuestion);
router.get('/', getAllQuestions);

module.exports = router;
