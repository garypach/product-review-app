import React, {useContext, useState, FC, ReactChildren, ReactChild} from "react";

export const StateContext = React.createContext<unknown>(undefined);

interface ProviderProps {
    children: ReactChild | ReactChildren;
}

export function useStateContext(){
    return useContext(StateContext)
}


export function Provider({ children }: ProviderProps){
    const[user,setUser] = useState({});
    const [createPostOpen, setcreatePostOpen] = useState(false);
    const createPosthide = () => setcreatePostOpen(false);
    const createPosttoggle = () => setcreatePostOpen(!createPostOpen);

    const [createAddfeedbackOpen, setcreateAddfeedbackOpen] = useState(false);
    const createAddfeedbackhide = () => setcreateAddfeedbackOpen(false);
    const createAddfeedbacktoggle = () => setcreateAddfeedbackOpen(!createAddfeedbackOpen);

    const [createEditfeedbackOpen, setcreateEditfeedbackOpen] = useState(false);
    const createEditfeedbackhide = () => setcreateEditfeedbackOpen(false);
    const createEditfeedbacktoggle = () => setcreateEditfeedbackOpen(!createEditfeedbackOpen);

   
    return(
        <StateContext.Provider value = {{
            user,
            setUser,
            createPostOpen,
            createPosthide,
            createPosttoggle,
            createAddfeedbackOpen,
            createAddfeedbackhide,
            createAddfeedbacktoggle,
            createEditfeedbackOpen,
            createEditfeedbackhide,
            createEditfeedbacktoggle

            }}>
            {children}
        </StateContext.Provider>
    )
}
