import React from 'react'
import { fetchData } from './services/GetApi';

const personas=[
  {
    id:1,
    name:'Correspondent Bank'
  },
  {
    id:2,
    name:'Loan Officer'
  },
  {
    id:3,
    name:'Title Company'
  },
  {
    id:4,
    name:'Lender'
  }
]

const userdata= [
  { 
    id:1,
    type:'Dash board',
    parentId:0

  },
  {
    id:2,
    type:'My Profile',
    parentId:0
  },
  {
    id:3,
    type:'Loans',
    parentId:0
  },
  {
    id:5,
    type:'Assign Stakeholders',
    parentId:3
  },
  {
    id:6,
    type:'Documents',
    parentId:0
  },
  {
    id:7,
    type:'Upload Documents',
    parentId:6
  },
  {
    id:8,
    type:'View Documents',
    parentId:6
  },
  {
    id:9,
    type:'Settings',
    parentId:0
  },
  {
    id:10,
    type:'Notifications',
    parentId:0
  },
  {
    id:4,
    type:'Add Loans',
    parentId:3
  },
];

const App = () => {
  const [personaData,setPersonaData]=React.useState([]);
  const [data,setData]=React.useState([]);
  const [currentPersona,setCurrentPersona]=React.useState('');

  React.useEffect(()=>{
    // async function apifetch() {
    //   try {
    //     const response=await fetchData();
    //     setData(response)
    //     console.log(response);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // apifetch();
    setData(userdata);
    console.log(data);
    setPersonaData(personas);
  },[])

  const setUpUserData=()=>{
    setData(userdata);
  }

  const personaChange=(e)=>{
    console.log(e.target.value);
    setCurrentPersona(e.target.value);
  }
  
  const checkChange=(e,Id,mainId)=>{
    let {name,checked}=e.target;
    console.log(Id,mainId);
    const childTmp = data.map((parent)=>{
      if(mainId===0 && checked===true ){
        console.log(parent.parentId);
        checked=true;
        console.log('parent.parentId , mainId' , parent.parentId + ' ' + mainId);
        return (parent.parentId === Id) ? {...parent, isChecked : checked}: parent;
      }else if(checked===false){
        checked=false;
        console.log('parent.parentId , mainId' , parent.parentId + ' ' + mainId);
        return (parent.parentId === Id) ? {...parent, isChecked : checked}: parent;
      }else{
        return parent;
      }
    })

    console.log(mainId);
    let tmpUser=childTmp.map((user)=>{
          return ((user.type === name) ? {...user, isChecked : checked}: user );
    }) 

    console.log(data);
     
    setData(tmpUser);
  }

  const updateData=(e)=>{
    e.preventDefault();
    let updateReq=data.filter((user)=>user.isChecked===true);
    console.log(currentPersona , updateReq);
    setUpUserData();
  }
  
  return (
   <>   
        <div className="main">
            <form action="" onSubmit={updateData}>
              <div className="persona">
                <select name="persona" onChange={personaChange} >
                  {personaData.map((e)=>{
                      const {id,name}=e;
                      // console.log(id,name);
                      return <option key={id} name="persona" value={id}>{name}</option>
                    })}         
                </select>
                <div className="parent-check">
                    {data.map((parent)=>{
                    return <div key={parent.id} className="user-check">
                          {parent.parentId === 0 ? 
                          <div className="parent-check">
                            <input type="checkbox" 
                            name={parent.type}
                            id={parent.id} 
                            checked={parent?.isChecked || false}
                            onChange={(e)=>checkChange(e,parent.id,parent.parentId)}/>
                            <label htmlFor={parent.type}>{parent.type}</label>

                            {data.map((child)=>{
                              return <div key={child.id} className="child-check" style={{'marginLeft':'3rem'}}>
                                {child.parentId === parent.id ? 
                                <div className="child-check">
                                   <input type="checkbox" 
                                    name={child.type}
                                    id={child.id}
                                    checked={child?.isChecked || false}
                                    onChange={(e)=>checkChange(e,child.id,child.parentId)}
                                    />
                                  <label htmlFor={child.type}>{child.type}</label>
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



