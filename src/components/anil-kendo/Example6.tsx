import * as React from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";

import productData from "../../data/products.json";

const DATA_ITEM_KEY = "id";

const Example6 = () => {
  const [selectedID, setSelectedID] = React.useState<number | null>(null);

  const onRowClick = (e: any) => {
    console.log("e:", e.dataItem);
    setSelectedID(e.dataItem.id);
  };

  const CustomCell = (props: any) => {
    const { dataItem, field } = props;
    const isSelected = dataItem.id === selectedID;

    return (
      <td
        style={{
          backgroundColor: isSelected ? "#c8e6c9" : undefined,
          fontWeight: isSelected ? "bold" : "normal",
        }}
      >
        anil {dataItem[field]}
      </td>
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Grid - Custom Cell</h2>
      <Grid
        style={{ height: "400px" }}
        data={productData.map((item) => ({
          ...item,
          selected: item.id === selectedID,
        }))}
        dataItemKey={DATA_ITEM_KEY}
        selectable={{
          enabled: true,
          mode: "single",
        }}
        navigatable={true}
        onRowClick={onRowClick}
      >
        <Column field="id" title="ID" width="80px" />
        <Column field="name" title="Product Name" />
        <Column field="price" title="Price ($)" cell={CustomCell} />
        <Column field="category" title="Category" />
      </Grid>
    </div>
  );
};

export default Example6;
