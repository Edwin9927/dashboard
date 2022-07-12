import PropTypes from "prop-types";
import * as Yup from "yup";
import { useCallback, useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
// form
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Card,
  Grid,
  Stack,
  Typography,
  FormControlLabel,
} from "@mui/material";
// utils
import { fData } from "../../../utils/formatNumber";
// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import Label from "../../../components/Label";
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from "../../../components/hook-form";

AlimentosForm.propTypes = {
  isEdit: PropTypes.bool,
  currentAlimento: PropTypes.object,
};

export default function AlimentosForm({ isEdit, currentAlimento }) {
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewAlimentoSchema = Yup.object().shape({
    menu: Yup.string().required("Menú es requerido"),
    imagen: Yup.mixed().test(
      "required",
      "Imagen es requerida",
      (value) => value !== ""
    ),
    nombre: Yup.string().required("Nombre es requerido"),
    descripcion: Yup.string().required("Descripcion es requerida"),
    precio: Yup.string().required("Precio es requerido"),
    disponibilidad: Yup.string().required("Disponibilidad es requerida"),
  });

  const defaultValues = useMemo(
    () => ({
      menu: currentAlimento?.menu || "",
      imagen: currentAlimento?.imagen || "",
      nombre: currentAlimento?.nombre || "",
      descripcion: currentAlimento?.descripcion || "",
      precio: currentAlimento?.precio || "",
      disponibilidad: currentAlimento?.disponibilidad || "",
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentAlimento]
  );
  const methods = useForm({
    resolver: yupResolver(NewAlimentoSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentAlimento) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentAlimento]);

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? "Create success!" : "Update success!");
      navigate(PATH_DASHBOARD.alimento.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "imagen",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={0}
        alignItems="center"
        justifyContent="center">
        <Grid item xs={12} md={8}>
          {isEdit && (
            <Label
              color={values.status !== "active" ? "error" : "success"}
              sx={{
                textTransform: "uppercase",
                position: "absolute",
                top: 24,
                right: 24,
              }}
            >
              {values.status}
            </Label>
          )}
          <Box sx={{ mb: 5 }}>
            <RHFUploadAvatar
              name="imagen"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: "auto",
                    display: "block",
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Box>

          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "grid",
                  columnGap: 2,
                  rowGap: 3,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(1, 1fr)",
                  },
                }}
              >
                <RHFSelect name="menu" label="Menú" placeholder="Menú">
                  <option value="" />
                  <option value="Primeros" label="Primeros" />
                </RHFSelect>
                <RHFTextField name="nombre" label="nombre" />
                <RHFTextField name="descripcion" label="descripcion" />
                <RHFTextField name="precio" label="precio" />
                <RHFSelect name="disponibilidad" label="disponibilidad" placeholder="disponibilidad">
                  <option label = ""/>
                  <option value = "0" label = "No"/>
                  <option value = "1" label = "Si"/>
                </RHFSelect>

              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {!isEdit ? "Create Alimento" : "Save Changes"}
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
