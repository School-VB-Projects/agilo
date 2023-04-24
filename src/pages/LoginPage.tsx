import { useState } from "react";
import AuthPage from "../components/templates/AuthPage";
import { findUser } from "../database/queries";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [mail, setMail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const testUser = async () => {
        if (mail.length > 0 && password.length > 0) {
            try {
                findUser(mail, password, navigate, "/dashboard");
            } catch (error: Error | any) {
                setError(error.message);
            }
        } else {
            setError("Please fill in all required fields");
        }
    };

    return (
        <AuthPage
            formLabel={"Login"}
            formAction={testUser}
            formError={error}
            formFields={[
                {
                    type: "email",
                    label: "Email",
                    placeholder: "john.scott@email.com",
                    value: mail,
                    onChange: setMail,
                    required: true,
                },
                {
                    type: "password",
                    label: "Password",
                    placeholder: "****************",
                    value: password,
                    onChange: setPassword,
                    required: true,
                },
            ]}
        />
    );
}
