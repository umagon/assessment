export const getAccounts = async (clientId: number) => {
    const queryParams = new URLSearchParams({
        clientId: String(clientId),
    }).toString();
    const response = await fetch("api/accounts?" + queryParams);
    if (!response.ok) {
        throw new Error(
            `Failed to fetch accounts: ${response.status} ${response.statusText}`
        );
    }
    const data = await response.json();
    return data;
};
