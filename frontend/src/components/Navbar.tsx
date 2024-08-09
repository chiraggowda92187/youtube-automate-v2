import { useEffect } from "react"
import { useUserHook } from "../store/useUserHook"
import { useNavigate } from "react-router-dom"

export const Navbar = ()=>{
    const user = useUserHook()
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user){
            navigate("/login")
        }
    }, [user])
    return (
      <div className="bg-slate-950 w-full h-16">
        <div className="flex flex-col justify-center h-full">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold px-12 text-slate-100">
              Youtube Automate Layer
            </h1>

            <div className="flex px-16 flex-col justify-center h-full">
              <div className="flex">
                <div className="flex flex-col justify-center h-full px-6 text-slate-100">
                  {user?.name}
                </div>
                <div className=" text-slate-100">
                  {user?.profileUrl ? (
                    <img
                      src={user?.profileUrl}
                      alt=""
                      className="h-10 w-10 rounded-full"
                    />
                  ) : (
                    <div className=" text-slate-100">
                      {user?.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}