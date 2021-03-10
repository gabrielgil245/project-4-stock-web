import React, {useState, useEffect} from 'react';

function Search(props) {
    
    const [inputText, setInputText] = useState('');
    const [quote, setQuote] = useState();
    const [ticker, setTicker] = useState();
    const [buyQuantity, setBuyQuantity] = useState(0);


    useEffect(() => {

    })


    const fetchQuote = async () => {
        const res = await fetch(`http://localhost:3000/api/v1/portfolio/search/${inputText}`);
        let json = await res.json();
        console.log(json);
        setQuote(json);
        setTicker(inputText);
        setInputText('');
    };

    const onInputChange = async (event) => {
        // console.log(event.currentTarget.value);
        setInputText(event.currentTarget.value);
    };

    const onBuyChange = async (event) => {
        console.log(event.currentTarget.value)
        setBuyQuantity(event.currentTarget.value);
        if(buyQuantity <= 0){
            alert("Buy quantity must be greater than 0");
        }
        
        let cashNeeded = buyQuantity * quote.data.price;
        console.log('cashNeed is', cashNeeded)

        // if(cashNeeded > currentWallet.value){
        //     alert("Not enough cash");
        // } else{
        //     let body = {
        //         symbol: ticker,
        //         quantity:buyQuantity,
        //         price: quote.data.price
        //     }

        // }
    };

    const buyStock = async () => {
        //stock symbol
        //stock quote
    }

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
                <div className={'border p-5 col-span-4'}>
                    {ticker && <h1 className={'text-lg'}>
                        {ticker} : {quote && <span>{quote.data.currency} {quote.data.price}</span>}
                    </h1>}
                </div>
                <div className={'border p-5 col-span-8'}>
                    <input type="number" onChange={onBuyChange} className={"border"} value={buyQuantity} />
                    <span className={'bg-blue-600 cursor-pointer p-2 rounded text-white text-xl mx-5 px-5'} onClick={buyStock}>Buy</span>
                    <span className={'bg-red-600 cursor-pointer p-2 rounded text-white text-xl px-5'}>Sell</span>

                </div>
            </div>}

        </div>
    );
}

export default Search;