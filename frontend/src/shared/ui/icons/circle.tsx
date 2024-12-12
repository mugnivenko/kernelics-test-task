export function Circle({
	stroke,
}: Pick<React.SVGProps<SVGCircleElement>, "stroke">) {
	return (
		<svg
			width={16}
			height={16}
			viewBox="0 0 4 4"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>circle</title>
			<circle
				cx="2"
				cy="2"
				r="1"
				fill="white"
				stroke={stroke}
				strokeWidth="0.5"
			/>
		</svg>
	);
}
