import { useLoaderData, Link } from "react-router-dom";
import axios from "axios";


export async function exportOrdersLoader() {

    // const response = await axios.get(
    //     `//${window.location.hostname}:8081/resellers/exportorders`
    // );
    const response = await axios.get(`/api/resellers/exportorders`);
    const exportOrders = response.data;
    return { exportOrders };
}

export default function ExportOrdersPage() {
    const { exportOrders } = useLoaderData();

    function calculateTotalOrderPrice({ exportOrder }) {
        return exportOrder.exportProducts.reduce((prev, { quantity, exportPrice }) => prev + quantity * exportPrice, 0) + exportOrder.shippingCost
    }

    return (
        <>
            <Link to={"/home"} className="btn btn-primary">Trở về trang chủ</Link>
            <h1>Danh sách đơn xuất</h1>
            <Link to={"/resellers/exportorders/create/reseller"} class="btn btn-secondary">Tạo đơn xuất mới</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Ngày đặt</th>
                        <th>Đại lý đặt</th>
                        <th>Trạng thái</th>
                        <th>Tỉnh</th>
                        <th>Tổng đơn (vnd)</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {exportOrders.map((exportOrder) => (
                        <tr key={exportOrder.id}>
                            <td>{exportOrder.id}</td>
                            <td>{new Date(exportOrder.orderDate).toLocaleString()}</td>
                            <td>{exportOrder.reseller.name}</td>
                            <td>{exportOrder.orderStatus}</td>
                            <td>{exportOrder.reseller.city}</td>
                            <td>{calculateTotalOrderPrice({ exportOrder })}</td>
                            <td>
                                <Link to={`/resellers/exportorders/${exportOrder.id}/confirm`}
                                    class="btn btn-secondary">Xem chi tiết</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}