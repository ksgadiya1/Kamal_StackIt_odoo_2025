const Question = require('../models/Question');

exports.askQuestion = async (req, res) => {
  const { title, description, tags } = req.body;

  try {
    const newQuestion = await Question.create({
      title,
      description,
      tags,
      author: req.user.id
    });

    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(500).json({ message: 'Failed to post question' });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate('askedBy', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json(questions);
  } catch (err) {
    console.error("❌ Error in getAllQuestions:", err.message);
    res.status(500).json({ message: 'Failed to load questions' });
  }
};

exports.getSingleQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate('askedBy', 'username');
    if (!question) return res.status(404).json({ message: 'Question not found' });

    res.status(200).json(question);
  } catch (err) {
    console.error("❌ Error fetching single question:", err.message);
    res.status(500).json({ message: 'Error loading question' });
  }
};
