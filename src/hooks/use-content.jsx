import { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../context/firebase';

export default function useContent(target) {
	const [content, setContent] = useState([]);
	const { fb } = useContext(FirebaseContext);

	useEffect(() => {
		fb.firestore()
			.collection(target)
			.get()
			.then((snapshot) => {
				const allContent = snapshot.docs.map((contentObj) => ({
					...contentObj.data(),
					docId: contentObj.id,
				}));

				setContent(allContent);
			})
			.catch((error) => {
				console.log(error.message);
			});
	}, [fb, target]);

	return { [target]: content };
}
