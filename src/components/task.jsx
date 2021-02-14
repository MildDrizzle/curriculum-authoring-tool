import React from 'react';
import { BsArrowLeft, BsArrowRight, BsArrowsMove } from 'react-icons/bs';
import {FaTrashAlt} from 'react-icons/fa';

const List = ({items}) => {

    

    return ( 

        <React.Fragment>
            {items.map((item)=> 
                <span className="d-block task">
                    <BsArrowsMove />
                    <BsArrowLeft />
                    <BsArrowRight />
                    <FaTrashAlt />
                    {item}
                </span>)}
        </React.Fragment>

     );
}
 
export default List;