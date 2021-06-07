import { useGridSlotComponentProps } from "@material-ui/data-grid";
import { Pagination, PaginationProps } from "@material-ui/lab";
import React from "react";

export default function CustomPagination(props: PaginationProps) {

   const { color } = props

   const { state, apiRef } = useGridSlotComponentProps();

   return (
      <Pagination
         color={color}
         count={state.pagination.pageCount}
         page={state.pagination.page + 1}
         onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
   );
}