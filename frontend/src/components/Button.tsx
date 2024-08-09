
export const Button = () => {
  return (
    <div className="flex items-center justify-center h-screen dark:bg-gray-800">
      <div>
        <div className="flex justify-center">
          <h1 className="block mb-2 text-2xl font-medium text-gray-900 text-slate-300 pb-6">
            Login in to upload{' '}
          </h1>
        </div>
        <button
          className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 bg-slate-100"
          onClick={async () => {
            window.open('http://localhost:3000/api/auth/google', '_self');
          }}
        >
          <img
            className="w-20 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />

          <span>Login with Google</span>
        </button>
      </div>
    </div>
  );
};
