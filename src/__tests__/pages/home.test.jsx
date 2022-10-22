/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import { Home } from '../../pages';

jest.mock('react-router-dom');

describe('Home Page', () => {
	test('renders the homepage', () => {
		const { getByText, getAllByPlaceholderText, getAllByText } = render(
			<Home />
		);

		expect(getByText('Unlimited films, TV programmes and more.')).toBeTruthy();
		expect(getByText('Watch anywhere. Cancel at any time.')).toBeTruthy();
		expect(getAllByPlaceholderText('Email Address')).toBeTruthy();
		expect(getAllByText('Try it now')).toBeTruthy();
		expect(
			getAllByText(
				'Ready to watch? Enter you email to create or restart your membership.'
			)
		).toBeTruthy();
	});
});
