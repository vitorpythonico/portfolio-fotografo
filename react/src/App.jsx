import EmailBar from './components/EmailBar';
import Aside from './components/Aside';
import PhotoViewer from './components/PhotoViewer';

function App() {
  return (
    <>
      <EmailBar />
      <Aside />
      <div className="divisory"></div>
      <PhotoViewer/>
    </>
  )
}

export default App
