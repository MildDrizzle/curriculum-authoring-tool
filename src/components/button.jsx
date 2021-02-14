import React from 'react';
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IconContext } from "react-icons";

const Button = ({ onSubmit  }) => {
    return (

        <button className="b-primary" onClick={onSubmit}><div className="main">
            
            <IconContext.Provider value={{  className: "p-2" }}>
        <div>
        <AiOutlinePlusCircle />
        </div>
      </IconContext.Provider><span>Add a Standard</span>
            </div></button>

      );
}
 
export default Button;

