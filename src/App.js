import React, { Component } from 'react'; 
import Button from './components/button';
import TaskLevel1 from './components/taskLevel1';
import './App.css';

class App extends Component {
  state = { 
    item:[
          {
            id:1,
            title:"Numbers",
            level:1,
            children:
            [
              {id:2,
                title:"Do the Math",
                level:2,
                children: [
                  {
                    id:7,
                    title:"Print to the list",
                    level:3
                  }
                ]
              }
              
            ]
          }],
    
     counter:400
   }

   //Function handles text in each row editable
   handleChange = evt => {
    const items = this.state.item;
    //storing id,level and the value to local variables from the event variable
    const id =parseInt(evt.currentTarget.dataset.column);
    const level = parseInt(evt.currentTarget.dataset.level);
    const value=evt.target.value;
    //if Level is 1 for changing the content
    if(level===1) {
       for(let i=0; i<items.length; i++) {
         if(items[i].id===id) {
           items[i].title=value;
         }
        }
    }
    //if Level is 2 for changing the content
    else if(level===2) {
       for(let i=0; i<items.length; i++) {
        for(let j=0; j<items[i].children.length; j++) {
          console.log("here");
         if(items[i].children[j].id===id) {
           //console.log("success");
           items[i].children[j].title=value;
         }}
       }
    }
    //if Level is 3 for changing the content
    else if(level===3) {
      for(let i=0; i<items.length; i++) {
       for(let j=0; j<items[i].children.length; j++) {
        for(let k=0; k<items[i].children[j].children.length; k++) {
          if(items[i].children[j].children[k].id===id) {
            items[i].children[j].children[k].title=value;
            }
          }
        }   
      }
    }
    this.setState({item:items})
}

  //adds new task when button is clicked
   onSubmit = () => {
    const data = [...this.state.item,{id:this.state.counter,title:"Select the field to change content",level:1, children:[]}];
    const counter = this.state.counter+1;
    this.setState({item:data, counter});
   }

   //deletes the task and its child nodes when delete is clicked
   handleDelete = (id,level) => {
     let item =this.state.item;
      if(level===1) { item = item.filter((i) => i.id !== id);}
      else if(level===2) {
        for(let i=0; i<this.state.item.length; i++) {
          for(let j=0; j<this.state.item[i].children.length; j++) {
            if(this.state.item[i].children[j].id===id && this.state.item[i].children[j].level===level) {
              item[i].children.splice(j,1);
           }
          }
        }
      }
      else if(level===3) {
        for(let i=0; i<this.state.item.length; i++) {
          for(let j=0; j<this.state.item[i].children.length; j++) 
            for(let k=0; k<item[i].children[j].children.length; k++) {
            if(this.state.item[i].children[j].children[k].id===id && this.state.item[i].children[j].children[k].level===level) {
              item[i].children[j].children.splice(k,1);
            }
          }
        }
      }
      this.setState({item});
   }

   //for Indenting the task
   indent = (id,level) => {
     const item = this.state.item;   
     //if the task level is 1 and if the item array has more than one value then only indent  
     if(level===1 && item.length>1) {
       for(let i=0; i<item.length; i++) {
         if(item[i].id===id) {
           //if it is not the 0th task then add to the n-1 task
            if(i!==0) {
           item[i].level=2;
            item[i-1].children.push(item[i]);
            //after item has been pushed to the array then check if that task had any sub tasks then add it to the previous nodes subtask
            for(let j=0; j<item[i].children.length; j++) {
              item[i-1].children.push(item[i].children[j]);
              item[i].children.splice(j,1);
            }
           item.splice(i,1);
            }
            //if it is 0th task then add to n+1 task
            else {
              item[i].level=2;
              item[i+1].children.unshift(item[i]);
              //after item has been pushed to the array then check if that task had any sub tasks then add it to the previous nodes subtask
              for(let j=0; j<item[i].children.length; j++) {
                item[i+1].children.push(item[i].children[j]);
                item[i].children.splice(j,1);
              }
              item.splice(i,1);
            }
         }
       }
       
     }
    //if the task level is 2
     if(level===2) {
       for(let i=0; i<item.length; i++) {
         for (let j=0; j<item[i].children.length; j++) {
           if(item[i].children[j].id === id && item[i].children[j].level=== level){
              if(item[i].children.length>1) {
                //if it is not the 0th task then add to the n-1 task
                if(j!==0)  {      
              item[i].children[j].level=3;
              item[i].children[j-1].children.push(item[i].children[j]);
              //after item has been pushed to the array then check if that task had any sub tasks then add it to the previous nodes subtask
              for(let k=0; k<item[i].children[j].children.length; k++) {
                 item[i].children[j-1].children.push(item[i].children[j].children[k]);
                 item[i].children[j].children.splice(k,1);
              }
              item[i].children.splice(j,1);
                }
                 //if it is the 0th task then add to the n+1 task
                else {
                  item[i].children[j].level=3;
                  item[i].children[j+1].children.push(item[i].children[j]);

                  for(let k=0; k<item[i].children[j].children.length; k++) {
                     item[i].children[j+1].children.push(item[i].children[j].children[k]);
                     item[i].children[j].children.splice(k,1);
                  }
                  item[i].children.splice(j,1);
                }
            }
           }  
         }
       }
     }
     this.setState({item})
   }

   //function for outdent the task
   outdent=(id,level) => {
    const item = this.state.item;
    // if the task level is 1 then it cannot be outdented
    // if the task level is 2
    if(level===2) {
      for(let i=0; i<item.length; i++) {
        for(let j=0; j<item[i].children.length; j++) {
          if(item[i].children[j].id===id) {
            item[i].children[j].level=1;
             
            const toMove = item[i].children[j];
            const ite = {...toMove,children:[]}
            item.push(ite);
            //Fixing Level 
             if(item[i].children[j].children) {
              for(let k=0; k<item[i].children[j].children.length; k++) {
                item[i].children[j].children[k].level=2;
                item[i+1].children.push(item[i].children[j].children[k]);
                item[i].children[j].children.splice(k,1);
               }}
            item[i].children.splice(j,1);
          }
        }
      }
    }
    // if the task level is 2
    if(level===3) {
      for(let i = 0;  i<item.length; i++) {
        for(let j=0; j<item[i].children.length; j++) {
          if(item[i].children[j].children){
          for(let k=0; k<item[i].children[j].children.length; k++) {
            if(item[i].children[j].children[k].id ===id ) {
              item[i].children[j].children[k].level=2;
              const toMove = item[i].children[j].children[k];
              const ite = {...toMove,children:[]}
               item[i].children.push(ite);
               item[i].children[j].children.splice(k,1);
               break;
              
            }
          }}
        }
      }
    }
    this.setState({item});
   }


  render() {
    const {item}  = this.state;
    return (
    <React.Fragment>
      <div className="container">
        <h1 className="header">Mathematics</h1>
        <table>
          <thead className="table-header">
            <tr>
              <th>Actions</th>
              <th className="table-level-controller-head"></th>
              <th>Standard</th>
            </tr>
            <tr><td>Move, Indent,</td>
            <td></td>
            <td>The text of the standard</td>
            </tr>
            <tr><td>Outdent, Delete</td>
            <td></td>
            <td></td></tr>
          </thead>
          <tbody>
          {
        <TaskLevel1 Editable={this.contentEditable} handleChange={this.handleChange} items={item} indent={this.indent}  outdent={this.outdent} deleteTask={this.handleDelete} />
      }
          </tbody>
        </table>
      
      <Button onSubmit={this.onSubmit} />

      </div>
    </React.Fragment>);
  }
}
 
export default App;


