import React, { useState } from "react";
import ClientInfo from "../ClientInfo";
import { Client } from "../../domain/Client";
import { getClients } from "../../api/clients";
import { useQuery } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import styles from "./styles.module.css";

import { Card, Space, Table } from "antd";
const { Column } = Table;

const ClientsTable: React.FC<{ username: string }> = ({ username }) => {
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    const {
        isLoading,
        isError,
        error,
        data: clients,
    } = useQuery(["clients", username], () => getClients(username));

    const onRow = (record: Client) => ({
        onClick: () => setSelectedClient(record),
    });

    if (isLoading) return "Loading...";

    return isError ? (
        <>{error}</>
    ) : (
        <Space align="start">
            <Card>
                <Table
                    rowClassName={styles.table__row}
                    onRow={onRow}
                    dataSource={clients}
                    rowKey="id"
                    data-testid="clients-table"
                >
                    <Column key="name" title="Name" dataIndex="name" />
                    <Column key="email" title="Email" dataIndex="email" />
                    <Column
                        key="phone"
                        title="Phone Number"
                        dataIndex="phone"
                    />
                    <Column key="address" title="Address" dataIndex="address" />
                </Table>
            </Card>
            <ErrorBoundary
                fallback={
                    <div>
                        The accounts pane couldn't be displayed due to an error.
                    </div>
                }
            >
                {selectedClient && <ClientInfo client={selectedClient} />}
            </ErrorBoundary>
        </Space>
    );
};
export default ClientsTable;
