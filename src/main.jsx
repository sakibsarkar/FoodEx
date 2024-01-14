import "aos/dist/aos.css";
import "./index.css";
import AOS from "aos";
import Authcontext from "./Authcontext/Authcontext.jsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { router } from "./Routes/Routes.jsx";

// ..
AOS.init();

const client = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <Authcontext>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </Authcontext>
    </QueryClientProvider>
  </React.StrictMode>,
)
