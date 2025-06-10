import React from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import carsData from "../../data/cars.json";

const CarGrid = () => {
  const CustomPriceCell = (props: any) => {
    const { dataItem, field } = props;
    const value = dataItem[field];
    const isExpensive = value > 50000;

    return (
      <td style={{ color: isExpensive ? "red" : "green", fontWeight: "bold" }}>
        ${value.toLocaleString()}
      </td>
    );
  };
  return (
    <div>
      <h1>Custom cell</h1>
      <Grid data={carsData}>
        <GridColumn field="id" title="ID" width="50px" />
        <GridColumn field="make" title="Make" />
        <GridColumn field="model" title="Model" />
        <GridColumn field="price" title="Price" cell={CustomPriceCell} />
      </Grid>
    </div>
  );
};

export default CarGrid;
