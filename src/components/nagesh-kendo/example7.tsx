import React, { useState, useEffect, useCallback } from "react";
import {
  Grid,
  GridColumn,
  type GridPageChangeEvent,
  type GridSortChangeEvent,
} from "@progress/kendo-react-grid";
import { type SortDescriptor } from "@progress/kendo-data-query";
import type { Car } from "../../model/IGrid";
import carData from "../../data/cars.json";

const mockApiService = {
  getCars: async (page: number, pageSize: number, sort?: SortDescriptor[]) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    let data = [...carData];

    if (sort && sort.length > 0) {
      const sortField = sort[0].field;
      const sortDir = sort[0].dir;
      data.sort((a, b) => {
        const aVal = a[sortField as keyof typeof a];
        const bVal = b[sortField as keyof typeof b];

        if (aVal < bVal) return sortDir === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
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

function Example7() {
  const [data, setData] = useState<Car[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sort, setSort] = useState<SortDescriptor[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await mockApiService.getCars(page, pageSize, sort);
      setData(result.data);
      setTotal(result.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, sort]);

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

  return (
    <div>
      <h2>Server-Side Paging and Sorting</h2>
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
        onPageChange={handlePageChange}
        onSortChange={handleSortChange}
        style={{ height: "270px" }}
      >
        <GridColumn field="id" title="ID"/>
        <GridColumn field="brand" title="Brand"/>
        <GridColumn field="model" title="Model" />
        <GridColumn field="year" title="Year" />
        <GridColumn field="color" title="Color"/>
        <GridColumn field="price" title="Price"/>
      </Grid>
    </div>
  );
}

export default Example7;
