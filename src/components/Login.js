import React, { useState } from 'react';
import axios from "axios"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const Login = () => {
  const [user, setUser] = useState({
    "email": "",
    "password": ""
  })
  const history = new useHistory();
  const [isError, setError] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };
  const LoginAuth = async () => {
    try {
      const { data } = await axios.post('http://localhost:3000/user/login', user);
      if (data.statusCode != 200) {
        setError(true);
      } else {
        history.push('/home')
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <div className="flex justify-center mt-20">
      <div className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full  px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
              Email
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="email" type="mail" placeholder="xxx@gmail.com" name='email' onChange={handleChange} />
            <p className="text-red-500 text-xs italic">Please fill out this field.</p>
          </div>
        </div>


        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="password" type="password" placeholder="**************" name='password' onChange={handleChange} />
          </div>
        </div>
        <div className='flex justify-center'>
          {isError ? <><p className="text-red-600 text-xs italic">Credentials error !!!</p></> : null}

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-4">
            <button class=" w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={LoginAuth}>
              Save
            </button>

          </div>
          <p className="text-gray-700 text-sm mt-4">
            Don't have an account?{' '}
            <a className="text-blue-500 hover:underline cursor-pointer" href="/signup">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>

  );
}
export default Login;
