import axios from "axios";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export async function exportOrderLoader() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const reseller = JSON.parse(sessionStorage.getItem("reseller"));
    const exportProducts = JSON.parse(sessionStorage.getItem("exportProducts"));

    let resellerUser = null;
    if (reseller.userId) {
        // const resellerUserResp = await axios.get(`//${window.location.hostname}:8080/users/${reseller.userId}`);
        const resellerUserResp = await axios.get(`/api/users/${reseller.userId}`);
        resellerUser = resellerUserResp.data;
    }

    // const shippingMethodsRes = await axios.get(
    //     `//${window.location.hostname}:8081/resellers/exportorders/shipping?weight=${getTotalProductsWeight(exportProducts)}&city=${reseller.city}`
    // );
    const shippingMethodsRes = await axios.get(
        `/api/resellers/exportorders/shipping?weight=${getTotalProductsWeight(exportProducts)}&city=${reseller.city}`
    );
    const shippingMethodsData = shippingMethodsRes.data;
    return { user, reseller, resellerUser, exportProducts, shippingMethods: shippingMethodsData };
}

function getTotalProductsPrice(exportProducts) {
    return exportProducts.reduce((prev, { quantity, product }) => prev + quantity * product.price, 0);
}

function getTotalProductsWeight(exportProducts) {
    return exportProducts.reduce((prev, { quantity, product }) => prev + product.weight * quantity, 0);
}

export default function ExportOrderCreationPage() {
    const navigate = useNavigate();
    const { reseller, resellerUser, exportProducts, shippingMethods, user } = useLoaderData();
    const [shipType, setShipType] = useState("none");

    async function createExportOrder() {
        if (shipType === "none") {
            alert("Please select the a shipping method")
            return;
        }

        const formattedExportProducts = exportProducts.map(e => ({
            productId: e.product.id,
            exportPrice: e.product.price,
            quantity: e.quantity,
        }));

        const exportOrder = {
            reseller,
            employeeId: user.id,
            orderStatus: "pending",
            orderDate: Date.now(),
            shippingCost: shippingMethods.find((e) => e.type === shipType).price,
            exportProducts: formattedExportProducts,
        }

        try {
            // await axios.post(`//${window.location.hostname}:8081/resellers/exportorders`, exportOrder);
            await axios.post(`/api/resellers/exportorders`, exportOrder);
            navigate("/resellers/exportorders");
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <h1>Xác nhận thông tin đơn xuất</h1>
            <div>
                <h2>Thông tin đại lý con</h2>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <td><span>{reseller.id}</span></td>
                        </tr>
                        <tr>
                            <th>Tên đại lý</th>
                            <td><span>{reseller.name}</span></td>
                        </tr>
                    </tbody>
                </table>
                {
                    resellerUser &&
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
                }
            </div >

            <div>
                <h2>Thông tin địa chỉ</h2>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Điện thoại</th>
                            <td><span>{reseller.phoneNumber}</span></td>
                        </tr>
                        <tr>
                            <th>Đường</th>
                            <td><span>{reseller.street}</span></td>
                        </tr>
                        <tr>
                            <th>Thành phố</th>
                            <td><span>{reseller.city}</span></td>
                        </tr>
                        <tr>
                            <th>Tỉnh</th>
                            <td><span>{reseller.province}</span></td>
                        </tr>
                        <tr>
                            <th>Mã zip</th>
                            <td><span>{reseller.zipcode}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h2>Thông tin sản phẩm</h2>
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
                        {exportProducts.map((e) =>
                            <tr key={e.product.id}>
                                <td>{e.product.id}</td>
                                <td>{e.product.name}</td>
                                <td>{e.product.price}</td>
                                <td>{e.product.unit}</td>
                                <td>{e.quantity}</td>
                                <td>{e.product.price * e.quantity}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <h4>Tóm tắt thông tin đơn</h4>
                <table className="table table-striped">
                    <tbody>
                        <tr>
                            <th>Tổng giá trị các mặt hàng</th>
                            <td><span>{getTotalProductsPrice(exportProducts)}vnd</span></td>
                        </tr>
                        <tr>
                            <th>Tổng khối lượng các mặt hàng</th>
                            <td><span>{getTotalProductsWeight(exportProducts)}kg</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h2>Chọn hình thức vận chuyển</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Kiểu</th>
                            <th>Phí vận chuyển</th>
                            <th>Mô tả</th>
                            <th>Chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shippingMethods.map((e) =>
                            <tr>
                                <td>{e.type}</td>
                                <td>{e.price}</td>
                                <td>{e.description}</td>
                                <td>
                                    <input
                                        type="radio"
                                        checked={e.type === shipType}
                                        onChange={() => setShipType(e.type)}
                                    />
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <button onClick={() => createExportOrder()} className="btn btn-primary">Xác nhận</button>
        </>
    )
}