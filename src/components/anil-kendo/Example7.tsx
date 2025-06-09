import React, { useEffect, useState } from "react";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import type { GridPageChangeEvent, GridSortChangeEvent } from "@progress/kendo-react-grid";
import type { SortDescriptor } from "@progress/kendo-data-query";
import axios from "axios";
import type { Product } from "../../model/IGrid";

const pageSize = 5;

const Example7 = () => {
  const [data, setData] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);
  const [sort, setSort] = useState<SortDescriptor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Simulate server-side pagination/sorting/filtering using json-server or query params
      const response = await axios.get<Product[]>(`https://fakestoreapi.com/products`);

      let products = [...response.data];

      // Apply sorting client-side (you can use server-side logic here)
      if (sort.length) {
        const field = sort[0].field as keyof Product;
        const dir = sort[0].dir;
        products.sort((a, b) => {
          if (a[field] < b[field]) return dir === "asc" ? -1 : 1;
          if (a[field] > b[field]) return dir === "asc" ? 1 : -1;
          return 0;
        });
      }

      // Apply paging
      const paginated = products.slice(skip, skip + pageSize);

      setData(paginated);
      setTotal(products.length);
    } catch (error) {
      console.error("API fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [skip, sort]);

  const handlePageChange = (e: GridPageChangeEvent) => {
    setSkip(e.page.skip);
  };

  const handleSortChange = (e: GridSortChangeEvent) => {
    setSort(e.sort);
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
          sort={sort}
          onPageChange={handlePageChange}
          onSortChange={handleSortChange}
          style={{}}
        >
          <Column field="id" title="ID" width="80px" />
          <Column field="title" title="Title" />
          <Column field="category" title="Category" />
          <Column field="price" title="Price ($)" />
        </Grid>
      )}
    </div>
  );
};

export default Example7;
