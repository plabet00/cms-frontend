import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";

import ProtectedRoute from "./utils/routing/ProtectedRoute";
import AuthRoute from "./utils/routing/AuthRoute";

import Login from "./scenes/Login";
import Models from "./scenes/Models";
import Register from "./scenes/Register";
import Dashboard from "./scenes/Dashboard";
import Groups from "./scenes/Groups";
import { PageContainer } from "./index.styled";
import Navigation from "./scenes/Dashboard/components/Navigation";
import Content from "./scenes/Content";
import EditContent from "./scenes/EditContent";
import ModelDetails from "./scenes/ModelDetails";
import ModelsProvider from "./services/models";
import GroupsProvider from "./services/groups";
import LocalStorageProvider from "./services/localStorage";
import NoGroupSelected from "./scenes/NoGroupSelected/NoGroupSelected";
import ContentProvider from "./services/content";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00000",
      darker: "#cf7200",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalStorageProvider>
        <CookiesProvider>
          <PageContainer>
            <Router>
              <Routes>
                <Route
                  exact
                  path="/login"
                  element={
                    <AuthRoute>
                      <Login />
                    </AuthRoute>
                  }
                />
                <Route
                  exact
                  path="/register"
                  element={
                    <AuthRoute>
                      <Register />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <ModelsProvider>
                        <ContentProvider>
                          <GroupsProvider>
                            <Box sx={{ display: "flex", width: "100%" }}>
                              <Navigation />
                              <Box
                                component="main"
                                sx={{
                                  flexGrow: 1,
                                }}
                              >
                                <Outlet />
                              </Box>
                            </Box>
                          </GroupsProvider>
                        </ContentProvider>
                      </ModelsProvider>
                    </ProtectedRoute>
                  }
                >
                  <Route index path="" element={<Dashboard />} />
                  <Route path="groups" element={<Groups />} />
                  <Route path="models" element={<NoGroupSelected />} />
                  <Route path="content" element={<NoGroupSelected />} />
                  <Route path=":groupName/models" element={<Models />} />
                  <Route
                    path=":groupName/models/:modelId"
                    element={<ModelDetails />}
                  />
                  <Route path=":groupName/content" element={<Content />} />
                  <Route
                    path=":groupName/models/:modelId/content/:contentId"
                    element={<EditContent />}
                  />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Router>
          </PageContainer>
        </CookiesProvider>
      </LocalStorageProvider>
    </ThemeProvider>
  );
}

export default App;
