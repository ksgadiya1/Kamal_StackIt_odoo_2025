const Answer = require('../models/Answer');
const Question = require('../models/Question');

// Post answer
exports.postAnswer = async (req, res) => {
  const { questionId, content } = req.body;

  try {
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    const answer = await Answer.create({
      question: questionId,
      content,
      author: req.user.id,
    });

    res.status(201).json(answer);
  } catch (err) {
    res.status(500).json({ message: 'Server error while posting answer' });
  }
};

// Get answers of a question
exports.getAnswers = async (req, res) => {
  const { questionId } = req.params;
  try {
    const answers = await Answer.find({ question: questionId })
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(answers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching answers' });
  }
};
