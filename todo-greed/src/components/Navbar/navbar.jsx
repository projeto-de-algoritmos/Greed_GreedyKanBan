import AppBar from '@mui/material/AppBar';
import * as S from './styles';

const Navbar = () => {
  return (
    <S.Container>
      <AppBar style={{ background: '#fd7d62', alignItems: 'center' }}>
        <h2>Greedy KanBan</h2>
      </AppBar>
    </S.Container>
  );
};

export default Navbar;
