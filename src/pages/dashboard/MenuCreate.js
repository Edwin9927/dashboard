import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import MenuNewForm from '../../sections/@dashboard/menu/MenuNewForm';

// ----------------------------------------------------------------------

export default function MenuCreate() {
    const { themeStretch } = useSettings();
    const { pathname } = useLocation();
    const { name = '' } = useParams();
    const isEdit = pathname.includes('edit');

    return (
        <Page title="Menu: Crear menu">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading={!isEdit ? 'Crear menu' : 'Editar menu'}
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Menu', href: PATH_DASHBOARD.menu.list },
                        { name: !isEdit ? 'Nuevo menu' : capitalCase(name) },
                    ]}
                />

                <MenuNewForm isEdit={isEdit}/>
            </Container>
        </Page>
    );
}