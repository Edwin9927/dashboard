import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _alimentoList } from '../../_mock';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import PedidoNewForm from "../../sections/@dashboard/pedido/PedidoNewForm";

// ----------------------------------------------------------------------

export default function PedidoCreate() {
    const { themeStretch } = useSettings();
    const { pathname } = useLocation();
    const { name = '' } = useParams();
    const isEdit = pathname.includes('edit');

    return (
        <Page title="Pedido: Crear pedido">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading={!isEdit ? 'Crear pedido' : 'Editar pedido'}
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Pedido', href: PATH_DASHBOARD.pedido.list },
                        { name: !isEdit ? 'Nuevo pedido' : capitalCase(name) },
                    ]}
                />

                <PedidoNewForm isEdit={isEdit}/>
            </Container>
        </Page>
    );
}