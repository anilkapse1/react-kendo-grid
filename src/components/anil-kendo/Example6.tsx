import React from "react";
import { Grid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
import productData from "../../data/products.json";
import type { GridCellProps } from "@progress/kendo-react-grid";

const Example6 = () => {
  // Custom Cell: Status Cell with Color Tag
  const StatusCell = (props: GridCellProps) => {
    const value = props.dataItem[props.field || ""];
    const isActive = value === "Active";
    const color = isActive ? "green" : "red";
    const icon = isActive ? "✅" : "❌";

    return (
      <td style={{ color, fontWeight: "bold" }}>
        {icon} {isActive ? "Active" : "Inactive"}
      </td>
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <Grid data={productData} style={{ height: "400px" }}>
        <GridToolbar>
          <strong>KendoReact Grid - Custom cell</strong>
        </GridToolbar>
        <Column field="name" title="Name" />
        <Column field="status" title="Status" cells={{ data: StatusCell }} />
        <Column field="price" title="Price ($)" />
      </Grid>
    </div>
  );
};

export default Example6;
