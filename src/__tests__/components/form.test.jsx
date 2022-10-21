/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import { Form } from '../../components';

jest.mock('react-router-dom');

describe('<Form/>', () => {
	it('renders <Form/> with populated data', () => {
		const { container, getByText, getByPlaceholderText } = render(
			<Form>
				<Form.Title>Sign In Now</Form.Title>

				<Form.Base>
					<Form.Input placeholder='Email Address' onChange={() => {}} />
					<Form.Input
						type='password'
						placeholder='Password'
						onChange={() => {}}
					/>
					<Form.Submit disabled type='submit'>
						Sign In
					</Form.Submit>
				</Form.Base>

				<Form.Text>
					New to Aniflix? <Form.Link to='/signup'>Sign up now</Form.Link>.
				</Form.Text>
				<Form.TextSmall>
					This page is protected by Google reCAPTCHA to ensure you're not a bit.
					Learn more.
				</Form.TextSmall>
			</Form>
		);

		expect(
			getByText(
				"This page is protected by Google reCAPTCHA to ensure you're not a bit. Learn more."
			)
		).toBeTruthy();
		expect(getByText('Sign In Now')).toBeTruthy();
		expect(getByText('Sign In')).toBeTruthy();
		expect(getByText('Sign In').disabled).toBeTruthy();
		expect(getByPlaceholderText('Email Address')).toBeTruthy();
		expect(getByPlaceholderText('Password')).toBeTruthy();
		expect(container.firstChild).toMatchSnapshot();
	});

	it('renders <Form/> with an error', () => {
		const { container, getByText, queryByText } = render(
			<Form>
				<Form.Error>Your email address is already being used</Form.Error>
				<Form.Submit type='submit'>Sign In</Form.Submit>
			</Form>
		);

		expect(getByText('Your email address is already being used')).toBeTruthy();
		expect(getByText('Sign In')).toBeTruthy();
		expect(queryByText('Sign In').disabled).toBeFalsy();
		expect(container.firstChild).toMatchSnapshot();
	});
});
