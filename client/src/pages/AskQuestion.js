import { useState } from 'react';
import ReactQuill from 'react-quill';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';

function AskQuestion() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);

  const handleTagChange = (selectedOptions) => {
    setTags(selectedOptions || []);
  };

  const handleSubmit = async (e) => {
 

    e.preventDefault();
    
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/questions/ask',
        {
          title,
          description,
          tags: tags.map(tag => tag.value)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert("Question posted successfully!");
      console.log(res.data);
    } catch (error) {
      console.error("❌ Error posting question:", error);
      alert("Failed to post question");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ask a Question</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />

        <ReactQuill
          value={description}
          onChange={setDescription}
          placeholder="Describe your question..."
          style={{ height: '200px', marginBottom: '10px' }}
        />

        <CreatableSelect
          isMulti
          onChange={handleTagChange}
          value={tags}
          placeholder="Enter or select tags"
        />

        <button type="submit" style={{ marginTop: '10px' }}>Post Question</button>
      </form>
    </div>
  );
}

export default AskQuestion;
