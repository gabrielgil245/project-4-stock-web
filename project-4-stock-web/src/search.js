import React, {useState, useEffect} from 'react';

function Search(props) {
    
    const [inputText, setInputText] = useState('');
    // const [quote, setQuote] = useState();
    const [ticker, setTicker] = useState();
    // const [buyQuantity, setBuyQuantity] = useState(0);

    useEffect(() => {
        
    })

    const fetchQuote = async () => {
        const res = await fetch(`http://localhost:3000/api/v1/portfolio/search/${inputText}`);
        let json = await res.json();
        // console.log(json);
        props.setQuote(json);
        setTicker(inputText);
        setInputText('');
    };

    const onInputChange = async (event) => {
        // console.log(event.currentTarget.value);
        setInputText(event.currentTarget.value);
    };

    const buyStock = async () => {
        
        if(props.buyQuantity <= 0){
            alert("Buy quantity must be greater than 0");
        }

        let cashNeeded = props.buyQuantity * props.quote.data.price;
        console.log('cashNeeded is', cashNeeded)
        if(cashNeeded > props.currentCash.value){
            alert("Not enough cash!");
        }else{
            let stockBody = {
                symbol: ticker,
                quantity: props.buyQuantity,
                price: props.quote.data.price
            }

            let options = {
                method: 'POST', 
                body: JSON.stringify(stockBody),
                headers: {}
            };
            options.headers["Accept"] = "application/json, text/plain, */*";
            options.headers["Content-Type"] = "application/json;charset=utf-8";
            console.log(options);

            const res = await fetch(`http://localhost:3000/api/v1/portfolio`, options);
            let json = await res.json();
            // console.log(json);
            props.setBuyQuantity(0);
            props.refreshCash();
            props.fetchCash();
            props.fetchPortfolio();
            alert("Success!");
        }
    }

    const onBuyChange = async (event) => {
        // console.log(event.currentTarget.value);
        props.setBuyQuantity(event.currentTarget.value);
    };

    return (
        <div className={'border p-2'}>

            <div className="grid grid-cols-12">
                <div className={'p-5 col-span-9'}>
                    <input value={inputText} onChange={onInputChange} type="text" className={'border w-full rounded border-gray-300 p-2'}/>
                </div>
                <div className={'col-span-3 flex items-stretch'}>
                    <span onClick={fetchQuote} className={'self-center align-center bg-gray-600 cursor-pointer rounded text-white text-xl p-2'}>Get Quote</span>
                </div>
            </div>

            {ticker && <div className="grid grid-cols-12">
                <div className={'border p-5 col-span-5'}>
                    <h1 className={'text-lg'}>
                        {ticker} : {props.quote && <span>{props.quote.data.currency} {props.quote.data.price}</span>}
                    </h1>
                </div>
                <div className={'border p-5 col-span-7'}>
                    <div className="grid grid-cols-12 gap-4">
                        <input type="number" onChange={onBuyChange} className={"border col-span-7"} value={props.buyQuantity} />
                        <span className={'bg-blue-600 cursor-pointer col-span-5 py-2 rounded text-white text-xl text-center'} onClick={buyStock}>Buy</span>
                    </div>                 
                </div>
            </div>}

        </div>
    );
}

export default Search;