import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Paths } from 'routes';
import { LoginData } from 'api';
import { login } from 'redux/root.actions';
import { useTitle, useUniqueids } from 'hooks';
import { Footer, Main } from 'components/layouts';
import { selectSessionError } from 'redux/root.selectors';
import { Error, Button, Input } from 'components/partials';

const LoginWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 20px;
  margin: 0 auto;
`;

const Form = styled.form`
  margin: 2rem auto;
  width: 100%;

  & > * {
    margin: 5px auto;
    width: 100%;
  }
`;

const Fieldset = styled.fieldset`
  border-radius: 12px;
  transition: all 0.4s ease-out;

  &:hover {
    border-color: #cfcfcf;
    box-shadow: 0 0 0 3px rgba(34, 31, 31, 0.25);
  }
`;

const Legend = styled.legend`
  color: #727272;
  font-size: 0.7rem;
`;

const Heading = styled.h1`
  text-align: center;
  margin-top: 5rem;
`;

const Message = styled.p`
  text-align: center;
`;

const HaveAccountNode = styled.p`
  text-align: center;
  font-size: 0.9rem;
`;

const ErrorWrapper = styled.div`
  text-align: center;
  width: 100%;
`;

const initialLoginData = {
  email: '',
  password: '',
};

const SignUp: React.FC = () => {
  useTitle('Login 🔐');
  const dispatch = useDispatch();
  const [emailId, passwordId] = useUniqueids(2);
  const error = useSelector(selectSessionError);
  const [loginData, setLoginData] = useState<LoginData>(initialLoginData);

  return (
    <LoginWrapper>
      <Main>
        <Heading>Sign in</Heading>
        <Message>Enter your credentials lets continue</Message>
        <Form
          onSubmit={(ev: React.KeyboardEvent<HTMLFormElement>) => {
            ev.preventDefault();

            dispatch(login(loginData));
          }}
        >
          <Fieldset>
            <Legend>Email</Legend>
            <Input
              id={emailId}
              type="email"
              name="email"
              placeholder="Email"
              value={loginData.email}
              onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
                setLoginData({ ...loginData, email: value });
              }}
              required
            />
          </Fieldset>
          <Fieldset>
            <Legend>Password</Legend>
            <Input
              id={passwordId}
              type="password"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
                setLoginData({ ...loginData, password: value });
              }}
              required
            />
          </Fieldset>
          <Button type="submit" shape="radius">
            Sign in
          </Button>

          {error && (
            <ErrorWrapper>
              <Error message={error} />
            </ErrorWrapper>
          )}

          <HaveAccountNode>
            Don&apos;t Have an Account?&nbsp;
            <Link className="link" to={Paths.signUp}>
              Sign up
            </Link>
          </HaveAccountNode>
        </Form>
      </Main>

      <Footer />
    </LoginWrapper>
  );
};

export default SignUp;
