export const TriIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="17.176" height="38.706" viewBox="0 0 17.176 38.706">
      <defs>
        <filter id="Polygone_1" x="0" y="0.415" width="17.176" height="38.291" filterUnits="userSpaceOnUse">
          <feOffset dx="-3" dy="0" input="SourceAlpha" />
          <feGaussianBlur stdDeviation="0" result="blur" />
          <feFlood floodColor="#ff2626" floodOpacity={"0.622"} />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g id="triangle" transform="translate(-366.327 -315.958)">
        <g transform="matrix(1, 0, 0, 1, 366.33, 315.96)" filter="url(#Polygone_1)">
          <path
            id="Polygone_1-2"
            data-name="Polygone 1"
            d="M10,0,20,16.83H0Z"
            transform="matrix(-0.02, -1, 1, -0.02, 9.35, 26.71)"
            fill="#fff"
          />
        </g>
        <path
          id="Tracé_8"
          data-name="Tracé 8"
          d="M1930,393.473V373.618l4.328-8.176v34.649Z"
          transform="translate(-1542 -49.484)"
          fill="#fff"
        />
      </g>
    </svg>
  );
};
