import {useEffect, useState} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import getPedido from "../../services/getPedido";
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
import {
    PedidoListHead,
    PedidoListToolbar,
    PedidoMoreMenu
} from '../../sections/@dashboard/pedido/list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'idPedido', label: 'Pedido', alignRight: false },
    { id: 'idMesa', label: 'Id-Mesa', alignRight: false },
    { id: 'idUsuario', label: 'Id. Mesero', alignRight: false },
    { id: 'fecha', label: 'Fecha', alignRight: false },
    { id: 'hora', label: 'Hora', alignRight: false },
    { id: 'estadoPedido', label: 'Estado', alignRight: false },
    { id: '' },
];
// ----------------------------------------------------------------------
export default function PedidoList() {
    const theme = useTheme();
    const { themeStretch } = useSettings();
// ----------------------------------------------------------------------
    const [PedidoList, setPedidoList] = useState([]);
    useEffect(() => {
        getPedido()
            .then(res => setPedidoList(res));
    }, []);
// ----------------------------------------------------------------------
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('idPedido');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (checked) => {
        if (checked) {
            const newSelecteds = PedidoList.map((n) => n.name);
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

    const handleDeletePedido = (pedidoId) => {
        const deletePedido = PedidoList.filter((pedido) => pedido !== pedidoId);
        setSelected([]);
        setPedidoList(deletePedido);
    };

    const handleDeleteMultiPedido = (selected) => {
        const deletePedidos = PedidoList.filter((pedido) => !selected.includes(pedido));
        setSelected([]);
        setPedidoList(deletePedidos);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - PedidoList.length) : 0;

    const filteredPedidos = applySortFilter(PedidoList, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredPedidos.length && Boolean(filterName);

    return (
        <Page title="Listado pedidos">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Pedido List"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Pedido', href: PATH_DASHBOARD.pedido.root },
                        { name: 'Listado' },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to={PATH_DASHBOARD.pedido.newPedido}
                            startIcon={<Iconify icon={'eva:plus-fill'} />}
                        >
                            Nuevo Pedido
                        </Button>
                    }
                />

                <Card>
                    <PedidoListToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                        onDeleteApedidos={() => handleDeleteMultiPedido(selected)}
                    />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <PedidoListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={PedidoList.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>

                                    {filteredPedidos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { idPedido, idMesa, idUsuario, fecha, hora, estadoPedido } = row;
                                        const isItemSelected = selected.indexOf(idPedido) !== -1;
                                        return (
                                            <TableRow
                                                hover
                                                key={idPedido}
                                                tabIndex={-1}
                                                role="checkbox"
                                                selected={isItemSelected}
                                                aria-checked={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={isItemSelected} onClick={() => handleClick(idPedido)} />
                                                </TableCell>
                                                <TableCell align="left">{idPedido}</TableCell>
                                                <TableCell align="left">{idMesa}</TableCell>
                                                <TableCell align="left">{idUsuario}</TableCell>
                                                <TableCell align="left">{fecha}</TableCell>
                                                <TableCell align="left">{hora}</TableCell>
                                                <TableCell align="left">{estadoPedido}</TableCell>

                                                <TableCell align="right">
                                                    <PedidoMoreMenu onDelete={() => handleDeletePedido(idPedido)} nombre={idPedido} />
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
                        count={PedidoList.length}
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
        return array.filter((_pedido) => _pedido.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}
