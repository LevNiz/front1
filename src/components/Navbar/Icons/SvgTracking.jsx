const SvgTracking = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      fill='none'
      {...props}
    >
      <g
        stroke='#A7A9B7'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        clipPath='url(#a)'
      >
        <path d='M3.17 6.94 12 12.05l8.77-5.08M12 21.11v-9.07' />
        <path d='M21.61 12.33V8.67c0-1.38-.99-3.06-2.2-3.73l-5.34-2.96c-1.14-.64-3-.64-4.14 0L4.59 4.94c-1.21.67-2.2 2.35-2.2 3.73v5.66c0 1.38.99 3.06 2.2 3.73l5.34 2.96c.57.32 1.32.48 2.07.48.75 0 1.5-.16 2.07-.48' />
        <path d='M19.2 20.9a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4ZM23 21.5l-1-1' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0-.5h24v24H0z' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SvgTracking;
