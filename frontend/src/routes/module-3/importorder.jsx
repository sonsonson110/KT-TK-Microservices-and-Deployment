import axios from "axios";
import { useLoaderData } from "react-router-dom";

export async function importOrderLoader({ params }) {
    // get import order
    const importOrderId = params.importOrderId;
    // const importOrderResponse = await axios.get("//" + window.location.hostname + `:8082/suppliers/orders/${importOrderId}`);
    const importOrderResponse = await axios.get(`/api/suppliers/orders/${importOrderId}`);
    const importOrder = importOrderResponse.data;

    // get employee & product detail
    const employeeId = importOrder.employeeId;
    // const employeeResponse = axios.get("//" + window.location.hostname + `:8080/users/${employeeId}`);
    const employeeResponse = axios.get(`/api/users/${employeeId}`);

    const productIdArray = importOrder.importProducts.map((e) => e.productId).join(", ");
    // const productsResponse = await axios.get("//" + window.location.hostname + `:8083/products/${productIdArray}`);
    const productsResponse = await axios.get(`/api/products/${productIdArray}`);
    const productsDetail = productsResponse.data;

    const detailImportProducts = importOrder.importProducts.map((e) => {
        const productDetail = productsDetail.find(x => x.id === e.productId);
        return {
            ...e,
            name: productDetail.name,
            unit: productDetail.unit,
            weight: productDetail.weight
        };
    });

    return {
        importOrder,
        employee: (await employeeResponse).data,
        detailImportProducts
    };
}

export default function ImportOrderPage() {
    const { importOrder, employee, detailImportProducts } = useLoaderData();

    function getTotalProductsPrice() {
        return detailImportProducts.reduce((prev, { quantity, importPrice }) => prev + quantity * importPrice, 0);
    }

    function getTotalProductsWeight() {
        return detailImportProducts.reduce((prev, { quantity, weight }) => prev + weight * quantity, 0);
    }

    return (
        <>
            <h1>Thông tin chi tiêt hoá đơn {importOrder.id}</h1>

            <div>
                <h2>Thông tin chi tiết nhà cung cấp</h2>
                <p>Id nhà cung cấp: {importOrder.supplier.id}</p>
                <p>Tên nhà cung cấp: {importOrder.supplier.name}</p>
                <p>Mô tả thêm: {importOrder.supplier.description}</p>
            </div>

            <div>
                <h2>Nhân viên liên quan</h2>
                <p>Id nhân viên: {employee.id}</p>
                <p>Tên: {employee.name}</p>
                <p>Số điện thoại: {employee.phoneNumber}</p>
                <p>Email: {employee.email}</p>
            </div>

            <div>
                <h2>Danh sách đơn hàng nhập</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Đơn vị</th>
                            <th>Khối lượng (kg)</th>
                            <th>Giá nhập</th>
                            <th>Số lượng</th>
                            <th>Tổng hàng</th>
                            <th>Tổng khối lượng hàng (kg)</th>
                        </tr>
                    </thead>

                    <tbody>
                        {detailImportProducts.map((importProduct) => (
                            <tr key={importProduct.id}>
                                <td>{importProduct.productId}</td>
                                <td>{importProduct.name}</td>
                                <td>{importProduct.unit}</td>
                                <td>{importProduct.weight}</td>
                                <td>{importProduct.importPrice}</td>
                                <td>{importProduct.quantity}</td>
                                <td>{importProduct.quantity * importProduct.importPrice}</td>
                                <td>{importProduct.quantity * importProduct.weight}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p>Tổng giá trị sản phẩm nhập: {getTotalProductsPrice()}</p>
                <p>Giá vận chuyển: {importOrder.shippingCost}</p>
                <p>Tổng đơn nhập: {importOrder.shippingCost + getTotalProductsPrice()}</p>
                <p>Tổng khối lượng sản phẩm {getTotalProductsWeight()}kg</p>
            </div>
        </>
    )
}