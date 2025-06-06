import * as React from "react";
import { Grid, GridColumn as Column, type GridSelectionChangeEvent } from "@progress/kendo-react-grid";
import type { Product } from "../../model/IGrid";
import productData from "../../data/products.json";

const DATA_ITEM_KEY = "id";

const Example4 = () => {
  const [selectedCell, setSelectedCell] = React.useState<{ id: number; field: string } | null>(null);

  const onSelectionChange = (e: GridSelectionChangeEvent) => {
    const { endDataItem } = e;
    console.log("data item is:", endDataItem);
    setSelectedCell({ id: endDataItem.id, field: endDataItem });
  };

  const dataWithSelection = React.useMemo(() => {
    return productData.map((item) => {
      if (!selectedCell || item.id !== selectedCell.id) return item;
      return {
        ...item,
        [`${selectedCell.field}_selected`]: true,
      };
    });
  }, [selectedCell]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Grid - Cell selection</h2>
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
        <Column field="id" title="ID" width="80px" selectedField="id_selected" />
        <Column field="name" title="Product Name" selectedField="name_selected" />
        <Column field="price" title="Price ($)" selectedField="price_selected" />
        <Column field="category" title="Category" selectedField="category_selected" />
      </Grid>
    </div>
  );
};

export default Example4;
