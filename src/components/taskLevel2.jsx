import React from 'react'
import { BsArrowLeft, BsArrowRight, BsArrowsMove } from 'react-icons/bs';
import {FaTrashAlt} from 'react-icons/fa';
import TaskLevel3 from './taskLevel3';
import ReactTooltip from 'react-tooltip';
import ContentEditable from 'react-contenteditable'

//this component displays all the tasks at level
const TaskLevel2 = ({items,indent,outdent,deleteTask,handleChange}) => {
    return ( 
                // if there are items in the start then only render 

        items.children &&
        items.children.map((item) =>  <span className="d-block ">
            <tr className="border-b">
                <td>
                    <span className="icons">
                        <span data-tip data-for="move"><BsArrowsMove /></span>
                        <ReactTooltip id="move" place="top" effect="solid">Move</ReactTooltip>
                        <span onClick={()=> indent(item.id,item.level)}  className="arrow-right" data-tip data-for="indent"><BsArrowRight /></span>
                        <ReactTooltip id="indent" place="top" effect="solid">Indent</ReactTooltip>
                        <span onClick={()=>outdent(item.id,item.level)} className="arrow-left" data-tip data-for="outdent"><BsArrowLeft /></span>
                        <ReactTooltip id="outdent" place="top" effect="solid">Outdent</ReactTooltip>
                        <span onClick={()=>deleteTask(item.id,item.level)} data-tip data-for="delete"><FaTrashAlt /></span>
                        <ReactTooltip id="delete" place="top" effect="solid">Delete</ReactTooltip>
                    </span>
                </td>
                <div class="level-dark-2">
                            
                        </div>
                <td>
                <ContentEditable
          html={item.title}
          data-column={item.id}
          data-level={item.level}
          className={`level-${item.level}`}
          onChange={handleChange}
        />
                </td>
            </tr>
            {/* Display all the tasks at level 3 of the curent task */}
            {<TaskLevel3 items={item} handleChange={handleChange} indent={indent}  outdent={outdent} deleteTask={deleteTask}/>}
        </span>) 
    );
}
 
export default TaskLevel2;