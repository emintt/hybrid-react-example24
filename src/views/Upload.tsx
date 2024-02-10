import { useState } from "react";
import { useForm } from "../hooks/formHooks";
import { useMedia } from "../hooks/apiHooks";
import { useNavigate } from "react-router-dom";

// Upload.tsx
const Upload = () => {
  // halutaan file, File type on ts built-in type
  // File vaati oman ??
  const [file, setFile] = useState<File | null>(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const navigate = useNavigate();

  const initValues = {
    title: '',
    description: '',
  }

  const doUpload = async () => {
    try {
      // TODO: call postFile function (see below)
      // TODO: call postMedia function (see below)
      // TODO: redirect to Home
      const token = localStorage.getItem('token');
      if (!token || !file) {
        return;
      }
      const fileResult = await postFile(file, token);
      const mediaResult = await postMedia(fileResult, inputs, token);
      alert(mediaResult);
      navigate('/');

    } catch (e) {
      console.log((e as Error).message);
    }
};

  //
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // files: valitse useamman file
    if (e.target.files) {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    }
};
  const {handleSubmit, handleInputChange, inputs} = useForm(doUpload, initValues);
  return (
      <>
          <h1>Upload</h1>
          <form onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="title">Title</label>
                  <input
                      name="title"
                      type="text"
                      id="title"
                      onChange={handleInputChange}
                  />
              </div>
              <div>
                  <label htmlFor="description">Description</label>
                  <textarea
                      name="description"
                      rows={5}
                      id="description"
                      onChange={handleInputChange}
                  ></textarea>
              </div>
              <div>
                  <label htmlFor="file">File</label>
                  <input
                      name="file"
                      type="file"
                      id="file"
                      accept="image/*, video/*"
                  onChange={handleFileChange}
                  />
              </div>
              <img
                  src={
                      file
                      ? URL.createObjectURL(file)
                      : 'https://via.placeholder.com/200?text=Choose+image'
                  }
                  alt="preview"
                  width="200"
              />
              <button
                  type="submit"
                  disabled={file && inputs.title.length > 3 ? false : true}
              >
                  Upload
              </button>
          </form>
      </>
  );
};

export default Upload;
