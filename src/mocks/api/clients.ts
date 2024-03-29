import { http } from "msw";
import CLIENTS from "../data/clients";

export const getClients = http.get("/api/:username/clients", ({ params }) => {
    const username = params.username;
    console.log({ params });
    const result = CLIENTS.filter((client) => client.username == username);
    return new Response(JSON.stringify(result));
});
