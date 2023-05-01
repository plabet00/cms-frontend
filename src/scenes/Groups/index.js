import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

import useGroups from "../../services/groups/useGroups";
import useLocalStorage from "../../services/localStorage/useLocalStorage";

const Groups = () => {
  const { groupsData, fetchGroups } = useGroups();
  const [selectedGroup, setSelectedGroup] = useState("");
  const [localStorageGroup, setLocalStorageGroup] = useLocalStorage(
    "groupName",
    ""
  );
  useEffect(() => {
    fetchGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography sx={{ padding: "20px 0" }} variant="h4">
        {!localStorageGroup
          ? "Select group"
          : `Currently selected group: ${localStorageGroup}`}
      </Typography>
      <FormControl sx={{ m: 1, minWidth: 140 }}>
        <InputLabel id="select-group-label">Select group</InputLabel>
        <Select
          labelId="select-group-label"
          label="Select group"
          sx={{ backgroundColor: "white" }}
          onChange={(e) => setSelectedGroup(e.target.value)}
          value={selectedGroup}
        >
          {groupsData?.data?.map((group) => (
            <MenuItem key={group} value={group}>
              {group}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        sx={{ marginTop: "10px", backgroundColor: "black" }}
        onClick={() => setLocalStorageGroup(selectedGroup)}
      >
        Change
      </Button>
    </Box>
  );
};

export default Groups;
