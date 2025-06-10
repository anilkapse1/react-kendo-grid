import * as React from "react";
import { Grid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
import productData from "../../data/products.json";
import type { Product } from "../../model/IGrid";
import { useState } from "react";

const Example12 = () => {
  const [data, setData] = useState<Product[]>(productData);

  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<number | null>(null);

  const handleSave = (index: number) => {
    const newData = [...data];
    if (editValue !== null) {
      newData[index].price = editValue;
    }
    setData(newData);
    setEditIndex(null);
    setEditValue(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditValue(null);
  };

  // Cell Renderer for conditional highlight
  const StatusCell = (field: string) => (props: any) => {
    const value = props.dataItem[field];
    const rowIndex = props.dataIndex;

    const isEditable = field === "price" && value < 150;

    console.log("edit index is:", editIndex);

    // Show editing mode
    if (editIndex === rowIndex && isEditable) {
      return (
        <td>
          <input type="number" value={editValue ?? ""} onChange={(e) => setEditValue(Number(e.target.value))} style={{ width: "80px" }} />
          <button onClick={() => handleSave(rowIndex)} style={{ marginLeft: 4 }}>
            Save
          </button>
          <button onClick={handleCancel} style={{ marginLeft: 4 }}>
            Cancel
          </button>
        </td>
      );
    }

    return (
      <td
        style={{
          backgroundColor: isEditable ? "#fff3cd" : undefined, // light yellow
          color: isEditable ? "#856404" : undefined,
        }}
      >
        {value}
        {isEditable && (
          <button
            style={{ marginLeft: 8, cursor: "pointer" }}
            onClick={() => {
              setEditIndex(rowIndex);
              setEditValue(value);
            }}
          >
            edit
          </button>
        )}
      </td>
    );
  };
  // STEP 1: GET THE LOCKED FIELD
  const lockedColumns = [{ field: "id", locked: true }];

  // Optional: Custom titles for renamed fields
  const fieldAliasMap: Record<string, string> = {
    price: "Amount", // display "Amount" instead of "price"
  };

  // Step 2: Generate column config dynamically
  const columnConfigure = React.useMemo(() => {
    // STEP 3: GET THE ALL UNIQUE FIELD NAME
    const columnFields = data.length > 0 ? Object.keys(productData[0]) : [];

    return columnFields.map((field) => {
      const isLocked = lockedColumns.some((col) => col.field === field && col.locked);
      const useCustomCell = field === "price"; // or any condition you define

      return {
        field,
        title: fieldAliasMap[field] || field.charAt(0).toUpperCase() + field.slice(1),
        locked: useCustomCell ? false : isLocked,
        width: "150px",
        ...(useCustomCell && { cells: { data: StatusCell(field) } }),
      };
    });
  }, [data, editIndex, editValue]);

  return (
    <div style={{ padding: 20 }}>
      <Grid data={data} scrollable="scrollable" style={{ height: "400px", width: "600px" }}>
        <GridToolbar>
          <strong>dKendoReact Grid – Locked column/ Column creation dynamically</strong>
        </GridToolbar>

        {columnConfigure.map((col) => (
          <Column key={col.field} field={col.field} title={col.title} width={col.width} locked={col.locked} cells={col.cells} />
        ))}
      </Grid>
    </div>
  );
};

export default Example12;
