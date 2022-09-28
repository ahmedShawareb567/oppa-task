const TrimErrorMessage = (error: string) => {
  const splitError = error.split("Error")[1];
  return splitError;
};

export { TrimErrorMessage };
