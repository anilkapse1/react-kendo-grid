import React, { useState, useMemo, useCallback } from "react";
import {
  Grid,
  GridColumn,
  type GridPageChangeEvent,
} from "@progress/kendo-react-grid";
import type { Car } from "../../model/IGrid";
import carData from "../../data/cars.json";

function Example3() {
  const [page, setPage] = useState({ skip: 0, take: 5 });
  
  const currentPageData = useMemo(() => {
    const startIndex = page.skip;
    const endIndex = page.skip + page.take;
    return (carData as Car[]).slice(startIndex, endIndex);
  }, [page]);

  const handlePageChange = useCallback((e: GridPageChangeEvent) => {
    setPage({
      skip: e.page.skip,
      take: e.page.take || 5
    });
  }, []);

  return (
    <div>
      <h2>Pagination</h2>
      <Grid
        data={currentPageData}
        total={carData.length}
        skip={page.skip}
        take={page.take}
        pageable={true}
        onPageChange={handlePageChange}
        style={{ height: "270px" }}
      >
        <GridColumn field="id" title="ID" />
        <GridColumn field="brand" title="Brand" />
        <GridColumn field="model" title="Model" />
        <GridColumn field="year" title="Year" />
        <GridColumn field="color" title="Color" />
        <GridColumn field="price" title="Price" />
      </Grid>
    </div>
  );
}

export default Example3;