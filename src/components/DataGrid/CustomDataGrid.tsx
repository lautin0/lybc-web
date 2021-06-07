import { DataGrid, DataGridProps } from "@material-ui/data-grid";
import React from "react";
import CustomNoRowsOverlay from "./GridOverlay/CustomGridOverlay";
import CustomPagination from "./Pagination/CustomPagination";

export default function CustomDataGrid(props: DataGridProps) {
   const { onRowClick, loading, pageSize, rows, columns, sortModel, autoHeight } = props
   return <DataGrid
      onRowClick={onRowClick}
      loading={loading}
      autoHeight={autoHeight}
      pageSize={pageSize}
      rows={rows}
      columns={columns}
      sortModel={sortModel}
      components={{
         Pagination: CustomPagination,
         NoRowsOverlay: CustomNoRowsOverlay
      }}
   />
}