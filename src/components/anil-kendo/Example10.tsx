import React, { useState } from "react";
import { Grid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
import type { GridCellProps } from "@progress/kendo-react-grid";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import type { Product } from "../../model/IGrid";
import productData from "../../data/products.json";

const Example10: React.FC = () => {
  const [data, setData] = useState<Product[]>(productData);
  const [editID, setEditID] = useState<number | null>(null);
  const [popupData, setPopupData] = useState<Product | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  // Inline save handler
  const handleSaveInline = (item: Product) => {
    setData((prev) => prev.map((p) => (p.id === item.id ? item : p)));
    setEditID(null);
  };

  // Popup save handler
  const handleSavePopup = () => {
    if (popupData) {
      setData((prev) => prev.map((p) => (p.id === popupData.id ? popupData : p)));
    }
    setShowDialog(false);
    setPopupData(null);
  };

  // Inline change handler
  const handleChangeInline = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Product) => {
    const value = field === "price" ? Number(e.target.value) : e.target.value;
    setData((prev) => prev.map((p) => (p.id === editID ? { ...p, [field]: value } : p)));
  };

  // Start inline editing
  const handleEditInline = (id: number) => {
    setEditID(id);
  };

  // Cancel inline editing
  const handleCancelInline = () => {
    setEditID(null);
  };

  // Start popup editing
  const handleEditPopup = (item: Product) => {
    setPopupData({ ...item });
    setShowDialog(true);
  };

  // Popup change handler
  const handleChangePopup = (e: React.ChangeEvent<HTMLInputElement>, field: keyof Product) => {
    const value = field === "price" ? Number(e.target.value) : e.target.value;
    setPopupData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  return (
    <div style={{ padding: 20 }}>
      <Grid data={data} style={{ height: "auto" }}>
        <GridToolbar>
          <strong>KendoReact Grid - Inline & Popup Editing</strong>
        </GridToolbar>

        <Column field="id" title="ID" width="60px" />

        <Column
          field="name"
          title="Name"
          cells={{
            data: (props: GridCellProps) =>
              props.dataItem.id === editID ? (
                <td>
                  <Input value={props.dataItem.name} onChange={(e) => handleChangeInline(e, "name")} />
                </td>
              ) : (
                <td>{props.dataItem.name}</td>
              ),
          }}
        />

        <Column
          field="category"
          title="Category"
          cells={{
            data: (props: GridCellProps) =>
              props.dataItem.id === editID ? (
                <td>
                  <Input value={props.dataItem.category} onChange={(e) => handleChangeInline(e, "category")} />
                </td>
              ) : (
                <td>{props.dataItem.category}</td>
              ),
          }}
        />

        <Column
          field="price"
          title="Price"
          cells={{
            data: (props: GridCellProps) =>
              props.dataItem.id === editID ? (
                <td>
                  <Input type="number" value={props.dataItem.price} onChange={(e) => handleChangeInline(e, "price")} />
                </td>
              ) : (
                <td>${props.dataItem.price}</td>
              ),
          }}
        />

        <Column
          title="Actions"
          cells={{
            data: (props: GridCellProps) => {
              const item = props.dataItem as Product;
              return (
                <td>
                  {editID === item.id ? (
                    <>
                      <Button themeColor="primary" size="small" onClick={() => handleSaveInline(item)} style={{ marginRight: 4 }}>
                        Save
                      </Button>
                      <Button themeColor="tertiary" size="small" onClick={handleCancelInline}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button themeColor="primary" size="small" onClick={() => handleEditInline(item.id)} style={{ marginRight: 4 }}>
                        Inline Edit
                      </Button>
                      <Button themeColor="secondary" size="small" onClick={() => handleEditPopup(item)}>
                        Popup Edit
                      </Button>
                    </>
                  )}
                </td>
              );
            },
          }}
        />
      </Grid>

      {showDialog && popupData && (
        <Dialog title="Edit Product" onClose={() => setShowDialog(false)}>
          <div style={{ marginBottom: 10 }}>
            <label>
              Name:
              <Input value={popupData.name} onChange={(e) => handleChangePopup(e, "name")} style={{ marginLeft: 8 }} />
            </label>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>
              Category:
              <Input value={popupData.category} onChange={(e) => handleChangePopup(e, "category")} style={{ marginLeft: 8 }} />
            </label>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>
              Price:
              <Input type="number" value={popupData.price} onChange={(e) => handleChangePopup(e, "price")} style={{ marginLeft: 8 }} />
            </label>
          </div>

          <DialogActionsBar>
            <Button themeColor="primary" onClick={handleSavePopup}>
              Save
            </Button>
            <Button themeColor="tertiary" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
};

export default Example10;
