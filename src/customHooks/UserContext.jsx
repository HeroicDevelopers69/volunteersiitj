import { createContext, useReducer, useContext } from 'react';

const UserContext = createContext(null);
const UserDispatchContext = createContext(null);

export function UserProvider({ children }) {
  const [User, dispatch] = useReducer(UserReducer, initialUser);

  return (
    <UserContext.Provider value={User}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export function useUserContext(){
	return useContext(UserContext);
}

export function useUserDispatchContext(){
	return useContext(UserDispatchContext);
}


function UserReducer(user, action) {
  switch (action.type) {
    case 'set': {
      return {
        name: action.name,
        userId: action.userId,
        email: action.email,
        college: action.college,
        isAdvertiser: action.isAdvertiser
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialUser = {
  name: '',
  userId: '',
  email: '',
  college: '',
  isAdvertiser: false
}
