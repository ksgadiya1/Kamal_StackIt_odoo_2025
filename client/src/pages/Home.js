import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import QuestionToolbar from '../components/QuestionToolbar';
import { Link } from 'react-router-dom';

function Home() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/questions');
        setQuestions(res.data);
      } catch (err) {
        console.error("❌ Axios Error:", err);  // 👈 Add this
        setError('Failed to load questions');   // 👈 Custom error
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Header />
      <QuestionToolbar />
      <h2>📋 All Questions</h2>

      {loading ? (
        <p>Loading questions...</p>
      ) : questions.length === 0 ? (
        <p>No questions available yet.</p>
      ) : (
        questions.map((q) => (
          <div
            key={q._id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '15px',
              marginBottom: '10px',
              boxShadow: '2px 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ margin: '0 0 5px' }}>{q.title}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: q.description.slice(0, 150) + '...',
              }}
            />
            <p>
              <strong>Tags:</strong> {q.tags?.join(', ')}
            </p>
            <Link
              to={`/questions/${q._id}`}
              style={{
                display: 'inline-block',
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#4CAF50',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
              }}
            >
              Answer this question
            </Link>

          </div>
        ))
      )}
    </div>
  );
}

export default Home;
