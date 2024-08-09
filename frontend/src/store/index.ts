import { atom, selector } from 'recoil';

import axios from 'axios';

export type User = {
  profileUrl : string
  name: string;
  id: string;
};

export const userAtom = atom<User | null>({
  key: 'user',
  default: selector({
    key: 'user/default',
    get: async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/refresh', {
          withCredentials: true,
          timeout: 5000,
        });
        if (response.status !== 200 ) {
          console.log('Error in refresh endpoint request');
          return null;
        }
        if (response.data && !response.data.error) {
          const user = response.data;
          console.log('the response data is : ', response.data);
          return user;
        }
        return null;
      } catch (error) {
        console.log('Error in the atom while fetching : ', error);
      }
      return null;
    },
  }),
});
