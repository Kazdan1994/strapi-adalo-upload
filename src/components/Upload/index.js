import React, {useState} from 'react';
import {useDropzone} from 'react-dropzone';
import placeholder from './placeholder.png';

const DropzonePictureAvatar = ({
                                 label,
                                 accept = '',
                                 refId,
                                 reference,
                                 field,
                                 source,
                                 value,
                                 url,
                               }) => {
  const [preview, setPreview] = useState(value || placeholder);

  const upload = (acceptedFiles) => {
    const form = new FormData();

    Array.from(acceptedFiles).map((file) => {
      form.append('files', file);
    })

    const fields = new Map([
      ['ref', reference],
      ['refId', refId],
      ['field', field],
      ['source', source]
    ]);

    fields.forEach((value, key) => {
      if (value) {
        form.append(key, value);
      }
    });

    fetch(url, {
      method: 'POST',
      body: form,
    })
      .then(() => {
        setPreview(URL.createObjectURL(acceptedFiles[0]))
      });
  }

  const {getRootProps, getInputProps} = useDropzone({
    accept,
    onDrop: async (acceptedFiles) => {
      await upload(acceptedFiles);
    },
  });

  return (
    <div {...getRootProps()} className="d-inline">
      {!label ? null : <p style={{margin: 0}}>{label}</p>}
      <input {...getInputProps()} />
      <img
        alt=""
        src={preview}
        className="uploadButton"
        style={{
          height: 5,
          width: 5,
          minWidth: 100,
          minHeight: 100,
          borderRadius: '50%',
          objectFit: 'cover',
          cursor: 'pointer',
        }}
      />
    </div>
  );
};

export default DropzonePictureAvatar;
