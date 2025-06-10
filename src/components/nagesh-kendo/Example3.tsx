import React, { useState, useMemo, useCallback } from "react";
import {
  Grid,
  GridColumn,
  type GridPageChangeEvent,
} from "@progress/kendo-react-grid";
import type { Car } from "../../model/IGrid";
import carData from "../../data/cars.json";

function Example3() {
  const [skip, setSkip] = useState(0);
  const pageSize = 5;
  const currentPageData = useMemo(() => {
    return (carData as Car[]).slice(skip, pageSize);
  }, [skip]);

  const handlePageChange = useCallback((e: GridPageChangeEvent) => {
    setSkip(e.page.skip);
  }, []);

  return (
    <div>
      <h2>Pagination</h2>
      <Grid
        data={currentPageData}
        total={carData.length}
        skip={skip}
        pageable={{ buttonCount: 5, pageSizes: true }}
        onPageChange={handlePageChange}
      >
        <GridColumn field="id" title="ID"  />
        <GridColumn field="brand" title="Brand"/>
        <GridColumn field="model" title="Model"/>
        <GridColumn field="year" title="Year"/>
        <GridColumn field="color" title="Color"/>
        <GridColumn field="price" title="Price"/>
      </Grid>
    </div>
  );
}

export default Example3;
