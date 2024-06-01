import axios from "axios";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export async function exportOrderConfirmLoader({ params }) {
    const exportOrderId = params.exportOrderId;
    // const exportOrderResponse = await axios.get(`//${window.location.hostname}:8081/resellers/exportorders/${exportOrderId}`);
    const exportOrderResponse = await axios.get(`/api/resellers/exportorders/${exportOrderId}`);
    const exportOrderData = exportOrderResponse.data;

    // get related data
    // const employeeResponse = await axios.get(`//${window.location.hostname}:8080/users/${exportOrderData.employeeId}`);
    const employeeResponse = await axios.get(`/api/users/${exportOrderData.employeeId}`);
    const employeeData = employeeResponse.data;

    const productIds = exportOrderData.exportProducts.map(e => e.productId).join(',');
    // const productDetailsResponse = await axios.get(`//${window.location.hostname}:8083/products?productIds=${productIds}`);
    const productDetailsResponse = await axios.get(`/api/products?productIds=${productIds}`);
    const productDetailsData = productDetailsResponse.data;

    let resellerUser = null;
    if (exportOrderData.reseller.userId) {
        // const resellerUserResp = await axios.get(`//${window.location.hostname}:8080/users/${exportOrderData.reseller.userId}`);
        const resellerUserResp = await axios.get(`/api/users/${exportOrderData.reseller.userId}`);
        resellerUser = resellerUserResp.data;
    }

    // refactor the exportOrder-exportProducts
    const exportProducts = exportOrderData.exportProducts.map(e => {
        const { productId, ...rest } = e;
        const product = productDetailsData.find(e => e.id === productId);
        return { ...rest, product };
    });

    const formattedExportOrder = { ...exportOrderData, employee: employeeData, exportProducts: exportProducts }
    return { exportOrderInitial: formattedExportOrder, resellerUser };
}


function getTotalProductsPrice(exportProducts) {
    return exportProducts.reduce((prev, { quantity, exportPrice }) => prev + quantity * exportPrice, 0);
}

export default function ExportOrderConfirmPage() {
    const navigate = useNavigate();
    const { exportOrderInitial, resellerUser } = useLoaderData();
    const [exportOrder, setExportOrder] = useState(exportOrderInitial);
    const productsCost = getTotalProductsPrice(exportOrder.exportProducts);

    function handleReset() {
        const newExportOrder = { ...exportOrder, shippingCode: null };
        setExportOrder(newExportOrder);
    }

    function payloadFormat() {
        const { employee, exportProducts, ...rest } = exportOrder;
        const formatted = {
            ...rest,
            employeeId: employee.id,
            exportProducts: exportProducts.map(e => ({
                id: e.id,
                productId: e.product.id,
                exportPrice: e.exportPrice,
                quantity: e.quantity,
            }))
        }
        return formatted;
    }

    async function updateExportOrder() {
        if (!exportOrder.shippingCode) {
            alert("Please enter shipping code!");
            return;
        }

        const payload = {
            ...payloadFormat(),
            orderStatus: "exported",
            exportDate: Date.now(),
        };
        try {
            // await axios.put(`//${window.location.hostname}:8081/resellers/exportorders`, payload);
            await axios.put(`/api/resellers/exportorders`, payload);
            navigate("/resellers/exportorders");
        } catch (e) {
            console.log(e);
        }
    }

    async function cancelExportOrder() {
        const payload = {
            ...payloadFormat(),
            orderStatus: "cancelled",
        };
        try {
            // await axios.put(`//${window.location.hostname}:8081/resellers/exportorders`, payload);
            await axios.put(`/api/resellers/exportorders`, payload);
            navigate("/resellers/exportorders");
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div>
                <h1>Thông tin đơn và tài khoản</h1>

                <h2>Thông tin đơn xuất</h2>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Id đơn đặt</th>
                            <td><span>{exportOrder.id}</span></td>
                        </tr>
                        <tr>
                            <th>Ngày đặt</th>
                            <td><span>{new Date(exportOrder.orderDate).toLocaleString()}</span></td>
                        </tr>
                        <tr>
                            <th>Trạng thái</th>
                            <td><span>{exportOrder.orderStatus}</span></td>
                        </tr>
                        {exportOrder.exportDate && (
                            <tr>
                                <th>Ngày xuất đơn</th>
                                <td><span>{new Date(exportOrder.exportDate).toLocaleString()}</span></td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <h2>Thông tin đại lý con</h2>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Tên đại lý con</th>
                            <td><span>{exportOrder.reseller.name}</span></td>
                        </tr>
                        <tr>
                            <th>Số điện thoại</th>
                            <td><span>{exportOrder.reseller.phoneNumber}</span></td>
                        </tr>
                    </tbody>
                </table>

                {resellerUser && (
                    <>
                        <h3>Thông tin tài khoản đại lý con trên hệ thống</h3>
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <td><span>{resellerUser.id}</span></td>
                                </tr>
                                <tr>
                                    <th>Username</th>
                                    <td><span>{resellerUser.username}</span></td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td><span>{resellerUser.email}</span></td>
                                </tr>
                                <tr>
                                    <th>Tên</th>
                                    <td><span>{resellerUser.name}</span></td>
                                </tr>
                                <tr>
                                    <th>Số điện thoại</th>
                                    <td><span>{resellerUser.phoneNumber}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                )}
            </div>


            <div>
                <h1>Thông tin địa chỉ</h1>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Đường</th>
                            <td><span>{exportOrder.reseller.street}</span></td>
                        </tr>
                        <tr>
                            <th>Thành phố</th>
                            <td><span>{exportOrder.reseller.city}</span></td>
                        </tr>
                        <tr>
                            <th>Tỉnh</th>
                            <td><span>{exportOrder.reseller.province}</span></td>
                        </tr>
                        <tr>
                            <th>Zipcode</th>
                            <td><span>{exportOrder.reseller.zipcode}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h1>Thông tin sản phẩm</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Đơn vị</th>
                            <th>Số lượng</th>
                            <th>Tổng hàng (vnd)</th>
                        </tr>
                    </thead>

                    <tbody>
                        {exportOrder.exportProducts.map((e) =>
                            <tr key={e.product.id}>
                                <td>{e.product.id}</td>
                                <td>{e.product.name}</td>
                                <td>{e.exportPrice}</td>
                                <td>{e.product.unit}</td>
                                <td>{e.quantity}</td>
                                <td>{e.exportPrice * e.quantity}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div>
                <h1>Tổng quan</h1>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Phí sản phẩm</th>
                            <td><span>{productsCost}vnd</span></td>
                        </tr>
                        <tr>
                            <th>Phí ship</th>
                            <td><span>{exportOrder.shippingCost}vnd</span></td>
                        </tr>
                        <tr>
                            <th>Tổng tiền</th>
                            <td><span>{exportOrder.shippingCost + productsCost}vnd</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>


            {
                exportOrder.orderStatus !== "cancelled" &&
                <div className="form-group">
                    <label htmlFor="shippingCode">Mã vận chuyển</label>
                    <input
                        name="shippingCode"
                        className="form-control"
                        value={exportOrder.shippingCode || ""}
                        onChange={(e) => setExportOrder({ ...exportOrder, shippingCode: e.target.value })}
                        style={{ width: "400px", display: "inline-block" }} required />
                    <button
                        style={{ display: "inline-block", marginLeft: "8px" }}
                        onClick={() => handleReset()}
                        className="btn btn-secondary">Reset</button>

                    <div style={{ marginTop: "8px" }}>
                        <button onClick={() => updateExportOrder()} className="btn btn-success">Xuất hàng</button>
                        <button onClick={() => cancelExportOrder()} style={{ marginLeft: "8px" }} className="btn btn-danger">Hủy đơn hàng</button>
                    </div>
                </div>
            }
        </>
    )
}