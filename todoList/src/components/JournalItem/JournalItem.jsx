import './JournalItem.css';

function JournalItem({ title, post, date }) {
	const time = date.toLocaleString().split(',')[0];

	return (
		<>
			<h2 className='journal-item__header'>{title}</h2>
			<h2 className='journal-item__body'>
				<div className='journal-item__date'>{time}</div>
				<div className='journal-item__text'>{post}</div>
			</h2>
		</>
	);
}
export default JournalItem;
