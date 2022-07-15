import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import {useLocation, useNavigate} from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
// utils import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';

import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';

import { ingresarMenu, actualizarMenu } from "../../../services/menu";

// ----------------------------------------------------------------------

MenuNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentMenu: PropTypes.object,
};

export default function MenuNewForm() {
  const navigate = useNavigate();
  const data = useLocation();

  const isEdit = data.state && data.state.isEdit;
  const currentMenu = data.state && data.state.currentMenu;

  const { enqueueSnackbar } = useSnackbar();

  const NewMenuSchema = Yup.object().shape({
    nombre: Yup.string().required('Campo requerido'),
    tipo: Yup.string().required('Campo requerido'),
  });

  const defaultValues = useMemo(
      () => ({
        nombre: currentMenu?.nombre || '',
        tipo: currentMenu?.tipo || '',
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [currentMenu]
  );

  const methods = useForm({
    resolver: yupResolver(NewMenuSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentMenu) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentMenu]);

  const onSubmit = async (values) => {
    const token = window.localStorage.getItem('accessToken');

    try {

      const respuesta = !isEdit ? ingresarMenu(values, token)
          : actualizarMenu(values,token, currentMenu.id);

      respuesta.then((res) => {
        if(res.ok){
          enqueueSnackbar(!isEdit ? "Menu creado satisfactoriamente!" : "Actualización exitosa!");
          reset();
          navigate(PATH_DASHBOARD.menu.list);
        }
        else{
          enqueueSnackbar(!isEdit ? "Error al crear un menu!" : "Error al actualizar un elemento!");
        }
        return res.json()
      })
          .then(resp => {
            console.log(resp);
          });

    } catch (error) {
      console.error(error);
    }
  };

  return (
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"

        >


          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Box
                  sx={{
                    display: 'grid',
                    columnGap: 2,
                    rowGap: 3,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                  }}
              >
                <RHFTextField name="nombre" label="Nombre" />
                <RHFSelect name="tipo" label="tipo"
                           defValue={isEdit ? currentMenu.tipo : ''}>
                  <option label='' />
                  <option value = "bebidas" label = "Bebidas"/>
                  <option value = "postres" label = "Postres"/>
                  <option value = "primeros" label = "Primeros"/>
                  <option value = "segundos" label = "Segundos"/>
                  <option value = "ensaladas" label = "Ensaladas"/>
                  <option value = "sopas" label = "Sopas"/>
                </RHFSelect>
              </Box>

              <Stack alignItems="flex" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  {!isEdit ? 'Crear Menu' : 'Guardar Cambios'}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
  );
}