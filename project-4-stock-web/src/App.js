import logo from './logo.svg';
import './App.css';
import Search from "./search";
import Portfolio from "./portfolio";

function App() {
  return (
    <>
      <div className={'w-full p-5 bg-blue-500'}>
        <h1 className={'text-2xl font-bold text-center text-white tracking-wider uppercase'}>
          Paper Trader
        </h1>
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-8">
          <Search />
        </div>
        <div className="col-span-4">
          <Portfolio />
        </div>
      </div>
  </>
  );
}

export default App;
