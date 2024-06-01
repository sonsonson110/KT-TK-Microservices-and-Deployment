import axios from "axios";
import { Form, redirect, useLoaderData } from "react-router-dom"

export async function resellerLoader({ params }) {
    if (params.resellerId === undefined) return {};

    const resellerId = params.resellerId;
    // const response = await axios.get(`//${window.location.hostname}:8081/resellers/${resellerId}`);
    const response = await axios.get(`/api/resellers/${resellerId}`);
    const reseller = response.data;
    return { reseller }
}

export async function resellerCreateAction({ request }) {
    const formData = await request.formData();
    const fields = Object.fromEntries(formData);
    console.log(fields);
    // await axios.post(`//${window.location.hostname}:8081/resellers`, fields);
    await axios.post(`/api/resellers`, fields);
    return redirect('/resellers')
}

export async function resellerUpdateAction({ request }) {
    const formData = await request.formData();
    const fields = Object.fromEntries(formData);
    // await axios.put(`//${window.location.hostname}:8081/resellers`, fields);
    await axios.put("/api/resellers", fields);
    return redirect('/resellers')
}

export default function ResellerEditPage({ isUpdate }) {
    const { reseller } = useLoaderData();
    return (
        <>
            <h1>{isUpdate ? "Chỉnh sửa" : "Thêm"} thông tin đại lý con</h1>
            <Form method={isUpdate ? "put" : "post"}>
                {isUpdate &&
                    <div className="form-group">
                        <label for="id">Id</label>
                        <input
                            name="id"
                            defaultValue={isUpdate && reseller.id}
                            className="form-control"
                            style={{ width: "400px" }}
                            readOnly />
                    </div>}
                <div className="form-group">
                    <label for="name">Tên đại lý con</label>
                    <input name="name"
                        className="form-control"
                        style={{ width: "400px" }}
                        defaultValue={isUpdate && reseller.name} required />
                </div>
                <h2>Địa chỉ</h2>
                <div className="form-group">
                    <label for="street">Đường</label>
                    <input
                        name="street"
                        className="form-control"
                        style={{ width: "400px" }}
                        defaultValue={isUpdate && reseller.street} />
                </div>
                <div className="form-group">
                    <label for="city">Thành phố</label>
                    <input
                        name="city"
                        defaultValue={isUpdate && reseller.city}
                        className="form-control"
                        style={{ width: "400px" }}
                        required />
                </div>
                <div className="form-group">
                    <label for="province">Tỉnh</label>
                    <input
                        name="province"
                        className="form-control"
                        style={{ width: "400px" }}
                        defaultValue={isUpdate && reseller.province} />
                </div>
                <div className="form-group">
                    <label for="zipcode">Mã zip</label>
                    <input name="zipcode"
                        className="form-control"
                        style={{ width: "400px" }}
                        defaultValue={isUpdate && reseller.zipcode} />
                </div>
                <div className="form-group">
                    <label for="phoneNumber">Số điện thoại</label>
                    <input name="phoneNumber"
                        className="form-control"
                        style={{ width: "400px" }}
                        defaultValue={isUpdate && reseller.phoneNumber} required/>
                </div>
                <div style={{marginTop: "8px"}}>
                    <button className="btn btn-primary" type="submit">Xác nhận</button>
                    <button class="btn btn-secondary" style={{ marginLeft: "8px" }} type="reset">Hoàn tác</button>
                </div>
            </Form>
        </>
    )
}