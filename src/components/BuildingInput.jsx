import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { AutoComplete } from "primereact/autocomplete";

const BuildingInput = ({ onSelect, value }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    setSearchTerm(value?.name || "");
  }, [value]);

  const fetchBuildings = async (event) => {
    try {
      const response = await fetch(`/api/buildings?q=${event.query}`);
      const data = await response.json();
      setBuildings(data);
    } catch (error) {
      console.error("Failed to fetch buildings:", error);
    }
  };

  const handleSelection = (event) => {
    setSearchTerm(event.value.name);
    onSelect(event.value);
  };

  return (
    <div className={`search-input ${value ? "active" : ""}`}>
      <label>Building</label>
      <AutoComplete
        value={searchTerm}
        suggestions={buildings}
        completeMethod={fetchBuildings}
        field="name"
        onChange={(event) => setSearchTerm(event.value)}
        onSelect={handleSelection}
        placeholder="Type a building name..."
        forceSelection
        dropdown
      />
    </div>
  );
};

BuildingInput.propTypes = {
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.object,
};

export default BuildingInput;
