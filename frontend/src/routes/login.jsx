import axios from "axios";
import { Form, redirect, useSearchParams } from "react-router-dom";

export async function action({ request }) {
    const formData = await request.formData();
    const fields = Object.fromEntries(formData);

    try {
        // const response = await axios.post(
        //     `//${window.location.hostname}:8080/users/auth`,
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
        return redirect(`/?error=true`);
    }

}

export default function LoginPage() {
    const [searchParams] = useSearchParams();
    return (
        <>
            Đăng nhập
            <Form method="post">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        className="form-control"
                        style={{ width: "400px" }}
                        type="text"
                        name="username"
                        id="username"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        className="form-control"
                        style={{ width: "400px" }}
                        type="password"
                        name="password"
                        id="password"
                    />
                </div>
                <button class="btn btn-primary" style={{marginTop: "8px"}} type="submit">Login</button>
            </Form>
            {searchParams.get("error") ? <div style={{marginTop: "8px"}} class="alert alert-danger" role="alert">Đăng nhập thất bại</div> : <></>}
        </>
    );
}