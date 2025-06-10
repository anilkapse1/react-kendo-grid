import * as React from "react";
import { Grid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
import productData from "../../data/products.json";
import type { Product } from "../../model/IGrid";

const Example12 = () => {
  // STEP 1: GET THE LOCKED FIELD
  const lockedFields = Array.from(new Set(productData.flatMap((item) => item.locked.split(",").map((str) => str.trim()))));
  console.log("lockedFields:", lockedFields);

  // STEP 2: GET THE ALL UNIQUE FIELD NAME
  const columnFields = productData.length > 0 ? Object.keys(productData[0]).filter((key) => key !== "locked") : [];
  console.log("columnFields", columnFields);

  // Step 3: Generate column config dynamically
  const columnConfig = columnFields.map((field) => ({
    field,
    title: field.charAt(0).toUpperCase() + field.slice(1), // Capitalize title
    width: "150px",
  }));

  return (
    <div style={{ padding: 20 }}>
      <Grid data={productData} scrollable="scrollable" style={{ height: "400px", width: "600px" }}>
        <GridToolbar>
          <strong>dKendoReact Grid – Locked column/ Column creation dynamically</strong>
        </GridToolbar>
        {columnConfig.map((col) => (
          <Column key={col.field} field={col.field} title={col.title} width={col.width} locked={lockedFields.includes(col.field)} />
        ))}
      </Grid>
    </div>
  );
};

export default Example12;
