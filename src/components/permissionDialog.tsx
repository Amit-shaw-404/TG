interface PermissionDialogProps {
    show:any
    setShow:any,
    handleAccept:any
}
 
const PermissionDialog: React.FunctionComponent<PermissionDialogProps> = ({show, setShow, handleAccept}) => {
    return (
        <div
        className={`fixed ${show?"":"hidden"} inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id="my-modal`}
      >
        <div
          className="relative top-1/4 mx-auto p-5 border shadow-lg rounded-md bg-white flex flex-col"
          style={{height:"200px", width:"400px"}}
        >
            <div className="w-full">
                <div className="flex space-x-5">
                    <p className="text-xl">Warning</p>
                </div>
                <p className="w-full bg-gray-100" style={{height:"1px"}}></p>
            </div>
            <div className="my-5">
                <p className="text-lg">Are you sure you want to delete post?</p>
            </div>
            <div className="w-full flex justify-end mb-2">
                <div className="flex space-x-5">
                    <button className="bg-red-500 py-3 px-5 text-white rounded-md" onClick={()=>setShow(false)}>Cancel</button>
                    <button className="bg-blue-800 py-3 px-5 text-white rounded-md" onClick={()=>handleAccept()}>Delete</button>
                </div>
            </div>   
        </div>
      </div>
    );
}
 
export default PermissionDialog;