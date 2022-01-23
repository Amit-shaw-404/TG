import { ContentState, convertFromHTML, convertToRaw, EditorState } from "draft-js";
import { createRef, useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html'

interface CreateBlogProps {
    handleUpdate:any,
    cancelUpdate:any,
    prevContent:any
}
 
const EditBlog: React.FunctionComponent<CreateBlogProps> = ({prevContent, handleUpdate, cancelUpdate}) => {
    //@ts-ignore
    let [editorState, setEditorState]=useState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(prevContent))));
    let [content, setContent]=useState(prevContent);
    let [contentErr, setContentErr]=useState(false);
    let ref:any=createRef();
    useEffect(()=>{
        ref.current.scrollIntoView()
    })
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
        if(content.length<=8){
            setContentErr(true);
            return;
        }
        handleUpdate(modifyContent());
    }
    return (
        <div ref={ref} className="w-full flex flex-col items-center bg-white">
            <div className="w-full scroll" style={{height:"500px", overflowY:"scroll"}}>
                <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="blog-scroll"
                editorClassName="blog-scroll scroll"
                onEditorStateChange={onEditorStateChange}
                editorStyle={{width:"100%", height:"100%", overflowY:"scroll"}}
              />
              {contentErr && <p className="text-red-600 my-2">Content cannot be empty</p>}
            </div>
            <div className="w-full bg-gray-50">
                <div className="w-full flex justify-end my-3">
                    <div className="flex space-x-5">
                        <button className="bg-red-500 py-3 px-5 text-white rounded-md" onClick={()=>cancelUpdate()}>Cancel</button>
                        <button className="bg-blue-800 py-3 px-5 text-white rounded-md" onClick={()=>validate()}>Create Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default EditBlog;