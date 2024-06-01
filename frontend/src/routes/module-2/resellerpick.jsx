import { useLoaderData, useNavigate } from "react-router-dom";

export default function ResellerPickPage() {
    const { resellers } = useLoaderData();
    const navigate = useNavigate();

    const handleSelect = (reseller) => {
        sessionStorage.setItem('reseller', JSON.stringify(reseller));

        // Redirect to another page
        navigate('/resellers/exportorders/create/products');
    };

    return (
        <>
            <h1>Chọn khách hàng</h1>
            <table className="table table-striped">
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
                                <button onClick={() => handleSelect(reseller)}>Chọn</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}