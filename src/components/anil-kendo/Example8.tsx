import React, { useEffect, useState } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import type { GridPageChangeEvent, GridSortChangeEvent, GridFilterChangeEvent } from "@progress/kendo-react-grid";
import { orderBy, filterBy } from "@progress/kendo-data-query";
import type { CompositeFilterDescriptor } from "@progress/kendo-data-query";
import axios from "axios";
import type { Product } from "../../model/IGrid";

const pageSize = 5;

const Example8 = () => {
  const [allData, setAllData] = useState<Product[]>([]);
  const [data, setData] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);
  const [sort, setSort] = useState<any[]>([]);
  const [filter, setFilter] = useState<CompositeFilterDescriptor | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Product[]>("https://fakestoreapi.com/products");
      setAllData(response.data); // keep a full copy
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyDataOperations = () => {
    let processed = allData;

    // Apply filter
    if (filter) {
      processed = filterBy(processed, filter);
    }

    // Apply sort
    if (sort.length) {
      processed = orderBy(processed, sort);
    }

    // Apply paging
    const paged = processed.slice(skip, skip + pageSize);

    setTotal(processed.length);
    setData(paged);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyDataOperations();
  }, [allData, skip, sort, filter]);

  const handlePageChange = (e: GridPageChangeEvent) => {
    setSkip(e.page.skip);
  };

  const handleSortChange = (e: GridSortChangeEvent) => {
    setSort(e.sort);
  };

  const handleFilterChange = (e: GridFilterChangeEvent) => {
    setFilter(e.filter);
    setSkip(0); // reset to first page
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Grid - (Server-Side Paging + Sorting)</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Grid
          data={data}
          skip={skip}
          total={total}
          pageSize={pageSize}
          pageable={true}
          sortable={true}
          filterable={true}
          filter={filter || undefined}
          sort={sort}
          onPageChange={handlePageChange}
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
          style={{}}
        >
          <Column field="id" title="ID" width="80px" filter="numeric" />
          <Column field="title" title="Title" filter="text" />
          <Column field="category" title="Category" filter="text" />
          <Column field="price" title="Price" filter="numeric" />
        </Grid>
      )}
    </div>
  );
};

export default Example8;
