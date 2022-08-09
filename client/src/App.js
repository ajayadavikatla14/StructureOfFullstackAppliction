import React from 'react';
import { FetchOnePersona, FetchPersonas ,PutModuleMap } from './services/GetApi';

const App = () => {
  const [personaData,setPersonaData]=React.useState([]);
  const [data,setData]=React.useState([]);
  const [currentPersona,setCurrentPersona]=React.useState('0');
  let [editData,setEditData]=React.useState([]);

  async function Apifetch(id) {
    // console.log(id);
    try {
      const response=await FetchOnePersona(id);
      setData(response)
      let list=await BuildMenuTree(response);
      return list;
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
      const response=await FetchPersonas();
      const select={
        id:'0',
        entity_name:'select',
        display_name:'Select'
      }
      response.unshift(select);
      setPersonaData(response)
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(()=>{
    Personafetch();
  },[])
  
  const FetchEdit=async(mainId)=>{
    editData =  await Apifetch(mainId);
    setData(EditCheck(mainId));
  }

  const PersonaChange=async(e)=>{
    setCurrentPersona(e.target.value);
    try {
      await FetchEdit(e.target.value);
    } catch (error) {
      console.log(error);
    }
  }

  const EachUserCheck=(childTmp,checked,name)=>{
    let tmpUser=childTmp.map((user)=>{
      return ((user.name === name) ? {...user, isChecked : checked}: user );
    }) 
    setData(tmpUser);
  }
 
  const CheckChange=(e,Id,parentId,statusId)=>{
    let {name,checked}=e.target;
    console.log(Id,parentId,statusId);

    const childTmp=data.map((parents)=>{
      if(parents.childs.length === 0 && checked===true){
        return ((parents.name === name) ? {...parents, isChecked : checked}: parents )
      }else if(parents.childs.length !== 0 && checked===true){
        if(parents.id===Id){
        parents.childs.map((child,index)=>{
              parents.childs[index]=((child.parent===parents.id)? {...child, isChecked : true}:child)
          })
        }
      return ((parents.name === name) ? {...parents, isChecked : checked}: parents )
      }
      else if(parents.childs.length !== 0 && checked===false){
        if(parents.id===Id){
          parents.childs.map((child,index)=>{
            parents.childs[index]=((child.parent===parents.id)? {...child, isChecked : false}:child)
        })
        }
      return ((parents.name === name) ? {...parents, isChecked : checked}: parents )

      }else{
        return ((parents.name === name) ? {...parents, isChecked : checked}: parents )
      }
      
    })
    
    EachUserCheck(childTmp,checked,name)
  }

  const EditCheck=(currentId)=>{
    console.log(currentId);
    console.log(editData);
    const tmpEditData = editData.map((currentItem)=>{
        if(currentItem.statusid===1 && currentItem.childs.length > 0){
          currentItem.childs.map((child,index)=>{
           let checked=true;
            currentItem.childs[index]= ({...child, isChecked : checked});
          })
        }
        if(currentItem.statusid===1){
          let checked=true;
          return {...currentItem, isChecked : checked} 
        }else if(currentItem.statusid===0){
          let checked=false;
          return {...currentItem, isChecked : checked} 
        }
      })

    return tmpEditData;
  }

  const EditSubmit=async(e)=>{
    e.preventDefault();
    const input={
      entityId:currentPersona,
      modules:data
    }
    console.log(input);
    try {
      const response=await PutModuleMap(input);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    // await FetchEdit(currentPersona);
  }

  const ResetHandler=()=>{
    const tmpReset=data.map((reset)=>{
      if(reset.childs.length === 0){
        return {...reset,isChecked:false}
      }else{
        reset.childs.map((child,index)=>{
          reset.childs[index]={...child,isChecked:false}
        })
        return {...reset,isChecked:false};
      }
    })
    setData(tmpReset);
  }

  return (
   <>   
        <div className="main">
            <form action="" onSubmit={EditSubmit}>
              <div className="persona">
                <select name="persona" onChange={PersonaChange} >
                  {personaData.map((e)=>{
                      const {id,display_name}=e;
                      return <option key={id} name="persona" value={id}>{display_name}</option>
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
                            onChange={(e)=>CheckChange(e,parents.id,parents.parent,parents.statusid)}/>
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
                                 onChange={(e)=>CheckChange(e,parentChilds.id,parentChilds.parent,parentChilds.statusid)}/>
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
        <div className="reset" >
          <button className='reset-btn' onClick={ResetHandler}>Reset</button>
        </div>
   </>
  )
}

export default App
