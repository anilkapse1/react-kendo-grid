import React, { useState, useEffect, useCallback } from "react";
import {
  Grid,
  GridColumn,
  type GridPageChangeEvent,
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

const mockApiService = {
  getCars: async (
    page: number,
    pageSize: number,
    sort?: SortDescriptor[],
    filter?: CompositeFilterDescriptor | null
  ) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    let data = [...carData];

    if (filter) {
      data = filterBy(data, filter);
    }

    if (sort && sort.length > 0) {
      data = orderBy(data, sort);
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = data.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total: data.length,
    };
  },
};

function Example8() {
  const [data, setData] = useState<Car[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sort, setSort] = useState<SortDescriptor[]>([]);
  const [filter, setFilter] = useState<CompositeFilterDescriptor | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const result = await mockApiService.getCars(page, pageSize, sort, filter);
      setData(result.data);
      setTotal(result.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [page, pageSize, sort, filter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = useCallback((e: GridPageChangeEvent) => {
    const newPage = e.page.skip / e.page.take + 1;
    setPage(newPage);
    setPageSize(e.page.take);
  }, []);

  const handleSortChange = useCallback((e: GridSortChangeEvent) => {
    setSort(e.sort);
    setPage(1);
  }, []);

  const handleFilterChange = useCallback((e: GridFilterChangeEvent) => {
    setFilter(e.filter);
    setPage(1); 
  }, []);

  return (
    <div>
      <h2>Server-Side Paging + Sorting + Filtering</h2>
      <Grid
        data={data}
        total={total}
        skip={(page - 1) * pageSize}
        take={pageSize}
        pageable={{
          buttonCount: 5,
          pageSizes: [5, 10, 20],
        }}
        sortable={true}
        sort={sort}
        filterable={true}
        filter={filter ?? undefined}
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
        onFilterChange={handleFilterChange}
        style={{ height: "320px" }}
      >
        <GridColumn field="id" title="ID" filter="numeric" />
        <GridColumn field="brand" title="Brand" filter="text" />
        <GridColumn field="model" title="Model" filter="text" />
        <GridColumn field="year" title="Year" filter="numeric" />
        <GridColumn field="color" title="Color" filter="text" />
        <GridColumn field="price" title="Price" filter="numeric" />
      </Grid>
    </div>
  );
}

export default Example8;
