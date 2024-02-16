import AppProvider from "./context";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "./layout";
import Stake from "./containers/Stake";
import Swap from "./containers/Swap";
import Redeem from "./containers/Redeem";
import History from "./containers/History";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/stake" />,
      },
      {
        path: "stake",
        element: <Stake />,
      },
      {
        path: "swap",
        element: <Swap />,
      },
      {
        path: "redeem",
        element: <Redeem />,
      },
      {
        path: "history",
        element: <History />,
      },
    ],
  },
]);

const App = () => {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AppProvider>
  );
};

export default App;
