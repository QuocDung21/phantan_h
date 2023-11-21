const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
const sql = require('mssql')


// Kêt nối Sql Server
const config = {
    user: "SA", password: "Dung112001@", database: "HeThongCapNuoc", server: 'localhost', pool: {
        max: 10, min: 0, idleTimeoutMillis: 30000
    }, options: {
        encrypt: true, trustServerCertificate: true
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
            const query = "SELECT ChiNhanh.*,\n" + "       Tinh.ten_tinh,\n" + "       TramCapNuoc.ten_tram_cap_nuoc,\n" + "       MangLuoi.ten_mang_luoi,\n" + "       Nuoc.ten_nuoc,\n" + "       ChatLuongNuoc.ngay_kiem_tra,\n" + "       KhachHang.ten_khach_hang,\n" + "       DiemThuTien.dia_chi AS dia_chi_diem_thu_tien,\n" + "       GiaTienNuoc.gia_tien,\n" + "       d.ten_dich_vu\n" + "FROM ChiNhanh\n" + "JOIN Tinh ON ChiNhanh.ma_tinh = Tinh.ma_tinh\n" + "LEFT JOIN TramCapNuoc ON ChiNhanh.ma_chi_nhanh = TramCapNuoc.ma_chi_nhanh\n" + "LEFT JOIN MangLuoi ON TramCapNuoc.ma_tram_cap_nuoc = MangLuoi.ma_tram_cap_nuoc\n" + "LEFT JOIN Nuoc ON MangLuoi.ma_mang_luoi = Nuoc.ma_mang_luoi\n" + "LEFT JOIN ChatLuongNuoc ON Nuoc.ma_nuoc = ChatLuongNuoc.ma_nuoc\n" + "LEFT JOIN KhachHang ON Nuoc.ma_mang_luoi = KhachHang.ma_mang_luoi\n" + "LEFT JOIN DiemThuTien ON Nuoc.ma_mang_luoi = DiemThuTien.ma_mang_luoi\n" + "LEFT JOIN GiaTienNuoc ON MangLuoi.ma_mang_luoi = GiaTienNuoc.ma_mang_luoi\n" + "left join dichvucapnuoc d on GiaTienNuoc.ma_dich_vu = d.ma_dich_vu;";
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

app.get('/data-mysql/:chinhanh', async (req, res) => {
    const chinhanh = req.params.chinhanh;
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            const query = `
                            select ten_tram_cap_nuoc, ten_mang_luoi, ten_nuoc,ChiNhanh.dia_chi
                            from chinhanh
                                     join hethongcapnuoc.tramcapnuoc t on chinhanh.ma_chi_nhanh = t.ma_chi_nhanh
                                     join hethongcapnuoc.mangluoi m on t.ma_tram_cap_nuoc = m.ma_tram_cap_nuoc
                                     join hethongcapnuoc.nuoc n on m.ma_mang_luoi = n.ma_mang_luoi
                            where chinhanh.ma_chi_nhanh = ${chinhanh}         
           `;
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


app.get('/data-sqlsv/:chinhanh', async (req, res) => {
    const chinhanh = req.params.chinhanh;
    try {
        let pool = await sql.connect(config)
        let result = await pool.request()
            .query(`
             select *
                from ChiNhanh
                where ChiNhanh.ma_chi_nhanh = ${chinhanh};  
            `)
        return res.json(result.recordset)
    } catch (err) {
        console.error(err);
    }
});


app.get('/tram/:tramcap', async (req, res) => {
    const {tramcap} = req.params;
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            const query = `
                       select ten_tram_cap_nuoc, ten_mang_luoi, ten_nuoc, t.ma_tram_cap_nuoc
                                from chinhanh
                                         join hethongcapnuoc.tramcapnuoc t on chinhanh.ma_chi_nhanh = t.ma_chi_nhanh
                                         join hethongcapnuoc.mangluoi m on t.ma_tram_cap_nuoc = m.ma_tram_cap_nuoc
                                         join hethongcapnuoc.nuoc n on m.ma_mang_luoi = n.ma_mang_luoi
                                where t.ma_chi_nhanh = ${tramcap};    
                               `;
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
            const query = "select *\n" + "from chinhanh;";
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
        let pool = await sql.connect(config)
        let result = await pool.request()
            .query('select * from Tinh')
        return res.json(result.recordset)
    } catch (err) {
        console.error(err);
    }
});


app.get('/phantan-chinhanh/:idChiNhanh', async (req, res) => {
    const {idChiNhanh} = req.params
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            const query = `select * from ChiNhanh where ChiNhanh.ma_chi_nhanh = ${idChiNhanh}`;
            connection.query(query, async (error, results, fields) => {
                connection.release();
                if (error) {
                    console.error(error);
                    res.status(500).send('Internal Server Error');
                } else {
                    let pool_sqlsv = await sql.connect(config);
                    let result = await pool_sqlsv.request()
                        .query(`select * from ChiNhanh where ChiNhanh.ma_chi_nhanh = ${idChiNhanh}`);
                    for (const data of results) {
                        const checkResult = await pool_sqlsv.request()
                            .input('ma_chi_nhanh', sql.Int, data.ma_chi_nhanh)
                            .query('SELECT TOP 1 1 FROM ChiNhanh WHERE ma_chi_nhanh = @ma_chi_nhanh');

                        if (checkResult.recordset.length === 0) {
                            await pool_sqlsv.request()
                                .input('ma_chi_nhanh', sql.Int, data.ma_chi_nhanh)
                                .input('ten_chi_nhanh', sql.NVarChar, data.ten_chi_nhanh)
                                .input('dia_chi', sql.NVarChar, data.dia_chi)
                                .input('ma_tinh', sql.Int, 1)
                                .query('INSERT INTO ChiNhanh (ma_chi_nhanh,ten_chi_nhanh, dia_chi, ma_tinh) VALUES (@ma_chi_nhanh, @ten_chi_nhanh, @dia_chi, @ma_tinh)');
                        } else {
                            console.log(`ma_chi_nhanh ${data.ma_chi_nhanh} already exists, not inserting.`);
                        }
                    }
                    const result_sqlsv = await pool_sqlsv.request().query('SELECT * FROM ChiNhanh');
                    return res.json({sqlserver: result_sqlsv.recordset, mysql: results});
                }
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/phantan-mangluoi/:idMangluoi', async (req, res) => {
    const {idMangluoi} = req.params;
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            const query = `
                SELECT *
                FROM hethongcapnuoc.mangluoi m
                WHERE m.ma_mang_luoi = ${idMangluoi};
            `;
            connection.query(query, async (error, results, fields) => {
                connection.release();
                if (error) {
                    console.error(error);
                    res.status(500).send('Internal Server Error');
                } else {
                    let pool_sqlsv = await sql.connect(config);
                    for (const data of results) {
                        // Check if the record already exists in SQL Server
                        const checkResult = await pool_sqlsv.request()
                            .input('ma_mang_luoi', sql.Int, data.ma_mang_luoi)
                            .query('SELECT TOP 1 1 FROM MangLuoi WHERE ma_mang_luoi = @ma_mang_luoi');

                        if (checkResult.recordset.length === 0) {
                            // Insert the record into SQL Server
                            await pool_sqlsv.request()
                                .input('ma_mang_luoi', sql.Int, data.ma_mang_luoi)
                                .input('ten_mang_luoi', sql.NVarChar, data.ten_mang_luoi)
                                .input('dia_diem', sql.NVarChar, data.dia_diem)
                                .input('ma_tram_cap_nuoc', sql.Int, data.ma_tram_cap_nuoc)
                                .query('INSERT INTO MangLuoi (ma_mang_luoi, ten_mang_luoi, dia_diem, ma_tram_cap_nuoc) VALUES (@ma_mang_luoi, @ten_mang_luoi, @dia_diem, @ma_tram_cap_nuoc)');
                        } else {
                            console.log(`ma_mang_luoi ${data.ma_mang_luoi} already exists, not inserting.`);
                        }
                    }
                    // Retrieve and return the result from SQL Server
                    const result_sqlsv = await pool_sqlsv.request()
                        .input('ma_mang_luoi', sql.Int, idMangluoi)
                        .query('SELECT * FROM MangLuoi WHERE ma_mang_luoi = @ma_mang_luoi');
                    return res.json({sqlserver: result_sqlsv.recordset, mysql: results});
                }
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/xoa-mangluoi/:idMangluoi', async (req, res) => {
    const {idMangluoi} = req.params;
    try {
        // Kết nối đến MySQL
        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            // Xóa dữ liệu trong MySQL
            const deleteQuery = `DELETE FROM hethongcapnuoc.mangluoi WHERE ma_mang_luoi = ${idMangluoi};`;
            connection.query(deleteQuery, async (error, results, fields) => {
                connection.release();
                if (error) {
                    console.error(error);
                    res.status(500).send('Internal Server Error');
                } else {
                    // Kết nối đến SQL Server
                    let pool_sqlsv = await sql.connect(config);
                    // Xóa dữ liệu trong SQL Server
                    const deleteSqlsvQuery = `
                        DELETE FROM MangLuoi
                        WHERE ma_mang_luoi = @ma_mang_luoi;
                    `;
                    await pool_sqlsv.request()
                        .input('ma_mang_luoi', sql.Int, idMangluoi)
                        .query(deleteSqlsvQuery);

                    // Trả về kết quả sau khi xóa
                    const result_sqlsv = await pool_sqlsv.request().query('SELECT * FROM MangLuoi');
                    return res.json({sqlserver: result_sqlsv.recordset, mysql: results});
                }
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/phantan-tram/:idTram/:idChinhanh', async (req, res) => {
    const {idTram, idChinhanh} = req.params;
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            const query = `
              SELECT *
                FROM hethongcapnuoc.tramcapnuoc t, ChiNhanh cn
                WHERE t.ma_tram_cap_nuoc = ${idTram}
                and cn.ma_chi_nhanh = ${idChinhanh};
            `;
            connection.query(query, async (error, results, fields) => {
                connection.release();
                if (error) {
                    console.error(error);
                    res.status(500).send('Internal Server Error');
                } else {
                    let pool_sqlsv = await sql.connect(config);
                    for (const data of results) {
                        const checkResult = await pool_sqlsv.request()
                            .input('ma_tram_cap_nuoc', sql.Int, data.ma_tram_cap_nuoc)
                            .query('SELECT TOP 1 1 FROM TramCapNuoc WHERE ma_tram_cap_nuoc = @ma_tram_cap_nuoc');

                        if (checkResult.recordset.length === 0) {
                            await pool_sqlsv.request()
                                .input('ma_tram_cap_nuoc', sql.Int, data.ma_tram_cap_nuoc)
                                .input('ten_tram_cap_nuoc', sql.NVarChar, data.ten_tram_cap_nuoc)
                                .input('dia_chi', sql.NVarChar, data.dia_chi)
                                .input('so_dien_thoai', sql.NVarChar, data.so_dien_thoai)
                                .input('kha_nang_cung_cap', sql.Float, data.kha_nang_cung_cap)
                                .input('ma_chi_nhanh', sql.Int, data.ma_chi_nhanh)
                                .input('khoi_luong_nuoc', sql.Float, data.khoi_luong_nuoc)
                                .query('INSERT INTO TramCapNuoc (ma_tram_cap_nuoc, ten_tram_cap_nuoc, dia_chi, so_dien_thoai, kha_nang_cung_cap, ma_chi_nhanh, khoi_luong_nuoc) VALUES (@ma_tram_cap_nuoc, @ten_tram_cap_nuoc, @dia_chi, @so_dien_thoai, @kha_nang_cung_cap, @ma_chi_nhanh, @khoi_luong_nuoc)');
                        } else {
                            console.log(`ma_tram_cap_nuoc ${data.ma_tram_cap_nuoc} already exists, not inserting.`);
                        }
                    }
                    const result_sqlsv = await pool_sqlsv.request().query('SELECT * FROM TramCapNuoc');
                    return res.json({sqlserver: result_sqlsv.recordset, mysql: results});
                }
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/clear-sql-server', (req, res) => {

})

app.get("/mang-luoi/", (req, res) => {
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            const query = `
              select *
                    from mangluoi
                             join TramCapNuoc TCN on TCN.ma_tram_cap_nuoc = mangluoi.ma_tram_cap_nuoc
                             join ChiNhanh CN on CN.ma_chi_nhanh = TCN.ma_chi_nhanh
            `;
            connection.query(query, (error, results, fields) => {
                connection.release();
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
})

app.get('/mang-luoi/:idTram', async (req, res) => {
    const {idTram} = req.params
    try {
        pool.getConnection((err, connection) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }
            const query = `
              select *
                    from mangluoi
                             join TramCapNuoc TCN on TCN.ma_tram_cap_nuoc = mangluoi.ma_tram_cap_nuoc
                             join ChiNhanh CN on CN.ma_chi_nhanh = TCN.ma_chi_nhanh
                    where TCN.ma_tram_cap_nuoc = ${idTram}
            `;
            connection.query(query, (error, results, fields) => {
                connection.release();
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
})


const PORT = 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
