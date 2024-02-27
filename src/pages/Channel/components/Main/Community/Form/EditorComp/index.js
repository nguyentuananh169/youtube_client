import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import './EditorComp.css';
function EditorComp({ handleChange, invalid, initValue }) {
    const editorRef = useRef(null);
    const handleEditorChange = () => {
        handleChange('contentText', editorRef.current.getContent({ format: 'text' }));
    };
    const handleBlur = () => {
        handleChange('content', editorRef.current.getContent());
        invalid('contentText', editorRef.current.getContent({ format: 'text' }));
    };
    return (
        <div className="editor-comp">
            <Editor
                apiKey="4cl0shbdz2qjljsrfyabz1phq9587m8kc0sruiyh5zwrtwzx"
                initialValue={initValue}
                onInit={(event, editor) => (editorRef.current = editor)}
                init={{
                    menubar: ' view | insert | format ',
                    plugins: 'lists code emoticons |  link |  insertdatetime  | preview',
                    toolbar: 'styleselect | bold italic | ',
                    root_name: 'desText',
                    placeholder: 'Hãy nhập nội dung trước để bắt đầu bài đăng',
                    height: 250,
                }}
                onEditorChange={handleEditorChange}
                onBlur={handleBlur}
            />
        </div>
    );
}

export default EditorComp;
