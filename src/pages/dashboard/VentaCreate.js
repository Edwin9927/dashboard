import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
//import { _alimentoList } from '../../_mock';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import VentaNewForm from '../../sections/@dashboard/venta/VentaNewForm';


export default function VentaCreate() {
    const { themeStretch } = useSettings();
    const { pathname } = useLocation();
    const { name = '' } = useParams();
    const isEdit = pathname.includes('edit');

    return (
        <Page title="Venta: Crear venta">
          <Container maxWidth={themeStretch ? false : 'lg'}>
            <HeaderBreadcrumbs
              heading={!isEdit ? 'Crear venta' : 'Editar venta'}
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Venta', href: PATH_DASHBOARD.venta.list },
                { name: !isEdit ? 'Nueva venta' : capitalCase(name) },
              ]}
            />
    
            <VentaNewForm isEdit={isEdit}/>
          </Container>
        </Page>
      );
    }