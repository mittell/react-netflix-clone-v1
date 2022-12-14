/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render } from '@testing-library/react';
import { OptForm } from '../../components';

describe('<OptForm/>', () => {
	it('renders the <OptForm/> with populated data', () => {
		const { container, getByText, getByPlaceholderText } = render(
			<OptForm>
				<OptForm.Input placeholder='Email Address' />
				<OptForm.Button>Try it now</OptForm.Button>
				<OptForm.Break />
				<OptForm.Text>
					Ready to watch? Enter your email to create or restart your membership.
				</OptForm.Text>
			</OptForm>
		);

		expect(getByText('Try it now')).toBeTruthy();
		expect(
			getByText(
				'Ready to watch? Enter your email to create or restart your membership.'
			)
		).toBeTruthy();
		expect(getByPlaceholderText('Email Address')).toBeTruthy();
		expect(container.firstChild).toMatchSnapshot();
	});
});
