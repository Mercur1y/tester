import React, {useState} from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import {withRouter} from "../common/with-router";
import {ContentDiv, CustomSelect} from "./global/mui.styles";
import Mathjax from "react-mathjax-component";

const users = [
  { id: 1, inline: 'e = mc^2', category: 'Physics' },
  { id: 2, inline: '\\int_0^1 x^2\\ dx', category: 'Physics' },
  { id: 3, inline: 'E = mc^2', category: 'Physics' },
  { id: 4, inline: 'a^2 + b^2 = c^2', category: 'Mathematics' },
];

const sections = [
  { id: "sectionA", name: "Section A", categories: ["Physics", "Mathematics"] },
  { id: "sectionB", name: "Section B", categories: ["C", "D"] }
];

const Home = () => {
  const [content, setContent] = useState("");

  const [selectedSection, setSelectedSection] = useState("");
  const [filterCategory, setFilterCategory] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangeSection = (event) => {
    setSelectedSection(event.target.value);
    setFilterCategory(""); // Сбрасываем выбранную категорию при изменении раздела
  };

  const handleChangeCategory = (event) => {
    setFilterCategory(event.target.value);
    setPage(0); // Сбрасываем страницу при изменении категории
  };

  const filteredUsers = filterCategory ? users.filter(user => user.category === filterCategory) : users;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // useEffect(() => {
  //   UserService.getPublicContent().then(
  //     response => {
  //       setContent(response.data);
  //     },
  //     error => {
  //       setContent(
  //         (error.response && error.response.data) ||
  //         error.message ||
  //         error.toString()
  //       );
  //     }
  //   );
  // }, []);

  return (
    <ContentDiv>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label"></InputLabel>
      <CustomSelect labelId="demo-select-small-label" value={selectedSection} onChange={handleChangeSection} displayEmpty>
        <MenuItem value="" disabled>Select Section</MenuItem>
        {sections.map((section) => (
          <MenuItem key={section.id} value={section.id}>
            {section.name}
          </MenuItem>
        ))}
      </CustomSelect>
      </FormControl>
      {selectedSection && (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <CustomSelect labelId="demo-select-small-label" value={filterCategory} onChange={handleChangeCategory} displayEmpty>
          <MenuItem value="" disabled>Select Category</MenuItem>
          {sections.find((section) => section.id === selectedSection).categories.map((category) => (
            <MenuItem key={category} value={category}>
              Category {category}
            </MenuItem>
          ))}
        </CustomSelect>
        </FormControl>
      )}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Block</TableCell>
              <TableCell>Inline</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
                ? filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredUsers
              ).map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Mathjax expr={user.inline} />
                </TableCell>
                <TableCell>
                  {user.inline}
                </TableCell>
                <TableCell>{user.category}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Отображать по:"
        />
      </TableContainer>
    </ContentDiv>
  );
};

export default withRouter(Home);