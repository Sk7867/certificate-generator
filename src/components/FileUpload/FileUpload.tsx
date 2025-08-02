import { useRef, useState } from 'react';
import { FiUpload, FiFile, FiX, FiFileText, FiFileMinus } from 'react-icons/fi';
import './FileUpload.css';
import * as XLSX from 'xlsx';
import parseCsv from '../../utils/parseCsv';

interface IFileUploadProps {
  label?: string;
  fileType?: string;
  processData?: boolean;
  onFileSelect?: (file: File | null, data?: unknown | unknown[]) => void;
}

const FileUpload: React.FC<IFileUploadProps> = ({
  label = 'Upload Certificate Template',
  fileType = 'PDF',
  onFileSelect,
  processData = false,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // setFile(e.target.files[0]);
      // onFileSelect?.(e.target.files[0]);
      await processFile(e.target.files[0]);
    }
  };

  const handleDragOver = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = async (file: File) => {
    try {
      setFile(file);

      if (processData) {
        const data = await parseFileData(file);
        onFileSelect?.(file, data);
      } else {
        onFileSelect?.(file);
      }
    } catch (error) {
      setFile(null);
      console.error('Error processing file:', error);
    }
  };

  const parseFileData = async (file: File): Promise<unknown[]> => {
    const fileType = file.name.split('.').pop()?.toLowerCase();

    if (fileType === 'csv') {
      // const text = await file.text();
      // return parseCSV(text);
      try {
        const data = await parseCsv(file);
        console.log('Parsed CSV data:', data);
        return data as unknown[];
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error parsing CSV file:', error.message);
        } else {
          console.error('Error parsing CSV file:', error);
        }

      }
    } else if (fileType === 'xlsx') {
      const arrayBuffer = await file.arrayBuffer();
      return parseExcel(arrayBuffer);
    }
    throw new Error('Unsupported file format for data processing');
  };

  const parseExcel = (arrayBuffer: ArrayBuffer) => {
    const workbook = XLSX.read(arrayBuffer);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    return XLSX.utils.sheet_to_json(worksheet);
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

  const getFileIcon = () => {
    if (!file) return <FiUpload className="file-upload-icon" />;

    const extension = file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'csv':
        return <FiFileText className="file-upload-icon" />;
      case 'xlsx':
        return <FiFileMinus className="file-upload-icon" />;
      default:
        return <FiFile className="file-upload-icon" />;
    }
  };

  const getFileHint = () => {
    if (fileType.includes('csv')) {
      return 'CSV or XLSX only';
    }
    return fileType.split(',').map(ext => ext.replace('.', '').toUpperCase()).join(' or ') + ' only';
  };

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
            {getFileIcon()}
            <p className="file-upload-hint">Drag & drop your file here or click to browse</p>
            <p className="file-upload-hint">{getFileHint()}</p>
          </div>
        ) : (
          <div className="file-upload-preview">
            {getFileIcon()}
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