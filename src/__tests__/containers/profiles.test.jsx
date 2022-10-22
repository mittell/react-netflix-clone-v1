/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SelectProfileContainer } from '../../containers/profiles';

jest.mock('react-router-dom');

describe('<Profiles/>', () => {
	test('renders the <Profiles/>', () => {
		const user = { displayName: 'User', photoURL: 'profile.png' };
		const setProfile = jest.fn();

		const { getByTestId } = render(
			<SelectProfileContainer user={user} setProfile={setProfile} />
		);

		fireEvent.click(getByTestId('user-profile'));
		expect(setProfile).toHaveBeenCalled();
	});
});
