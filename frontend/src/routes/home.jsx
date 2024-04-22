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
            <Link to={'/resellers'}>Quản lý đại lý con</Link><br/>
            <Link to={'/suppliers/stat'}>Thống kê nhà cung câp theo hàng nhập</Link><br/>
        </>
    );
}