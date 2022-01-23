interface ImageOptionsProps {
    admin:boolean,
    setSelected:any,
    image:string
}
 
const ImageOptions: React.FunctionComponent<ImageOptionsProps> = ({admin, setSelected, image}) => {
    return (
        <div className="w-full">
            <ul className="dropdown-menu absolute hidden text-gray-700 w-full shadow-md" style={{width:"180px"}}>
                {admin && 
                <li className="flex cursor-pointer space-x-3 rounded-t bg-white hover:bg-gray-50 py-2 px-4 whitespace-no-wrap items-center">
                    <img src="/images/upload.png" alt="upload" style={{height:"20px", width:"20px"}}></img>
                    <p className="" onClick={()=>{setSelected(1)}}>Upload Picture</p>
                </li>
                }
                <li className="cursor-pointer rounded-t bg-white hover:bg-gray-50 py-2 px-4 whitespace-no-wrap">
                    <a className="flex space-x-3 items-center" href={image} target={"_blank"}>
                        <img src="/images/viewPic.png" alt="upload" style={{height:"20px", width:"20px"}}></img>
                        <p className="" onClick={()=>{}}>View Picture</p>
                    </a>
                </li>
                {admin && 
                <li className="flex cursor-pointer space-x-3 rounded-t bg-white hover:bg-gray-50 py-2 px-4 whitespace-no-wrap items-center">
                    <img src="/images/deletePic.png" alt="upload" style={{height:"20px", width:"20px"}}></img>
                    <p className="" onClick={()=>{}}>Delete picture</p>
                </li>
                }
            </ul>
        </div>
    );
}
 
export default ImageOptions;