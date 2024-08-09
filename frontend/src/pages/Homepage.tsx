import { TitleInput } from "../components/TitleInput";
import {  useState } from "react";
import { DescriptionInput } from "../components/DescriptionInput";
import { VideoInput } from "../components/VideoInput";
import { UploadButton } from "../components/UploadButton";
import axios from "axios";
import { Navbar } from "../components/Navbar";


export const HomePage = ()=>{
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const formData = new FormData()

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setFile(file);
    } else {
      alert('Please select a video file');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Select a video file to upload');
      return;
    }
    if (!title || !description) {
      alert('Enter the title and description of the video...!');
      return;
    }
    setUploading(true);
    formData.append('videoToBeUploaded', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/data/uploadVideo',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
          timeout: 30000,
          timeoutErrorMessage: 'TIme out ',
        }
      );
      if (response.status == 200 && response.data) {
        alert('Video uploaded successfully!');
        setUploading(false);
      }
    } catch (error) {
      setUploading(false);
      console.log('Error while uploading, ', error);
    }
  };
  
    return (
      <div>
        <Navbar />
        <div className="flex flex-col justify-center h-screen w-full bg-slate-950">
          <div className="flex justify-center w-full ">
            <div className="w-full">
              <div className="flex justify-center">
                <div className="w-4/12">
                  <TitleInput
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    title={title}
                  />
                  <DescriptionInput
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    description={description}
                  />
                  <VideoInput onChange={handleFileChange} />
                  {!uploading && <UploadButton onClick={handleUpload} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}