/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { FirebaseContext } from '../../context/firebase';
import { Signin } from '../../pages';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({}),
}));

const fb = {
	auth: jest.fn(() => ({
		signInWithEmailAndPassword: jest.fn(() =>
			Promise.resolve(['I am signed in!'])
		),
	})),
};

describe('<SignIn />', () => {
	it('renders the sign in page with a form submission', async () => {
		const { getByTestId, getByPlaceholderText, queryByTestId } = render(
			<Router>
				<FirebaseContext.Provider value={{ fb }}>
					<Signin />
				</FirebaseContext.Provider>
			</Router>
		);

		await act(async () => {
			await fireEvent.change(getByPlaceholderText('Email Address'), {
				target: { value: 'user@login.co.uk' },
			});
			await fireEvent.change(getByPlaceholderText('Password'), {
				target: { value: 'password' },
			});
			fireEvent.click(getByTestId('sign-in'));

			expect(getByPlaceholderText('Email Address').value).toBe(
				'user@login.co.uk'
			);
			expect(getByPlaceholderText('Password').value).toBe('password');
			expect(queryByTestId('error')).toBeFalsy();
		});
	});
});
