import { useState } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await axios.post('/api/admin/login', JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" }
        });

        localStorage.setItem('token', res.data.token);

        navigate('/admin');

        } catch (error) {
        console.log(error);
        setError('Incorrect username or password');
        }
  };

  return (
    <div>
      <h1 className='w-full text-5xl text-gray-900 text-center font-bold'>Login</h1>
      <p className='w-full text-center text-xl text-gray-800 mt-6'>
        Log in to prove that you are an administrator
      </p>
    <form className='w-1/3 m-auto mt-8 bg-gray-100 p-4 rounded flex justify-center flex-wrap' onSubmit={handleSubmit}>
      <div className="mt-3 w-full flex flex-wrap justify-center">
        <label htmlFor="username" className='w-2/3'>Username:</label>
        <input className='w-2/3 bg-transparent border-transparent border border-b-yellow-600' type="text" id="username" value={username} onChange={handleUsernameChange} />
      </div>
      <div className="mt-3 w-full flex flex-wrap justify-center">
        <label htmlFor="password" className='w-2/3'>Password:</label>
        <input className='w-2/3 bg-transparent border-transparent border border-b-yellow-600' type="password" id="password" value={password} onChange={handlePasswordChange} />
      </div>
      {error && <div className='w-full font-semibold text-red-500 text-center p-4'>{error}</div>}
      <button type="submit" className='w-1/3 rounded m-auto mt-5 border border-yellow-600 text-xl font-bold text-yellow-600 p-3 hover:text-gray-50 hover:bg-yellow-600 duration-200'>Log in</button>
    </form>
    </div>
  );
}

export default Login;
