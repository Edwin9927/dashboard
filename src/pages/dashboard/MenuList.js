import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import getMenu from '../../services/getMenu';
import { useSnackbar } from "notistack";
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
import { MenuListHead, MenuListToolbar, MenuMoreMenu } from '../../sections/@dashboard/menu/list';
import {eliminarMenu} from "../../services/menu";

const TABLE_HEAD = [
    { id: 'id', label: 'ID Menu', alignRight: false },
    { id: 'nombre', label: 'Nombre', alignRight: false },
    { id: 'tipo', label: 'Tipo', alignRight: false },
    { id: '' },
];

export default function MenuList() {
    const theme = useTheme();
    const { themeStretch } = useSettings();
    const [MenuList, setMenuList] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        getMenu()
            .then(res => setMenuList(res));
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
            const newSelecteds = MenuList.map((n) => n.nombre);
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

    const handleDeleteMenu = (menuId) => {
        const token = window.localStorage.getItem('accessToken');
        const resp = eliminarMenu(token, menuId);
        resp.then(re => {
            if(re.ok){
                enqueueSnackbar("Alimento eliminado con éxito!");
            }else{
                enqueueSnackbar("Error al eliminar alimento!");
            }
        });
        const deleteMenu = MenuList.filter((menu) => menu.id !== menuId);
        console.log(deleteMenu);
        setSelected([]);
        setMenuList(deleteMenu);
    };

    const handleDeleteMultiMenu = (selected) => {
        const deleteMenus = MenuList.filter((menu) => !selected.includes(menu));
        setSelected([]);
        setMenuList(deleteMenus);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - MenuList.length) : 0;

    const filteredMenu = applySortFilter(MenuList, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredMenu.length && Boolean(filterName);

    return (
        <Page title="Menu: List">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Lista de Menus"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Menu', href: PATH_DASHBOARD.menu.root },
                        { name: 'Lista' },
                    ]}
                    action={
                        <Button
                            variant="contained"
                            component={RouterLink}
                            to={PATH_DASHBOARD.menu.newMenu}
                            startIcon={<Iconify icon={'eva:plus-fill'} />}
                        >
                            New Menu
                        </Button>
                    }
                />
                <Card>
                    <MenuListToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                        onDeleteMenus={() => handleDeleteMultiMenu(selected)}
                    />
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <MenuListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={MenuList.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredMenu.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { id, nombre, tipo } = row;
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
                                                <TableCell align="left">{id}</TableCell>
                                                <TableCell align="left">{nombre}</TableCell>
                                                <TableCell align="left">{tipo}</TableCell>
                                                <TableCell align="right">
                                                    <MenuMoreMenu onDelete={() => handleDeleteMenu(id)} menu={row} />
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
                        count={MenuList.length}
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
        return array.filter((_menu) => _menu.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}
