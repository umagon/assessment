export const login = async (username: string, password: string) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const response = await fetch("api/login", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        throw new Error(
            `${response.status} Failed to login: ${response.statusText}`
        );
    }
    const data = await response.json();

    await localStorage.setItem("user", JSON.stringify(data));

    return data;
};

export const logout = async () => {
    await localStorage.removeItem("user");

    return new Response();
};
