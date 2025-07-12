// src/components/QuestionToolbar.js
import { Link } from 'react-router-dom';

function QuestionToolbar() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-2 border-b">
      <div className="flex gap-3 items-center">
        <Link to="/ask" className="bg-green-600 text-white px-4 py-2 rounded">Ask New Question</Link>
        <select className="border p-2 rounded">
          <option>Newest First</option>
          <option>Most Answered</option>
        </select>
       
      </div>
      <input
        type="text"
        placeholder="Search questions..."
        className="border p-2 rounded w-full sm:w-1/3"
      />
    </div>
  );
}

export default QuestionToolbar;
