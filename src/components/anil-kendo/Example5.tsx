import * as React from "react";
import { Grid, GridColumn as Column, GridColumn } from "@progress/kendo-react-grid";
import type { Product } from "../../model/IGrid";
import productData from "../../data/products.json";

const DATA_ITEM_KEY = "id";

const Example5 = () => {
  const [selectedID, setSelectedID] = React.useState<number | null>(null);
  const onRowClick = (e: any) => {
    console.log("e:", e.dataItem);
    setSelectedID(e.dataItem.id);
  };
  return (
    <div style={{ padding: 20 }}>
      <h2>Grid - Row selection</h2>
      <Grid
        style={{ height: "400px" }}
        data={productData.map((item) => ({
          ...item,
          selected: item.id === selectedID,
        }))}
        autoProcessData={true}
        dataItemKey={DATA_ITEM_KEY}
        selectable={{
          enabled: true,
          mode: "single",
        }}
        defaultSelect={{ 2: true }}
        navigatable={true}
        onRowClick={onRowClick}
      >
        <GridColumn field="id" title="ID" width="80px" />
        <GridColumn field="name" title="Product Name" />
        <GridColumn field="price" title="Price ($)" />
        <GridColumn field="category" title="Category" />
      </Grid>
    </div>
  );
};

export default Example5;
