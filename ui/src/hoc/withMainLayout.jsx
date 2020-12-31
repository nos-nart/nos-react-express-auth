import {MainLayout} from '../components/layouts';

export const withMainLayout = (Component) => (props) => {
  return (
    <MainLayout>
      <Component {...props} />
    </MainLayout>
  )
}