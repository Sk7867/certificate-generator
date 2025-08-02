import { useRef, useState } from 'react';
import { FiUpload, FiFile, FiX } from 'react-icons/fi';
import './FileUpload.css';

interface IFileUploadProps {
  label?: string;
  fileType?: string;
  onFileSelect?: (file: File | null) => void;
}

const FileUpload: React.FC<IFileUploadProps> = ({
  label = 'Upload Certificate Template',
  fileType = 'application/pdf',
  onFileSelect
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      onFileSelect?.(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      onFileSelect?.(e.dataTransfer.files[0]);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    onFileSelect?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the input value
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <div className="file-upload-container">
      <h3 className="file-upload-title">{label}</h3>

      <div
        className={`file-upload-dropzone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          id="file-upload"
          accept={fileType}
          className="file-upload-input"
          onChange={handleFileChange}
          ref={fileInputRef}
        />

        {!file ? (
          <div className="file-upload-empty">
            <FiUpload className="file-upload-icon" />
            <p className="file-upload-hint">Drag & drop your file here or click to browse</p>
            <p className="file-upload-hint">PDF only</p>
          </div>
        ) : (
          <div className="file-upload-preview">
            <FiFile className="file-upload-icon" />
            <span className="file-upload-name">{file.name}</span>
            <button
              onClick={removeFile}
              className="file-upload-remove"
              aria-label="Remove file"
            >
              <FiX />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;