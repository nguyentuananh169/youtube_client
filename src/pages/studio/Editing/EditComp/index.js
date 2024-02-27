import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import './EditComp.css';
function EditorComp({ handleChange, invalid, initValue }) {
    const editorRef = useRef(null);
    const handleEditorChange = () => {
        handleChange('desText', editorRef.current.getContent({ format: 'text' }));
    };
    const handleBlur = () => {
        handleChange('des', editorRef.current.getContent());
        invalid('desText', editorRef.current.getContent({ format: 'text' }));
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
                    placeholder:
                        'Giới thiệu với người xem về kênh của bạn. Nội dung mô tả sẽ xuất hiện trong phần Giới thiệu kênh, trong kết quả tìm kiếm và tại các vị trí khác',
                    height: 300,
                }}
                onEditorChange={handleEditorChange}
                onBlur={handleBlur}
            />
        </div>
    );
}

export default EditorComp;
