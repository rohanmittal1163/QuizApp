import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UpdateAnswerKey, stateType } from '../Store/QuestSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useTimer } from 'react-timer-hook';
import { TIME } from './Home';
function MyTimer({ expiryTimestamp }: any) {
	const navigate = useNavigate();
	const { seconds, minutes } = useTimer({
		expiryTimestamp,
		onExpire: () => navigate('/result'),
	});

	return (
		<div style={{ fontSize: '100px' }}>
			<span>{minutes}</span>:<span>{seconds}</span>
		</div>
	);
}

function Question() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const time = new Date();

	const [idx, setIdx] = useState<number>(0);

	const {
		quest: data,
		answer,
		size,
	} = useSelector((state: stateType) => state.Quest);
	time.setSeconds(time.getSeconds() + TIME * 60);

	const handleOptionChange = (optionIdx: number) => {
		const newSelectedOptions: number[] = [...answer];
		newSelectedOptions[idx] = optionIdx;
		dispatch(UpdateAnswerKey({ answer: newSelectedOptions }));
	};

	useEffect(() => {
		setIdx(0);
	}, []);

	return (
		<div className=" flex  flex-col items-center p-2 w-full h-auto md:h-screen mx-auto transition  gap-10">
			<MyTimer expiryTimestamp={time} />
			<div className="flex flex-col md:flex-row items-center gap-5">
				<div className="bg-white shadow-lg p-5 w-full sm:w-10/12 md:w-5/12  h-auto  rounded-md flex flex-col gap-3">
					<div className="border-solid border-b-[1px] border-slate-600 flex items-center justify-between py-2">
						<div>
							<p className="font-bold capitalize text-lg">Quiz app</p>
						</div>
						<div className="flex items-center justify-center gap-2">
							<input
								type="checkbox"
								id="review"
								name="review"
								onChange={() => handleOptionChange(-2)}
								checked={answer[idx] === -2}
							></input>
							<label htmlFor="review" className="text-sm">
								Review for later
							</label>
						</div>
					</div>
					<p className="flex items-start gap-2">
						<span>{idx + 1}.</span>
						<span>{data![idx]?.question}</span>
					</p>
					<div className="flex flex-col gap-4 justify-center">
						{data![idx]?.options.map((option, id) => {
							return (
								<>
									<div
										key={id}
										className="border-solid border-2 border-slate-400  rounded-md p-2 flex items-center justify-between"
									>
										<label
											htmlFor={option.id}
											className="text-sm w-full cursor-pointer"
										>
											{option.option}
										</label>
										<input
											id={option.id}
											name={`radio_${idx}`}
											type="radio"
											onChange={() => {
												handleOptionChange(id);
											}}
											checked={answer[idx] === id}
										></input>
									</div>
								</>
							);
						})}
					</div>
					<div className="flex items-center gap-3">
						<button
							disabled={idx === 0}
							className={`w-full capitalize font-bold text-white rounded-sm  py-2  ${
								idx == 0
									? 'bg-slate-400 hover:bg-slate-500 pointer-events-none	'
									: ' bg-teal-500 hover:bg-teal-600 cursor-pointer'
							}`}
							onClick={() => setIdx((idx) => idx - 1)}
						>
							Previous
						</button>
						<button
							className={`w-full capitalize font-bold text-white rounded-sm  py-2  ${
								idx === (size as number) - 1
									? 'bg-slate-400 hover:bg-slate-500 pointer-events-none	'
									: ' bg-teal-500 hover:bg-teal-600 cursor-pointer'
							}`}
							onClick={() => setIdx((idx) => idx + 1)}
						>
							next
						</button>
					</div>
					<p className="text-sm text-center">
						{idx + 1} of {size} questions
					</p>
				</div>
				<div className="bg-white shadow-lg p-5 w-full sm:w-10/12 md:w-5/12 h-auto rounded-md flex flex-col gap-3">
					<div className="border-solid border-b-[1px] border-slate-600 flex items-center justify-between py-2">
						<p className="font-bold capitalize text-lg">Summary</p>
					</div>
					<div className="flex flex-col gap-2">
						{data?.map((val, id) => {
							return (
								<>
									<p
										className={`flex items-start gap-2 ${
											idx == id ? 'font-semibold' : 'font-normal cursor-pointer'
										}`}
										onClick={() => setIdx(id)}
									>
										<span>{id + 1} </span>
										<span>
											{val.question} -
											{answer[id] == -1 ? (
												<span className="text-red-400">{`[not answered]`}</span>
											) : answer[id] == -2 ? (
												<span className="text-indigo-400">{`[Review]`}</span>
											) : (
												<span className="text-green-400">{`[answered]`}</span>
											)}
										</span>
									</p>
								</>
							);
						})}
					</div>
					<div className="flex items-center gap-5">
						<button
							onClick={() => navigate('/result')}
							className="w-full capitalize font-bold text-white rounded-sm px-14 py-2 bg-teal-500 hover:bg-teal-600"
						>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Question;
