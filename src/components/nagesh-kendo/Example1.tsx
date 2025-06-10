import React, { useState } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import carData from "../../data/cars.json";
import type { Car } from "../../model/IGrid";

const Kendo2 = () => {
  const [data, setData] = useState<Array<Car>>(carData);

  return (
    <>
      <h1>Grid Table</h1>
      <Grid data={data}>
        <Column field="id" title="ID"></Column>
        <Column field="brand" title="Brand"></Column>
        <Column field="model" title="Model"></Column>
        <Column field="year" title="Year"></Column>
        <Column field="color" title="Color"></Column>
        <Column field="price" title="Price"></Column>
      </Grid>
    </>
  );
};

export default Kendo2;
