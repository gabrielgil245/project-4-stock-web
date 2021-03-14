import React, {useState, useEffect} from 'react';

function Portfolio(props) {

    const [selectedStock,setSelectedStock] = useState();
    const [currentStock,setCurrentStock] = useState([]);
    const [newQuantity, setNewQuantity] = useState(0)
    
    useEffect (() => {
        
    })

    const selectedStockChange = async (event) => {
        // console.log(event.currentTarget.value);
        setSelectedStock(event.currentTarget.value);
                        
        const res = await fetch(`http://localhost:3000/api/v1/portfolio/${event.currentTarget.value}`);
        let json = await res.json();
        // console.log(json);
        setCurrentStock(json);
    };
    
    const onQuantityChange = async (event) => {
        // console.log(event.currentTarget.value);
        setNewQuantity(event.currentTarget.value);
    }

    const increaseStock = async () => {
        
        let stockBody = currentStock[0];
        let stockId = JSON.stringify(stockBody.id);
        let stockSymbol = stockBody.symbol;
        let stockQuantity = parseInt(stockBody.quantity) + parseInt(newQuantity);
        let stockValue = stockBody.price;
        
        // console.log(stockBody);
        // console.log(stockId);
        // console.log(stockSymbol);
        // console.log(stockQuantity);
        // console.log(stockValue);
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
        console.log(json);
        setNewQuantity(0);
        props.fetchPortfolio();
        alert("Success!");
        setSelectedStock(null);
    }

    const decreaseStock = async () => {
        
        let stockBody = currentStock[0];
        let stockId = JSON.stringify(stockBody.id);
        let stockSymbol = stockBody.symbol;
        let stockQuantity = parseInt(stockBody.quantity) - parseInt(newQuantity);
        let stockValue = stockBody.price;
        
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
        console.log(json);
        setNewQuantity(0);
        props.fetchPortfolio();
        alert("Success!");
        setSelectedStock(null);

    }

    return (
        <div className={'border p-5'}>
            <h1 className={'text-xl font-bold'}>Portfolio</h1>
            {props.currentPortfolio && <table style={{width: '100%'}}>
                <thead>
                    <th className={'border'}>Stock</th>
                    <th className={'border'}>Quantity</th>
                    <th className={'border'}>Value</th>
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
                            checked={selectedStock === item.symbol}
                            value={item.symbol}
                            onChange = {selectedStockChange}></input>
                        </tr>
                    })}
                    
                </tbody>
            </table>}

            {!props.currentPortfolio && <h1 className={'text-lg font-bold'}>Loading...</h1>}
            <br/>
            
            {selectedStock ? <div className={"grid grid-cols-12 gap-4"}>
                {currentStock.map((item, index) => {
                return <div key={index} className={"col-start-3 col-span-12"}>{item.id} : {item.symbol}: you have {item.quantity} at {item.price} per share.</div>
            })}
                <input type="number" onChange={onQuantityChange} className={"border col-start-5 col-span-6"} value={newQuantity} />
                <span onClick={increaseStock} className={'bg-blue-600 cursor-pointer col-start-3 col-span-5 py-2 rounded text-white text-xl text-center'}>Buy</span>
                <span onClick={decreaseStock} className={'bg-red-600 cursor-pointer col-start-8 col-span-5 py-2 rounded text-white text-xl text-center'}>Sell</span>
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