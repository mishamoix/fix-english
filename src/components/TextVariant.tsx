const variants = {
	best: {
		borderColor: 'border-teal-500',
		emoji: '🌟',
		description: 'The best version of the text',
	},
	formal: {
		borderColor: 'border-blue-600',
		emoji: '💼',
		description:
			'Most formal version of the text, suitable for addressing the President',
	},
	informal: {
		borderColor: 'border-orange-600',
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
			className={`flex flex-row items-center gap-2 py-3 px-4 rounded-xl shadow-sm border-2 ${variants[type].borderColor}`}
		>
			<div
				className='tooltip tooltip-right tooltip-primary'
				data-tip={variants[type].description}
			>
				<p className='text-2xl'>{variants[type].emoji}</p>
			</div>
			<p>{text}</p>
		</div>
	);
};

export default TextVariant;
