import React from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import type { Product } from "../model/IGrid";

const Kendo1 = () => {
  const products: Product[] = [
    { id: 1, name: "iPhone", price: 999 },
    { id: 2, name: "Samsung", price: 899 },
    { id: 3, name: "OnePlus", price: 699 },
  ];
  return (
    <Grid data={products}>
      <GridColumn field="id" title="ID" />
      <GridColumn field="name" title="Product Name" />
      <GridColumn field="price" title="Price" />
    </Grid>
  );
};

export default Kendo1;
