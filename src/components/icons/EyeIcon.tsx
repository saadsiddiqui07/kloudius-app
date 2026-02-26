import React from 'react';
import Svg, { Path } from 'react-native-svg';

type EyeIconProps = {
  size?: number;
  color?: string;
};

export function EyeIcon({ size = 22, color = '#71717A' }: EyeIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 5C7.454 5 3.572 7.909 2 12c1.572 4.091 5.454 7 10 7s8.428-2.909 10-7c-1.572-4.091-5.454-7-10-7zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
        fill={color}
        fillRule="evenodd"
      />
    </Svg>
  );
}
