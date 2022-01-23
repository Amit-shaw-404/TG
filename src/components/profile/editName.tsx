import { createRef, useState } from "react";

interface EditNameProps {
    uname:any,
    mname:any,
    editInfo:boolean,
    setEditInfo:any,
    handleUpdate:any
}
 
const EditName: React.FunctionComponent<EditNameProps> = ({uname, mname, editInfo, setEditInfo, handleUpdate}) => {
    // console.log(uname);
    // console.log(mname);
    let [username, setUsername]=useState(uname);
    let [name, setName]=useState(mname);
    let refUname:any=createRef();
    let refName:any=createRef();
    let handleUsernameChange=(e:any)=>{
        // setUsername(e.target.value);
    }
    let handleNameChange=(e:any)=>{
      // setName(e.target.value);
  }
    return (
        <div
        className={`fixed ${editInfo?"":"hidden"} inset-0 bg-gray-600 bg-opacity-50 my-8 overflow-y-auto h-full w-full`}
        id="my-modal"
      >
        <div
          className="relative top-1/4 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white flex flex-col"
        >
            <h1 className="mb-5 text-xl">Edit Info</h1>
            <p className="text-lg">Name</p>
            <input ref={refName} name="name" className="my-2 py-3 px-5 bg-gray-100 border" defaultValue={uname}></input>
            <p className="text-lg">Username</p>
            <input ref={refUname}  name="username" className="my-2 py-3 px-5 bg-gray-100 border" defaultValue={mname}></input>
            <div className="flex space-x-3 mt-5 justify-end">
                <button className="px-5 rounded py-2 text-white bg-red-600" onClick={()=>setEditInfo(false)}>Cancel</button>
                <button className="px-5 rounded py-2 text-white bg-blue-600" onClick={()=>handleUpdate({username:refUname.current.value, name:refName.current.value})}>Update</button>
            </div>
        </div>
      </div>
    );
}
 
export default EditName;