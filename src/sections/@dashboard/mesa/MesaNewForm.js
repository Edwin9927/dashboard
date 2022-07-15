import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useLocation,useNavigate } from 'react-router-dom';
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

import {ingresarMesa, actualizarMesa} from '../../../services/mesas';
// ----------------------------------------------------------------------

MesaNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentMesa: PropTypes.object,
};

export default function MesaNewForm() {
  const navigate = useNavigate();
  const data = useLocation();

  const isEdit = data.state && data.state.isEdit;
  const currentMesa = data.state && data.state.currentMesa;

  const { enqueueSnackbar } = useSnackbar();

  const NewMesaSchema = Yup.object().shape({
    nombre: Yup.string().required('Campo requerido'),
    capacidad: Yup.number().required('Campo requerido'),
    estado: Yup.string().required('Campo requerido'),
  });

  const defaultValues = useMemo(
    () => ({
      nombre: currentMesa?.nombre || '',
      capacidad: currentMesa?.capacidad || 0,
      estado: currentMesa?.estado || false,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentMesa]
  );

  const methods = useForm({
    resolver: yupResolver(NewMesaSchema),
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
    if (isEdit && currentMesa) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentMesa]);

  const onSubmit = async (values) => {
    const token = window.localStorage.getItem('accessToken');

    try {
      const respuesta = !isEdit ? ingresarMesa(values, token) 
        : actualizarMesa(values,token, currentMesa.idMesa);
      respuesta.then((res)=>{
        if(res.ok){
          reset();
          enqueueSnackbar(!isEdit ? 'Creado con éxito!' : 'Actualizado con éxito!');
          navigate(PATH_DASHBOARD.mesa.list, {mesa: {respuesta}});
        }else{
          return res.json();
        }
      })
      .then(resp => {
        const property = Object.getOwnPropertyNames(resp);
        enqueueSnackbar(resp[property[0]], { variant: 'error' });
      });
    } catch (error) {
      console.error(error);
    }
  };
  console.log(currentMesa);
  console.log(values);
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
              <RHFSelect name="capacidad" label="Capacidad"
                defValue={ isEdit ? currentMesa.capacidad : 0}>
                <option label='' />
                <option value="1" label='1' />
                <option value="2" label='2' />
                <option value="3" label='3' />
                <option value="4" label='4' />
                <option value="5" label='5' />
                <option value="6" label='6' />
                <option value="7" label='7' />
                <option value="8" label='8' />
                <option value="9" label='9' />
                <option value="10" label='10' />
              </RHFSelect>
              <RHFSelect name="estado" label="Estado"
              defValue={ isEdit ? currentMesa.estado : false}>
                <option label='' />
                <option value = {false} label = "No disponible"/>
                <option value = {true} label = "Disponible"/>
              </RHFSelect>
            </Box>

            <Stack alignItems="flex" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Crear Mesa' : 'Guardar Cambios'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}