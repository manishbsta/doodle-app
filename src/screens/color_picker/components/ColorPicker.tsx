import React from 'react';
import { StyleSheet } from 'react-native';
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
	TapGestureHandler,
	TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import Animated, {
	interpolateColor,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated';
import {
	CIRCULAR_PICKER_CONTENT_SIZE,
	CIRCULAR_PICKER_SIZE,
} from '../constants/constants';

type TranslateXContext = { x: number };
interface Props extends LinearGradientProps {
	maxWidth: number;
	onColorChanged: (color: string | number) => void;
}

const ColorPicker: React.FC<Props> = ({
	colors,
	start,
	end,
	style,
	maxWidth,
	onColorChanged,
}) => {
	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);
	const scale = useSharedValue(1);

	const derivedTranslateX = useDerivedValue(() => {
		return Math.min(
			Math.max(translateX.value, 0),
			maxWidth - CIRCULAR_PICKER_SIZE
		);
	});

	const panGesture = useAnimatedGestureHandler<
		PanGestureHandlerGestureEvent,
		TranslateXContext
	>({
		onStart: (_, ctx) => {
			ctx.x = derivedTranslateX.value;
		},

		onActive: (event, ctx) => {
			translateX.value = withSpring(event.translationX + ctx.x);
		},

		onEnd: (_) => {
			translateY.value = withSpring(0);
			scale.value = withSpring(1);
		},
	});

	const tapGesture = useAnimatedGestureHandler<
		TapGestureHandlerGestureEvent,
		TranslateXContext
	>({
		onStart: (event) => {
			translateY.value = withSpring(-CIRCULAR_PICKER_SIZE - 5);
			scale.value = withSpring(1.1);
			translateX.value = withTiming(event.absoluteX - CIRCULAR_PICKER_SIZE);
		},
		onEnd: (_) => {
			translateY.value = withSpring(0);
			scale.value = withSpring(1);
		},
	});

	const rPickerStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: derivedTranslateX.value },
				{ translateY: translateY.value },
				{ scale: scale.value },
			],
		};
	});

	const rPickerInternalStyle = useAnimatedStyle(() => {
		const inputRange = colors.map(
			(_, index) => (index / colors.length) * maxWidth
		);

		const backgroundColor = interpolateColor(
			derivedTranslateX.value,
			inputRange,
			colors
		);

		onColorChanged?.(backgroundColor);

		return { backgroundColor };
	});

	return (
		<TapGestureHandler onGestureEvent={tapGesture}>
			<Animated.View>
				<PanGestureHandler onGestureEvent={panGesture}>
					<Animated.View style={styles.container}>
						<LinearGradient
							colors={colors}
							start={start}
							end={end}
							style={style}
						/>
						<Animated.View style={[styles.picker, rPickerStyle]}>
							<Animated.View
								style={[styles.pickerContent, rPickerInternalStyle]}
							/>
						</Animated.View>
					</Animated.View>
				</PanGestureHandler>
			</Animated.View>
		</TapGestureHandler>
	);
};

export default ColorPicker;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
	},

	picker: {
		position: 'absolute',
		backgroundColor: '#fff',
		height: CIRCULAR_PICKER_SIZE,
		width: CIRCULAR_PICKER_SIZE,
		borderRadius: CIRCULAR_PICKER_SIZE / 2,
		justifyContent: 'center',
		alignItems: 'center',
	},

	pickerContent: {
		height: CIRCULAR_PICKER_CONTENT_SIZE,
		width: CIRCULAR_PICKER_CONTENT_SIZE,
		borderRadius: CIRCULAR_PICKER_CONTENT_SIZE / 2,
		borderWidth: 1.0,
		borderColor: 'rgba(0,0,0,0.2)',
	},
});
