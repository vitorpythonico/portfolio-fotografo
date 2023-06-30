import { useState, useRef } from 'react'
import { api } from '../../../../services/api'
import IncludePhotoMetadata from './IncludePhotoMetadata'

import folderIcon from '../../../../assets/icons/folder-icon.svg'
import styles from './UploadPhoto.module.css'

export default function UploadPhoto() {
	const [filename, setFilename] = useState();
	const [size, setSize] = useState();
	const [progress, setProgress] = useState(0);
	const [uploading, setUploading] = useState(false);
	const [uploaded, setUploaded] = useState(false);
	const [msg, setMsg] = useState({});

  const progressBarRef = useRef();

  const handlerMessages = () => {
    if (Object.keys(msg).length > 0) {
    	setTimeout(() => {
    		if (msg.type === 'sucess' ) setUploaded(true)
	      setMsg({});
	    }, 2000)
    }
    return <p className={msg.type === 'sucess' ? styles.sucessMessage : styles.errorMessage}>{msg.msg}</p>
  }

	const handlerProgressBar = (percent) => {
    progressBarRef.current.style.width = `${percent}%`;
  }
	
  const onUploadProgress = (e) => {
    const percent = Math.floor((e.loaded / e.total) * 100);
    setProgress(percent);
    handlerProgressBar(percent);
  }

  const handlerUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
    	const file_size = file.size >= 1024 ? (file.size / 1024 / 1024).toFixed(2) + ' MB' : file.size + ' KB';
	  	setFilename(file.name)

      setSize(file_size);

      try {
    	  const formData = new FormData();
  	    formData.append('file', file);
  	    setUploading(true);
	      const response = await api.post('/photos/upload', formData, 
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
          }
        );
        if (response.status === 200) {
        	setUploading(false);
        	setMsg({
        		msg: response.data.msg,
        		type: 'sucess'
        	})
        }

    	} catch (AxiosError) {
      	setUploading(false);
      	setMsg({
      		msg: AxiosError.response.data.error,
      		type: 'error'
      	});
    	}	
  	}
  }

	return (
		<>
			<div className={styles.container}>
				{
					!uploading ?
						<>
							<form>
								<input onChange={handlerUpload} id="file" name="file" type="file"/>
								<label htmlFor="file">
									Adicionar foto
									<img src={folderIcon} alt="ícone de adicionar foto" />
								</label>
							</form>
						</>
					: 
						<>
							<section className={styles.progressArea}>
								<span className={styles.name}> {filename} </span>
								<span className={styles.percent}> {progress}% </span>
								<div className={styles.progressBar}>
									<div ref={progressBarRef} className={styles.progress}></div>
								</div>
							</section>
						</>
				}
				{ handlerMessages() }
				{
					uploaded ?
						<>
							<section className={styles.uploadedArea}>
								<span className={styles.name}> {filename} </span>
								<span className={styles.size}> {size} </span>
							</section>
							<div className={styles.divisory}></div>
							<IncludePhotoMetadata filename={filename}/>
						</>
					: null
				}
			</div>
		</>
	)
}