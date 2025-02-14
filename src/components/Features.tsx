'use client';

import React from 'react';
import {
	AcademicCapIcon,
	PencilSquareIcon,
	RocketLaunchIcon,
} from '@heroicons/react/24/outline';

const features = [
	{
		title: 'Expert Guidance',
		description:
			'Receive expert feedback and insights to level up your writing.',
		icon: AcademicCapIcon,
	},
	{
		title: 'Real-time Analysis',
		description: 'Get instant suggestions while you write for better clarity.',
		icon: PencilSquareIcon,
	},
	{
		title: 'Boost Productivity',
		description: 'Enhance efficiency with smart tools designed for writers.',
		icon: RocketLaunchIcon,
	},
];

export default function Features() {
	return (
		<section className='max-w-4xl mx-auto padding'>
			<h2 className='mb-8 text-4xl font-bold text-center'>Features</h2>
			<div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
				{features.map((feature, index) => {
					const Icon = feature.icon;
					return (
						<div
							key={index}
							className='transition-all duration-300 ease-in-out border shadow-md card bg-base-100 border-slate-100 hover:shadow-lg '
						>
							<div className='text-left card-body'>
								<Icon className='w-10 h-10 mb-4 text-primary' />
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
