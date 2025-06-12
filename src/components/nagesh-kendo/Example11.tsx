import React, { useState } from "react";
import {
  Grid,
  GridColumn as Column,
} from "@progress/kendo-react-grid";
import type { Car } from "../../model/IGrid";
import carData from "../../data/cars.json";

const Example11: React.FC = () => {
  const [data] = useState<Car[]>(carData);

  return (
    <div style={{ padding: 20 }}>
      <h1>Cars Grid - Multi Column Headers</h1>
      <Grid data={data} style={{ height: "500px" }}>
        <Column field="id" title="ID" />
        <Column title="Car Details">
          <Column field="brand" title="Brand" />
          <Column field="model" title="Model" />
        </Column>
        <Column field="color" title="Color"  />
        <Column title="Price Details">
          <Column field="year" title="Year" />
          <Column field="price" title="Price" />
        </Column>
      </Grid>
    </div>
  );
};

export default Example11;
