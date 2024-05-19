import { useEffect, useState, useRef } from 'react';
import { Text, TextStyle, TextProps, Animated, Easing } from "react-native";

export function AnimatedText({ text, style, ...rest }) {
    const [innerText, setText] = useState("Hello there!");
    const animation = useRef(new Animated.Value(1));
    useEffect(() => {

        Animated.timing(animation.current, {
            toValue: 0,
            useNativeDriver: true,
            duration: 300,
            easing: Easing.linear
        }).start();

        setTimeout(() => {
            setText(text);

            Animated.timing(animation.current, {
                toValue: 1,
                useNativeDriver: true,
                duration: 300,
                easing: Easing.linear
            }).start();

        }, 301);

    }, [text]);

    return <Animated.Text {...rest} style={[style, { opacity: animation.current }]}>{innerText}</Animated.Text>;
}
