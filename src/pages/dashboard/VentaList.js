import { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import getVenta from "../../services/getVenta";

// @mui
import { useTheme } from "@mui/material/styles";
import {
  Card,
  Table,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
} from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// hooks
import useSettings from "../../hooks/useSettings";
// components
import Page from "../../components/Page";
import Label from "../../components/Label";
import Iconify from "../../components/Iconify";
import Scrollbar from "../../components/Scrollbar";
import SearchNotFound from "../../components/SearchNotFound";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
// sections
import {
  VentaListHead,
  VentaListToolbar,
  VentaMenu,
} from "../../sections/@dashboard/venta/list";

const TABLE_HEAD = [
  { id: "idUsuario", label: "Menu", alignRight: false },
  { id: "idPedido", label: "Nombre", alignRight: false },
  { id: "formaDePago", label: "Forma de Pago", alignRight: false },
  { id: "fecha", label: "Fecha", alignRight: false },
  { id: "hora", label: "Hora", alignRight: false },
  { id: "calificacion", label: "Calificacion", alignRight: false },
  { id: "propina", label: "Propina", alignRight: false },
  { id: "total", label: "Total", alignRight: false },
  { id: '' },
];

export default function VentaList() {
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const [VentaList, setVentaList] = useState([]);

  useEffect(() => {
    getVenta().then((res) => setVentaList(res));
  }, []);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("id");
  const [filterId, setFilterId] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const newSelecteds = VentaList.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterById = (filterId) => {
    setFilterId(filterId);
    setPage(0);
  };

  const handleDeleteVenta = (ventaId) => {
    const deleteVenta = VentaList.filter((venta) => venta !== ventaId);
    setSelected([]);
    setVentaList(deleteVenta);
  };

  const handleDeleteMultiVenta = (selected) => {
    const deleteVentas = VentaList.filter((venta) => !selected.includes(venta));
    setSelected([]);
    setVentaList(deleteVentas);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - VentaList.length) : 0;

  const filteredVenta = applySortFilter(
    VentaList,
    getComparator(order, orderBy),
    filterId
  );

  const isNotFound = !filteredVenta.length && Boolean(filterId);

  return (
    <Page title="Venta: List">
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading="Lista de Ventas"
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Venta", href: PATH_DASHBOARD.venta.root },
            { name: "Lista" },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.venta.newVenta}
              startIcon={<Iconify icon={"eva:plus-fill"} />}
            >
              Nueva Venta
            </Button>
          }
        />
        <Card>
          <VentaListToolbar
            numSelected={selected.length}
            filterId={filterId}
            onFilterId={handleFilterById}
            onDeleteVenta={() => handleDeleteMultiVenta(selected)}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <VentaListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={VentaList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredVenta
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        idUsuario,
                        idPedido,
                        formaDePago,
                        fecha,
                        hora,
                        calificacion,
                        propina,
                        total,
                      } = row;
                      const isItemSelected = selected.indexOf(idUsuario) !== -1;
                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onClick={() => handleClick(idUsuario)}
                            />
                          </TableCell>
                          <TableCell align="left">{idUsuario}</TableCell>
                          <TableCell align="left">{idPedido}</TableCell>
                          <TableCell align="left">{formaDePago}</TableCell>
                          <TableCell align="left">{fecha}</TableCell>
                          <TableCell align="left">{hora}</TableCell>
                          <TableCell align="left">{calificacion}</TableCell>
                          <TableCell align="left">{propina}</TableCell>
                          <TableCell align="left">{total}</TableCell>
                          <TableCell align="right">
                            <VentaMenu onDelete={() => handleDeleteVenta(id) } venta={row}/>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterId} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={VentaList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return array.filter(
      (_venta) => _venta.idVenta.indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}
