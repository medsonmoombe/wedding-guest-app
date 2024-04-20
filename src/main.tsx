import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from 'recoil'; // Import RecoilRoot
import App from "./App.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
