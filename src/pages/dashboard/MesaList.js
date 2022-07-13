import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import getMesa from '../../services/getMesa';
// @mui
import { useTheme } from '@mui/material/styles';
import {
    Card,
    Table,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
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
import { MesaListHead, MesaListToolbar, MesaMenu } from '../../sections/@dashboard/mesa/list';

const TABLE_HEAD = [
    { id: 'nombre', label: 'Nombre', alignRight: false },
    { id: 'capacidad', label: 'Capacidad', alignRight: false },
    { id: 'estado', label: 'Estado', alignRight: false },
    { id: 'tipo', label: 'Tipo', alignRight: false },
    { id: '' },
];

export default function MesaList() {
    const theme = useTheme();
    const { themeStretch } = useSettings();
    const [MesaList, setMesaList] = useState([]);
    useEffect(() => {
        getMesa()
            .then(res => setMesaList(res));
    }, []);
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
            const newSelecteds = MesaList.map((n) => n.name);
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

    const handleDeleteMesa = (mesaId) => {
        const deleteMesa = MesaList.filter((mesa) => mesa !== mesaId);
        setSelected([]);
        setMesaList(deleteMesa);
    };

    const handleDeleteMultiMesa = (selected) => {
        const deleteMesas = MesaList.filter((mesa) => !selected.includes(mesa));
        setSelected([]);
        setMesaList(deleteMesas);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - MesaList.length) : 0;

    const filteredMesa = applySortFilter(MesaList, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredMesa.length && Boolean(filterName);

    return (
        <Page title="Mesa: List">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Lista de Mesas"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Mesa', href: PATH_DASHBOARD.mesa.root },
                        { name: 'List' },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to={PATH_DASHBOARD.mesa.newMesa}
                            startIcon={<Iconify icon={'eva:plus-fill'} />}
                        >
                            New Mesa
                        </Button>
                    }
                />
                <Card>
                    <MesaListToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                        onDeleteMesas={() => handleDeleteMultiMesa(selected)}
                    />
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <MesaListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={MesaList.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredMesa.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { id, nombre, capacidad, estado, tipo } = row;
                                        const isItemSelected = selected.indexOf(nombre) !== -1;
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
                                                    <Checkbox checked={isItemSelected} onClick={() => handleClick(nombre)} />
                                                </TableCell>
                                                <TableCell align="left">{nombre}</TableCell>
                                                <TableCell align="left">{capacidad}</TableCell>
                                                <TableCell align="left">{estado ? 'Si' : 'No'}</TableCell>
                                                <TableCell align="left">{tipo}</TableCell>
                                                <TableCell align="left">
                                                    <Label
                                                        variant={estado ? 'filled' : 'filled'}
                                                        color={(!estado && 'error') || 'success'}
                                                    >
                                                    </Label>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <MesaMenu onDelete={() => handleDeleteMesa(id)} nombre={nombre} />
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
                        count={MesaList.length}
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
      return array.filter((_mesa) => _mesa.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
  }
  