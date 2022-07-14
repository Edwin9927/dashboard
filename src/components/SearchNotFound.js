import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return searchQuery ? (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
          No se encontraron resultados para &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Verifique posibles errores tipográficos o use la palabra completa.
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2"> Por favor ingrese las palabras clave</Typography>
  );
}
