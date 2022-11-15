import {
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useGridSlotComponentProps } from "@material-ui/data-grid";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  spacingItem: {
    display: "flex",
    justifyContent: "end",
    alignItems: "center",
  },
  pagingDesc: {
    marginRight: theme.spacing(2),
  },
}));

export default function CustomPagination(props: {
  color?: "primary" | "secondary" | "standard" | undefined;
}) {
  const theme = useTheme();
  const hidden = useMediaQuery(theme.breakpoints.down("sm"));

  const classes = useStyles();

  const { color } = props;

  const { state, apiRef } = useGridSlotComponentProps();

  return (
    <div className={classes.spacingItem}>
      {!hidden && (
        <Typography variant="body2" className={classes.pagingDesc}>
          {`Showing ${
            state.pagination.page === state.pagination.pageCount - 1
              ? state.pagination.rowCount % state.pagination.pageSize
              : Math.min(state.pagination.pageSize, state.pagination.rowCount)
          } of ${state.pagination.rowCount} | Page: ${
            state.pagination.page + 1
          } of ${state.pagination.pageCount}`}
        </Typography>
      )}
      <Pagination
        showFirstButton={true}
        showLastButton={true}
        color={color}
        count={state.pagination.pageCount}
        page={state.pagination.page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    </div>
  );
}
