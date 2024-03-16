import React,{useState,useEffect} from 'react'
import "./tablestyle.css";
const Reports = () => {

const [allreports, setallreports] = useState([])
useEffect(() => {
  fetch("https://icreate-user-backend.onrender.com/api/reports")
    .then((res) => res.json())
    .then((data) => setallreports(data));
}, []);


console.log(allreports);

  return (
    <>
     <div className="py-8">
            <h1 className="text-5xl text-center font-bold opacity-25 uppercase">
               Reports
            </h1>
          </div>
    <div className="w-[150%] absolute left-[250px] p-4">
      
      <table className="table w-full border-collapse border rounded-t-lg ">
        <thead className="text-white   bg-sky-500  ">
          <tr className="fw-bold  uppercase  font-semibold  text-center ">
            <td>EmpName</td>
            <td>Email</td>
            <td>EmpID</td>
            <td>
              DrCode
            </td>
            <td>LoginCount</td>
            <td>Total Created Count</td>
            <td>Invitation Count</td>
            <td>Posters Count</td>
            <td>Certificates Count</td>
            <td>Reminder Card Count</td>
            <td>Thank You Card Count</td>
            <td>Birthday Card Count</td>
            <td>Anniversay Card Count</td>
            <td>Total Success</td>
            <td>Total  Failed</td>
           
          </tr>
        </thead>

        <tbody className="table-box">
            {allreports.map((item) => (
              <tr key={item.email} className={item % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                <td className='capitalize'>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.mrid}</td>
                <td>{item.scCode}</td>
                <td className='text-center'>{item.totalLogins}</td>
                <td className='text-center'>{item.totalCardLength}</td>
                <td className='text-center'>{item.categoryCounts.invitation}</td>
                <td className='text-center'>{item.categoryCounts.poster}</td>
                <td className='text-center'>{item.categoryCounts.certificate}</td>
                <td className='text-center'>{item.categoryCounts.reminder}</td>
                <td className='text-center'>{item.categoryCounts.thankyou}</td>
                <td className='text-center'>{item.categoryCounts.birthdaygreeting}</td>
                <td className='text-center'>{item.categoryCounts.anniversary}</td>
                <td className='text-center'>{item.totalCardLength}</td>
                <td className='text-center'>{0}</td>


               
                {/* Add more columns as needed */}
              </tr>
            ))}
          </tbody>
      </table>
    </div>
    </>
  )
}

export default Reports

// import * as React from 'react';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import { useState,useEffect } from 'react';



// const columns = [
//   { id: 'name', label: 'MRName', minWidth: 170 },
//   { id: 'code', label: 'Email', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'MRID',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'SCCode',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Total Logins',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },
//   {
//     id: 'density',
//     label: 'Total Cards Made',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },
 
//   {
//     id: 'density',
//     label: 'Invitation Made',
//     minWidth: 170,
//     align: 'right',
//     format: (value) => value.toFixed(2),
//   },
// ];





// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];

// export default function StickyHeadTable() {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);


  
// const [allreports, setallreports] = useState([])
// useEffect(() => {
//   fetch("https://icreate-user-backend.onrender.com/api/reports")
//     .then((res) => res.json())
//     .then((data) => setallreports(data));
// }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//   {allreports
//     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//     .map((row) => (
//       <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//         <TableCell>{row.name}</TableCell>
//         <TableCell>{row.email}</TableCell>
//         <TableCell>{row.mrid}</TableCell>
//         <TableCell className='text-center'>{row.scCode}</TableCell>
//         <TableCell>{row.totalLogins}</TableCell>
//         <TableCell>{row.totalCardLength}</TableCell>
//         <TableCell>{row.categoryCounts.invitation}</TableCell>
//         <TableCell>{row.categoryCounts.poster}</TableCell>
//         <TableCell>{row.categoryCounts.certificate}</TableCell>
//         <TableCell>{row.categoryCounts.reminder}</TableCell>
//         <TableCell>{row.categoryCounts.thankyou}</TableCell>
//         <TableCell>{row.categoryCounts.birthdaygreeting}</TableCell>
//         <TableCell>{row.categoryCounts.anniversary}</TableCell>
//         <TableCell>{row.totalCardLength}</TableCell>
//         <TableCell>{0}</TableCell>
//         {/* Add more cells as needed */}
//       </TableRow>
//     ))}
// </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Paper>
//   );
// }
