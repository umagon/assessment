export const getClients = async (username: string) => {
    const response = await fetch(`api/${username}/clients`);
    if (!response.ok) {
        throw new Error(
            `Failed to fetch clients: ${response.status} ${response.statusText}`
        );
    }
    const data = await response.json();
    return data;
};
