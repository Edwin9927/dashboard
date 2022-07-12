import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import { LoginForm } from '../../sections/auth/login';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Don’t have an account? {''}
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                Get started
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              BIENVENIDO
            </Typography>
            <Image
              alt="login"
              src="https://www.minimals.cc/assets/illustrations/illustration_login.png"
            />
          </SectionStyle>
        )}
        
        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Administración de Restaurante
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>A continuación ingrese sus datos</Typography>
              </Box>

              <Tooltip title={capitalCase(method)} placement="right">
                <>
                  <Image
                    disabledEffect
                    src={`https://minimal-assets-api.vercel.app/assets/icons/auth/ic_${method}.png`}
                    //data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA+VBMVEX///9Eq5Ysa2Q9lonMhHqm1Mo6qJKUTWfQh3tFr5kqZ2H5/PxEm44/lopJrpk1fnNmrKHEfHeWSGWPR2X59fe8lKKOP12LOVjVvsZ8b3e1bnJRn5CcW3LSuMGlXm1nioRJfXffzNOtZm+BaXSgWGpIppOYQWLy6uzT3dwQYVmoc4afc4TAeXa2iZlzfH1YmIyZxb3p2t+Ddm44i33q8fCHp6Oju7gAXFTD0dB8n5uzx8VfkomRUGmGYXDr8vHCnap3dXpwfn+KXG5+bXZrlI9iXmY8d3CKvLR5s6pqhYIxem+ovrxUhX+OxbpYa21sZmk9bGieO1+Qg4yulvipAAALSUlEQVR4nO2de2OaShrGDbEdGNtNBaPmqk2MgWzSnmzAWxKT9nDoJZ7dc/b7f5idK3IZ0K0aSPs+fxTDDPD+mOEdRJ5ppQICgUAgEAgEAoFAIBAIBAKBQCAQCAQqr2pF6jn4vrwpUl82z/h1u1h93TSgWzDg9s0UCFfVu4IJ320asDL9uv22KBHAr8+RTV9t/aMYbb16BjpG+HqrGL0GQiAEQiAEQiAEQiAEQiAEQiD8CQgNqgUxrlanWELj4Nvj3ofb3PiNs87j3mPnLLeOcfth7/HbgapOkYTG2X3fpELfcsJ/NLkecwC/IValf6o4DwUSGremaSGm/mlW7Ad3Jq+CzDtlE1Gd9nkVyzRvU3WKIzQ+ktj3q8dWvX5imffq6M8I4El139qvnhDEM/VZuDet43rdOq7uk/PwMbmjAtvQRL2qrhPCqn5p9T+pEEnwqK7rhFDX60h9GoxPpnWpVwmhrld7yCxNGxqPZq9arTLCKmEwFQ1k3PYRL93Xq9U66qf7IGlmk5cSQrK/nvmYqFNcGyLrMiSs6j3zQzp60oQnekion6gakTRhj6IJwksLlaQNSZpBeoRw3/qcjv4MIVG4zyAQSje08VkUckIdJZNNYYSfzOMIYbVqpaOnuUiPEOqKPELOgsW2l4TH5qeSEO6xDjgnROZBirDDO2BI2DM7KcIDE8UIT8w9IHw+wmq9Xifj4WWdKoOQ1qkTQrqoZhCy7S/JeEjrlIkQWVSILyw1oSyUdZSEVnRHqESEvWMqhMRSTcjKemEdJaGoI5YlIjzRqch1SBeZ1yEVu6chyroOaRm7pyEqUy/9BTINEAIhEAIhEAIhEP4C9zSoR4X4opdxXyrqiKWasBfdUXnuvH/vm3H1FYSpOgrCVJ3fy0H4fAJCIARCIARCIARCIARCIARCIATCchEaRelZCF1vfLtTlG7HY88bTEb2Bj2I9hBjrThhIodo6ATjgb0Ro96sSL6YCCmebYCyaK64CGXXs9dL6DtFUyWFne5onYTTGekchSkD0gkma0Ss2aMv20VNN3CT1ZDObK199dXrosbDt5l5DjvjNeacwu5ptrIJCaO2vmYsJyHpqk8/O6HmeD87oeaMf3bCdbViiQk1Z/CzE2rOOm5wSk2oaWv4ZlVuQuyXmtDgzrAsf9hSbbiGfropQsN4c/OdBfl9Z3tLBbkUodZd+f5tU4Q3kW8PGH9XmNeWI1z93kbtP8x3Hi72VW5rifDxTqodlyPUglUbUeHOM85uO52DLAxW+jEfcicdPNaSzpQlCVe+EhXuvM/s/Zc7pb3SOLjnpUpPm6jzXR17AnFJQjxbkiRrDr+0d62PqL/SQv3PCjfTB1lq3mX5Y7MANRzf35KE2tBdyGYPvM6s253Nxt4oVTv1TpRp9fYvrZPLY8u8SwX/2Gelx3VqrEy9LMXr3GRHHjsnyxIuunezvYA+jGHnEGNHmyWegsQJjW99+jYeIST/pKyTRse0Tqr8Zbw6MhWuNqKz7MDxTXSLZQm13G7q+k4yqTlajDFOKGyRlJCQpKyTd3S9fKES9ZVXalYfZQeP9tOlCfNu3SbKx4WOX8sgND7wN0cZYVU/iZsPSQOjuaVQ37fuFIRvcuPeiWyxNKGT/URjkPE8FHfdDMI7ZiAVhNWqFXv10riPmSZJI6avRON7frSRRlyeMPPxYhYgRawpCc+Yvzck1Hvxbor4e8Nz02S6m+ZchezAN3FC+rMFZo+7HRqso1jmfBMe5TzRnt+zxwgP+vzVZUkYN36e9ZMvNifdy7mJlGu+BSHsuq479TEeT8mSNhZZ2iRsm/w5IMV0ta9pGYS1IO9AYcvHCD+mCKM+54MU4V6KcEEnjeYaSkgj8DFvJHH74g41h15ET44sxhmE2X2Uq5ZBSJNILqGeQ7i1AFDD23KT139qQzbSjYY8lXhDnjRnQ9bB3ERxugkXHEresycJ40oSJkpThPmZlBKG2fT1q4oYBaa1+FKkwVqiOCn1QBE51GwDhIsvw/mFuPLv+P7Cs+kqCVe6Do2dnJ+VxE9Osu7KhAt/GhS5Zr2E2zdM//7jX1z/+WP+iReFw8WqhG7QjeuvvxIrgsH6CcW3XOPUZG4SnexAfuqZie8ia3/b5LDfVq5fL+FWSMikHyMkPvWSczOsm7Bx2ARCIARCIATC5yLUuS1S2CxThLmmyZdAaKITqmOrx5a9JCEvRaIUvUDCv/tx/R39jnuQLO2fvjjCs48HCcXCSpWqn5iWmXBNAsJ1EF4fJnjShI2L3RIQ7l40FrG0D68Va3ebF4sI37dajcIJG63W+0WEF83dHyRsloKwCYQLCK+PpO7M3bb42C4hYftIoevFhA3UlELIlB9bR6UjPGo1FUKNxW14dSiFUPiR56ZSEV4fqgLdXaKXhnox12G7eZgYP4CwKELxNBEh+TQRqZ4mPgfhbzcb+O/UTs19rh5C4afEgW5+eyZCbxOeks/hzJlo/ilRh/2ktgKhedE450oSyvVtTvhlA767m3sTpZWs9YUTtkU8jSShXH9hqglRbPCbE4ZDpIl4L91AJyW9VEH4NlGJ99JwmOaD35wwHCJRPqEsDgmvm6iUhKh5HSdMIaR66TWT7MQRQrPNSo7MUhCaRyyatpkibEoENaHMNArCJr80ZS4tmFBkmvOmgjCO8H8QXpeQ8BoIf3HCxhURQhdXVxfvS034noaIEA23sZCwJYtbu5U2HVkslpYPK+etliBstSqbIlSM+KapIqzI5zQkrPPKIRvELDqKt+MIaZ1fiedT1xfnlcbDlRTZ3cODqPPA7gVevduA/vtPhZKV2LO2ozAa8uF9GOdDo3J+IRGuzhWEIBAIBAKBQCDQi1DNZnLjf9py3i17MnjiPrepLJF1aVW5F5evDVfFdxqpIT/XIrXDHW9mEizX4b6UGT++PeR/D5lhs+bzQvrMdiJKnKEwyQ2GzlAiDoZDj2/dZdsFfLvITEhkTVd+9obsKTA5NHO+zhyphQbDHyLk73prmO/eFq+Fc0sqnT8q0DguIeQlwgZIjSpYzskxcFjMZGv25n+ty2pibSgRqW8ntLl6mHkJXWFKmjnCM7g5Qtu1Z8KQQmN0qWqyjHQmVkJ7qaM5YQdmLgdnKglxghCPXNsXZhhKoUUcSB5muK6woJNO++TgzsZ6qcZcMyOH+y5ssqzVhJOWlk2i59UJkdgcbxPZngpC6m9xSX1eTnbr+aG7zmNt5rpzkz05/BomTcglpCeRh8J7KT9eh4SoReZOixDSmCuB9BQpCF32pyAcY8ceOdK3xAhx194I4UQLgiCW48jBPG+MhTuIEtJswo9XG2vUWStzS5RwRhnI5TfJICQ79cLJc1zmcA3k1h7GA3JZdPMIXRKn9iPTmT3RjBg1SLkseWCZNGiM9mg0klXckdfFIdec0B1q2njsY+EpIoTjCu/jkhDTnc6moljrjsdd6VX2sPPkss6STWjT8/wj0yi4E6KonZYSzghEIHfMe6v4i7V2EF5Ac0LS0TAzRfIESVNlhXZG3hEpYZcmF95baNoVVklJOOCuyGzCKQ10LbmVX4czLE4vacNgTMU6SMfxBxOa22sJwinr255HGpFFViNtFngk+fBzwTON54iOMSFNS2t3hQOJETLX4LNkGtIONTo08djoPJ9sWBdDMnOvhi7MIR7Kbiccqxrmo7
                    sx={{ width: 32, height: 32 }}
                  />
                </>
              </Tooltip>
            </Stack>

            <LoginForm />

          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
