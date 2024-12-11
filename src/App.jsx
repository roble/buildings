import Search from "./components/Search";

function App() {
  return (
    <>
      <div className="navbar">
        <div className="container logo py-0">OPN Buildings</div>
      </div>

      <div className="container">
        <div className="search-container">
          <h1 className="search-title">Search Building Metrics</h1>
          <Search />
        </div>
      </div>
    </>
  );
}

export default App;
