import * as React from "react";
import {
  Grid,
  GridColumn as Column,
  type GridRowClickEvent,
} from "@progress/kendo-react-grid";
import type { Car } from "../../model/IGrid";
import carData from "../../data/cars.json";

const Example5: React.FC = () => {
  const [selectedID, setSelectedID] = React.useState<number | null>(null);

  const onRowClick = (e: GridRowClickEvent) => {
    setSelectedID(e.dataItem.id);
  };

  const gridData: Car[] = (carData as Car[]).map((item) => ({
    ...item,
    selected: item.id === selectedID,
  }));
  const DATA_ITEM_KEY = "id";

  return (
    <div>
      <h2>Row Selection</h2>
      <Grid
        style={{ height: "400px" }}
        data={gridData}
        selectable={{ enabled: true, mode: "multiple" }}
        navigatable={true}
        dataItemKey={DATA_ITEM_KEY}
        onRowClick={onRowClick}
      >
        <Column field="id" title="ID" />
        <Column field="brand" title="Brand" />
        <Column field="model" title="Model" />
        <Column field="year" title="Year" />
        <Column field="color" title="Color" />
        <Column field="price" title="Price" />
      </Grid>
    </div>
  );
};

export default Example5;
