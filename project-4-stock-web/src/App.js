import logo from './logo.svg';
import './App.css';
import Search from "./search";
import Portfolio from "./portfolio";
import React, {useState, useEffect} from 'react';

function App() {

  const[currentCash, setCurrentCash] = useState();

    const fetchCash = async () => {
        const res = await fetch(`http://localhost:3000/api/v1/cash`);
        let json = await res.json();
        console.log(json);
        setCurrentCash(json);
    }

    useEffect(() => {
        console.log("Loads once at the start of the application");
        fetchCash();
    }, [])

  return (
    <>
      <div className={'w-full p-5 bg-blue-500'}>
        <h1 className={'text-2xl font-bold text-center text-white tracking-wider uppercase'}>
          Paper Trader
        </h1>
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-8">
          <Search currentCash={currentCash}
            setCurrentCash={setCurrentCash}/>
        </div>
        <div className="col-span-4">
          <Portfolio currentCash={currentCash}
            setCurrentCash={setCurrentCash}/>
        </div>
      </div>
  </>
  );
}

export default App;
