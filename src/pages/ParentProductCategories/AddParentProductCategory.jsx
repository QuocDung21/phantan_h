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

    const [tramcapnuoc, setTramcapnuoc] = useState([])
    const getData = async () => {
        await axios.get(baseUrl + "chi-nhanh").then((response) => {
            setTramcapnuoc(response.data)
        }).catch((e) => {
            console.log(e)
        })
    }

    useEffect(() => {
        getData()
    }, []);

    console.log(tramcapnuoc)
    const isNonMobile = useMediaQuery("(min-width:600px)");
    // states for data submission
    const [parent_product_category_name, setParentProductCategoryName] = useState('');
    const [parent_product_category_description, setParentProductCategoryDescription] = useState('');
    const [parent_product_category_status, setParentProductCategoryStatus] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // handle drop down change
    const handleChangeParentCategoryStatus = (event) => {
        setParentProductCategoryStatus(event.target.value);
    };

    // handle data saving to api
    const submitData = () => {

        setIsSaving(true);
        axios.post('http://127.0.0.1:8000/api/v1/parent_product_categories/create', {
            // database fields
            parent_product_category_name: parent_product_category_name,
            parent_product_category_description: parent_product_category_description,
            parent_product_category_status: parent_product_category_status,
        })
            // trigger sweet alerts on success
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Parent Category saved successfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
                setIsSaving(false);
                setParentProductCategoryName('')
                setParentProductCategoryDescription('')
                setParentProductCategoryStatus('')
            })
            // trigger sweet alerts on failure
            .catch(function (error) {


                Swal.fire({
                    icon: 'error',
                    title: 'Error, Missing Data !',
                    showConfirmButton: false,
                    timer: 1700
                })
                setIsSaving(false)
            });
    }

    // end of  handle data saving to api


    return (
        <Box mt="30px" mb="60px" mr="60px" ml="60px">

            <Box>
                <Header title="Phân tán tỉnh Vĩnh Long"
                        buttonTitle={"Xem"}
                        buttonURL={`/view_parent_product_categories/`}
                />
                <h2>Từ</h2>
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
                            {/* Tram cap nuoc */}
                            <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                <InputLabel id="demo-simple-select-label">Chọn trạm</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={parent_product_category_status}
                                    label="Select Status"
                                    onChange={handleChangeParentCategoryStatus}
                                >
                                    {
                                        tramcapnuoc.map((data, index) => (
                                            <MenuItem key={index} value={data.ma_chi_nhanh}>
                                                {data.ten_tram_cap_nuoc}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>


                            {/* Chi nhanh */}
                            <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                <InputLabel id="demo-simple-select-label">Chi nhánh</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={parent_product_category_status}
                                    label="Select Status"
                                    onChange={handleChangeParentCategoryStatus}
                                >
                                    {
                                        tramcapnuoc.map((data, index) => (
                                            <MenuItem key={index} value={data.ma_chi_nhanh}>
                                                {data.ten_chi_nhanh}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>

                            {/* Chi nhanh */}
                            <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                <InputLabel id="demo-simple-select-label">Mạng lưới</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={parent_product_category_status}
                                    label="Select Status"
                                    onChange={handleChangeParentCategoryStatus}
                                >
                                    {
                                        tramcapnuoc.map((data, index) => (
                                            <MenuItem key={index} value={data.ma_mang_luoi}>
                                                {data.ten_mang_luoi}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <h2>Đến</h2>
                        {/* Tram cap nuoc */}
                        <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                            <InputLabel id="demo-simple-select-label">Chọn trạm</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={parent_product_category_status}
                                label="Select Status"
                                onChange={handleChangeParentCategoryStatus}
                            >
                                {
                                    tramcapnuoc.map((data, index) => (
                                        <MenuItem key={index} value={data.ma_chi_nhanh}>
                                            {data.ten_tram_cap_nuoc}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <Box display="flex" justifyContent="start" mt="30px">

                            <Button
                                disabled={isSaving}
                                onClick={submitData}
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
