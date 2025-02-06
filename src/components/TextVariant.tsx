const variants = {
	best: {
		borderColor: 'from-teal-500 to-teal-400',
		shadowColor: 'shadow-teal-500/50',
		emoji: '🌟',
		description: 'The best version of the text',
	},
	formal: {
		borderColor: 'from-blue-600 to-blue-400',
		shadowColor: 'shadow-blue-500/50',
		emoji: '💼',
		description:
			'Most formal version of the text, suitable for addressing the President',
	},
	informal: {
		borderColor: 'from-orange-600 to-orange-400',
		shadowColor: 'shadow-orange-500/50',
		emoji: '😸',
		description:
			'Most informal version of the text, suitable for writing to a close friend',
	},
};

const TextVariant = ({
	type,
	text,
}: {
	type: 'best' | 'formal' | 'informal';
	text: string;
}) => {
	return (
		<div
			className={`rounded-xl p-[2px] bg-gradient-to-l shadow-sm ${variants[type].borderColor} shadow-[0_0_8px_0px] ${variants[type].shadowColor}`}
		>
			<div className='bg-slate-100 h-full rounded-[10px] '>
				<div className={`flex flex-row items-center gap-2 py-3 px-4 mb-auto`}>
					<div
						className='tooltip tooltip-right tooltip-primary self-start'
						data-tip={variants[type].description}
					>
						<p className='text-2xl'>{variants[type].emoji}</p>
					</div>
					<p>{text}</p>
				</div>
			</div>
		</div>
	);
};

export default TextVariant;
