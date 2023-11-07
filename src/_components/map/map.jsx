import React, {useState, useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import cn from 'classnames';
import './map.scss';

const centerDefault = {
	lat: 42.2805177,
	lng: -97.5556044
};

const MapBlock = ({
	center = centerDefault, marker = undefined, markers, zoom = 15, className = '', onClick = () => {}, overlay, icon
}) => {
		const [centerPoint, setCenterPoint] = useState(centerDefault);
		const [mapActive, setMapActive] = useState(false);

		useEffect(() => {
			const t = setTimeout(() => {
				setMapActive(true)
			}, 100);
	
			return () => {
				window.clearTimeout(t);
			};
		}, []);

		useEffect(() => {
			if (center.lat && center.lng) {
				setCenterPoint(center)
			}
		}, [center]);

		const MARKER_POSITION = {
			lat: centerPoint.lat || 0,
			lng: centerPoint.lng || 0
		};

		const AnyReactComponent = ({ content, action = () => {}, text = '', icon }) => {
			console.log('icon', icon)
			if (icon) {
				return icon;
			} else {
				return (
					<a
						href="#"
						onClick={(event) => {
							event.stopPropagation();
							action();
						}}
						title={text}
					>
						<div className='marker-photo'><img src={content} /></div>
					</a>
				);
			}
		}
		const AnyOverlay = ({ content }) => <div>{content}</div>

		return (
			<div className={cn({'containerStyle': true, [className]: className})} >
				{
					mapActive && (
						<GoogleMapReact
							bootstrapURLKeys={{ key: (process.env.REACT_APP_GOOGLE) }}
							center={MARKER_POSITION}
							onClick={onClick}
							zoom={zoom}
						>
							{
								marker ? (
									<AnyReactComponent
										lat={centerPoint.lat}
										lng={centerPoint.lng}
										content={marker}
										icon={icon}
									/>
								) : null
							}
							{
								markers ? (markers.map((marker, index) => (
									<AnyReactComponent
										key={index}
										lat={marker.lat}
										lng={marker.lng}
										content={marker.content}
										action={marker.action}
										text={marker.text}
										icon={icon}
									/>
								))) : null
							}
							{
								zoom ? (
									<AnyOverlay
										lat={overlay?.lat || 0}
										lng={overlay?.lng || 0}
										content={overlay?.content}
									/>
								) : null
							}
						</GoogleMapReact>
					)
				}
			</div>
		)
}

export default MapBlock;
