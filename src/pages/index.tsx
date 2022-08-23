import type { NextPage } from 'next';
import Title from '../components/Title';
import Home from '../containers/Home';
const HomePage: NextPage = () => {
  return (
    <>
      <Title title={`Dashboard`} />
      <Home />
    </>
  );
};

export default HomePage;
