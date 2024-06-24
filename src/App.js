import { lazy, Suspense } from "react";
import AppProvider from "./context";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "./layout";
import Stake from "./containers/Stake";
import ScreenLoading from "./components/ScreenLoading";

const Swap = lazy(() => import("./containers/Swap"));
const Redeem = lazy(() => import("./containers/Redeem"));
const History = lazy(() => import("./containers/History"));

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
        element: (
          <Suspense fallback={<ScreenLoading />}>
            <Swap />
          </Suspense>
        ),
      },
      {
        path: "redeem",
        element: (
          <Suspense fallback={<ScreenLoading />}>
            <Redeem />
          </Suspense>
        ),
      },
      {
        path: "history",
        element: (
          <Suspense fallback={<ScreenLoading />}>
            <History />
          </Suspense>
        ),
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
