function Portfolio(props) {

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
                        <td className={'border text-center'}>Placeholder Stock</td>
                        <td className={'border text-center'}>200</td>
                        <td className={'border text-center'}>127</td>
                    </tr>
                </tbody>
            </table>

            <br/>
            <br/>
            <br/>

            {props.currentCash && <h1 className={'text-xl font-bold'}>
                Current Cash Value: ${props.currentCash.value}
            </h1>}
        </div>
    );
}

export default Portfolio;