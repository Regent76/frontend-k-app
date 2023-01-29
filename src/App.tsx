import * as React from 'react';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
  Outlet
} from 'react-router-dom';
import MainMenu from './components/MainMenu';
import { fakeAuthProvider } from './services/auth';
import { useEffect, useState } from 'react';
import { Button, Input, Space } from 'antd';
import { backendMock } from './services/backend';
import { authContextType } from './models/Interface';
import ProfilePageContainer from './components/ProfilePageContainer';
import InfoPageContainer from './components/InfoPageContainer';

export default function App() {
  const [pageTitle, setPageTitle] = useState('Home');
  document.title = pageTitle;
  const titleMap = [
    { path: '/', title: 'About us' },
    { path: '/login', title: 'Sign in' },
    { path: '/profile', title: 'Profile' },
    { path: '/sign-out', title: 'Sign out' }
  ];
  let location = useLocation();
  useEffect(() => {
    const pageTitle = titleMap.find(item => item.path === location.pathname)
    if (pageTitle && pageTitle.title) {
      setPageTitle(pageTitle.title)
      document.title = pageTitle.title
    }
  }, [location]);

  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<InfoPageContainer/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/profile"
                 element={
                   <RequireAuth>
                     <ProfilePageContainer/>
                   </RequireAuth>
                 }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function Layout() {
  return (
    <div>
      <MainMenu/>
      <Outlet/>
    </div>
  );
}

export const AuthContext = React.createContext<authContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let signin = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = React.useContext(AuthContext);
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace/>;
  }

  return children;
}

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = React.useContext(AuthContext);
  const from = location.state?.from?.pathname || '/profile';

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    backendMock.doAuth(username, password)
      .then(response => {
        const user = {
          username: username,
          token: response.data.token
        };

        auth.signin(user, () => {
          navigate(from, { replace: true });
        });

      })
      .catch(error => {
        alert(error.data.message);
      })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Space direction="vertical">
          <label className="formFieldLabel">
            <span className="formFieldLabel_text">Email address</span>
            <Input name="username" placeholder="Enter email" size="middle"/>
            <span className="fieldBottomTip_email">We'll never share your email with anyone else.</span>
          </label>
          <label className="formFieldLabel">
            <span className="formFieldLabel_text">Password</span>
            <Input.Password name="password" placeholder="Password" size="middle"/>
          </label>
          <Button type="primary" htmlType="submit" className="formLogin_submitButton">Submit</Button>
        </Space>
      </form>
    </div>
  );
}
