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
    const questions = await Question.find().populate('author', 'username').sort({ createdAt: -1 });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load questions' });
  }
};
