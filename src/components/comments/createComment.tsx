import { Editor } from "react-draft-wysiwyg";
import { useState } from "react";
import draftToHtml from "draftjs-to-html";
import { convertToRaw } from "draft-js";

interface CreateCommentProps {
    setNewComment:any,
    handleCreateComment:any
}
 
const CreateComment: React.FunctionComponent<CreateCommentProps> = ({setNewComment, handleCreateComment}) => {
    let [editorState, setEditorState]=useState();
    let [content, setContent]=useState<string>();
    let [contentErr, setContentErr]=useState(false);

    let modifyContent=()=>{
        let text:any=content;
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
    let handleUpdate=()=>{
        if(content && content.length<=8){
            setContentErr(true);
            return;
        }
        handleCreateComment(modifyContent());
    }
    return (
        <div className="flex flex-col space-y-3 w-full">
            <div className="w-full border overflow-y-scroll scroll" style={{height:"300px"}}>
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper scroll"
                    onEditorStateChange={onEditorStateChange}
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'emoji'],
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                    }}
                    editorStyle={{width:"100%", overflowY:"scroll"}}
                />
                {contentErr && <p className="text-red-600">Content cannot be empty</p>}
            </div>
            <div className="flex justify-end">
                <div className="flex space-x-3">
                    <button className="px-5 rounded-md py-3 bg-red-700 text-white" onClick={()=>setNewComment(false)}>Cancel</button>
                    <button className="px-5 rounded-md py-3 bg-blue-700 text-white" onClick={()=>handleUpdate()}>Post</button>
                </div>
            </div>
        </div>
    );
}
 
export default CreateComment;