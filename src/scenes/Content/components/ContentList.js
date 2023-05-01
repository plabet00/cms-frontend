import { useNavigate, useLocation } from "react-router-dom";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";

const ModelList = ({ data, modelId }) => {
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
            <TableCell>Title</TableCell>
            <TableCell align="right">Created at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data?.map((row) => (
            <TableRow
              onClick={() =>
                navigate(
                  `/${
                    location.pathname.split("/")[1]
                  }/models/${modelId}/content/${row.content_id}`
                )
              }
              sx={{ "&:hover": { cursor: "pointer" } }}
              hover
              key={row.content_id}
            >
              <TableCell component="th" scope="row">
                {row.content_title ? row.content_title : "Untitled"}
              </TableCell>
              <TableCell align="right">{row.created_at}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ModelList;
