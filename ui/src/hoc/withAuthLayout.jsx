import {AuthLayout} from '../components/layouts';

export const withAuthLayout = (Component) => (props) => {
  return (
    <AuthLayout>
      <Component {...props} />
    </AuthLayout>
  )
}