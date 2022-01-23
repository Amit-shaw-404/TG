import { convertToRaw } from "draft-js";
import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html'
import axios from "axios";

interface CreateBlogProps {
    setCreateBlog:any,
    handleCreatePost:any
}
 
const CreateBlog: React.FunctionComponent<CreateBlogProps> = ({setCreateBlog, handleCreatePost}) => {
    let [editorState, setEditorState]=useState();
    let [title, setTitle]=useState("");
    let [titleErr, setTitleErr]=useState(false);
    let [content, setContent]=useState("");
    let [contentErr, setContentErr]=useState(false);
    let modifyContent=()=>{
        let text=content;
        let str="";
        for(let i=0;i<text.length;i++){
            if(text[i]==`<`){
                if(text[i+1]!=`/`){
                    while(i<text.length && (text[i]!=' ' && text[i]!=`>`)){
                        str+=text[i];
                        i++;
                    }
                    str+=` class="max-w-full" `;
                    if(text[i]=='>')str+=text[i];
                }else{
                    str+=text[i];
                }
            }else{
                str+=text[i];
            }
        }
        return str;
    }
    let onEditorStateChange=(es:any)=>{
        setContentErr(false);
        let val=draftToHtml(convertToRaw(es.getCurrentContent()));
        setContent(val);
        setEditorState(es);
    }
    let validate=()=>{
        if(title.length===0){
            setTitleErr(true);
            return;
        }
        if(content.length<=8){
            setContentErr(true);
            return;
        }
        handleCreatePost({title, content:modifyContent()});
    }
    let uploadComponent=()=>{
        return(
            <div>Hello there</div>
        )
    }
    function uploadCallback(file:any) {
        // console.log(file);
        return new Promise(
          (resolve, reject) => {
            const formdata=new FormData();
            formdata.append('file', file);
            formdata.append('upload_preset', 'imgupload');
            axios.post("https://api.cloudinary.com/v1_1/amit-cloudinary/image/upload", formdata)
            .then(res=>{
                // console.log(res);
                resolve(res);
            })
            .catch(err=>{
                reject(err);
            })
          }
        );
      }
    return (
        <div className="w-full flex flex-col items-cente">
            <div className="w-full p-5 shadow-md my-5 bg-white">
                <div className="w-full">
                    <h2 className="text-2xl">Title</h2>
                    <input className="w-full my-3 border py-3 px-5" placeholder="Enter the title" value={title} onChange={(e)=>{setTitle(e.target.value); setTitleErr(false)}}></input>
                    {titleErr && <p className="text-red-600 my-2">Title cannot be empty</p>}
                </div>
                <div className="w-full" style={{minHeight:"300px"}}>
                    <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="blog-scroll"
                    editorClassName="blog-scroll"
                    onEditorStateChange={onEditorStateChange}
                    editorStyle={{width:"100%", height:"100%"}}
                    toolbar={{
                        image: {
                            // icon: image,
                            className: undefined,
                            component:undefined,
                            popupClassName: undefined,
                            urlEnabled: true,
                            uploadEnabled: true,
                            alignmentEnabled: true,
                            uploadCallback: uploadCallback,
                            previewImage: false,
                            inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                            alt: { present: false, mandatory: false },
                            defaultSize: {
                              height: 'auto',
                              width: 'auto',
                            },
                          },
                    }}
                  />
                  {contentErr && <p className="text-red-600 my-2">Content cannot be empty</p>}
                </div>
            </div>
            <div className="w-full bg-gray-100">
                <div className="w-full flex justify-end">
                    <div className="flex space-x-5">
                        <button className="bg-red-500 py-3 px-5 text-white rounded-md" onClick={()=>setCreateBlog(false)}>Cancel</button>
                        <button className="bg-blue-800 py-3 px-5 text-white rounded-md" onClick={()=>validate()}>Create Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CreateBlog;