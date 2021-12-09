import React from "react";
import './App.css';
import store from './redux/store';
import PhoneForm from "./PhoneForm";
import PhoneList from "./PhoneList";

function App() {

  return (
    <div className="App">
        <PhoneForm store={store}/>
        <PhoneList store={store}/>
    </div>
  );
}

export default App;
