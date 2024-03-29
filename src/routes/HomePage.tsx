import { useLoaderData, useNavigate } from "react-router-dom";
import ClientsTable from "../components/ClientsTable";
import { Button } from "antd";
import { useMutation } from "react-query";
import { logout } from "../api/auth";
import { ErrorBoundary } from "react-error-boundary";

export default function HomePage() {
    const { username } = useLoaderData() as Record<string, string>;
    const navigate = useNavigate();
    const { mutate: logoutAction } = useMutation(logout, {
        onSuccess() {
            navigate("/login");
        },
    });

    return (
        <div>
            <span style={{ float: "right" }}>
                <Button type="primary" danger onClick={() => logoutAction()}>
                    Logout
                </Button>
            </span>
            <div style={{ clear: "both" }}></div>
            <h1>My clients</h1>

            <ErrorBoundary
                fallback={
                    <div>
                        The clients pane couldn't be displayed due to an error.
                    </div>
                }
            >
                <ClientsTable username={username} />
            </ErrorBoundary>
        </div>
    );
}
