import axios from "axios";
import { Link, useLoaderData, Form } from "react-router-dom"

export async function loader() {
    // const response = await axios.get("//" + window.location.hostname + ":8081/resellers");
    const response = await axios.get("/api/resellers");
    const resellers = response.data;
    return { resellers };
}

export async function deleteResellerAction({ request }) {
    const formData = await request.formData();
    const resellerId = formData.get("resellerId");
    // return axios.delete("//" + window.location.hostname + `:8081/resellers/${resellerId}`);
    return axios.delete(`/api/resellers/${resellerId}`);
}

export default function ResellerPage() {
    const { resellers } = useLoaderData();
    return (
        <>
            {console.log(resellers)}
            <p>Đại lý con</p>
            <Link to={"/resellers/create"}>Tạo đại lý con mới</Link>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tên</th>
                        <th>Đường</th>
                        <th>Thành phố</th>
                        <th>Tỉnh</th>
                        <th>Mã zip</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {resellers.map((reseller) => (
                        <tr key={reseller.id}>
                            <td>{reseller.id}</td>
                            <td>{reseller.name}</td>
                            <td>{reseller.street}</td>
                            <td>{reseller.city}</td>
                            <td>{reseller.province}</td>
                            <td>{reseller.zipcode}</td>
                            <td>
                                <Link to={`/resellers/update/${reseller.id}`}>Chỉnh sửa</Link>
                                <Form method="delete" replace>
                                    <input name="resellerId" defaultValue={reseller.id} hidden />
                                    <button type="submit">Delete</button>
                                </Form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}