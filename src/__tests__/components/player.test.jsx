/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Player } from '../../components';

describe('<Player />', () => {
	it('renders the <Player/> with a video', () => {
		const { container, queryByTestId, getByText } = render(
			<Player>
				<Player.Button />
				<Player.Video src='/videos/bunny.mp4' />
			</Player>
		);

		// No Player and clicks to Open
		expect(queryByTestId('player')).toBeFalsy();
		fireEvent.click(getByText('Play'));

		// Player is visible and clicks to Close
		expect(queryByTestId('player')).toBeTruthy();
		fireEvent.click(queryByTestId('player'));

		// Player is closed
		expect(queryByTestId('player')).toBeFalsy();
		expect(container.firstChild).toMatchSnapshot();
	});
});
