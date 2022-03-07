import AppBar from '@mui/material/AppBar';
import * as S from './styles';

const Navbar = () => {
  return (
    <S.Container>
      <AppBar style={{ background: '#FF6347', alignItems: 'center' }}>
        <h1>Greedy KanBan</h1>
      </AppBar>
    </S.Container>
  );
};

export default Navbar;
