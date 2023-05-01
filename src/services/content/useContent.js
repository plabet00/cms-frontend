import { useContext } from "react";

import { ContentState } from "./index";

const useContent = () => {
  return useContext(ContentState);
};

export default useContent;
