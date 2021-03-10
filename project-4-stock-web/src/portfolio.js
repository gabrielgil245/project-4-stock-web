import React, {useState, useEffect} from 'react';

function Portfolio(props) {

    const[currentCash, setCurrentCash] = useState();

    const fetchCash = async () => {
        const res = await fetch(`http://localhost:3000/api/v1/cash`);
        let json = await res.json();
        console.log(json);
    }

    useEffect(() => {
        fetchCash();
    }, [])

    return (
        <div className={'border p-5'}>

            <h1 className={'text-xl font-bold'}>Portfolio</h1>
            <table style={{width: '100%'}}>
                <thead>
                    <th className={'border'}>Stock</th>
                    <th className={'border'}>Quantity</th>
                    <th className={'border'}>Value</th>
                </thead>
                <tbody>
                    <tr className={'border'}>
                        <td className={'border text-center'}>AAPL</td>
                        <td className={'border text-center'}>200</td>
                        <td className={'border text-center'}>127</td>
                    </tr>
                </tbody>
            </table>

            <br/>
            <br/>
            <br/>

            {currentCash && <h1 className={'text-xl font-bold'}>
                Current Wallet Value: ${currentCash.value}
            </h1>}
        </div>
    );
}

export default Portfolio;