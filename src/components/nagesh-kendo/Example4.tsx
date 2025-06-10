import * as React from "react";
import {
  Grid,
  GridColumn,
  type GridSelectionChangeEvent,
} from "@progress/kendo-react-grid";
import type { Car } from "../../model/IGrid";
import carData from "../../data/cars.json";

const Example4: React.FC = () => {
  const [selectedCell, setSelectedCell] = React.useState<{
    id: number;
    field: string;
  } | null>(null);

  const onSelectionChange = (
    e: GridSelectionChangeEvent & { field?: string }
  ) => {
    const { dataItem, field } = e;
    if (dataItem && field) {
      setSelectedCell({ id: dataItem.id, field });
    }
  };

  const dataWithSelection: Car[] = React.useMemo(() => {
    return (carData as Car[]).map((item) => {
      if (!selectedCell || item.id !== selectedCell.id) return item;
      return {
        ...item,
        [`${selectedCell.field}_selected`]: true,
      };
    });
  }, [selectedCell]);

const DATA_ITEM_KEY = "id";

  return (
    <div>
      <h2>Cell Selection</h2>
      <Grid
        style={{ height: "400px" }}
        data={dataWithSelection}
        dataItemKey={DATA_ITEM_KEY}
        navigatable={true}
        selectable={{
          enabled: true,
          cell: true,
          mode: "single",
        }}
        onSelectionChange={onSelectionChange}
      >
        <GridColumn field="id" title="ID" />
        <GridColumn field="brand" title="Brand" />
        <GridColumn field="model" title="Model" />
        <GridColumn field="year" title="Year" />
        <GridColumn field="color" title="Color" />
        <GridColumn field="price" title="Price" />
      </Grid>
    </div>
  );
};

export default Example4;
