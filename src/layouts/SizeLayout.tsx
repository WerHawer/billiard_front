import React from 'react';
import { useMediaQuery } from 'react-responsive';

interface ISizeLayoutProps {
	children: React.ReactElement;
}

export const SizeLayout = ({ children }: ISizeLayoutProps) => {
	const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

	if (isMobile) {
		return children;
	}

	return (
		<div>
			<p style={{ color: 'white', fontSize: '32px' }}>
				Please open APP on mobile
			</p>
		</div>
	);
};
