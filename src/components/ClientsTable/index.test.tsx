import {
    describe,
    it,
    expect,
    vi,
    beforeEach,
    afterEach,
    afterAll,
} from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import ClientsTable from ".";
import { QueryClient, QueryClientProvider } from "react-query";
import { Client } from "../../domain/Client";
import { server } from "../../mocks/server";

const mockInput = vi.fn();
vi.mock("@/components/ClientInfo/index.tsx", () => ({
    default: (props: { client: Client }) => {
        mockInput(props);
        return <div>Client info panel</div>;
    },
}));

describe("ClientsTable", () => {
    beforeEach(() => {
        // Start the interception.
        server.listen();
    });

    const queryClient = new QueryClient();
    it("Should show 7 clients for user 'first'", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ClientsTable username="first" />
            </QueryClientProvider>
        );

        await waitFor(() => {
            const clientsTable = screen.getByTestId("clients-table");
            const rows = within(clientsTable).queryAllByText("@", {
                exact: false,
            });
            expect(rows).toHaveLength(6);
        });
    });

    it("Should show 2 clients for user 'second'", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <ClientsTable username="second" />
            </QueryClientProvider>
        );

        await waitFor(() => {
            const clientsTable = screen.getByTestId("clients-table");
            const rows = within(clientsTable).queryAllByText("@", {
                exact: false,
            });
            expect(rows).toHaveLength(2);
        });
    });

    afterEach(() => {
        // Remove any handlers you may have added
        // in individual tests (runtime handlers).
        server.resetHandlers();
    });

    afterAll(() => {
        // Disable request interception and clean up.
        server.close();
    });
});
