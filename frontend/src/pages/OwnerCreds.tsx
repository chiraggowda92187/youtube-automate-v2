import { useState } from "react";
import { Button } from "../components/Button";
import axios from "axios";

export const OwnerCredsPage = () => {
    const [email, setEmail] = useState("")
  return (
    <div className="bg-slate-950 h-screen">
      <div className="flex flex-col justify-center h-full">
        <div className="w-4/12 mx-auto">
          <div className="flex justify-center items-center">
            <div className="">
              <div className="block mb-2 text-lg font-lg text-gray-900 text-slate-300 flex justify-center">
                Authorize the app layer by clicking the button below
              </div>
              {/* <input
              type="text"
              id="small-input"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email here..."
            /> */}
              <div className="flex justify-center">
                <button
                  className="px-4 py-1 mt-6 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150 bg-slate-100 "
                  onClick={async () => {
                    //   const res = await axios.get("http://localhost:3000/api/auth/owner/google", {
                    //     data : {
                    //         ownerEmail : email
                    //     },
                    //     headers : {
                    //         "Content-Type" : "application/json",
                    //         "Content-Length" : email.length
                    //     },
                    //     timeout : 5000,
                    //   })
                    //   if(res.status===200){
                    //     alert("authorized the layer successfully..!")
                    //   }
                    //   else{
                    //     alert("Error while authorizing...!")
                    //   }
                    window.open(
                      'http://localhost:3000/api/auth/owner/google',
                      '_self'
                    );
                  }}
                >
                  <img
                    className="w-12 h-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />

                  <span>Authorize the platform layer</span>
                </button>
              </div>
              <div className="flex justify-center py-6 text-sm font-sm text-slate-400">
                💡 Note : If you are not the owner and still try to authorize the
                platform with your google account, it would appear as if you are authorizing 
                the app by giving all the consent but an additional check is implemented 
                which will immeaditely revoke the access, access token and no token would be stored.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
