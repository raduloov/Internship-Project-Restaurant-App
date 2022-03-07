const Modal = (props: any) => {
  return (
    <>
      <div
        className="fixed top-0 left-0 w-screen h-full z-30 backdrop-blur-sm bg-[rgba(0,0,0,0.8)]"
        onClick={props.onClose}
      />
      <div className="fixed md:top-[20vh] sm:top-[15vh] z-40 shadow-md animate-[slide-down_0.5s_ease_forwards] sm:w-[85%] md:w-auto">
        <div>{props.children}</div>
      </div>
    </>
  );
};

export default Modal;
