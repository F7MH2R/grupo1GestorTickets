import React, { useState } from 'react';
import axios from 'axios';

const UploadFiles = ({ ticketId }) => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        setFiles(event.target.files);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        for (let file of files) {
            formData.append('files', file);
        }

        await axios.post(`/api/ticket/${ticketId}/files`, formData);
        alert("Archivos subidos correctamente.");
    };

    return (
        <div>
            <input type="file" multiple onChange={handleFileChange} />
            <button onClick={handleSubmit}>Subir Archivos</button>
        </div>
    );
};

export default UploadFiles;
