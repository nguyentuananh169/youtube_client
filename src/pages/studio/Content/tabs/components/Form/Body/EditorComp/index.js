import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import './EditorComp.css';
function EditorComp({ initialValue, handleChange, invalid }) {
    const editorRef = useRef(null);
    const handleEditorChange = () => {
        handleChange('desText', editorRef.current.getContent({ format: 'text' }));
    };
    const handleBlur = () => {
        handleChange('des', editorRef.current.getContent());
        invalid('desText', editorRef.current.getContent({ format: 'text' }));
    };
    return (
        <div className="editor-component">
            <Editor
                apiKey="4cl0shbdz2qjljsrfyabz1phq9587m8kc0sruiyh5zwrtwzx"
                initialValue={initialValue}
                onInit={(event, editor) => (editorRef.current = editor)}
                init={{
                    menubar: ' view | insert | format ',
                    plugins: 'lists code emoticons |  link |  insertdatetime  | preview',
                    toolbar: 'styleselect | bold italic | ',
                    root_name: 'desText',
                    // menubar: false,
                    // toolbar: false,
                    placeholder: 'Giới thiệu về video của bạn cho người xem',
                    height: 400,
                }}
                onEditorChange={handleEditorChange}
                onBlur={handleBlur}
            />
        </div>
    );
}

export default EditorComp;
