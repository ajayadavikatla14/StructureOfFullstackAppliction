import React from 'react'
import { fetchData, fetchPersona, insertData } from './services/GetApi';

const App = () => {
  const [personaData,setPersonaData]=React.useState([]);
  const [data,setData]=React.useState([]);
  const [currentPersona,setCurrentPersona]=React.useState('1');

  async function apifetch() {
    try {
      const response=await fetchData();
      setData(response)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function personafetch() {
    try {
      const response=await fetchPersona();
      setPersonaData(response)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(()=>{
    apifetch();
    personafetch();
    // setPersonaData(personas);
  },[])

  const setUpUserData=()=>{
    apifetch();
    personafetch();
  }

  const personaChange=(e)=>{
    console.log(e.target.value);
    setCurrentPersona(e.target.value);
    apifetch();
  }
  
  const checkChange=(e,Id,mainId)=>{
    let {name,checked}=e.target;
    console.log(Id,mainId);
    const childTmp = data.map((parents)=>{
      if(mainId==='0' && checked===true ){
        checked=true;
        // console.log('parents.parentId , mainId' , parents.parent + ' ' + mainId);
        return (parents.parent === Id) ? {...parents, isChecked : checked}: parents;
      }else if(checked===false){
        checked=false;
        // console.log('parents.parent , mainId' , parents.parent + ' ' + mainId);
        return (parents.parent === Id) ? {...parents, isChecked : checked}: parents;
      }else{
        return parents;
      }
    })

    console.log(mainId);
    let tmpUser=childTmp.map((user)=>{
          return ((user.name === name) ? {...user, isChecked : checked}: user );
    }) 
    setData(tmpUser);
  }

  const updateData=async(e)=>{
    e.preventDefault();
    let updateReq=data.filter((user)=>user.isChecked===true);
    const input={
      schemaName:currentPersona,
      modules:updateReq
    }
    try {
      const response=await insertData(input);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    console.log(currentPersona,updateReq);  
    setUpUserData();
  }
  
  return (
   <>   
        <div className="main">
            <form action="" onSubmit={updateData}>
              <div className="persona">
                <select name="persona" onChange={personaChange} >
                  {personaData.map((e)=>{
                      const {id,entity_name}=e;
                      // console.log(id,name);
                      return <option key={id} name="persona" value={id}>{entity_name}</option>
                    })}         
                </select>
                <div className="parent-check">
                    {data.map((parents)=>{
                    return <div key={parents.id} className="user-check">
                          {parents.parent === '0' ? 
                          <div className="parent-check">
                            <input type="checkbox" 
                            name={parents.name}
                            id={parents.id} 
                            checked={parents?.isChecked || false}
                            onChange={(e)=>checkChange(e,parents.id,parents.parent)}/>
                            <label htmlFor={parents.name}>{parents.name}</label>

                            {data.map((child)=>{
                              return <div key={child.id} className="child-check" style={{'marginLeft':'3rem'}}>
                                {child.parent === parents.id ? 
                                <div className="child-check">
                                   <input type="checkbox" 
                                    name={child.name}
                                    id={child.id}
                                    checked={child?.isChecked || false}
                                    onChange={(e)=>checkChange(e,child.id,child.parent)}
                                    />
                                  <label htmlFor={child.name}>{child.name}</label>
                                </div>
                                : null}
                            </div>
                            })}

                          </div>
                          : null}
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