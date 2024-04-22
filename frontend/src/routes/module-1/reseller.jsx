import axios from "axios";
import { Form, redirect, useLoaderData } from "react-router-dom"

export async function resellerLoader({ params }) {
    if (params.resellerId === undefined) return {};

    const resellerId = params.resellerId;
    // const response = await axios.get("//" + window.location.hostname + `:8081/resellers/${resellerId}`);
    const response = await axios.get(`/api/resellers/${resellerId}`);
    const reseller = response.data;
    return { reseller }
}

export async function resellerCreateAction({ request }) {
    const formData = await request.formData();
    const fields = Object.fromEntries(formData);
    console.log(fields);
    // await axios.post("//" + window.location.hostname + `:8081/resellers`, fields);
    await axios.post(`/api/resellers`, fields);
    return redirect('/resellers')
}

export async function resellerUpdateAction({ request }) {
    const formData = await request.formData();
    const fields = Object.fromEntries(formData);
    // await axios.put("//" + window.location.hostname + `:8081/resellers`, fields);
    await axios.put("/api/resellers", fields);
    return redirect('/resellers')
}

export default function ResellerEditPage({ isUpdate }) {
    const { reseller } = useLoaderData();
    return (
        <>
            <h1>{isUpdate ? "Chỉnh sửa" : "Thêm"} thông tin đại lý con</h1>
            <Form method={isUpdate ? "put" : "post"}>
                {isUpdate && <p>
                    <span>Id</span>
                    <input name="id" defaultValue={isUpdate && reseller.id} readOnly />
                </p>}
                <p>
                    <span>Tên đại lý con</span>
                    <input name="name" defaultValue={isUpdate && reseller.name} />
                </p>
                <h2>Địa chỉ</h2>
                <p>
                    <span>Đường</span>
                    <input name="street" defaultValue={isUpdate && reseller.street} />
                </p>
                <p>
                    <span>Thành phố</span>
                    <input name="city" defaultValue={isUpdate && reseller.city} />
                </p>
                <p>
                    <span>Tỉnh</span>
                    <input name="province" defaultValue={isUpdate && reseller.province} />
                </p>
                <p>
                    <span>Mã zip</span>
                    <input name="zipcode" defaultValue={isUpdate && reseller.zipcode} />
                </p>
                <button type="submit">Xác nhận</button>
                <button type="reset">Hoàn tác</button>
            </Form>
        </>
    )
}