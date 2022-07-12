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
import AlimentosForm from '../../sections/@dashboard/alimentos/AlimentosForm';

// ----------------------------------------------------------------------

export default function AlimentoCreate() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { name = '' } = useParams();
  const isEdit = pathname.includes('edit');

/*   const urlAlimento = "http://localhost:8080/api/alimentos";
  let _alimentoList;
  fetch(urlAlimento)
    .then(response => response.json())
    .then(json => _alimentoList = json)
    .then(()=> console.log(_alimentoList))
 */
  const currentAlimento = _alimentoList.find((alimento) => paramCase(alimento) === name);

  return (
    <Page title="Alimento: Crear alimento">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new alimento' : 'Edit alimento'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Alimento', href: PATH_DASHBOARD.alimento.list },
            { name: !isEdit ? 'New alimento' : capitalCase(name) },
          ]}
        />

        <AlimentosForm isEdit={isEdit}/>
      </Container>
    </Page>
  );
}