import { ToastContainer } from 'react-toastify';
import Weather from './components/Weather/Weather';
import './App.css';

function App() {
  return (
    <div className="App">
      <Weather />
      <ToastContainer autoClose={3500}></ToastContainer>
    </div>
  );
}

export default App;
