import { useSelector } from 'react-redux';
import { stateType } from '../Store/QuestSlice';
import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

function Result() {
	const { quest, answer, size } = useSelector(
		(state: stateType) => state.Quest
	);
	useEffect(() => {
		for (let index = 0; index < size; index++) {
			const element = quest[index].answer;
			if (element == answer[index]) {
				setCorrAns((state) => (state += 1));
			}
		}
	}, []);
	const navigate: NavigateFunction = useNavigate();
	const [corrAns, setCorrAns] = useState<number>(0);

	return (
		<div className=" flex md:h-screen flex-col md:flex-row items-center p-2 w-full md:w-10/12 mx-auto transition justify-center gap-10">
			<div className="bg-white shadow-lg p-5 w-full sm:w-10/12 md:w-5/12  h-auto  rounded-md flex flex-col gap-3">
				<div className="border-solid border-b-[1px] border-slate-600 flex items-center justify-between py-2">
					<div>
						<p className="font-bold capitalize text-lg">Summary</p>
					</div>
				</div>

				<div className="flex flex-col gap-2 justify-center">
					{quest!.map((option, id) => {
						return (
							<div>
								<p className="flex flex-row gap-2 font-bold">
									<span className="font-bold">Q. </span>
									<span>{option.question}</span>
								</p>
								<p className="font-semibold flex flex-row gap-2 text-emerald-600">
									<span>A. </span>
									<span>{option.options[option.answer].option}</span>
								</p>

								{answer[id] === option.answer ? (
									<>
										<p className="font-semibold flex flex-row gap-2 text-green-400">
											<span>You:</span>
											<span>
												{option.options[answer[id]].option} - {'Marks : 1'}
											</span>
										</p>
									</>
								) : answer[id] <= -1 ? (
									<p className="font-semibold flex flex-row gap-2 text-red-400">
										<span>You:</span>
										<span>not done - {'Marks : 0'}</span>
									</p>
								) : (
									<p className="font-semibold flex flex-row gap-2 text-red-400">
										<span>You:</span>
										<span>
											{option.options[answer[id]].option} - {'Marks : 0'}
										</span>
									</p>
								)}
							</div>
						);
					})}
				</div>
			</div>
			<div className="bg-white shadow-lg p-5 w-full sm:w-10/12 md:w-5/12 h-auto rounded-md flex flex-col gap-3">
				<div className="border-solid border-b-[1px] border-slate-600 flex items-center justify-between py-2">
					<p className="font-bold capitalize text-lg">Result</p>
				</div>

				<div className="flex text-2xl  flex-col  items-center gap-3 justify-center">
					<p>Score</p>
					<p>{corrAns / 2}</p>
					{corrAns < (size as number) / 2 ? (
						<p>Better luck next time 😔😔😔</p>
					) : corrAns === (size as number) / 2 ? (
						<p>keep going 👏👏👏</p>
					) : corrAns > (size as number) / 2 ? (
						<p>Very good 🥳🥳🥳</p>
					) : (
						<p>You have done it!!! 🥳👏🎂☺️✨</p>
					)}
					<button
						className="w-full capitalize font-bold text-md text-white rounded-sm  py-2 bg-teal-500 "
						onClick={() => navigate('/')}
					>
						Reset
					</button>
				</div>
			</div>
		</div>
	);
}

export default Result;
