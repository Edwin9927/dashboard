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
import AlimentosForm from '../../sections/@dashboard/alimentos/AlimentosForm';

// ----------------------------------------------------------------------

export default function AlimentoCreate() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { name = '' } = useParams();
  const isEdit = pathname.includes('edit');
  
  return (
    <Page title="Alimento: Crear alimento">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Ingresar Alimento' : 'Editar alimento'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Alimento', href: PATH_DASHBOARD.alimento.list },
            { name: !isEdit ? 'Nuevo alimento' : capitalCase(name) },
          ]}
        />

        <AlimentosForm isEdit={isEdit}/>
      </Container>
    </Page>
  );
}