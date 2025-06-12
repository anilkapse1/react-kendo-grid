import React from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import carsData from "../../data/cars.json";

const Example6 = () => {
  const CustomPriceCell = (props: any) => {
    const { dataItem, field } = props;
    const value = dataItem[field];
    const isExpensive = value > 10000;

    return (
      <td style={{ 
        color: isExpensive ? "red" : "green", 
        fontWeight: "bold",
        textAlign: "right",
      }}>
        ₹{value?.toLocaleString() || '0'}
      </td>
    );
  };

  return (
    <div>
      <h1>Custom Cell</h1>
      <Grid 
        data={carsData}
        style={{ height: "400px" }} 
      >
        <GridColumn field="id" title="ID" width="50px" />
        <GridColumn field="brand" title="Brand" />
        <GridColumn field="model" title="Model" />
        <GridColumn field="year" title="Year" />
        <GridColumn field="color" title="Color" />
        <GridColumn field="price" title="Price" cell={CustomPriceCell} />
      </Grid>
    </div>
  );
};

export default Example6;