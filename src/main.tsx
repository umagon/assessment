import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
    RouterProvider,
    createBrowserRouter,
    redirect,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Root from "./Root";
import LoginPage from "./routes/LoginPage";
import HomePage from "./routes/HomePage";

async function enableMocking() {
    if (import.meta.env.PROD) {
        return;
    }

    const { worker } = await import("./mocks/browser");

    // `worker.start()` returns a Promise that resolves
    // once the Service Worker is up and ready to intercept requests.
    return worker.start();
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <HomePage />,
                loader: async () => {
                    const user = await localStorage.getItem("user");
                    if (!user) {
                        throw redirect("/login");
                    }

                    return JSON.parse(user);
                },
            },
            {
                path: "login",
                element: <LoginPage />,
            },
        ],
    },
]);

const queryClient = new QueryClient();

enableMocking().then(() => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </React.StrictMode>
    );
});
