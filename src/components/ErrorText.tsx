const ErrorText: React.FC<{ error: string }> = props => {
  const { error } = props;

  if (error === '') {
    return null;
  }

  return <p className="text-secondary mt-2">{error}</p>;
};

export default ErrorText;
