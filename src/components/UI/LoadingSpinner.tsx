const LoadingSpinner = () => {
  return (
    <div className="flex justify-center p-10">
      <div
        style={{ borderTopColor: 'transparent' }}
        className="w-32 h-32 border-4 border-black border-solid rounded-full animate-spin"
      ></div>
    </div>
  );
};

export default LoadingSpinner;
