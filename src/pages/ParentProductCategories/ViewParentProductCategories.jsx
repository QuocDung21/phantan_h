import React, {useState, useEffect} from 'react'
import Header from '../../components/Header';
import {Button, IconButton, Typography, useTheme} from "@mui/material";
import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';
import Swal from 'sweetalert2'
import axios from 'axios'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import TransferWithinAStationOutlinedIcon from '@mui/icons-material/TransferWithinAStationOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// progress bar
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import baseUrl from "../../config/config";


const ViewParentProductCategories = () => {
    const [gridData, setGridData] = useState([]);
    const [parentProductCategoryData, setParentProductCategoryData] = useState([]);
    const [id_, setId_] = useState(2);
    const [tramcapnuoc, setTramcapnuoc] = useState([])
    const [data, setData] = useState([]);
    const getData = async () => {
        await axios.get(baseUrl + "chi-nhanh").then((response) => {
            setTramcapnuoc(response.data)
        }).catch((e) => {
            console.log(e)
        })
    }


    const handleChangeId = (event) => {
        setId_(event.target.value);
    }


    useEffect(() => {
        getData()
    }, [id_]);

    const getParentProductCategories = () => {
        axios.get('http://127.0.0.1:8000/api/v1/parent_product_categories')
            .then(function (response) {

                setParentProductCategoryData(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const getDataPt = async (id) => {
        await axios.get(baseUrl + 'data/' + id)
            .then(function (response) {
                // Thêm thuộc tính 'id' vào mỗi đối tượng trong mảng dữ liệu
                const dataWithId = response.data.map((item, index) => ({
                    ...item,
                    id: index + 1 // Bạn có thể chọn một giá trị khác cho 'id'
                }));
                setParentProductCategoryData(dataWithId); // Đặt dữ liệu vào state parentProductCategoryData
                setData(dataWithId); // Bạn có thể giữ nguyên dòng này hoặc xóa đi tùy thuộc vào cách bạn muốn sử dụng dữ liệu
                console.log(dataWithId);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getDataPt(id_);
    }, [id_]);


    // columns
    const columns = [
        {
            field: 'id',
            headerName: '#ID',
            flex: 1
        },

        {
            field: 'ten_tram_cap_nuoc',
            headerName: 'Tên trạm cấp nước',
            width: 200,
            editable: true,
        },

        {
            field: 'ten_mang_luoi',
            headerName: 'Tên mạng lưới',
            width: 200,
            editable: true,
        },

        {
            field: 'ten_nuoc',
            headerName: 'Tên nguồn nước',
            width: 200,
            editable: true,
        },

        {
            field: 'ngay_kiem_tra',
            headerName: 'Ngày kiểm tra',
            width: 200,
            editable: true,
        },

        {
            field: 'ten_khach_hang',
            headerName: 'Tên khách hàng',
            width: 200,
            editable: true,
        },

        // view action
        // {
        //     field: 'actions',
        //     headerName: 'VIEW',
        //     sortable: false,
        //     width: 100,
        //     renderCell: (parentProductCategoryData) => {
        //         return (
        //             <Button
        //                 // onClick={(e) => onButtonClick(e, params.row)}
        //                 // href={`/show_parent_product_categories/${parentProductCategoryData.id}`}
        //                 href={`/show_parent_product_category/${parentProductCategoryData.id}`}
        //                 style={{backgroundColor: "#0faa50"}}
        //                 variant="contained"
        //             >
        //                 {/* Edit */}
        //                 <RemoveRedEyeOutlinedIcon/>
        //             </Button>
        //
        //         );
        //     }
        // },

        {
            field: 'actions2',
            headerName: 'EDIT',
            sortable: false,
            width: 100,
            renderCell: (parentProductCategoryData) => {
                return (
                    <Button
                        // onClick={(e) => onButtonClick(e, params.row)}
                        href={`/edit_parent_product_category/${parentProductCategoryData.id}`}
                        style={{backgroundColor: "#2587da"}}
                        variant="contained"
                    >
                        {/* Edit */}
                        <ModeEditOutlinedIcon/>
                    </Button>

                );
            }
        },

        {
            field: 'actions3',
            headerName: 'DELETE',
            sortable: false,
            width: 100,
            // flex: 1,
            renderCell: (parentProductCategoryData) => {
                return (
                    <Button
                        onClick={() => handleDelete(parentProductCategoryData.id)}
                        style={{backgroundColor: "#da2533"}}
                        variant="contained"
                    >
                        {/* Edit */}
                        <DeleteOutlinedIcon/>
                    </Button>

                );
            }
        },

        //
    ];


    // delete data from api
    const handleDelete = (id) => {
        // trigger sweet alerts on delete
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {

            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/v1/parent_product_categories/${id}`)
                    // trigger sweet alerts on successful delete
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Parent Product Category Deleted Successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        getParentProductCategories()
                    })
                    // trigger sweet alerts on error
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        })
    }
    // end of delete data from api


    return (
        <Box m="30px">

            <Box>
                <Header title="Danh sách"
                        buttonTitle={"Phân tán"}
                        buttonURL={`/add_parent_product_category/`}
                />
                <Box sx={{margin: 5}}>
                    <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                        <InputLabel id="demo-simple-select-label">Chi nhánh</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={id_}
                            label="Select Status"
                            onChange={handleChangeId}
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
                </Box>

                <Box sx={{height: 900, width: '100%'}}>

                    {parentProductCategoryData ? (
                        <DataGrid
                            rows={parentProductCategoryData}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 15,
                                    },
                                },
                            }}
                            pageSizeOptions={[5]}
                            checkboxSelection
                            disableRowSelectionOnClick

                        />
                    ) : (

                        <>
                            <center>
                                <p style={{marginTop: '200px'}}>Data is Empty / Loading...</p>
                                {/* <CircularProgress color="secondary" /> */}
                                <CircularProgress color="success"/>
                            </center>
                        </>

                    )}


                    {/*<DataGrid*/}
                    {/*    rows={parentProductCategoryData}*/}
                    {/*    columns={columns}*/}
                    {/*    initialState={{*/}
                    {/*        pagination: {*/}
                    {/*            paginationModel: {*/}
                    {/*                pageSize: 15,*/}
                    {/*            },*/}
                    {/*        },*/}
                    {/*    }}*/}
                    {/*    pageSizeOptions={[5]}*/}
                    {/*    checkboxSelection*/}
                    {/*    disableRowSelectionOnClick*/}
                    {/*/>*/}
                </Box>


                <div>

                </div>
            </Box>
        </Box>
    );
}

export default ViewParentProductCategories;
