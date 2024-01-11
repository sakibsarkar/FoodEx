import "./index.css";
import Authcontext from "./Authcontext/Authcontext.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <Authcontext>
        <RouterProvider router={router} />
      </Authcontext>
    </QueryClientProvider>
  </React.StrictMode>,
)
