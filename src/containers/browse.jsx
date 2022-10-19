import React, { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../context/firebase';
import * as ROUTES from '../constants/routes';
import logo from '../logo.png';
import Fuse from 'fuse.js';

import { SelectProfileContainer } from './profiles';
import { FooterContainer } from './footer';

import { Loading, Header, Card, Player } from '../components';

export function BrowseContainer({ slides }) {
	const [category, setCategory] = useState('series');
	const [searchTerm, setSearchTerm] = useState('');
	const [profile, setProfile] = useState({});
	const [loading, setLoading] = useState(true);
	const [slideRows, setSlideRows] = useState([]);

	const { fb } = useContext(FirebaseContext);
	const user = fb.auth().currentUser || {};

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 3000);
	}, [profile.displayName]);

	useEffect(() => {
		setSlideRows(slides[category]);
	}, [slides, category]);

	useEffect(() => {
		const fuse = new Fuse(slideRows, {
			keys: ['data.description', 'data.title', 'data.genre'],
		});

		const results = fuse.search(searchTerm).map(({ item }) => item);

		if (slideRows.length > 0 && searchTerm.length > 3 && results.length > 0) {
			setSlideRows(results);
		} else {
			setSlideRows(slides[category]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm]);

	return profile.displayName ? (
		<>
			{loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}

			<Header src='evangelion-2' dontShowOnSmallViewPort>
				<Header.Frame>
					<Header.Group>
						<Header.Logo to={ROUTES.HOME} src={logo} alt='Aniflix' />
						<Header.TextLink
							active={category === 'series' ? 'true' : 'false'}
							onClick={() => setCategory('series')}
						>
							Series
						</Header.TextLink>
						<Header.TextLink
							active={category === 'films' ? 'true' : 'false'}
							onClick={() => setCategory('films')}
						>
							Films
						</Header.TextLink>
					</Header.Group>
					<Header.Group>
						<Header.Search
							searchTerm={searchTerm}
							setSearchTerm={setSearchTerm}
						/>
						<Header.Profile>
							<Header.Picture src={user.photoURL} />
							<Header.Dropdown>
								<Header.Group>
									<Header.Picture src={user.photoURL} />
									<Header.TextLink>{user.displayName}</Header.TextLink>
								</Header.Group>
								<Header.Group>
									<Header.TextLink onClick={() => fb.auth().signOut()}>
										Sign out
									</Header.TextLink>
								</Header.Group>
							</Header.Dropdown>
						</Header.Profile>
					</Header.Group>
				</Header.Frame>
				<Header.Feature>
					<Header.FeatureCallOut>
						Watch Neon Genesis Evangelion Now
					</Header.FeatureCallOut>
					<Header.Text>
						Fifteen years after a cataclysmic event known as the Second Impact,
						the world faces a new threat: monstrous celestial beings called
						"Angels" invade Tokyo-3 one by one. Mankind is unable to defend
						themselves against the Angels despite utilizing their most advanced
						munitions and military tactics.
					</Header.Text>
					<Header.PlayButton>Play</Header.PlayButton>
				</Header.Feature>
			</Header>

			<Card.Group>
				{slideRows.map((slideItem) => (
					<Card key={`${category}-${slideItem.title.toLowerCase()}}`}>
						<Card.Title>{slideItem.title}</Card.Title>
						<Card.Entities>
							{slideItem.data.map((item) => (
								<Card.Item key={item.docId} item={item}>
									<Card.Image
										src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`}
									/>
									<Card.Meta>
										<Card.SubTitle>{item.title}</Card.SubTitle>
										<Card.Text>{item.description}</Card.Text>
									</Card.Meta>
								</Card.Item>
							))}
						</Card.Entities>
						<Card.Feature category={category}>
							<Player>
								<Player.Button />
								<Player.Video src='/videos/bunny.mp4' />
							</Player>
						</Card.Feature>
					</Card>
				))}
			</Card.Group>
			<FooterContainer />
		</>
	) : (
		<SelectProfileContainer user={user} setProfile={setProfile} />
	);
}
