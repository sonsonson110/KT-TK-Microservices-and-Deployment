import axios from "axios";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

export async function productsLoader() {
    // const response = await axios.get(`//${window.location.hostname}:8083/products`);
    const response = await axios.get(`/api/products`);
    const products = response.data.map((e) => ({ product: e, quantity: 0 }));
    return { loaderProducts: products }
}

export default function ProductPickPage() {
    const { loaderProducts } = useLoaderData();
    const [products, setProducts] = useState(loaderProducts);
    const navigate = useNavigate();

    function updateProducts(product, event) {
        const updatedProducts = products.map(e =>
            e.product.id === product.id ? { ...e, quantity: parseInt(event.target.value) } : e
        );
        setProducts(updatedProducts);
    };

    function handleNavigate() {
        const exportProducts = products.filter((e) => e.quantity > 0);
        // validation
        if (exportProducts.length === 0) {
            alert("Export order must have at least one product");
            return;
        }
        sessionStorage.setItem("exportProducts", JSON.stringify(exportProducts));
        // Redirect to export order creation
        navigate('/resellers/exportorders/create');
    }

    return (
        <>
            <h1>Chọn sản phẩm</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Đơn vị</th>
                        <th>Kho</th>
                        <th>Số lượng</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((e) =>
                        <tr key={e.product.id}>
                            <td>{e.product.id}</td>
                            <td>{e.product.name}</td>
                            <td>{e.product.price}</td>
                            <td>{e.product.unit}</td>
                            <td>{e.product.availableAmount}</td>
                            <td>
                                <input
                                    style={{ width: "80px" }}
                                    type="number"
                                    value={e.quantity}
                                    min={0} max={e.product.availableAmount}
                                    onChange={(event) => updateProducts(e.product, event)}></input>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button className="btn btn-primary" onClick={() => handleNavigate()}>Tiếp tục</button>
        </>
    )
}