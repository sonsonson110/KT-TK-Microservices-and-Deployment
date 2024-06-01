import axios from "axios";
import { useLoaderData } from "react-router-dom";

export async function importOrderLoader({ params }) {
    // get import order
    const importOrderId = params.importOrderId;
    // const importOrderResponse = await axios.get(`//${window.location.hostname}:8083/products/importorders/${importOrderId}`);
    const importOrderResponse = await axios.get(`/api/products/importorders/${importOrderId}`);
    const importOrder = importOrderResponse.data;

    // get employee & product detail
    const employeeId = importOrder.employeeId;
    // const employeeResponse = axios.get(`//${window.location.hostname}:8080/users/${employeeId}`);
    const employeeResponse = axios.get(`/api/users/${employeeId}`);

    return {
        importOrder,
        employee: (await employeeResponse).data
    };
}

export default function ImportOrderPage() {
    const { importOrder, employee } = useLoaderData();

    function getTotalProductsPrice() {
        return importOrder.importProducts.reduce((prev, { quantity, importPrice }) => prev + quantity * importPrice, 0);
    }

    function getTotalProductsWeight() {
        return importOrder.importProducts.reduce((prev, { quantity, product }) => prev + product.weight * quantity, 0);
    }

    return (
        <>
            <h1>Thông tin chi tiêt đơn nhập {importOrder.id}</h1>

            <div>
                <h2>Thông tin chi tiết nhà cung cấp</h2>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Id nhà cung cấp</th>
                            <td>{importOrder.supplier.id}</td>
                        </tr>
                        <tr>
                            <th>Tên nhà cung cấp</th>
                            <td>{importOrder.supplier.name}</td>
                        </tr>
                        <tr>
                            <th>Mô tả thêm</th>
                            <td>{importOrder.supplier.description}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h2>Nhân viên liên quan</h2>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Id nhân viên</th>
                            <td>{employee.id}</td>
                        </tr>
                        <tr>
                            <th>Tên</th>
                            <td>{employee.name}</td>
                        </tr>
                        <tr>
                            <th>Số điện thoại</th>
                            <td>{employee.phoneNumber}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{employee.email}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h2>Danh sách đơn hàng nhập</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Đơn vị</th>
                            <th>Khối lượng (kg)</th>
                            <th>Giá nhập (vnd)</th>
                            <th>Số lượng</th>
                            <th>Tổng hàng (vnd)</th>
                            <th>Tổng khối lượng hàng (kg)</th>
                        </tr>
                    </thead>

                    <tbody>
                        {importOrder.importProducts.map((importProduct) => (
                            <tr key={importProduct.id}>
                                <td>{importProduct.product.id}</td>
                                <td>{importProduct.product.name}</td>
                                <td>{importProduct.product.unit}</td>
                                <td>{importProduct.product.weight}</td>
                                <td>{importProduct.importPrice}</td>
                                <td>{importProduct.quantity}</td>
                                <td>{importProduct.quantity * importProduct.importPrice}</td>
                                <td>{importProduct.quantity * importProduct.product.weight}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h1>Tổng quan đơn nhập hàng (vnd)</h1>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Tổng giá trị sản phẩm nhập</th>
                            <td>{getTotalProductsPrice()}</td>
                        </tr>
                        <tr>
                            <th>Giá vận chuyển</th>
                            <td>{importOrder.shippingCost}</td>
                        </tr>
                        <tr>
                            <th>Tổng đơn nhập</th>
                            <td>{importOrder.shippingCost + getTotalProductsPrice()}</td>
                        </tr>
                        <tr>
                            <th>Tổng khối lượng sản phẩm</th>
                            <td>{getTotalProductsWeight()}kg</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}