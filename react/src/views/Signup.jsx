import {useState} from "react";
import {Link} from "react-router-dom";
import axiosClient from "../axios"
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Signup() {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState({__html: ''});
  const {setCurrentUser, setUserToken} = useStateContext();

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({__html: ''})

    axiosClient.post('/signup', {
      name: fullName,
      email,
      password,
      password_confirmation: passwordConfirmation
    })
      .then(({data}) => {
        setCurrentUser(data.user)
        setUserToken(data.token)
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], []);
          console.log(finalErrors);
          setError({ __html: finalErrors.join('<br>') });
        }
      });

  }

  return (
    <>
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Sign up to your account
      </h2>


      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error.__html && (
          <div className={"bg-red-500 rounded py-2 px-3 mb-3 text-white"} dangerouslySetInnerHTML={error}></div>)}
        <form onSubmit={onSubmit} action="#" method="POST" className="space-y-6">
          <div>
            <label
              htmlFor="full-name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="full-name"
                name="name"
                type="text"
                required
                value={fullName}
                onChange={ev => setFullName(ev.target.value)}
                autoComplete="name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                placeholder="Full Name"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={ev => setEmail(ev.target.value)}
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                placeholder="Email"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={ev => setPassword(ev.target.value)}
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password-confirmation"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password Confirmation
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password-confirmation"
                name="password_confirmation"
                type="password"
                required
                value={passwordConfirmation}
                onChange={ev => setPasswordConfirmation(ev.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already a member?{" "}
          <Link
            to="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Login with your account
          </Link>
        </p>
      </div>
    </>
  );
}
