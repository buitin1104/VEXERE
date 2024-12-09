import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function InputQuillForm({
  name,
  label,
  placeholder = '',
  validate = {},
  ...props
}) {
  const { formState, setValue } = useFormContext();

  const [content, setContent] = useState('');
  const handleContentChange = (value) => {
    setContent(value);
    setValue(name, value);
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'color', 'image'],
      [{ indent: '-1' }, { indent: '+1' }],
      ['clean'],
    ],
  };
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'indent',
    'image',
    'code-block',
    'color',
  ];

  const error = formState.errors?.[name]?.message;
  return (
    <div className="w-full p-3 rounded-md bg-neutral-100">
      <p className="text-sm mb-2">{label}</p>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleContentChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder ? placeholder : 'Viết nội dung ở đây...'}
        className="bg-white"
      />
      {error && <p className="text-red text-sm">{error}</p>}
    </div>
  );
}
