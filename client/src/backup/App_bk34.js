import React from 'react';
import { FetchData, FetchPersona, InsertData } from './services/GetApi';

const App = () => {
  const [personaData,setPersonaData]=React.useState([]);
  const [data,setData]=React.useState([]);
  const [currentPersona,setCurrentPersona]=React.useState('1');

  async function Apifetch() {
    try {
      const response=await FetchData();
      let list=await BuildMenuTree(response);
      setData(list)
      console.log(list);
    } catch (error) {
      console.log(error);
    }
  }

  const BuildMenuTree = async (list) => {
    return new Promise(async (resolve) => {
      if (list.length > 0) {
        let parents = list.filter((x) => parseInt(x.parent) === 0);
        for (let i = 0; i < parents.length; i++) {
          let childs = list.filter(
            (x) => parseInt(x.parent) === parseInt(parents[i].id)
          );
          if (childs.length > 0) {
            parents[i].childs = childs
          }else{
            parents[i].childs=[];
          };
        }
        return resolve(parents);
      }
      return resolve(list);
    });
  };

  async function Personafetch() {
    try {
      const response=await FetchPersona();
      setPersonaData(response)
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(()=>{
    Apifetch();
    Personafetch();
    // setPersonaData(personas);
  },[])

  const SetUpUserData=()=>{
    Apifetch();
    Personafetch();
  }

  const PersonaChange=(e)=>{
    console.log(e.target.value);
    setCurrentPersona(e.target.value);
    Apifetch();
  }

  const EachUserCheck=(childTmp,checked,name)=>{
    let tmpUser=childTmp.map((user)=>{
      return ((user.name === name) ? {...user, isChecked : checked}: user );
    }) 
    setData(tmpUser);
  }
 
  const CheckChange=(e,Id,parentId)=>{
    let {name,checked}=e.target;
    console.log(Id,parentId);
    console.log(Id + ' ' + parentId);

    const childTmp=data.map((parents)=>{
      if(parents.childs.length === 0 && checked===true){
        if(parents.id===Id){
          console.log('first if length===0');
        }
        return ((parents.name === name) ? {...parents, isChecked : checked}: parents )
      }else if(parents.childs.length !== 0 && checked===true){
        if(parents.id===Id){
          console.log('parents.id  Id' ,parents.id,typeof(Id) );
          console.log('second if length!==0');
         const afterChildsChecked= parents.childs.map((child,index)=>{
            checked=true;
            console.log('child' , child);
            console.log('child.parent' + ' ' +  child.parent);
            parents.childs[index]=((child.parent===parents.id)? {...child, isChecked : checked}:child)
            console.log(parents.childs);
        })
        }
      return ((parents.name === name) ? {...parents, isChecked : checked}: parents )
      }
      else if(parents.childs.length !== 0 && checked===false){
        if(parents.id===Id){
          console.log('parents.id  Id' ,parents.id,typeof(Id) );
          console.log('second if length!==0');
         const afterChildsChecked= parents.childs.map((child,index)=>{
            checked=false;
            console.log('child' , child);
            console.log('child.parent' + ' ' +  child.parent);
            parents.childs[index]=((child.parent===parents.id)? {...child, isChecked : checked}:child)
            console.log(parents.childs);
        })
        }
      return ((parents.name === name) ? {...parents, isChecked : checked}: parents )

      }else{
        return ((parents.name === name) ? {...parents, isChecked : checked}: parents )
      }
      
    })

   console.log(childTmp);
    // return (Id ===  parents.parent ) ? {...parents, isChecked : checked}: parents;
    // return parents;
    EachUserCheck(childTmp,checked,name)
  }

  const UpdateData=async(e)=>{
    e.preventDefault();
    let updateReq=data.filter((user)=>user.isChecked===true);
    const input={
      schemaName:currentPersona,
      modules:updateReq
    }
    try {
      const response=await InsertData(input);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    console.log(currentPersona,updateReq);  
    SetUpUserData();
  }
  
  return (
   <>   
        <div className="main">
            <form action="" onSubmit={UpdateData}>
              <div className="persona">
                <select name="persona" onChange={PersonaChange} >
                  {personaData.map((e)=>{
                      const {id,entity_name}=e;
                      // console.log(id,name);
                      return <option key={id} name="persona" value={id}>{entity_name}</option>
                    })}         
                </select>
                <div className="parent-check">
                    {data.map((parents)=>{
                    return <div key={parents.id} className="user-check">
                          {parents.childs.length === 0 ? 
                          <div className="parent-check">
                            <input type="checkbox" 
                            name={parents.name}
                            id={parents.id} 
                            checked={parents?.isChecked || false}
                            onChange={(e)=>CheckChange(e,parents.id,parents.parent)}/>
                            <label htmlFor={parents.name}>{parents.name}</label>
                          </div>
                          : 
                          null
                          }
                     </div>
                    })}
                    {data.map((parentChilds)=>{
                      return <div className="parentChilds-All">
                        {parentChilds.childs.length !== 0 ?
                          <div key={parentChilds.id} className="each-parentChilds">
                                <div className="childs-check">
                                 <input type="checkbox" 
                                 name={parentChilds.name}
                                 id={parentChilds.id} 
                                 checked={parentChilds?.isChecked || false}
                                 onChange={(e)=>CheckChange(e,parentChilds.id,parentChilds.parent)}/>
                                 <label htmlFor={parentChilds.name}>{parentChilds.name}</label>
                               </div>
                                {parentChilds.childs.map((childs)=>{
                                  return <div key={childs.id} className="childs-All">
                                    <div className="each-child" style={{'marginLeft':'1rem'}}>
                                    <input type="checkbox" 
                                        name={childs.name}
                                        id={childs.id} 
                                        checked={childs?.isChecked || false}
                                        onChange={(e)=>CheckChange(e,childs.id,childs.parent)}/>
                                         <label htmlFor={childs.name}>{childs.name}</label>
                                  </div>
                                  </div>
                                })}
                          </div>
                         :null}
                      </div>
                    })}
              </div>
               
              </div>
              <input type="submit" value="update" />
            </form>
        </div>
   </>
  )
}

export default App
