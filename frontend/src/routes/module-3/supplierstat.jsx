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
    const [datePick, setDatePick] = useState({ startDate: '2024-01-01', endDate: '2025-01-01' });

    async function getSupplierStatsByDate() {
        const startTimestamp = new Date(datePick.startDate).getTime() / 1000;   // eliminate the milis or else backend query wouldn't work
        const endTimestamp = new Date(datePick.endDate).getTime() / 1000;

        // const response = await axios.get("//" + window.location.hostname + `:8082/suppliers/stat?startDate=${startTimestamp}&endDate=${endTimestamp}`);
        const response = await axios.get(`/api/suppliers/stat?startDate=${startTimestamp}&endDate=${endTimestamp}`);
        setSupplierStats(response.data);
        sessionStorage.setItem("datePick", JSON.stringify({ startDate: startTimestamp, endDate: endTimestamp }));
    }
    useEffect(() => {
        sessionStorage.setItem("supplierStats", JSON.stringify(supplierStats));
    }, [supplierStats]);

    return (
        <>
            <h1>Thông kê nhà cung cấp theo hàng nhập</h1>
            <label htmlFor="startDate">Ngày bắt đầu</label><br />
            <input type="date" id="startDate" onChange={(e) => setDatePick({ ...datePick, startDate: e.target.value })}></input>

            <br />

            <label htmlFor="endDate">Ngày kết thúc</label><br />
            <input type="date" id="endDate" onChange={(e) => setDatePick({ ...datePick, endDate: e.target.value })}></input>

            <br />

            <button onClick={() => getSupplierStatsByDate()}>Truy vấn</button>

            <br /><br />

            <h2>Kết quả</h2>
            <table>
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
                            <td><Link to={`/suppliers/${supplierStat.id}/orders`}>Xem chi tiết</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}