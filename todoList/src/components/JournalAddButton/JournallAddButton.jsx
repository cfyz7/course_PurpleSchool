import CardButton from '../CardButton/CardButton';
import './JournalAddButton.css';

function JournalAddButton({clearForm}) {
	return (
		
		<CardButton className='journal-add' onClick={clearForm}>
			<svg className='crest'>
				<line x1="0" x2="8" y1="4" y2="4" stroke="white" strokeWidth="2"/>
				<line x1="4" x2="4" y1="0" y2="8" stroke="white" strokeWidth="2"/>
			</svg>
            Новое воспоминание
		</CardButton>
	);
}
  
export default JournalAddButton;