"use client";

import { useGetProductsQuery } from "../state/api";
import Header from "../(components)/Navbar/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// MUI Grid 组件 field-数据来源, headerName 是显示的名称， width-列的宽度， type-规定数据类型， valueGetter 用于自定义显示内容
const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
  },
];

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-2xl p-3 shadow-[0_0_20px_5px_rgba(64,44,36,0.9)]">
      <Header name="Inventory" />
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId} //DataGrid 需要唯一 ID 来区分每一行，默认用 id 字段。 where we get id for each row
        checkboxSelection
        className="bg-[#212121] shadow rounded-lg border border-gray-200 mt-5 !text-gray-100"
      />
    </div>
  );
};

export default Inventory;