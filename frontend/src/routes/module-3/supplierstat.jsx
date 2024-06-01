import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

export function supplierStatsLoader() {
    const supplierStatsSes = JSON.parse(sessionStorage.getItem("supplierStats"));
    if (!supplierStatsSes) return { supplierStatsSes: [] }
    return { supplierStatsSes };
}

export default function SupplierStatPage() {

    const { supplierStatsSes } = useLoaderData();
    const [supplierStats, setSupplierStats] = useState(supplierStatsSes);
    const [isInitial, setInitial] = useState(true);
    const [datePick, setDatePick] = useState({ startDate: '2024-01-01', endDate: '2025-01-01' });

    async function getSupplierStatsByDate() {
        setInitial(false);
        const startTimestamp = datePick.startDate + " 00:00:00";
        const endTimestamp = datePick.endDate + " 00:00:00";
        // const response = await axios.get(`//${window.location.hostname}:8083/products/suppliers/stat?startDate=${startTimestamp}&endDate=${endTimestamp}`);
        const response = await axios.get(`/api/products/suppliers/stat?startDate=${startTimestamp}&endDate=${endTimestamp}`);
        setSupplierStats(response.data);
        sessionStorage.setItem("datePick", JSON.stringify({ startDate: datePick.startDate, endDate: datePick.endDate }));
    }

    function cleanupModuleSessionData() {
        sessionStorage.setItem("datePick", null);
        sessionStorage.setItem("supplierStats", null);
    }

    useEffect(() => {
        sessionStorage.setItem("supplierStats", JSON.stringify(supplierStats));
    }, [supplierStats]);

    useEffect(() => {
        const datePick = JSON.parse(sessionStorage.getItem("datePick"));
        if (datePick) {
            document.getElementById('startDate').value = datePick.startDate;
            document.getElementById('endDate').value = datePick.endDate;
        }
    }, []);

    return (
        <>
            <Link to={"/home"} class="btn btn-primary" onClick={() => cleanupModuleSessionData()}>Trở về trang chủ</Link>
            <h1>Thông kê nhà cung cấp theo hàng nhập</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label htmlFor="startDate">Ngày bắt đầu</label>
                <input type="date" id="startDate" onChange={(e) => setDatePick({ ...datePick, startDate: e.target.value })} />

                <label htmlFor="endDate">Ngày kết thúc</label>
                <input type="date" id="endDate" onChange={(e) => setDatePick({ ...datePick, endDate: e.target.value })} />

                <button onClick={() => getSupplierStatsByDate()}>Truy vấn</button>
            </div>
            <br></br>

            <p>Kết quả {!isInitial && <span>từ {new Date(datePick.startDate).toLocaleDateString()} - {new Date(datePick.endDate).toLocaleDateString()}</span>}</p>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID nhà cung cấp</th>
                        <th>Tên</th>
                        <th>Mô tả</th>
                        <th>Số hàng đã nhập</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {supplierStats.map((supplierStat) => (
                        <tr key={supplierStat.id}>
                            <td>{supplierStat.id}</td>
                            <td>{supplierStat.name}</td>
                            <td>{supplierStat.description}</td>
                            <td>{supplierStat.productAmount}</td>
                            <td><Link className="btn btn-secondary" to={`/suppliers/${supplierStat.id}/orders`}>Xem chi tiết</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}