import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../context/firebase';
import * as ROUTES from '../constants/routes';

import { HeaderContainer } from '../containers/header';
import { FooterContainer } from '../containers/footer';

import { Form } from '../components';

export default function Signin() {
	const { fb } = useContext(FirebaseContext);
	const history = useHistory();

	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const isInvalid = password === '' || emailAddress === '';

	const handleSignIn = (event) => {
		event.preventDefault();

		fb.auth()
			.signInWithEmailAndPassword(emailAddress, password)
			.then(() => {
				history.push(ROUTES.BROWSE);
			})
			.catch((error) => {
				setEmailAddress('');
				setPassword('');
				setError(error.message);
			});
	};

	return (
		<>
			<HeaderContainer>
				<Form>
					<Form.Title>Sign In</Form.Title>
					{error && <Form.Error data-testid='error'>{error}</Form.Error>}

					<Form.Base onSubmit={handleSignIn} method='POST'>
						<Form.Input
							placeholder='Email Address'
							value={emailAddress}
							onChange={({ target }) => setEmailAddress(target.value)}
						/>
						<Form.Input
							type='password'
							placeholder='Password'
							autoComplete='off'
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
						<Form.Submit
							disabled={isInvalid}
							type='submit'
							data-testid='sign-in'
						>
							Sign In
						</Form.Submit>
					</Form.Base>

					<Form.Text>
						New to Aniflix?{' '}
						<Form.Link to={ROUTES.SIGN_UP}>Sign up now</Form.Link>.
					</Form.Text>
					<Form.TextSmall>
						This page is protected by Google reCAPTCHA to ensure you're not a
						bit. Learn more.
					</Form.TextSmall>
				</Form>
			</HeaderContainer>
			<FooterContainer />
		</>
	);
}
