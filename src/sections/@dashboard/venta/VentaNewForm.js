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
import React from 'react';
import getPedido from "../../../services/getPedido";
import getUsuarios from "../../../services/getUsuarios";


// ----------------------------------------------------------------------

VentaNewForm.propTypes = {
    isEdit: PropTypes.bool,
    currentVenta: PropTypes.object,
  };

  export default function VentaNewForm() {
    const navigate = useNavigate();
    const data = useLocation();
    
    const isEdit = data.state && data.state.isEdit;
    const currentVenta = data.state && data.state.currentVenta;

    const { enqueueSnackbar } = useSnackbar();
    const [ pedido, setPedido ] = React.useState([]);
    const [ usuario, setUsuarios ] = React.useState([]);
  
    const NewVentaSchema = Yup.object().shape({
      idUsuario: Yup.string().required('Campo requerido'),
      idPedido: Yup.string().required('Campo requerido'),
      formaDePago: Yup.string().required('Campo requerido'),
      calificacion: Yup.string().required('Campo requerido'),
      propina: Yup.number().required('Campo requerido'),
    });
    const defaultValues = useMemo(
        () => ({
          idUsuario: currentVenta?.idUsuario || '',
          idPedido: currentVenta?.idPedido || '',
          formaDePago: currentVenta?.formaDePago || '',
          calificacion: currentVenta?.calificacion || '',
          propina: currentVenta?.propina || '',
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentVenta]
      );
    
      const methods = useForm({
        resolver: yupResolver(NewVentaSchema),
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
        getPedido().then(res => setPedido(res));
        getUsuarios().then(res => setUsuarios(res));
        if (isEdit && currentVenta) {
          reset(defaultValues);
        }
        if (!isEdit) {
          reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isEdit, currentVenta]);

      const onSubmit = async () => {
        try {
          //await new Promise((resolve) => setTimeout(resolve, 500));
          reset();
          enqueueSnackbar(!isEdit ? 'Creado con ??xito!' : 'Actualizado con ??xito!');
          navigate(PATH_DASHBOARD.venta.list);
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
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >              
              <RHFSelect name="idUsuario"
                placeholder="Cliente"
                defValue={ isEdit ? currentVenta.idUsuario : 0}>
                  <option label="Seleccione un usuario"/>
                {
                  usuario.map((item)=>{
                      return (<option value={item.id} label={item.nombre}/>);
                  })
                }
              </RHFSelect>
              <RHFSelect name="idPedido"
                placeholder="Pedido"
                defValue={ isEdit ? currentVenta.idPedido : 0}>
                <option label="Seleccione un pedido"/>
              {
                pedido.map((item)=>{
                    return (<option value={item.id} label={item.idPedido}/>);
                })
              }
                
              </RHFSelect>
              <RHFSelect name="formaDePago" label="Forma de Pago" placeholder="Forma de Pago">
                <option label='' />
                <option value="efectivo" label='efectivo' />
                <option value="debito" label='debito' />
                <option value="credito" label='credito' />
                <option value="transferencia" label='transferencia' />
              </RHFSelect>
              <RHFSelect name="calificacion" label="Calificacion" placeholder="Calificacion">
                <option label='' />
                <option value="excelente" label='excelente' />
                <option value="muy_bueno" label='muy bueno' />
                <option value="bueno" label='bueno' />
                <option value="malo" label='malo' />
                <option value="muy_malo" label='muy malo' />
              </RHFSelect>
              <RHFTextField name="propina" label="Propina" />
            </Box>

            <Stack alignItems="flex" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Crear Venta' : 'Guardar Cambios'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}