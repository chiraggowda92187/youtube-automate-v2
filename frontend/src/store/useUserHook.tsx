import { useRecoilState } from "recoil";
import { userAtom } from ".";

export const useUserHook = ()=>{
    const [user] = useRecoilState(userAtom);
    return user
}