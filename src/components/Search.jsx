import { useState } from "react";
import { Button } from "primereact/button";

import BuildingInput from "./BuildingInput";
import BuildingAssetsInput from "./BuildingAssetsInput";
import DateRangeInput from "./DateRangeInput";
import SearchResults from "./SearchResults";
import { Dialog } from "primereact/dialog";

const Search = () => {
  const [building, setBuilding] = useState(null);
  const [buildingAsset, setBuildingAsset] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [results, setResults] = useState([]);
  const [columns, setColumns] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBuildingChange = (selectedBuilding) => {
    setBuilding(selectedBuilding);
    setBuildingAsset(null);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          building,
          buildingAsset,
          dateRange,
          dataType: buildingAsset?.type,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();

      if (buildingAsset?.type === "room") {
        setColumns([
          { field: "date", header: "Date" },
          { field: "temperature", header: "Temperature" },
          { field: "humidity", header: "Humidity" },
        ]);
      } else if (buildingAsset?.type === "meter") {
        setColumns([
          { field: "date", header: "Date" },
          { field: "energy", header: "Energy Consumption" },
          { field: "cost", header: "Cost" },
        ]);
      }

      setResults(data);
      setShowResults(true);
    } catch (err) {
      setError("Unable to fetch data. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-wrapper">
      <div className="search-inputs">
        <BuildingInput onSelect={handleBuildingChange} value={building} />
        <BuildingAssetsInput
          buildingId={building?.id}
          onSelect={setBuildingAsset}
          value={buildingAsset}
        />
        <DateRangeInput onSelect={setDateRange} value={dateRange} />
      </div>
      <Button
        icon={isLoading ? "pi pi-spin pi-spinner" : "pi pi-search"}
        onClick={handleSearch}
        className="p-button-lg btn-search"
        disabled={isLoading || !building || !buildingAsset || !dateRange}
      />

      <SearchResults
        building={building?.name}
        asset={buildingAsset?.name}
        results={results}
        columns={columns}
        showResults={showResults}
        onHide={() => setShowResults(false)}
      />

      {/* Error Dialog */}
      {error && (
        <Dialog
          visible={!!error}
          onHide={() => setError(null)}
          dismissableMask
          showHeader={false}
          className="content-rounded"
        >
          <div className="flex flex-column align-items-center p-5 border-round">
            <div className="inline-flex justify-content-center align-items-center h-6rem w-6rem ">
              <i
                className="pi pi-exclamation-circle text-8xl"
                style={{ color: "#d45472" }}
              ></i>
            </div>
            <span className="font-bold text-2xl block mt-4">
              Something went wrong
            </span>
            <p className="mb-2">{error}</p>
            <div className="flex align-items-center gap-2 mt-4 mt-3 -mb-3">
              <Button
                label="Close"
                icon="pi pi-times"
                className="p-button-danger p-button-text"
                size="large"
                onClick={() => setError(null)}
              />
              <Button
                label="Retry"
                icon="pi pi-refresh"
                onClick={handleSearch}
                rounded
                size="large"
                className="p-button-warning ml-auto"
              />
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Search;
