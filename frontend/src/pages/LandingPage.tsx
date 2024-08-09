import { useNavigate } from "react-router-dom";
import { EntryComponent } from "../components/EntryComponent";

export const LandingPage = ()=>{
  const navigate = useNavigate()
    return (
      <div className="flex flex-col justify-center h-screen w-full bg-slate-950">
        <div className="flex justify-center w-full ">
          <div className="w-full">
            <div className="flex justify-center">
              <EntryComponent
                title={'Click below if you are the owner'}
                buttonTitle={'Click here to sign in'}
                onClick={() => {
                  navigate('/ownercreds');
                }}
              />
            </div>
            <div className="flex justify-center mt-7">
              <EntryComponent
                title={'Click below if you are one of the editor'}
                buttonTitle={'Click here to sign in'}
                onClick={() => {
                  navigate('/login');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
}