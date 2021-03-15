import React, {useState, useEffect} from 'react';

function Portfolio(props) {

    const [selectedStock,setSelectedStock] = useState();
    const [currentStock,setCurrentStock] = useState([]);
    const [newQuantity, setNewQuantity] = useState(0);
    const [newQuote, setNewQuote] = useState();
    
    useEffect (() => {
        
    })  

    const selectedStockChange = async (event) => {
        console.log(event.currentTarget.value);
        setSelectedStock(event.currentTarget.value);
                        
        const res = await fetch(`http://localhost:3000/api/v1/portfolio/${event.currentTarget.value}`);
        let json = await res.json();
        console.log(json);
        setCurrentStock(json);   
    };

    const fetchQuote = async () => {
        let stock = currentStock[0];
        console.log(stock);
        let symbol = stock.symbol;
        console.log(symbol);
        const res = await fetch(`http://localhost:3000/api/v1/portfolio/search/${symbol}`);
        let json = await res.json();
        console.log(json);
        setNewQuote(json);
    };    

    // if(currentStock[0]) {
    //     fetchQuote();
    // }

    const onQuantityChange = async (event) => {
        // console.log(event.currentTarget.value);
        setNewQuantity(event.currentTarget.value);
    }

    const decreaseCash = async () => {
        let cashId = 1;
        let stockValue = newQuote.data.price;
        let newCash = props.currentCash.value - (stockValue * newQuantity);
        parseInt(newCash);
        
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
        props.setCurrentCash(newCash);
        props.fetchCash();
    }

    const purchaseStock = async () => {
        
        let stockBody = currentStock[0];
        console.log(currentStock);
        let stockId = JSON.stringify(stockBody.id);
        let stockSymbol = stockBody.symbol;
        let stockQuantity = parseInt(stockBody.quantity) + parseInt(newQuantity);
        let stockValue = stockBody.price;
        
        let newStockValue = parseInt(newQuote.data.price);
        let cashNeeded = newQuantity * newStockValue;
        if(cashNeeded > props.currentCash.value){
            alert("Not enough cash!");
        }else{
            let responseBody = {
                symbol: stockSymbol,
                quantity: stockQuantity,
                price: stockValue
            }
    
            let options = {
                method: 'PUT', 
                body: JSON.stringify(responseBody),
                headers: {}
            };
            options.headers["Accept"] = "application/json, text/plain, */*";
            options.headers["Content-Type"] = "application/json;charset=utf-8";
            console.log(options);
    
            const res = await fetch(`http://localhost:3000/api/v1/portfolio/${stockId}`, options);
            let json = await res.json();
            // console.log(json);
            setNewQuantity(0);
            decreaseCash();
            props.fetchCash();
            props.fetchPortfolio();
            alert("Success!");
            setSelectedStock(null);
        }
        
    }

    const increaseCash = async () => {
        let cashId = 1;
        let stockValue = newQuote.data.price;
        let parsedCurrentCash = parseInt(props.currentCash.value);
        let parsedStockValue = parseInt(stockValue);
        let newCash = parsedCurrentCash + (parsedStockValue * newQuantity);
        
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
        props.setCurrentCash(newCash);
        props.fetchCash();
    }

    const sellStock = async () => {
        
        let stockBody = currentStock[0];
        let stockId = JSON.stringify(stockBody.id);
        let stockSymbol = stockBody.symbol;
        let stockQuantity = parseInt(stockBody.quantity) - parseInt(newQuantity);
        let stockValue = stockBody.price;
        
        let currentQuantity = parseInt(stockBody.quantity);
        if(newQuantity > currentQuantity){
            alert("Not enough stocks!");
        }else{
            let responseBody = {
                symbol: stockSymbol,
                quantity: stockQuantity,
                price: stockValue
            }
    
            let options = {
                method: 'PUT', 
                body: JSON.stringify(responseBody),
                headers: {}
            };
            options.headers["Accept"] = "application/json, text/plain, */*";
            options.headers["Content-Type"] = "application/json;charset=utf-8";
            console.log(options);
    
            const res = await fetch(`http://localhost:3000/api/v1/portfolio/${stockId}`, options);
            let json = await res.json();
            // console.log(json);
            setNewQuantity(0);
            increaseCash();
            props.fetchCash();
            props.fetchPortfolio();
            alert("Success!");
            setSelectedStock(null);
        }

    }

    return (
        <div className={'border p-5'}>
            <h1 className={'text-xl font-bold'}>Portfolio</h1>
            {props.currentPortfolio && <table style={{width: '100%'}}>
                <thead>
                    <th className={'border'}>Stock</th>
                    <th className={'border'}>Quantity</th>
                    <th className={'border'}>Intial Value</th>
                    <th className={'border'}>Buy/Sell</th>
                </thead>
                <tbody>
                    {props.currentPortfolio.map((item, index) => {
                        return <tr key={index} className={'border'}>
                            <td className={'border text-center'}>{item.symbol}</td>
                            <td className={'border text-center'}>{item.quantity}</td>
                            <td className={'border text-center'}>{item.price}</td>
                            <input type="radio" 
                            className={'w-full'} 
                            checked={selectedStock == item.id}
                            value={item.id}
                            onChange = {selectedStockChange}></input>
                        </tr>
                    })}
                    
                </tbody>
            </table>}

            {!props.currentPortfolio && <h1 className={'text-lg font-bold'}>Loading...</h1>}
            {selectedStock ? <div className={"p-4 grid grid-cols-12 gap-4"}>
                {currentStock.map((item, index) => {
                return <div key={index} className={"col-start-3 col-span-12"}>{item.symbol}: you have {item.quantity} at {item.price} per share.</div>
                })}
                <input type="number" onClick={fetchQuote} onChange={onQuantityChange} className={"border col-start-5 col-span-6"} value={newQuantity} />
                <span onClick={purchaseStock} className={'bg-blue-600 cursor-pointer col-start-3 col-span-5 py-2 rounded text-white text-xl text-center'}>Buy</span>
                <span onClick={sellStock} className={'bg-red-600 cursor-pointer col-start-8 col-span-5 py-2 rounded text-white text-xl text-center'}>Sell</span>
            </div> : <div></div>}
                
            <div className={"grid grid-cols-12 gap-4"}>
                {props.currentCash && <h1 className={'text-xl font-bold col-start-3 col-span-12'}>
                    Current Cash Value: ${props.currentCash.value}
                </h1>}
            </div>
        </div>
    );
}

export default Portfolio;