import './App.css'
import FileUpload from './components/FileUpload'
import Header from './components/Header'

function App() {

  const handleFileSelect = (file: File | null) => {
    console.log('Selected file:', file);
  };

  return (
    <>
      <Header />
      <main className="main">
        <FileUpload
          label="Upload Certificate Template"
          fileType="application/pdf"
          onFileSelect={handleFileSelect}
        />
      </main>
    </>
  )
}

export default App
