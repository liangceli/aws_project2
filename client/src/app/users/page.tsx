"use client";

import { useGetUsersQuery } from "../state/api"; 
import Header from "../(components)/Navbar/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
];

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !users) {
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    );
  }

  return (
    <div className="flex flex-col shadow-[0_0_20px_5px_rgba(64,44,36,0.9)] p-3 rounded-2xl">
      <Header name="Users" />
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="bg-[#212121] shadow rounded-lg border border-gray-200 mt-5 !text-gray-100"
        sx={{
          "& .MuiDataGrid-columnHeaders" : {
            backgroundColor: "#333333", 
            color: "black", // 让表头文字颜色变白
          },

          "& .MuiDataGrid-footerContainer": {
              color: "#ffffff",  // 修改分页区域的文字颜色
              backgroundColor: "#212121", // 修改分页区域背景颜色
            },
            "& .MuiTablePagination-root": {
              color: "#ffffff",  // 修改分页信息（Rows per page: xx）文字颜色
            },
            "& .MuiSvgIcon-root": {
              color: "#ffffff",  // 修改分页区域下拉菜单的箭头颜色
            }
        }}
      />
    </div>
  );
};

export default Users;