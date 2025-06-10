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
import type { Car } from "../../model/IGrid";
import carData from "../../data/cars.json";

function Example2() {
  const [sort, setSort] = useState<SortDescriptor[]>([]);
  const [filter, setFilter] = useState<CompositeFilterDescriptor | undefined>(
    undefined
  );

  const processedData = useMemo(() => {
    let data = carData as Car[];
    if (filter) {
      data = filterBy(data, filter);
    }
    if (sort.length > 0) {
      data = orderBy(data, sort);
    }
    return data;
  }, [carData, filter, sort]);

  const handleSortChange = useCallback((e: GridSortChangeEvent) => {
    setSort(e.sort);
  }, []);

  const handleFilterChange = useCallback((e: GridFilterChangeEvent) => {
    if (
      !e.filter ||
      !e.filter.filters ||
      e.filter.filters.length === 0 ||
      (e.filter.filters.length === 1 &&
        (e.filter.filters[0] as CompositeFilterDescriptor).filters?.length ===
          0)
    ) {
      setFilter(undefined);
    } else {
      setFilter(e.filter);
    }
  }, []);

  return (
    <div>
      <h2>Sorting and Filtering</h2>
      <Grid
        data={processedData}
        sortable={true}
        sort={sort}
        onSortChange={handleSortChange}
        filterable={true}
        filter={filter}
        onFilterChange={handleFilterChange}
      >
        <GridColumn field="id" title="ID" filter="numeric" />
        <GridColumn field="brand" title="Brand" filter="text" />
        <GridColumn field="model" title="Model" filter="text" />
        <GridColumn field="year" title="Year" filter="text" />
        <GridColumn field="color" title="Color" filter="text" />
        <GridColumn field="price" title="Price" filter="numeric" />
      </Grid>
    </div>
  );
}

export default Example2;
