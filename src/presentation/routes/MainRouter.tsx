import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthRoute } from './PrivateRouter';
import NavBar from '@components/NavBar';
import Login from '@pages/Login';
import Home from '@pages/Home';
import ModifyPetition from '@components/ModifyPetition';
import ApprovePetition from '@pages/ApprovePetition';
import ManagePetition from '@pages/ManagePetition';
import AnswerPetition from '@pages/AnswerPetition';
import Revision from '@components/Revision';
import ScrollTop from './ScrollTop';

const MainRouter = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<AuthRoute type="AUTH" />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/modify" element={<AuthRoute type="MANAGER" />}>
            <Route path=":petitionId" element={<ModifyPetition />} />
          </Route>
          <Route path="/revision" element={<AuthRoute type="MANAGER" />}>
            <Route path=":petitionId" element={<Revision />} />
          </Route>
          <Route path="/answer" element={<AuthRoute type="MANAGER" />}>
            <Route path=":petitionId" element={<AnswerPetition />} />
          </Route>
          <Route path="/approve" element={<AuthRoute type="MANAGER" />}>
            <Route path=":petitionId" element={<ApprovePetition />} />
          </Route>
          <Route path="/manage" element={<AuthRoute type="MANAGER" />}>
            <Route path=":petitionId" element={<ManagePetition />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default MainRouter;
