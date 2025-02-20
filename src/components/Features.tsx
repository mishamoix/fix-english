import React, { useMemo } from 'react';
import {
	AcademicCapIcon,
	PencilSquareIcon,
	RocketLaunchIcon,
} from '@heroicons/react/24/outline';

export default function Features() {
	const features = useMemo(
		() => [
			{
				title: 'Expert Guidance',
				description:
					'Receive expert feedback and insights to level up your writing.',
				icon: AcademicCapIcon,
			},
			{
				title: 'Instant Proofreading',
				description:
					'Get instant proofreading opinion to improve your English.',
				icon: PencilSquareIcon,
			},
			{
				title: 'Boost Productivity',
				description:
					'Enhance efficiency with smart tools designed for learners.',
				icon: RocketLaunchIcon,
			},
		],
		[]
	);

	return (
		<section className='max-w-4xl mx-auto padding'>
			<h2 className='mb-8 text-4xl font-bold text-center'>Features</h2>
			<div className='grid grid-cols-1 gap-6 md:grid-cols-3 sm:grid-cols-2'>
				{features.map((feature, index) => {
					const Icon = feature.icon;
					return (
						<div
							key={index}
							className='transition-all duration-300 ease-in-out border shadow-md card bg-base-100 border-slate-100 hover:shadow-lg '
						>
							<div className='text-left card-body'>
								<Icon className='mb-4 size-10 text-primary' />
								<h2 className='card-title'>{feature.title}</h2>
								<p>{feature.description}</p>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
