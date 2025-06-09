import React, { useState, useMemo, useCallback } from "react";
import { Grid, GridColumn, GridToolbar, type GridPageChangeEvent } from "@progress/kendo-react-grid";

import type { Product } from "../../model/IGrid";
import productData from "../../data/products.json";

function Example3() {
  const [skip, setSkip] = useState(0);
  const pageSize = 10;

  // Slice data for current page
  const currentPageData = useMemo(() => {
    return (productData as Product[]).slice(skip, skip + pageSize);
  }, [skip]);

  // Handle page changes
  const handlePageChange = useCallback((e: GridPageChangeEvent) => {
    setSkip(e.page.skip);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Grid
        data={currentPageData}
        total={productData.length}
        skip={skip}
        pageable={{ buttonCount: 5, pageSizes: true, pageSize }}
        onPageChange={handlePageChange}
      >
        <GridToolbar>
          <strong>KendoReact Grid - Pagination</strong>
        </GridToolbar>

        <GridColumn field="id" title="ID" width="80px" />
        <GridColumn field="name" title="Product Name" />
        <GridColumn field="price" title="Price ($)" />
        <GridColumn field="category" title="Category" />
      </Grid>
    </div>
  );
}

export default Example3;
