import { useNavigate, useLocation } from "react-router-dom";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";

const ModelList = ({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <TableContainer
      sx={{
        padding: "10px",
      }}
    >
      <Table sx={{ backgroundColor: "white", borderRadius: "10px" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Created at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data?.map((row) => (
            <TableRow
              onClick={() =>
                navigate(
                  `/${location.pathname.split("/")[1]}/models/${row._id}`
                )
              }
              sx={{ "&:hover": { cursor: "pointer" } }}
              hover
              key={row._id}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ModelList;
