import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";

const BuildingAssetsInput = ({ buildingId, onSelect, value }) => {
  const [assetOptions, setAssetOptions] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(value);

  useEffect(() => {
    if (!buildingId) {
      setSelectedAsset(null);
      setAssetOptions([]);
      return;
    }

    const fetchAssets = async () => {
      const response = await fetch(`/api/building-assets/${buildingId}`);
      const assets = await response.json();
      setAssetOptions(
        assets.map(({ id, name, type }) => ({
          label: name,
          value: { id, name, type },
        }))
      );
    };

    fetchAssets();
  }, [buildingId]);

  useEffect(() => {
    setSelectedAsset(value);
  }, [value]);

  return (
    <div className={`search-input ${value ? "active" : ""}`}>
      <label>Room or meter</label>
      <Dropdown
        value={selectedAsset}
        options={assetOptions}
        onChange={({ value }) => {
          setSelectedAsset(value);
          onSelect(value);
        }}
        placeholder="Choose a room or meter..."
        disabled={!buildingId}
      />
    </div>
  );
};

BuildingAssetsInput.propTypes = {
  buildingId: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.object,
};

export default BuildingAssetsInput;
