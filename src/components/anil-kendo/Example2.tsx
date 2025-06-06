import React, { useState, useMemo, useCallback } from "react";
import {
  Grid,
  GridColumn,
  type GridSortChangeEvent,
  type GridFilterChangeEvent,
} from "@progress/kendo-react-grid";
import {
  orderBy,
  filterBy,
  type SortDescriptor,
  type CompositeFilterDescriptor,
} from "@progress/kendo-data-query";

import type { Product } from "../../model/IGrid";
import productData from "../../data/products.json"; // Assuming this is well-typed

function Example2() {
  const [sort, setSort] = useState<SortDescriptor[]>([]);
  const [filter, setFilter] = useState<CompositeFilterDescriptor | undefined>(
    undefined
  );

  const processedData = useMemo(() => {
    let data = productData as Product[]; // Ensure productData is treated as Product[]
    if (filter) {
      data = filterBy(data, filter);
    }
    if (sort.length > 0) {
      data = orderBy(data, sort);
    }
    return data;
  }, [productData, filter, sort]);

  const handleSortChange = useCallback((e: GridSortChangeEvent) => {
    setSort(e.sort);
  }, []);

  const handleFilterChange = useCallback((e: GridFilterChangeEvent) => {
    if (
      !e.filter ||
      !e.filter.filters ||
      e.filter.filters.length === 0 ||
      (e.filter.filters.length === 1 &&
        (e.filter.filters[0] as CompositeFilterDescriptor).filters?.length === 0)
    ) {
      setFilter(undefined);
    } else {
      setFilter(e.filter);
    }
  }, []);

  // --- Render ---
  return (
    <div style={{ padding: 20 }}>
      <h2>Grid - Sorting and Filtering</h2>
      <Grid
        data={processedData}
        sortable={true} 
        sort={sort}
        onSortChange={handleSortChange}
        filterable={true} 
        filter={filter}
        onFilterChange={handleFilterChange}
      >
        <GridColumn field="id" title="ID" width="80px" filter="numeric" />
        <GridColumn field="name" title="Product Name" filter="text" />
        <GridColumn field="price" title="Price ($)" filter="numeric" />
        <GridColumn field="category" title="Category" filter="text" />
      </Grid>
    </div>
  );
}

export default Example2;