import { getAccounts } from "./accounts";
import { login } from "./auth";
import { getClients } from "./clients";

export const handlers = [getClients, getAccounts, login];
