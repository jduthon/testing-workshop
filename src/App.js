import logo from './logo.svg';
import './App.css';
import Converter from './converter';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Converter/>
      </header>
    </div>
  );
}

export default App;
