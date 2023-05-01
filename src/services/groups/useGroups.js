import { useContext } from "react";

import { GroupsState } from "./index";

const useGroups = () => {
  return useContext(GroupsState);
};

export default useGroups;
