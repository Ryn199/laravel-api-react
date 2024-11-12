import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

export default function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Decode token dengan jwt-decode
                const decoded = jwtDecode(token);
                console.log(decoded);  // Cek isi payload untuk username dan email

                setUser(decoded);  // Simpan hasil decode token (payload)
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, []);

    return (
        <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
                <h1 className="display-5 fw-bold">React (Vite) LARAVEL 11</h1>
                <p className="col-md-8 fs-4">Belajar CRUD dengan Laravel 11</p>

                {user ? (
                    <div className="alert alert-info mt-4">
                        <h4>Selamat datang, {user.username}!</h4>
                        <p>Email Anda: {user.email}</p>
                    </div>
                ) : (
                    <p>Anda belum login.</p>
                )}
            </div>
        </div>
    );
}
