import EmailBar from './components/EmailBar';
import Aside from './components/Aside';
import PhotoViewer from './components/PhotoViewer';
import { LoadPhotosProvider } from './contexts/LoadPhotosContext'

function App() {
  return (
    <>
      <EmailBar />
      <LoadPhotosProvider>
        <Aside/>
        <PhotoViewer/>
      </LoadPhotosProvider>
    </>
  )
}

export default App
