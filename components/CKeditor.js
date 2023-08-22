import React, { useEffect, useRef } from "react";
import { Editor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CKeditor = ({ data, onChange }) => {
  const editorRef = useRef();

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setData(data);
    }
  }, [data]);

  return (
    <Editor
      editor={ClassicEditor}
      config={
        {
          // Your CKEditor configuration options go here
        }
      }
      data={data}
      onChange={(event, editor) => {
        const content = editor.getData();
        onChange(content);
      }}
    />
  );
};

export default CKeditor;
