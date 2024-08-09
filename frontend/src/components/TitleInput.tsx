export const TitleInput = ({
  title,
  onChange,
}: {
  title : string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <div className="">
      <label
        htmlFor="small-input"
        className="block mb-2 text-sm font-medium text-gray-900 text-slate-300"
      >
        Title of the video
      </label>
      <input
        type="text"
        id="small-input"
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={onChange}
        placeholder="Write the video title here..."
      />
    </div>
  );
};
