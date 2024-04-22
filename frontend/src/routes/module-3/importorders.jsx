import axios from "axios";
import { useLoaderData, Link } from "react-router-dom";

export async function importOrdersLoader({ params }) {
    const supplierId = params.supplierId;
    const datePick = JSON.parse(sessionStorage.getItem("datePick"));

    // const response = await axios.get(
    //     "//" + window.location.hostname + `:8082/suppliers/${supplierId}/orders?startDate=${datePick.startDate}&endDate=${datePick.endDate}`
    // );
    const response = await axios.get(
        `/api/suppliers/${supplierId}/orders?startDate=${datePick.startDate}&endDate=${datePick.endDate}`
    );
    const importOrders = response.data;
    return { importOrders, datePick };
}

export default function ImportOrdersPage() {
    const { importOrders, datePick } = useLoaderData();


    return (
        <>
            <h1>Chi tiết các đơn nhập từ nhà cung cấp: {importOrders[0].supplier.name}</h1>
            <p>Thời gian: {new Date(datePick.startDate*1000).toLocaleDateString()} - {new Date(datePick.endDate*1000).toLocaleDateString()}</p>

            <table>
                <thead>
                    <tr>
                        <th>Id đơn nhập</th>
                        <th>Ngày nhập</th>
                        <th>Số lượng hàng</th>
                        <th>Tổng đơn nhập</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {importOrders.map((importOrder) => (
                        <tr key={importOrder.id}>
                            <td>{importOrder.id}</td>
                            <td>{new Date(importOrder.importDate).toLocaleString()}</td>
                            <td>{importOrder.importProducts.reduce((prev, { quantity }) => prev + quantity, 0)}</td>
                            <td>{importOrder.importProducts.reduce((prev, { quantity, importPrice }) => prev + quantity * importPrice, 0) + importOrder.shippingCost}</td>
                            <td><Link to={`/suppliers/orders/${importOrder.id}`}>Xem chi tiết</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}