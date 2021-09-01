function LoadingIndicator() {
  return (
    <img
      className="loading-indicator"
      alt="now loading..."
      src="../../images/loading.gif"
      style={
        ({ margin: "1rem" },
        { width: "470px" },
        { height: "470" },
        { backgroundColor: "red" })
      }
    />
  );
}

export default LoadingIndicator;
