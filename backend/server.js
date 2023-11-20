const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
const sql = require('mssql')


// Kêt nối Sql Server
const config = {
    user: "SA",
    password: "Dung112001@123",
    database: "HeThongCapNuoc",
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}


//Kết nối mysql
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'hethongcapnuoc',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

app.use(cors());


app.get('/data', async (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            const query = "SELECT ChiNhanh.*,\n" +
                "       Tinh.ten_tinh,\n" +
                "       TramCapNuoc.ten_tram_cap_nuoc,\n" +
                "       MangLuoi.ten_mang_luoi,\n" +
                "       Nuoc.ten_nuoc,\n" +
                "       ChatLuongNuoc.ngay_kiem_tra,\n" +
                "       KhachHang.ten_khach_hang,\n" +
                "       DiemThuTien.dia_chi AS dia_chi_diem_thu_tien,\n" +
                "       GiaTienNuoc.gia_tien,\n" +
                "       d.ten_dich_vu\n" +
                "FROM ChiNhanh\n" +
                "JOIN Tinh ON ChiNhanh.ma_tinh = Tinh.ma_tinh\n" +
                "LEFT JOIN TramCapNuoc ON ChiNhanh.ma_chi_nhanh = TramCapNuoc.ma_chi_nhanh\n" +
                "LEFT JOIN MangLuoi ON TramCapNuoc.ma_tram_cap_nuoc = MangLuoi.ma_tram_cap_nuoc\n" +
                "LEFT JOIN Nuoc ON MangLuoi.ma_mang_luoi = Nuoc.ma_mang_luoi\n" +
                "LEFT JOIN ChatLuongNuoc ON Nuoc.ma_nuoc = ChatLuongNuoc.ma_nuoc\n" +
                "LEFT JOIN KhachHang ON Nuoc.ma_mang_luoi = KhachHang.ma_mang_luoi\n" +
                "LEFT JOIN DiemThuTien ON Nuoc.ma_mang_luoi = DiemThuTien.ma_mang_luoi\n" +
                "LEFT JOIN GiaTienNuoc ON MangLuoi.ma_mang_luoi = GiaTienNuoc.ma_mang_luoi\n" +
                "left join dichvucapnuoc d on GiaTienNuoc.ma_dich_vu = d.ma_dich_vu;";
            connection.query(query, async (error, results, fields) => {
                connection.release();
                if (error) {
                    console.error(error);
                    res.status(500).send('Internal Server Error');
                } else {
                    await res.json(results);
                }
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/data/:chinhanh', async (req, res) => {
    const chinhanh = req.params.chinhanh;
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            const query = `
            SELECT ChiNhanh.*,
                   Tinh.ten_tinh,
                   TramCapNuoc.ten_tram_cap_nuoc,
                   MangLuoi.ten_mang_luoi,
                   Nuoc.ten_nuoc,
                   ChatLuongNuoc.ngay_kiem_tra,
                   KhachHang.ten_khach_hang,
                   DiemThuTien.dia_chi AS dia_chi_diem_thu_tien,
                   GiaTienNuoc.gia_tien,
                   d.ten_dich_vu
            FROM ChiNhanh
            JOIN Tinh ON ChiNhanh.ma_tinh = Tinh.ma_tinh
            LEFT JOIN TramCapNuoc ON ChiNhanh.ma_chi_nhanh = TramCapNuoc.ma_chi_nhanh
            LEFT JOIN MangLuoi ON TramCapNuoc.ma_tram_cap_nuoc = MangLuoi.ma_tram_cap_nuoc
            LEFT JOIN Nuoc ON MangLuoi.ma_mang_luoi = Nuoc.ma_mang_luoi
            LEFT JOIN ChatLuongNuoc ON Nuoc.ma_nuoc = ChatLuongNuoc.ma_nuoc
            LEFT JOIN KhachHang ON Nuoc.ma_mang_luoi = KhachHang.ma_mang_luoi
            LEFT JOIN DiemThuTien ON Nuoc.ma_mang_luoi = DiemThuTien.ma_mang_luoi
            LEFT JOIN GiaTienNuoc ON MangLuoi.ma_mang_luoi = GiaTienNuoc.ma_mang_luoi
            LEFT JOIN dichvucapnuoc d on GiaTienNuoc.ma_dich_vu = d.ma_dich_vu
            WHERE ChiNhanh.ma_chi_nhanh = '${chinhanh}'`;
            connection.query(query, async (error, results, fields) => {
                connection.release();

                if (error) {
                    console.error(error);
                    res.status(500).send('Internal Server Error');
                } else {
                    await res.json(results);
                }
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/chi-nhanh', async (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            const query = "select *\n" +
                "from chinhanh;";

            connection.query(query, (error, results, fields) => {
                connection.release(); // Release the connection back to the pool

                if (error) {
                    console.error(error);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.json(results);
                }
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/tram-cap-nuoc', async (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            const query = 'SELECT * FROM TramCapNuoc';

            connection.query(query, (error, results, fields) => {
                connection.release(); // Release the connection back to the pool

                if (error) {
                    console.error(error);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.json(results);
                }
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/sql_sv', async (req, res) => {
    try {
        let pool =
            await sql.connect(config)
        let result =
            await pool.request()
                .query('select * from Tinh')
        return res.json(result.recordset)
    } catch (err) {
        console.error(err);
    }
});


app.get('/phantan-tinh', async (req, res) => {
    try {

        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            const query = 'SELECT * FROM ChiNhanh';
            connection.query(query, async (error, results, fields) => {
                connection.release(); // Release the connection back to the pool
                if (error) {
                    console.error(error);
                    res.status(500).send('Internal Server Error');
                } else {
                    // Sql server
                    let pool_sqlsv =
                        await sql.connect(config)
                    let result =
                        await pool_sqlsv.request()
                            .query('select * from ChiNhanh')

                    for (const data of results) {
                        await pool_sqlsv.request()
                            // .input('ma_chi_nhanh', sql.Int, data.ma_chi_nhanh)
                            .input('ten_chi_nhanh', sql.NVarChar, data.ten_chi_nhanh)
                            .input('dia_chi', sql.NVarChar, data.dia_chi)
                            .input('ma_tinh', sql.Int, 3)
                            .query('INSERT INTO ChiNhanh (ten_chi_nhanh, dia_chi, ma_tinh) VALUES (@ten_chi_nhanh, @dia_chi, @ma_tinh)');
                    }
                    return res.json({sqlserver: result.recordset, mysql: results})
                }
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
