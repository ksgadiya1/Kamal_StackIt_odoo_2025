// src/components/Header.js
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white">
      <Link to="/" className="text-2xl font-bold text-blue-600">StackIt</Link>
      <Link to="/login" className="text-sm bg-red-600 text-white px-4 py-2 rounded">Login</Link>
    </header>
  );
}

export default Header;
