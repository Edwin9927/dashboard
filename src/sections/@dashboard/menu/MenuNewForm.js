import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
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

// ----------------------------------------------------------------------

MenuNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

export default function MenuNewForm({ isEdit, currentMenu }) {
  const navigate = useNavigate();

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

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Creado con éxito!' : 'Actualizado con éxito!');
      navigate(PATH_DASHBOARD.user.list);
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
              <RHFSelect name="tipo" label="tipo">
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