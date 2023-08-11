const SvgProfile = (props) => {
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
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='M12.16 10.37c-.1-.01-.22-.01-.33 0a4.42 4.42 0 0 1-4.27-4.43C7.56 3.49 9.54 1.5 12 1.5a4.435 4.435 0 0 1 .16 8.87ZM7.16 14.06c-2.42 1.62-2.42 4.26 0 5.87 2.75 1.84 7.26 1.84 10.01 0 2.42-1.62 2.42-4.26 0-5.87-2.74-1.83-7.25-1.83-10.01 0Z'
      />
    </svg>
  );
};

export default SvgProfile;
