import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Action from './pages/Action';
import NotFound from './components/notFound';
import Sidebar from './components/sidebar';
import { Toaster } from 'react-hot-toast'
import { AppContextProvider } from './context/appState';
function App () {
  return (
    <AppContextProvider>
      <Toaster />
      <div className="flex">
        <Sidebar></Sidebar>
        <div className='flex-1  bg-white p-2 max-md:p-0 h-screen'>
          <Router>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/action' element={<Action />} />
              <Route path='*' exact={true} element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </div>
    </AppContextProvider>
  );
}

export default App;
