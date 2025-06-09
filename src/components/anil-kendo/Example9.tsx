import React, { useEffect, useRef, useState } from "react";
import { Grid, GridColumn as Column, GridToolbar } from "@progress/kendo-react-grid";
import type { GridPageChangeEvent, GridSortChangeEvent, GridFilterChangeEvent } from "@progress/kendo-react-grid";
import { orderBy, filterBy } from "@progress/kendo-data-query";
import type { CompositeFilterDescriptor } from "@progress/kendo-data-query";
import axios from "axios";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import type { Product } from "../../model/IGrid";

const pageSize = 5;

const Example9 = () => {
  const [allData, setAllData] = useState<Product[]>([]);
  const [data, setData] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);
  const [sort, setSort] = useState<any[]>([]);
  const [filter, setFilter] = useState<CompositeFilterDescriptor | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const _exporter = useRef<ExcelExport | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Product[]>("https://fakestoreapi.com/products");
      setAllData(response.data);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyDataOperations = () => {
    let processed = allData;

    if (filter) {
      processed = filterBy(processed, filter);
    }

    if (sort.length) {
      processed = orderBy(processed, sort);
    }

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
    setSkip(0);
  };

  const handleExport = () => {
    if (_exporter.current) {
      _exporter.current.save();
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ExcelExport data={data} ref={_exporter}>
          <Grid
            data={data}
            skip={skip}
            total={total}
            pageSize={pageSize}
            pageable
            sortable
            filterable
            filter={filter || undefined}
            sort={sort}
            onPageChange={handlePageChange}
            onSortChange={handleSortChange}
            onFilterChange={handleFilterChange}
          >
            <GridToolbar>
              <strong>KendoReact Grid - Paging + Sorting + Filtering + Excel Export</strong>
              <button onClick={handleExport} style={{ marginLeft: "auto" }}>
                ⬇️ Export to Excel
              </button>
            </GridToolbar>

            <Column field="id" title="ID" width="80px" filter="numeric" />
            <Column field="title" title="Title" filter="text" />
            <Column field="category" title="Category" filter="text" />
            <Column field="price" title="Price" filter="numeric" />
          </Grid>
        </ExcelExport>
      )}
    </div>
  );
};

export default Example9;
