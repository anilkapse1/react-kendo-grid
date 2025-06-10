import React from "react";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import type { Product } from "../../model/IGrid";
import productData from "./../../data/products.json";

function Example1() {
  return (
    <div style={{ padding: 20 }}>
      <Grid data={productData as Product[]} style={{ height: "400px" }}>
        <GridToolbar>
          <strong>KendoReact Grid - Basic Example</strong>
        </GridToolbar>

        <GridColumn field="id" title="ID" width="60px" />
        <GridColumn field="name" title="Product Name" />
        <GridColumn field="price" title="Price ($)" />
        <GridColumn field="category" title="Category" />
      </Grid>
    </div>
  );
}

export default Example1;
