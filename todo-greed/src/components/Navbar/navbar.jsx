import AppBar from '@mui/material/AppBar'
import * as S from './styles'

const Navbar = () => {
    return(
        <S.Container>
            <AppBar 
                style={{ background: '#fd7d62',
                        alignItems: 'center',
                        height: '5rem',
                    }}
            >
                <h1>Greedy KanBan</h1>
            </AppBar>
        </S.Container>
    )
};

export default Navbar;