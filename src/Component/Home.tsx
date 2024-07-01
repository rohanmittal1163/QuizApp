import axios, { AxiosResponse } from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initialize, stateType } from '../Store/QuestSlice';

export const TIME = 30; //in minutes

function Home() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const start = () => {
		navigate('/question');
	};

	async function getQuestion(): Promise<void> {
		const res: AxiosResponse = await axios.get(
			'http://localhost:4000/questions'
		);
		dispatch(
			initialize({
				time: TIME,
				size: res.data.length,
				quest: res.data,
				answer: Array(res.data.length).fill(-1),
			})
		);
	}

	const { size } = useSelector((state: stateType) => state.Quest);

	useEffect(() => {
		getQuestion();
	}, []);

	return (
		<div className="h-screen flex items-center justify-center">
			<div className="flex flex-col gap-5 w-[calc(100vw-100px)]  shadow-md rounded-lg">
				<div className="w-full ">
					<p className="text-whtie font-bold bg-blue-500 text-center py-2 text-white rounded-tr-md rounded-tl-md">
						Instructions
					</p>
					<ul className="p-10 list-disc capitalize">
						<li>welcome to online exam for General aptitude exam</li>
						<li>
							exam has total <span className="font-bold">{size} </span>
							question
						</li>
						<li>
							total time for exam is <span className="font-bold">{TIME} </span>
							minutes
						</li>
						<li>
							negative marking in exam : <span className="font-bold">no</span>
						</li>
					</ul>
					<p className="font-semibold text-2xl italic text-slate-600 px-4">
						Best of luck for your exam
					</p>
				</div>
				<div className="border-solid border-t-2 border-slate-500 py-2 flex items-center justify-center">
					<button
						className="capitalize font-bold text-white rounded-sm px-14 py-2 bg-teal-500 hover:bg-teal-600"
						onClick={start}
					>
						Start
					</button>
				</div>
			</div>
		</div>
	);
}

export default Home;
