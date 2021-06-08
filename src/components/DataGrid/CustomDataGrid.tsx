import { DataGrid, DataGridProps, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarFilterButton } from "@material-ui/data-grid";
import { PaginationProps } from "@material-ui/lab";
import React from "react";
import CustomNoRowsOverlay from "./GridOverlay/CustomGridOverlay";
import CustomPagination from "./Pagination/CustomPagination";

function CustomToolbar() {
   return (
      <GridToolbarContainer>
         <GridToolbarColumnsButton />
         <GridToolbarFilterButton />
      </GridToolbarContainer>
   );
}

export default function CustomDataGrid(props: Omit<DataGridProps, "components"> & PaginationProps & { showToolbar?: boolean, useBubblePaging?: boolean }) {
   const { onRowClick, loading, pageSize, rows, columns, sortModel, autoHeight, color, showToolbar, useBubblePaging } = props
   return <DataGrid
      onRowClick={onRowClick}
      loading={loading}
      autoHeight={autoHeight}
      pageSize={pageSize}
      rows={rows}
      columns={columns}
      sortModel={sortModel}
      components={{
         Toolbar: showToolbar ? CustomToolbar : undefined,
         Pagination: useBubblePaging ? CustomPagination : undefined,
         NoRowsOverlay: CustomNoRowsOverlay
      }}
      componentsProps={{
         pagination: { color: color }
      }}
   />
}