import './App.css';
import Search from "./search";
import Portfolio from "./portfolio";
import React, {useState, useEffect} from 'react';

function App() {

  const[currentCash, setCurrentCash] = useState();
  const[currentPortfolio, setCurrentPortfolio] = useState();
  const [quote, setQuote] = useState();
  const [buyQuantity, setBuyQuantity] = useState(0);
  
  const resetCash = async () => {
    let cashId = 1;  
    let cashBody = {
      value: 100000
    }

    let options = {
    method: 'PUT', 
    body: JSON.stringify(cashBody),
    headers: {}
    };
    options.headers["Accept"] = "application/json, text/plain, */*";
    options.headers["Content-Type"] = "application/json;charset=utf-8";
    // console.log(options);

    const res = await fetch(`http://localhost:3000/api/v1/cash/${cashId}`, options);
    
    const resTwo = await fetch(`http://localhost:3000/api/v1/portfolio`);
    let ids = await resTwo.json();
    for (let item of ids) { 

      let options = {
        method: 'DELETE', 
        headers: {}
      };
      options.headers["Accept"] = "application/json, text/plain, */*";
      options.headers["Content-Type"] = "application/json;charset=utf-8";
      // console.log(options);
    
      const resThree = await fetch(`http://localhost:3000/api/v1/portfolio/${item.id}`, options)
    
    }
    const resFour = await fetch(`http://localhost:3000/api/v1/portfolio`);
    let emptyTable = await resFour.json();
    setCurrentPortfolio(emptyTable);
    
    const response = await fetch (`http://localhost:3000/api/v1/cash/`);
    const newCash = await response.json();
    setCurrentCash(newCash);
  }
  
  const fetchCash = async () => {
    const res = await fetch(`http://localhost:3000/api/v1/cash`);
    let cash = await res.json();

    if(cash.value <= 0){
      let cashBody = {
        value: 100000
      }

      let options = {
      method: 'PUT', 
      body: JSON.stringify(cashBody),
      headers: {}
      };
      options.headers["Accept"] = "application/json, text/plain, */*";
      options.headers["Content-Type"] = "application/json;charset=utf-8";
      // console.log(options);

      const response = await fetch(`http://localhost:3000/api/v1/cash/${cash.id}`, options);
    }        
    const retrieve = await fetch(`http://localhost:3000/api/v1/cash`);
    let json = await retrieve.json();
    console.log(json)
    setCurrentCash(json);
  }
  
  const fetchPortfolio = async (stockId, currentQuantity) => {
    const res = await fetch(`http://localhost:3000/api/v1/portfolio`);
    let ids = await res.json();
    for (let item of ids) {
      // console.log(item.quantity);
      if(item.quantity <= 0){
        
      let options = {
          method: 'DELETE', 
          headers: {}
      };
      options.headers["Accept"] = "application/json, text/plain, */*";
      options.headers["Content-Type"] = "application/json;charset=utf-8";
      console.log(options);
      
      const response = await fetch(`http://localhost:3000/api/v1/portfolio/${item.id}`, options)
      }
    }
    const retrieve = await fetch(`http://localhost:3000/api/v1/portfolio`);
    let json = await retrieve.json();
    console.log(json);
    setCurrentPortfolio(json);
    
  }

  const refreshCash = async () => {
    let cashId = 1;
    let value = currentCash.value;
    let newCash = value - (quote.data.price * buyQuantity);

    let cashBody = {
      value: newCash
    }

    let options = {
      method: 'PUT', 
      body: JSON.stringify(cashBody),
      headers: {}
    };
    options.headers["Accept"] = "application/json, text/plain, */*";
    options.headers["Content-Type"] = "application/json;charset=utf-8";
    console.log(options);

    const res = await fetch(`http://localhost:3000/api/v1/cash/${cashId}`, options);
    console.log(newCash);
    setCurrentCash(newCash);
    fetchCash();
  }

  useEffect(() => {
    console.log("Loads once at the start of the application");
    fetchCash();
    fetchPortfolio();
  }, [])
    
    return (
    <>
      <div className={'grid grid-cols-12 gap-4 p-5 bg-blue-500'}>
        <h1 className={'text-4xl col-span-8 font-bold text-center text-white tracking-wider uppercase'}>
          Paper Trader
        </h1>
        <span onClick={resetCash} className={'bg-gray-500 cursor-pointer col-span-2 py-2 rounded text-white text-xl text-center'}>
          Reset
        </span>
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-6">
          <Search currentCash={currentCash}
            setCurrentCash={setCurrentCash}
            fetchCash={fetchCash}
            fetchPortfolio={fetchPortfolio}
            quote={quote}
            setQuote={setQuote}
            buyQuantity={buyQuantity}
            setBuyQuantity={setBuyQuantity}
            refreshCash={refreshCash}/>
        </div>
        <div className="col-span-6">
          <Portfolio currentCash={currentCash}
            setCurrentCash={setCurrentCash}
            currentPortfolio={currentPortfolio}
            setCurrentPortfolio={setCurrentPortfolio}
            fetchPortfolio={fetchPortfolio}
            fetchCash={fetchCash}/>
        </div>
      </div>
  </>
  );
}

export default App;
