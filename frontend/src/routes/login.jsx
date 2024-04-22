import axios from "axios";
import { Form, redirect, useSearchParams } from "react-router-dom";

export async function action({ request }) {
    const formData = await request.formData();
    const fields = Object.fromEntries(formData);

    try {
        // const response = await axios.post(
        //     "//" + window.location.hostname + ":8080/users/auth",
        //     fields
        // )
        const response = await axios.post(
            "/api/users/auth",
            fields
        )
        sessionStorage.setItem("user", JSON.stringify(response.data));
        return redirect('/home');

    } catch (e) {
        console.error(e);
        return redirect(`/?error=true`) ;
    }

}

export default function LoginPage() {
    const [searchParams] = useSearchParams();
    return (
        <>
            Đăng nhập
            <Form method="post">
                <p>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                    />
                </p>
                <p>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                    />
                </p>
                <button type="submit">Login</button>
            </Form>
            {searchParams.get("error") ? "Đăng nhập thất bại" : <></>}
        </>
    );
}