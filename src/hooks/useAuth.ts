import { createContext, useContext } from "react";

export interface userDetails {
    id : number,
    name : string,
    email : string
}

interface signInCred {
    email : string,
    password : string
}

interface signUpInterface {
    email : string,
    password : string,
    name : string
}

interface LoginResp {
    user: userDetails,
    jwt : string
}

interface AuthInterface {
    user : userDetails | undefined,
    token : string | null,
    signIn : (cred : signInCred) => Promise<LoginResp>,
    signUp : (cred : signUpInterface) => Promise<LoginResp>,
    signOut : () => Promise<void>,
    isAuthenticating : boolean
}

export const AuthContext = createContext<AuthInterface | null>(null);

export const useAuthHook = () => {
    const ctx = useContext(AuthContext);
    if(!ctx){
        throw new Error(
      "'useAuthContext' must be used within 'AuthUserProvider' only",
    );
    }
    return ctx;
}
