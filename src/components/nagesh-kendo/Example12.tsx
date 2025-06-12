import React, { useState } from "react";
import {
  Grid,
  GridColumn as Column,
} from "@progress/kendo-react-grid";
import type {
  GridCellProps,
  GridHeaderCellProps,
} from "@progress/kendo-react-grid";
import { SvgIcon } from "@progress/kendo-react-common";
import { chevronRightIcon, chevronLeftIcon } from "@progress/kendo-svg-icons";
import type { Car } from "../../model/IGrid";
import carData from "../../data/cars.json";

type ExpandedColumnsState = {
  "Car Details": boolean;
  "Price Details": boolean;
};

interface CollapsibleHeaderProps extends GridHeaderCellProps {
  title: keyof ExpandedColumnsState;
}

const Example12: React.FC = () => {
  const [data] = useState<Car[]>(carData);
  const [expandedColumnsState, setExpandedColumnsState] =
    useState<ExpandedColumnsState>({
      "Car Details": false,
      "Price Details": false,
    });

  const CollapsableHeaderCell = React.useCallback(
    (props: CollapsibleHeaderProps) => {
      const currentState = expandedColumnsState[props.title];
      const onClick = (ev: React.MouseEvent<HTMLOrSVGElement>) => {
        ev.preventDefault();
        setExpandedColumnsState((prev) => ({
          ...prev,
          [props.title]: !currentState,
        }));
      };

      return (
        <th
          {...props}
          style={{ textAlign: "center", backgroundColor: "#f8f9fa" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <span>{props.title}</span>
            <SvgIcon
              style={{ cursor: "pointer" }}
              onClick={onClick}
              icon={currentState ? chevronLeftIcon : chevronRightIcon}
            />
          </div>
        </th>
      );
    },
    [expandedColumnsState]
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Expand/Collapse Multi Column Headers</h1>
      <Grid
        data={data}
        style={{ height: "500px" }}
        resizable={true}
        reorderable={true}
      >
        <Column field="id" title="ID" resizable={false} />

        {expandedColumnsState["Car Details"] ? (
          <Column
            title="Car Details"
            cells={{
              headerCell: (props: GridHeaderCellProps) => (
                <CollapsableHeaderCell {...props} title="Car Details" />
              ),
            }}
          >
            <Column field="brand" title="Brand" />
            <Column field="color" title="Color"  />
            <Column field="model" title="Model" />
          </Column>
        ) : (
          <Column
            title="Car Details"
            cells={{
              headerCell: (props: GridHeaderCellProps) => (
                <CollapsableHeaderCell {...props} title="Car Details" />
              ),
            }}
            field="brand"
            width="120px"
          />
        )}

        {expandedColumnsState["Price Details"] && (
          <Column
            title="Price Details"
            cells={{
              headerCell: (props: GridHeaderCellProps) => (
                <CollapsableHeaderCell {...props} title="Price Details" />
              ),
            }}
          >
            <Column
              field="price"
              title="Price"
              cells={{
                data: (props: GridCellProps) => (
                  <td>${props.dataItem.price?.toLocaleString()}</td>
                ),
              }}
            />
            <Column field="year" title="Year" />
          </Column>
        )}

        {!expandedColumnsState["Price Details"] && (
          <Column
            title="Price Details"
            cells={{
              headerCell: (props: GridHeaderCellProps) => (
                <CollapsableHeaderCell {...props} title="Price Details" />
              ),
              data: () => <td></td>,
            }}
          />
        )}
      </Grid>
    </div>
  );
};

export default Example12;
