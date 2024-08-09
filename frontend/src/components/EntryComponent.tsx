import { MouseEventHandler } from "react";

export const EntryComponent = ({
  title,
  buttonTitle,
  onClick,
}: {
  title: string;
  buttonTitle: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="w-4/12 h-96 bg-slate-200 border rounded-xl shadow-lg p-10">
      <div className="flex flex-col justify-center h-full">
        <div className="flex justify-center">
          <div>
            <h1 className="text-3xl font-extrabold">{title}</h1>
            <div className="flex justify-center">
              <button
                className="bg-black rounded-md px-5 py-3 mt-10 text-sm font-md text-slate-300"
                onClick={onClick}
              >
                {buttonTitle}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};