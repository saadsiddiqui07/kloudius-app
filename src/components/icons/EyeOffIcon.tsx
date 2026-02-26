import React from 'react';
import Svg, { Path } from 'react-native-svg';

type EyeOffIconProps = {
  size?: number;
  color?: string;
};

export function EyeOffIcon({ size = 22, color = '#71717A' }: EyeOffIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4.52 5.934A11.96 11.96 0 0 1 12 4c4.546 0 8.428 2.909 10 7a11.95 11.95 0 0 1-2.16 3.42l1.42 1.42A13.95 13.95 0 0 0 24 12c-2.206-5.727-6.635-9-12-9a13.96 13.96 0 0 0-4.92.88l1.44 1.44zm15.08 12.132l-1.42-1.42A11.96 11.96 0 0 1 12 20c-4.546 0-8.428-2.909-10-7a11.95 11.95 0 0 1 2.16-3.42L2.8 7.934A13.95 13.95 0 0 0 0 12c2.206 5.727 6.635 9 12 9a13.96 13.96 0 0 0 4.92-.88l-1.32-1.32zM12 8a4 4 0 0 0-4 4c0 .702.18 1.362.496 1.944l2.448-2.448A3.97 3.97 0 0 1 12 8zm4 4c0-.702-.18-1.362-.496-1.944l-2.448 2.448A3.97 3.97 0 0 1 12 16a4 4 0 0 0 4-4zM2.294 3.294a1 1 0 0 1 1.412 0l15 15a1 1 0 1 1-1.412 1.412l-15-15a1 1 0 0 1 0-1.412z"
        fill={color}
        fillRule="evenodd"
      />
    </Svg>
  );
}
