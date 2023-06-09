import {useContext, useState} from "react";
import {createUser} from "../database/queries/UserQueries"
import {UserContext} from "../context/user/UserProvider";
import {useNavigate} from "react-router-dom";
import {AuthCard} from "../components/layouts/AuthCard";
import {Page} from "../components/layouts/Page";

export default function RegisterPage() {
    const [user, setUser] = useContext(UserContext);
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [mail, setMail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const addUser = async () => {
        if (
            firstname.length > 0 &&
            lastname.length > 0 &&
            mail.length > 0 &&
            password.length > 0 &&
            confirmPassword.length > 0
        ) {
            if (password === confirmPassword) {
                setError("");
                await createUser(firstname, lastname, mail, password, setUser, navigate, "/login");
            } else {
                setError("Passwords fields don't have same values");
            }
        } else {
            setError("Please fill in all required fields");
        }
    };

    return (
        <Page>
            <AuthCard loading={user.loading} formButton={{label: "Register", action: addUser}} formError={error} formFields={[
                {
                    type: "text",
                    label: "Firstname",
                    line: "top",
                    placeholder: "John",
                    value: firstname,
                    onChange: setFirstname,
                    required: true
                },
                {
                    type: "text",
                    label: "Lastname",
                    line: "top",
                    placeholder: "Scott",
                    value: lastname,
                    onChange: setLastname,
                    required: true
                },
                {
                    type: "email",
                    label: "Email",
                    placeholder: "john.scott@email.com",
                    value: mail,
                    onChange: setMail,
                    required: true
                },
                {
                    type: "password",
                    label: "Password",
                    value: password,
                    onChange: setPassword,
                    required: true,
                    hidden: true
                },
                {
                    type: "password",
                    label: "Confirm Password",
                    value: confirmPassword,
                    onChange: setConfirmPassword,
                    required: true,
                    hidden: true
                }
            ]}/>
        </Page>
    )
}
