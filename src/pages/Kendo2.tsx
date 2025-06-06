import React, {useState} from 'react'
import {Grid, GridColumn as Column} from "@progress/kendo-react-grid";
import Cars from "../data/cars.json";
import type { Car } from "../model/IGrid";


const Kendo2 = () => {

  const [data, setData]= useState<Array<Car>>(Cars);

  return (
    <Grid
    data={data}
    autoProcessData={true}
    sortable={true}
    pageable={true}
    editable={true}
    filterable={true}
    defaultSkip={0}
    defaultTake={10}
    >
      <Column field="id" title="ID" ></Column>
      <Column field="brand" title="Brand" ></Column>
      <Column field="model" title="Model" ></Column>
      <Column field="year" title="Year" ></Column>
      <Column field="color" title="Coor" ></Column>
      <Column field="price" title="Price" ></Column>
    </Grid>
  );
};

export default Kendo2