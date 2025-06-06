import React from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import type { Product } from "../model/IGrid";
import productData from './../data/products.json'

const Kendo1 = () => {
  return (
    <div style={{ padding: 20 }}>
      <h2>KendoReact Grid - Basic Example</h2>
      <Grid data={productData as Product[]}>
        <GridColumn field="id" title="ID" width="60px" />
        <GridColumn field="name" title="Product Name" />
        <GridColumn field="price" title="Price ($)" />
        <GridColumn field="category" title="Category" />
      </Grid>
    </div>
  );
};

export default Kendo1;
