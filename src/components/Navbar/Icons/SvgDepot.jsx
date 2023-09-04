const SvgDepot = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      fill='none'
      {...props}
    >
      <g clipPath='url(#a)'>
        <path
          stroke='#A7A9B7'
          strokeWidth={1.5}
          d='M8.739 19.68A4.686 4.686 0 0 0 12 21c1.173 0 2.343-.44 3.247-1.318l.003-.003c2.82-2.71 5.716-6.81 4.639-11.563C18.933 3.918 15.278 2 11.999 2H11.99C8.717 2 5.054 3.91 4.1 8.106L8.74 19.679Zm0 0C5.921 16.97 3.023 12.858 4.1 8.105L8.74 19.68Zm-.64-9.87a3.9 3.9 0 1 0 7.8 0 3.9 3.9 0 0 0-7.8 0Z'
        />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0-.5h24v24H0z' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SvgDepot;
