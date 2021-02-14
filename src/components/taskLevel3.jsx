import React from 'react'
import { BsArrowLeft, BsArrowRight, BsArrowsMove } from 'react-icons/bs';
import {FaTrashAlt} from 'react-icons/fa';
import  ReactTooltip  from 'react-tooltip';
import ContentEditable from 'react-contenteditable'

const TaskLevel3 = ({items,indent,outdent,deleteTask,handleChange}) => {
    return ( 
                // if there are items in the start then only render 

        items.children &&
        items.children.map((c2) =>  <span className="d-block ">
            <tr>
                <td>
                    <span className="icons-3">
                        <span data-tip data-for="move"><BsArrowsMove /></span>
                        <ReactTooltip id="move" place="top" effect="solid">Move</ReactTooltip>
                        <span className="arrow-right" data-tip data-for="indent"><BsArrowRight /></span>
                        <ReactTooltip id="indent" place="top" effect="solid">Indent</ReactTooltip>
                        <span onClick={()=>outdent(c2.id,c2.level)} className="arrow-left" data-tip data-for="outdent"><BsArrowLeft /></span>
                        <ReactTooltip id="outdent" place="top" effect="solid">Outdent</ReactTooltip>
                        <span onClick={()=>deleteTask(c2.id,c2.level)} data-tip data-for="delete"><FaTrashAlt /></span>
                        <ReactTooltip id="delete" place="top" effect="solid">Delete</ReactTooltip>
                    </span>
                </td>
                <div class="level-dark-3">
                           
                        </div>
                <td>
                    <ContentEditable
                        html={c2.title}
                        data-column={c2.id}
                        data-level={c2.level}
                        className={`level-${c2.level}`}
                        onChange={handleChange}
                    />
                </td>
            </tr>
        </span>) 
    );
}
 
export default TaskLevel3;