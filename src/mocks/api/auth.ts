import { http } from "msw";
import USERS from "../data/users";

export const login = http.post("api/login", async ({ request }) => {
    const formData = await request.formData();
    const [username, password] = [
        formData.get("username"),
        formData.get("password"),
    ];
    const user = USERS.find(
        (user) => user.username === username && user.password === password
    );
    if (!user) {
        return new Response(undefined, {
            status: 401,
            statusText: "Username or password are incorrect.",
        });
    }
    const result = {
        username: user.username,
        token: btoa(String(Math.random())),
    };
    return new Response(JSON.stringify(result));
});
