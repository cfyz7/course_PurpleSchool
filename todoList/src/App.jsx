import './App.css';
import JournalAddButton from './components/JournalAddButton/JournallAddButton.jsx';
import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx';
import JournalList from './components/JournalList/JournalList.jsx';
import Body from './layouts/Body/Body.jsx';
import Header from './components/Header/Header.jsx';
import JournalForm from './components/JournalForm/JournalForm.jsx';
import { useLocaleStorage } from './hooks/use-localstorage.hook.js';
import { UserContextProvider } from './context/user.context.jsx';
import { useState } from 'react';

function mapItems(items) {
	if(!items) {
		return [];
	} return items.map(i => ({
		...i,
		date: new Date(i.date)
	}));
}

function App() {
	const [items, setItems] = useLocaleStorage('data');
	const [selectedItem, setSelectedItem] = useState(null);

	const addItem = (item) => {
		if(!item.id) {
			setItems([...mapItems(items), {
				...item,
				date: new Date(item.date),
				id: items.length > 0 ? Math.max(...items.map(e => e.id)) + 1 : 1
			}]);
		} 
		else {
			setItems([...mapItems(items).map(i => {
				if(i.id === item.id) {
					return {
						...item
					};
				} 
				return i;
			})]);
		}
	};

	const deleteItem = (id) => {
		setItems([...items.filter(i => i.id !== id)]);
	};

	return (
		<UserContextProvider>
			<div className='app'>
				<LeftPanel>
					<Header/>
					<JournalAddButton clearForm={() => setSelectedItem(null)}/>
					<JournalList items={mapItems(items)} setItem={setSelectedItem}/>
				</LeftPanel>
				<Body>
					<JournalForm onSubmit={addItem} onDelete={deleteItem} data={selectedItem}/>
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
