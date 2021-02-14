

export const  handleDelete = (id,level) => {
    let item =this.state.item;
    let a;
     if(level==1) { item = item.filter((i) => i.id !== id);}
     else if(level==2) {
       for(let i=0; i<this.state.item.length; i++) {
         for(let j=0; j<this.state.item[i].children.length; j++) {
           if(this.state.item[i].children[j].id===id && this.state.item[i].children[j].level===level) {
             item[i].children.splice(j,1);
          }
         }
       }
     }
     else if(level==3) {
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

  