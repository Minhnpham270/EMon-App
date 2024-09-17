import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const IconCalendar = ({ color = '#9CA3AF' }: { color?: string }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.75 2.25C6.75 1.83579 6.41421 1.5 6 1.5C5.58579 1.5 5.25 1.83579 5.25 2.25V3H4.5C2.84315 3 1.5 4.34315 1.5 6V7.5V19.5C1.5 21.1569 2.84315 22.5 4.5 22.5H19.5C21.1569 22.5 22.5 21.1569 22.5 19.5V7.5V6C22.5 4.34315 21.1569 3 19.5 3H18.75V2.25C18.75 1.83579 18.4142 1.5 18 1.5C17.5858 1.5 17.25 1.83579 17.25 2.25V3H6.75V2.25ZM21 6.75V6C21 5.17157 20.3284 4.5 19.5 4.5H18H6H4.5C3.67157 4.5 3 5.17157 3 6V6.75H21ZM3 8.25H21V19.5C21 20.3284 20.3284 21 19.5 21H4.5C3.67157 21 3 20.3284 3 19.5V8.25Z"
      fill={color}
    />
  </Svg>
);
