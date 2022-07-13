import { useState, useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import getReserva from '../../services/getReserva';

// @mui
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { ReservaListHead, ReservaListToolbar, ReservaMenu } from '../../sections/@dashboard/general/reserva/list';

const TABLE_HEAD = [
  { id: 'fecha', label: 'Fecha', alignRight: false },
  { id: 'hora', label: 'Hora', alignRight: false },
  { id: 'idUsuario', label: 'idUsuario', alignRight: false },
  { id: 'duracion', label: 'Duracion', alignRight: false },
  { id: '' },
  { id: '' },
];

export default function ReservaList() {
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const [ReservaList, setReservaList] = useState([]);
  useEffect(() => {
    getReserva()
      .then(res => setReservaList(res));
  },[]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (checked) => {
    if (checked) {
      const newSelecteds = ReservaList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteReserva = (reservaId) => {
    const deleteReserva = ReservaList.filter((reserva) => reserva !== reservaId);
    setSelected([]);
    setReservaList(deleteReserva);
  };

  const handleDeleteMultiReserva = (selected) => {
    const deleteReservas = ReservaList.filter((reserva) => !selected.includes(reserva));
    setSelected([]);
    setReservaList(deleteReservas);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ReservaList.length) : 0;

  const filteredReservas = applySortFilter(ReservaList, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredReservas.length && Boolean(filterName);
  return (
    <Page title="Reserva: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Lista de Reservas"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Reserva', href: PATH_DASHBOARD.reserva.root },
            { name: 'Lista' },
          ]}
        />
         <Card>
          <ReservaListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            onDeleteReserva={() => handleDeleteMultiReserva(selected)}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ReservaListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={ReservaList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                 <TableBody>
                  {filteredReservas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, fecha, hora, idUsuario, duracion } = row;
                    const isItemSelected = selected.indexOf(fecha) !== -1;
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
                          <Checkbox checked={isItemSelected} onClick={() => handleClick(fecha)} />
                        </TableCell>
                        <TableCell align="left">{fecha}</TableCell>
                        <TableCell align="left">{hora}</TableCell>
                        <TableCell align="left">{idUsuario}</TableCell>
                        <TableCell align="left">{duracion}</TableCell>
                        <TableCell align="left">
                        </TableCell>

                        <TableCell align="right">
                          <ReservaMenu onDelete={() => handleDeleteReserva(id)} nombre={fecha} />
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
                        <SearchNotFound searchQuery={filterName} />
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
            count={ReservaList.length}
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

// ----------------------------------------------------------------------

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
  return order === 'desc'
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
    return array.filter((_reserva) => _reserva.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
