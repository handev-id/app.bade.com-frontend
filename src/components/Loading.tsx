const Loading = () => {
  return (
    <div className="z-50 fixed top-0 left-0 w-full bg-white/50 flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default Loading;
