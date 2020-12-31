import Navigation from '../Navigation';
import { Container } from '../shared';

export const MainLayout = ({children}) => {
  return (
    <>
      <Navigation />
      <Container>
        {children}
      </Container>
    </>
  )
}
