import { convertFromHTML, convertToRaw, ContentState, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useState } from "react";
import {  Editor } from "react-draft-wysiwyg";

interface EditCommentProps {
    setEdit:any,
    comment:any,
    setEdited:any
}
 
const EditComment: React.FunctionComponent<EditCommentProps> = ({setEdit, comment, setEdited}) => {
    //@ts-ignore
    let [editorState, setEditorState]=useState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(comment.content))));
    let [content, setContent]=useState<string>(comment.content);
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
        let newContent=modifyContent();
        setEdited(newContent)
    }
    return (
        <div className="flex flex-col space-y-3 w-full">
            <div className="w-full border" style={{height:"300px"}}>
                <Editor
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    onEditorStateChange={onEditorStateChange}
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'emoji'],
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                    }}
                    editorStyle={{width:"100%", height:"100%"}}
                />
            </div>
            <div className="flex justify-end">
                <div className="flex space-x-3">
                    <button className="px-5 rounded-md py-3 bg-red-700 text-white" onClick={()=>setEdit()}>Cancel</button>
                    <button className="px-5 rounded-md py-3 bg-blue-700 text-white" onClick={()=>handleUpdate()}>Update</button>
                </div>
            </div>
        </div>
    );
}
 
export default EditComment;