import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "./HomePage";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { Client } from "../domain/Client";
import { QueryClient, QueryClientProvider } from "react-query";

const mockInput = vi.fn();
vi.mock("@/components/ClientsTable/index.tsx", () => ({
    default: (props: { clients: Client[] }) => {
        mockInput(props);
        return <div>Clients table</div>;
    },
}));

describe("HomePage", () => {
    const queryClient = new QueryClient();
    it("Should not show if not logged in", () => {
        const routes = [
            {
                path: "/",
                element: <HomePage />,
                loader: () => null,
            },
        ];

        const router = createMemoryRouter(routes, { initialEntries: ["/"] });
        render(
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        );

        const h1 = screen.queryByText("My clients");
        expect(h1).not.toBeInTheDocument();
    });

    it("Should show if logged in", async () => {
        const routes = [
            {
                path: "/",
                element: <HomePage />,
                loader: () => ({ username: "hello", token: btoa("token") }),
            },
        ];

        const router = createMemoryRouter(routes, { initialEntries: ["/"] });
        render(
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        );

        await waitFor(() => {
            screen.getByText("My clients");
        });
    });
});
