import logo from './logo.svg';
import './App.css';
import {useState} from "react";

function App() {
  const [code,setCode] = useState('');
  let res = parseInputToJson("rezrez");
  console.log(res);
  return (
    <div className="App">
      <header className="App-header">
        <input name={"code input"} value={code} onChange={(event) => {
          setCode(event.target.value);
        }}/>
      </header>
    </div>
  );
}

export default App;
