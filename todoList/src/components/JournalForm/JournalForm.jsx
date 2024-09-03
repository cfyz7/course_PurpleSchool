/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useReducer, useRef} from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state.js';
import Input from '../Input/Input.jsx';
import { UserContext } from '../../context/user.context.jsx';

export default function JournalForm( {onSubmit, data, onDelete} ) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const {isValid, values, isFormReadyToSubmit} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();
	const {userId} = useContext(UserContext);

	const focusError = () => {
		switch(true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.post:
			postRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		if(!data) {
			dispatchForm({type: 'CLEAR'});
			dispatchForm({ type: 'SET_VALUE', payload:{userId: userId}});
		}
		dispatchForm({type: 'SET_VALUE', payload: {...data}});
	}, [data]);


	useEffect(() => {
		let timerId;
		if(!isValid.date || !isValid.post || !isValid.title) {
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({type: 'RESET_VALIDITY'});
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);


	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({type: 'CLEAR'});
			dispatchForm({ type: 'SET_VALUE', payload:{userId: userId}});
		}
	},[isFormReadyToSubmit, userId]);

	const onChange = (e) => {
		dispatchForm({type: 'SET_VALUE', payload: {[e.target.name]: e.target.value}});
	};

	useEffect(() => {
		dispatchForm({ type: 'SET_VALUE', payload:{userId: userId}});
	},[userId]);


	const addJournalItem = (e) => {
		e.preventDefault();
		dispatchForm({type: 'SUBMIT'});
	};

	const deleteJournalItem = () => {
		onDelete(data.id);
		dispatchForm({type: 'CLEAR'});
		dispatchForm({ type: 'SET_VALUE', payload:{userId: userId}});

	};

	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['form-row']}>
				<Input  type="text" name="title" onChange={onChange} isValid={isValid.title} value={values.title} ref={titleRef}
					appearence='title'/>
				{data?.id && <button className={styles['btn']} type="button" onClick={deleteJournalItem}>
					<img className={styles['box']} src='/images.svg' alt='Delete'/>
				</button>}
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" 
					className={styles['form-label']}>
					<img className={styles['img']} src="/public/calendar.svg" alt="icon of calendar" />
					<span>Дата</span>
				</label>
				<Input type="date" onChange={onChange} isValid={isValid.date} ref={dateRef} name="date" id="date" value={values.date ? new Date(values.date).toISOString().slice(0,10) : ''}
					appearence='date'
				/>
			</div>

			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img className={styles['img']} src="/public/pencil.svg" alt="icon of folder" />
					<span>Метки</span>
				</label>
				<Input type="text" id="tag" name="tag" onChange={onChange} value={values.tag} appearence='tag'/>
			</div>
			
			
			<textarea name='post' id='' onChange={onChange} ref={postRef} cols="30" rows="10" value={values.post}
				className={cn(styles['input'], {
					[styles['invalid']] : !isValid.post
				})} ></textarea>
			<Button>Save</Button>
		</form>
	);
}
