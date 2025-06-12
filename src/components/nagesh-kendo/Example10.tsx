import React, { useState } from "react";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { Button } from "@progress/kendo-react-buttons";
import { Input } from "@progress/kendo-react-inputs";
import type { GridCellProps } from "@progress/kendo-react-grid";
import type { Car } from "../../model/IGrid";
import carData from "../../data/cars.json";

const Example10: React.FC = () => {
  const [data, setData] = useState<Car[]>(carData);
  const [editID, setEditID] = useState<number | null>(null);
  const [popupData, setPopupData] = useState<Car | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleEditInline = (id: number) => {
    setEditID(id);
  };

  const handleCancelInline = () => {
    setEditID(null);
  };

  const handleChangeInline = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Car
  ) => {
    const value =
      field === "year" || field === "price"
        ? Number(e.target.value)
        : e.target.value;
    setData((prev) =>
      prev.map((item) =>
        item.id === editID ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSaveInline = (item: Car) => {
    setData((prev) => prev.map((p) => (p.id === item.id ? item : p)));
    setEditID(null);
  };

  const handleEditPopup = (item: Car) => {
    setPopupData({ ...item });
    setShowDialog(true);
  };

  const handleChangePopup = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Car
  ) => {
    const value =
      field === "year" || field === "price"
        ? Number(e.target.value)
        : e.target.value;
    setPopupData((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSavePopup = () => {
    if (popupData) {
      setData((prev) =>
        prev.map((p) => (p.id === popupData.id ? popupData : p))
      );
    }
    setShowDialog(false);
    setPopupData(null);
  };

  return (
    <div>
      <Grid data={data} style={{ height: "500px" }}>
        <GridToolbar>
          <strong>Cars Grid - Inline & Popup Editing</strong>
        </GridToolbar>

        <Column field="id" title="ID" width="50px" />

        <Column
          field="brand"
          title="Brand"
          width="130px"
          cells={{
            data: (props: GridCellProps) =>
              props.dataItem.id === editID ? (
                <td>
                  <Input
                    value={props.dataItem.brand}
                    onChange={(e) => handleChangeInline(e, "brand")}
                  />
                </td>
              ) : (
                <td>{props.dataItem.brand}</td>
              ),
          }}
        />

        <Column
          field="model"
          title="Model"
          width="130px"
          cells={{
            data: (props: GridCellProps) =>
              props.dataItem.id === editID ? (
                <td>
                  <Input
                    value={props.dataItem.model}
                    onChange={(e) => handleChangeInline(e, "model")}
                  />
                </td>
              ) : (
                <td>{props.dataItem.model}</td>
              ),
          }}
        />

        <Column
          field="year"
          title="Year"
          width="130px"
          cells={{
            data: (props: GridCellProps) =>
              props.dataItem.id === editID ? (
                <td>
                  <Input
                    type="number"
                    value={props.dataItem.year}
                    onChange={(e) => handleChangeInline(e, "year")}
                  />
                </td>
              ) : (
                <td>{props.dataItem.year}</td>
              ),
          }}
        />

        <Column
          field="color"
          title="Color"
          width="130px"
          cells={{
            data: (props: GridCellProps) =>
              props.dataItem.id === editID ? (
                <td>
                  <Input
                    value={props.dataItem.color}
                    onChange={(e) => handleChangeInline(e, "color")}
                  />
                </td>
              ) : (
                <td>{props.dataItem.color}</td>
              ),
          }}
        />

        <Column
          field="price"
          title="Price"
          width="130px"
          cells={{
            data: (props: GridCellProps) =>
              props.dataItem.id === editID ? (
                <td>
                  <Input
                    type="number"
                    value={props.dataItem.price}
                    onChange={(e) => handleChangeInline(e, "price")}
                  />
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
              const item = props.dataItem as Car;
              return (
                <td>
                  {editID === item.id ? (
                    <>
                      <Button
                        themeColor="primary"
                        size="small"
                        onClick={() => handleSaveInline(item)}
                        style={{ marginRight: 4 }}
                      >
                        Save
                      </Button>
                      <Button
                        themeColor="tertiary"
                        size="small"
                        onClick={handleCancelInline}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        themeColor="primary"
                        size="small"
                        onClick={() => handleEditInline(item.id)}
                        style={{ marginRight: 4 }}
                      >
                        Inline Edit
                      </Button>
                      <Button
                        themeColor="secondary"
                        size="small"
                        onClick={() => handleEditPopup(item)}
                      >
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
        <Dialog title="Edit Car" onClose={() => setShowDialog(false)}>
          <div style={{ marginBottom: 10 }}>
            <label>
              Brand:
              <Input
                value={popupData.brand}
                onChange={(e) => handleChangePopup(e, "brand")}
                style={{ marginLeft: 8 }}
              />
            </label>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>
              Model:
              <Input
                value={popupData.model}
                onChange={(e) => handleChangePopup(e, "model")}
                style={{ marginLeft: 8 }}
              />
            </label>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>
              Year:
              <Input
                type="number"
                value={popupData.year}
                onChange={(e) => handleChangePopup(e, "year")}
                style={{ marginLeft: 8 }}
              />
            </label>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>
              Color:
              <Input
                value={popupData.color}
                onChange={(e) => handleChangePopup(e, "color")}
                style={{ marginLeft: 8 }}
              />
            </label>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>
              Price:
              <Input
                type="number"
                value={popupData.price}
                onChange={(e) => handleChangePopup(e, "price")}
                style={{ marginLeft: 8 }}
              />
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
