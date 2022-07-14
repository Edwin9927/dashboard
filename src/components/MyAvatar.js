// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const { user } = useAuth();

  return (
    <Avatar
      src={user?.photoURL}
      alt={user?.nombre + " " + user?.apellido}
      color={user?.photoURL ? 'default' : createAvatar(user?.nombre + " " + user?.apellido).color}
      {...other}
    >
      {createAvatar(user?.nombre + " " + user?.apellido).name}
    </Avatar>
  );
}
