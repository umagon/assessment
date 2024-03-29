import styles from "./styles.module.css";
import { useQuery } from "react-query";

import { Card, Table } from "antd";
import { getAccounts } from "../../api/accounts";
import { Client } from "../../domain/Client";
const { Column } = Table;

export default function ClientInfo({ client }: { client: Client }) {
    const {
        isLoading,
        isError,
        error,
        data: accounts,
    } = useQuery(["accounts", client.id], () => getAccounts(client.id));

    const renderNumber = (number: number) => "#" + number;
    const renderValue = (value: number) => "$ " + value;

    return (
        <Card className={styles.container} title={client.name}>
            <p>
                <b>Email</b> {client.email}
            </p>
            <p>
                <b>Phone number</b> {client.phone}
            </p>
            <p>
                <b>Address</b> {client.address}
            </p>

            <h2>Accounts</h2>
            {isLoading ? (
                "Loading accounts..."
            ) : isError ? (
                <>{error}</>
            ) : (
                <Table dataSource={accounts} rowKey="number">
                    <Column key="name" title="Name" dataIndex="name" />
                    <Column
                        key="number"
                        title="Number"
                        dataIndex="number"
                        render={renderNumber}
                    />
                    <Column
                        key="value"
                        title="Value"
                        dataIndex="value"
                        render={renderValue}
                    />
                </Table>
            )}
        </Card>
    );
}
