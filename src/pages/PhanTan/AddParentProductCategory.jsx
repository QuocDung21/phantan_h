import React, {useEffect, useState} from 'react'
import {Box, Button, TextField} from "@mui/material";
import {Formik} from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import baseUrl from '../../config/config'
import axios from "axios";
import {Label} from "@mui/icons-material";


const AddParentProductCategory = () => {

    const [chinhanh, setChiNhanh] = useState([])
    const [tramcap, setTramcap] = useState([])
    const [mangluoi, setMangluoi] = useState([])


    const getData = async () => {
        await axios.get(baseUrl + "chi-nhanh").then((response) => {
            setChiNhanh(response.data)
        }).catch((e) => {
            console.log(e)
        })
    }

    const getDataCnTram = async (idTram) => {
        await axios.get(baseUrl + `tram/${idTram}`).then((response) => {
            console.log(response)
            setTramcap(response.data)
        }).catch((e) => {
            console.log(e)
        })
    }

    useEffect(() => {
        getData()
    }, []);

    console.log(chinhanh)
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [parent_product_category_status, setParentProductCategoryStatus] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [dataTram, setDataTram] = useState('');
    const [dataMangLuoi, setDataMangLuoi] = useState([]);
    const [idChiNhanh, setIdChiNhanh] = useState('');
    const [idTram, setIdTram] = useState('');
    const [idMangLuoi, setIdMangLuoi] = useState('');
    const handleChangeParentCategoryStatus = async (event) => {
        setParentProductCategoryStatus(event.target.value);
        setIdChiNhanh(event.target.value);
        await getDataCnTram(event.target.value)

    };

    const handleChangeTram = async (event) => {
        await setIdTram(event.target.value)
        getMangLuoi(event.target.value)
    }

    const handleChangeMangLuoi = async (event) => {
        await setIdMangLuoi(event.target.value)
    }

    const getMangLuoi = async (_idTram) => {
        await axios.get(baseUrl + 'mang-luoi/' + _idTram)
            .then((res) => {
                console.log(res.data)
                setDataMangLuoi(res.data)
            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Phân tán không thành công!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }


    const phanTanMangLuoi = async (_idMangLuoi) => {
        await axios.get(baseUrl + 'phantan-mangluoi/' + _idMangLuoi)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Phân tán thành công!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Phân tán không thành công!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

    const phanTanTram = async (_idTram, _idChinhanh) => {
        await axios.get(baseUrl + 'phantan-tram/' + _idTram + '/' + _idChinhanh)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Phân tán thành công!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Phân tán không thành công!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }

    const phanTan = async (id) => {
        await axios.get(baseUrl + 'phantan-chinhanh/' + id)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Phân tán thành công!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }).catch(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Phân tán không thành công!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        if (idTram) {
            phanTanTram(idTram, idChiNhanh)
        }
        if (idMangLuoi) {
            phanTanMangLuoi(idMangLuoi)
        }
    }


    return (
        <Box mt="30px" mb="60px" mr="60px" ml="60px">
            <Box>
                <Header title="Phân tán tỉnh Vĩnh Long"
                        buttonTitle={"Xem"}
                        buttonURL={`/view_parent_product_categories/`}
                />
                <Box>
                    <form>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},
                            }}
                        >
                            {/* Chi nhanh */}
                            <FormControl fullWidth sx={{gridColumn: "span 4"}}>
                                <InputLabel id="demo-simple-select-label">Chi nhánh</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={parent_product_category_status}
                                    label="Select Status"
                                    onChange={handleChangeParentCategoryStatus}
                                >
                                    {
                                        chinhanh.map((data, index) => (
                                            <MenuItem key={index} value={data.ma_chi_nhanh}>
                                                {data.ten_chi_nhanh}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>

                            {/* Tram cap nuoc */}
                            <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                <InputLabel id="demo-simple-select-label">Chọn trạm</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={idTram}
                                    label="Chọn trạm"
                                    onChange={handleChangeTram}
                                >
                                    {
                                        tramcap.map((data, index) => (
                                            <MenuItem key={index} value={data.ma_tram_cap_nuoc}>
                                                {data.ten_tram_cap_nuoc}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>

                            <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                <InputLabel id="demo-simple-select-label">Mạng lưới</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={idMangLuoi}
                                    label="Select Status"
                                    onChange={handleChangeMangLuoi}
                                >
                                    {
                                        dataMangLuoi.map((data, index) => (
                                            <MenuItem key={index} value={data.ma_mang_luoi}>
                                                {data.ten_mang_luoi}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <Box display="flex" justifyContent="start" mt="30px">
                            <Button
                                disabled={isSaving}
                                // onClick={submitData}
                                onClick={(e) => {
                                    e.preventDefault();
                                    phanTan(idChiNhanh)
                                }}
                                type="submit" size="large" endIcon={<SendIcon/>}
                                style={{backgroundColor: "#2587da", color: "#ffffff"}} variant="contained">
                                Phân tán
                            </Button>
                        </Box>
                    </form>
                </Box>

            </Box>
        </Box>
    );
}

export default AddParentProductCategory;
