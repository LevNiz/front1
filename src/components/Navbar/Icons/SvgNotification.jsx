const SvgNotification = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      fill='none'
      {...props}
    >
      <path
        stroke='#A7A9B7'
        strokeLinecap='round'
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d='M12.02 2.41c-3.31 0-6 2.69-6 6v2.89c0 .61-.26 1.54-.57 2.06L4.3 15.27c-.71 1.18-.22 2.49 1.08 2.93 4.31 1.44 8.96 1.44 13.27 0 1.21-.4 1.74-1.83 1.08-2.93l-1.15-1.91c-.3-.52-.56-1.45-.56-2.06V8.41c0-3.3-2.7-6-6-6Z'
      />
      <path
        stroke='#A7A9B7'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d='M13.87 2.7a6.754 6.754 0 0 0-3.7 0c.29-.74 1.01-1.26 1.85-1.26.84 0 1.56.52 1.85 1.26Z'
      />
      <path
        stroke='#A7A9B7'
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d='M15.02 18.56c0 1.65-1.35 3-3 3-.82 0-1.58-.34-2.12-.88a3.01 3.01 0 0 1-.88-2.12'
      />
    </svg>
  );
};

export default SvgNotification;
