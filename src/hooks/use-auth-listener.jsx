import { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../context/firebase';

export default function useAuthListener() {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('authUser'))
	);

	const { fb } = useContext(FirebaseContext);

	useEffect(() => {
		const listener = fb.auth().onAuthStateChanged((authUser) => {
			if (authUser) {
				localStorage.setItem('authUser', JSON.stringify(authUser));
				setUser(authUser);
			} else {
				localStorage.removeItem('authUser');
				setUser(null);
			}
		});

		return () => listener();
	}, [fb]);

	return { user };
}
