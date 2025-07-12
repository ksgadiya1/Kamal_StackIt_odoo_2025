import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function QuestionDetails() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answerText, setAnswerText] = useState('');
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/questions/${id}`);
        setQuestion(res.data.question);
        setAnswers(res.data.answers);
      } catch (err) {
        console.error("❌ Failed to fetch question details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        `http://localhost:5000/api/answers/${id}`,
        { text: answerText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setAnswers([res.data, ...answers]);
      setAnswerText('');
    } catch (err) {
      console.error("❌ Failed to post answer:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!question) return <p>Question not found.</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{question.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: question.description }} />
      <p><strong>Tags:</strong> {question.tags.join(', ')}</p>

      <hr />
      <h3>Submit Your Answer</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          rows="4"
          style={{ width: '100%', padding: '8px' }}
          required
        ></textarea>
        <button type="submit" style={{ marginTop: '10px' }}>Post Answer</button>
      </form>

      <hr />
      <h3>All Answers</h3>
      {answers.length === 0 ? (
        <p>No answers yet.</p>
      ) : (
        answers.map((ans) => (
          <div
            key={ans._id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '8px',
              marginBottom: '10px',
            }}
          >
            <p>{ans.text}</p>
            <small>Answered by: {ans.answeredBy?.username || 'Anonymous'}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default QuestionDetails;
