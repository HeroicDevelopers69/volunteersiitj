import { createContext, useReducer, useContext, useEffect} from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";


export function fetchUser(dispatch) {
  const auth = getAuth();
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      const userId = 'yzBixe7M9IQIgOtcd76AFOQtQmK2'

      async function fetchUser(userId) {
        console.log("Fetching user...")
        const response = await fetch('http://localhost:5000/getUser', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json", // Content type of the request body
          },
          body: JSON.stringify({
            userId: userId
          })
        })

        const data = await response.json();
        console.log(data.user)
        dispatch({
          type: 'set',
          user: data.user
        })
      }

      fetchUser(userId);
    }
  });

  return () => unsubscribe();
}

const UserContext = createContext(null);
const UserDispatchContext = createContext(null);

export function UserProvider({ children }) {
  const [User, dispatch] = useReducer(UserReducer, initialUser);

  useEffect(() => {
    fetchUser(dispatch);
  }, []);

  return (
    <UserContext.Provider value={User}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}

export function useUserDispatchContext() {
  return useContext(UserDispatchContext);
}


function UserReducer(user, action) {
  switch (action.type) {
    case 'set': {
      return {
        ...action.user
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
  photoURL: '',
  college: '',
  isAdvertiser: false,
  isDeveloper: false,
  appliedForms: [],
  madeAds: [],
  madeNews: []
}
