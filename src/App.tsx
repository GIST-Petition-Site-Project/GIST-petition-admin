import { GlobalStyle } from '@styles/globalStyle';
import MainRouter from '@routes/MainRouter';
import Toast from '@components/Toast/Toast';
import { getUsersMe } from '@api/userAPI';
import { useAppDispatch, useAppSelect } from '@hooks/useStore';
import { setLogout, setUserRoleNull } from '@stores/authSlice';
import { useEffect } from 'react';
import { dark, light } from '@styles/theme';
import { ThemeProvider } from 'styled-components';

const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const checkSessionValid = async () => {
    const response = await getUsersMe();
    if (response.status === 401 || response.data.userRole === 'USER') {
      dispatch(setLogout());
      dispatch(setUserRoleNull());
    }
  };
  const isLightMode = useAppSelect((select) => select.mode.isLightMode);
  const theme = isLightMode ? light : dark;

  useEffect(() => {
    document.querySelector("meta[name='theme-color']")?.setAttribute('content', theme.colors.background);
  });

  useEffect(() => {
    checkSessionValid();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Toast />
      <MainRouter />
    </ThemeProvider>
  );
};
export default App;
