import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {

    const [user, setUser] = useState({});

    useEffect(() => {
        const sessionUser = sessionStorage.getItem("user");
        setUser(JSON.parse(sessionUser));
    },[])

    return (
        <>
            <p>Xin chào {JSON.stringify(user)}</p>
            <Link style={{marginBottom: "8px"}} className="btn btn-secondary" to={'/resellers'}>Quản lý đại lý con</Link><br/>
            <Link style={{marginBottom: "8px"}} className="btn btn-secondary" to={'/resellers/exportorders'}>Danh sách đơn xuất</Link><br/>
            <Link style={{marginBottom: "8px"}} className="btn btn-secondary" to={'/suppliers/stat'}>Thống kê nhà cung câp theo hàng nhập</Link><br/>
        </>
    );
}