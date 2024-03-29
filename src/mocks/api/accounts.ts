import { http } from "msw";
import ACCOUNTS from "../data/accounts";

export const getAccounts = http.get("/api/accounts", ({ request }) => {
    const url = new URL(request.url);
    const clientId = url.searchParams.get("clientId");
    const result = ACCOUNTS.filter((acc) => acc.clientId == Number(clientId));
    return new Response(JSON.stringify(result));
});
