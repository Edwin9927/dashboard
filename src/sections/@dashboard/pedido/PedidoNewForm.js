import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
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

import PedidoCard from '../../@dashboard/pedido/cards/AlimentoCard';

import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';

import { getPedido } from '../../../services/getPedido';

import {obtenerAlimentosDisp} from '../../../services/alimentos';
// ----------------------------------------------------------------------

PedidoNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentPedido: PropTypes.object,
};

export default function PedidoNewForm({ isEdit, currentPedido }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const [ _AlimentoCards, set_AlimenttoCards ] = useState([]);

  const NewPedidoSchema = Yup.object().shape({
    fecha: Yup.string().required('Campo requerido'),
    hora: Yup.string().required('Campo requerido').email(),
    estadoPedido: Yup.string().required('Campo requerido'),
    detallePedidos: Yup.string().required('Campo requerido'),
  });

  const defaultValues = useMemo(
    () => ({
      fecha: currentPedido?.fecha || '',
      hora: currentPedido?.hora || '',
      estadoPedido: currentPedido?.estadoPedido || '',
      detallePedidos: currentPedido?.detallePedidos || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPedido]
  );

  const methods = useForm({
    resolver: yupResolver(NewPedidoSchema),
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
    obtenerAlimentosDisp().then(res => set_AlimenttoCards(res));
    if (isEdit && currentPedido) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentPedido]);

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Creado con éxito!' : 'Actualizado con éxito!');
      navigate(PATH_DASHBOARD.pedido.list);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(_AlimentoCards);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        
      >


        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 5,
                rowGap: 6,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
              }}
            >
              <RHFTextField name="fecha" label="Fecha" />
              <RHFTextField name="hora" label="Hora" />
              
              <RHFSelect name="estadoPedido" label="Estado" placeholder="Estado">
                <option label='' />
                <option value="pendiente" label='Pendiente' />
                <option value="anulado" label='Anulado' />
                <option value="entregado" label='Entregado' />
              </RHFSelect>

            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>

              <Box
                  sx={{
                    display: 'grid',
                    columnGap: 5,
                    rowGap: 6,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(5, 1fr)' },
                  }}
              >
                {_AlimentoCards.map((alimento) => 
                    {return (<PedidoCard key={alimento.idAlimento} alimento={alimento} />);}
                )}
              </Box>
            </Card>

        </Grid>
            <Stack alignItems="flex" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Crear Pedido' : 'Guardar Cambios'}
              </LoadingButton>
            </Stack>

      </Grid>
    </FormProvider>
  );
}
