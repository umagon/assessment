import { useMutation } from "react-query";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form, Card, Input, Button, Alert, Divider } from "antd";

export default function LoginPage() {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { mutate: signIn } = useMutation<
        unknown,
        unknown,
        {
            username: string;
            password: string;
        }
    >(({ username, password }) => login(username, password), {
        onSuccess: () => {
            navigate("/");
        },
        onError: (err) => {
            setError(String(err));
        },
    });

    return (
        <Card style={{ width: 500 }}>
            <Form onFinish={(loginData) => signIn(loginData)}>
                <Form.Item label="Username" name="username">
                    <Input />
                </Form.Item>

                <Form.Item label="Password" name="password">
                    <Input.Password />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Sign In
                </Button>
            </Form>
            <Divider />
            {error && <Alert message={error} type="error" showIcon />}
        </Card>
    );
}
