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
import MesaNewForm from '../../sections/@dashboard/mesa/MesaNewForm';

// ----------------------------------------------------------------------

export default function MesaCreate() {
    const { themeStretch } = useSettings();
    const { pathname } = useLocation();
    const { name = '' } = useParams();
    const isEdit = pathname.includes('edit');

    return (
        <Page title="Mesa: Crear mesa">
          <Container maxWidth={themeStretch ? false : 'lg'}>
            <HeaderBreadcrumbs
              heading={!isEdit ? 'Crear mesa' : 'Editar mesa'}
              links={[
                { name: 'Dashboard', href: PATH_DASHBOARD.root },
                { name: 'Mesa', href: PATH_DASHBOARD.mesa.list },
                { name: !isEdit ? 'New mesa' : capitalCase(name) },
              ]}
            />
    
            <MesaNewForm isEdit={isEdit}/>
          </Container>
        </Page>
      );
    }