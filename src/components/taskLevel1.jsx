import React from 'react'
import { BsArrowLeft, BsArrowRight, BsArrowsMove } from 'react-icons/bs';
import {FaTrashAlt} from 'react-icons/fa';
import ReactTooltip from "react-tooltip";
import TaskLevel2 from './taskLevel2';
import ContentEditable from 'react-contenteditable'

//this component displays all the tasks at level
const TaskLevel1 = ({items,indent,outdent,deleteTask,handleChange,Editable}) => {
    return ( 
        // if there are items in the start then only render 
        items &&
        items.map((items) => 
                <span className="d-block">
                    <tr>
                        <td>
                            <span className="icons">
                                <span data-tip data-for="move"><BsArrowsMove /></span>
                                <ReactTooltip id="move" place="top" effect="solid">Move</ReactTooltip>
                                <span onClick={()=>indent(items.id,items.level)} className="arrow-right" data-tip data-for="indent"><BsArrowRight /></span>
                                <ReactTooltip id="indent" place="top" effect="solid">Indent</ReactTooltip>
                                <span className="arrow-left" data-tip data-for="outdent"><BsArrowLeft /></span>
                                <ReactTooltip id="outdent" place="top" effect="solid">Outdent</ReactTooltip>
                                <span onClick={()=>deleteTask(items.id,items.level)} data-tip data-for="delete"><FaTrashAlt /></span>
                                <ReactTooltip id="delete" place="top" effect="solid">Delete</ReactTooltip>
                            </span>
                        </td>
                        <div class="level-dark-1">
                           
                        </div>
                        <td>
                            
                           <ContentEditable
                                html={items.title}
                                data-column={items.id}
                                data-level={items.level}
                                className={`level-${items.level}`}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    {/* Display all the tasks at level 2 of the curent task */}
                    <TaskLevel2 handleChange={handleChange} items={items} indent={indent}  outdent={outdent} deleteTask={deleteTask} />
                </span>
            )
        );
    }
 
export default TaskLevel1;