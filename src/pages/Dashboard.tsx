import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Dashboard() {

  return (
    <>
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
      </>
  );
}

const Container = styled.div`
  padding: 30px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  background-color: #ffffff;
  
  margin-top: 70px;
  height: calc(100vh - 80px);

`;
