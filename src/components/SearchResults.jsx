import PropTypes from "prop-types";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { SplitButton } from "primereact/splitbutton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const SearchResults = ({
  building,
  asset,
  results,
  columns,
  showResults,
  onHide,
}) => {
  const handleDownload = (format) => {
    alert(`Downloading: ${format.toUpperCase()}`);
  };

  const handleSave = () => {
    alert("Search saved successfully!");
  };

  return (
    <Dialog
      header={`Results for: ${building} - ${asset}`}
      visible={showResults}
      onHide={onHide}
      style={{ width: "800px" }}
      className="rounded"
      footer={
        <div className="flex justify-between">
          <Button
            label="Close"
            icon="pi pi-times"
            className="p-button-danger p-button-text"
            rounded
            onClick={onHide}
          />
          <div className="flex ml-auto btn-container">
            <Button
              label="Save Search"
              icon="pi pi-heart"
              outlined
              rounded
              onClick={handleSave}
            />
            <SplitButton
              label="Download CSV"
              icon="pi pi-download"
              rounded
              onClick={() => handleDownload("csv")}
              model={[
                {
                  label: "Download JSON",
                  icon: "pi pi-file",
                  command: () => handleDownload("json"),
                },
              ]}
            />
          </div>
        </div>
      }
    >
      <DataTable value={results}>
        {columns.map((col) => (
          <Column key={col.field} field={col.field} header={col.header} />
        ))}
      </DataTable>
    </Dialog>
  );
};

SearchResults.propTypes = {
  building: PropTypes.string.isRequired,
  asset: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      header: PropTypes.string.isRequired,
    })
  ).isRequired,
  showResults: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
};

export default SearchResults;
