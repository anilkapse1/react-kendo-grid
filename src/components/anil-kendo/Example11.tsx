import React, { useState } from "react";
import { Grid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
import type { GridSelectionChangeEvent, GridHeaderSelectionChangeEvent } from "@progress/kendo-react-grid";
import type { Product } from "../../model/IGrid"; // Ensure Product includes `id`
import productData from "../../data/products.json";
import type { SelectDescriptor } from "@progress/kendo-react-data-tools";

const DATA_ITEM_KEY = "id";

const Example11: React.FC = () => {
  const [dataState] = useState<Product[]>(productData);

  const [select, setSelect] = React.useState<SelectDescriptor>({});
  // Row checkbox selection

  const handleSelectionChange = React.useCallback((event: GridSelectionChangeEvent) => {
    setSelect(event.select);
  }, []);

  const handleHeaderSelectionChange = React.useCallback((event: GridHeaderSelectionChangeEvent) => {
    setSelect(event.select);
  }, []);

  // Get selected row data based on `select` object
  const selectedData = dataState.filter((item) => select[item[DATA_ITEM_KEY]]);
  console.log('selected data is:', selectedData);
  
  console.log("selecte is:", select);
  return (
    <div style={{ padding: 20 }}>
      <Grid
        data={dataState}
        dataItemKey={DATA_ITEM_KEY}
        style={{ maxHeight: "600px" }}
        selectable={{
          enabled: true,
          drag: false,
          cell: false,
          mode: "multiple",
        }}
        select={select}
        onSelectionChange={handleSelectionChange}
        onHeaderSelectionChange={handleHeaderSelectionChange}
      >
        <GridToolbar>
          <strong>KendoReact Grid – Checkbox Row Selection</strong>
        </GridToolbar>

        <Column columnType="checkbox" width="50px" />
        <Column field="id" title="ID" width="80px" />
        <Column field="name" title="Name" />
        <Column field="category" title="Category" />
        <Column field="price" title="Price ($)" />
      </Grid>
    </div>
  );
};

export default Example11;
