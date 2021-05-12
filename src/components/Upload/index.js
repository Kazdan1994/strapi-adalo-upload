import React from 'react';
import {useDropzone} from 'react-dropzone';

const Upload = ({
                  label = 'upload',
                  accept = '',
                  refId,
                  reference,
                  field,
                  source = '',
                  url,
                }) => {
  const upload = (acceptedFiles) => {
    const form = new FormData();

    Array.from(acceptedFiles).map((file) => {
      form.append('files', file);
    })

    form.append('ref', reference);
    form.append('refId', refId);
    form.append('field', field);
    form.append('source', source);

    fetch(url, {
      method: 'POST',
      body: form,
    });
  }

  const {getRootProps, getInputProps} = useDropzone({
    accept,
    onDrop: async (acceptedFiles) => {
      await upload(acceptedFiles);
    },
  });

  return (
    <div {...getRootProps()} className="d-inline btn btn-primary">
      {!label ? null : <p className="text-white">{label}</p>}
      <input {...getInputProps()} />
    </div>
  );
};

export default Upload;
