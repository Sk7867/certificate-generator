// import { useState } from 'react';
import './App.css'
import FileUpload from './components/FileUpload'
import Header from './components/Header'
// import extractPlaceholders from './utils/extractPlaceholders';

function App() {
  // const [templatePlaceHolders, setTemplatePlaceHolders] = useState<string[]>([])

  const handleFileSelect = (file: File | null) => {
    console.log('Selected file:', file);
    if (file) {
      // const placeholders = extractPlaceholders(file);
      // console.log('Extracted placeholders:', placeholders);
    }
  };

  const handleExcelFileSelect = (file: File | null, data: unknown | unknown[]) => {
    console.log('Selected Excel file:', file);
    console.log('Parsed data:', data);
  }

  return (
    <>
      <Header />
      <main className="main">
        <section className='file-upload-section'>
          <FileUpload
            label="Upload Certificate Template"
            fileType="PDF"
            onFileSelect={handleFileSelect}
          />
          <FileUpload
            label="Upload Participant Template"
            fileType=".xlsx, .csv"
            processData={true}
            onFileSelect={handleExcelFileSelect}
          />
        </section>
      </main>
    </>
  )
}

export default App
