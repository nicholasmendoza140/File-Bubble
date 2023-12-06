import { useState, useEffect } from "react"

const Home = () => {

    const [file, setFile] = useState(null)
    const [files, setFiles] = useState(null)

    useEffect (() => {
        const fetchFiles = async () => {
            const response = await fetch('http://localhost:4000/api/files')
            const json = await response.json()
            if (response.ok) {
                setFiles(json)
            }
        }
        fetchFiles()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        if (file) {
            formData.append("file", file)
        }
        const response = await fetch('http://localhost:4000/api/files', {
            method: 'POST',
            body: formData,
        })

        const json = await response.json()

        if (response.ok) {
            setFile(null)
            console.log('File uploaded', json)
            document.getElementById('file').value=null
        }
    }
    

    return (
        <div className="home">
            <form className="uploadForm" onSubmit={handleSubmit}>
                <div className="icons-text">
                    <label for="file" className="file-upload">
                        <i className="material-icons">add</i> Upload
                    </label>
                </div>
                <input id="file" type="file" onChange={(e) => {
                    setFile(e.target.files[0]);
                    handleSubmit();
                }} />
            </form>
            <div className="files">
                {files && files.map((file) => (
                    <div className="files-list" key={file._id}>{file.filename}</div>
                ))}
            </div>
        </div>
    )
}

export default Home