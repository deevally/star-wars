

  const convertCmToFtIn = (cm) => {
    const inches = Math.round(cm / 2.54);
    return {
      feet: Math.floor(inches / 12),
      inches: inches % 12,
    };
  };


  export default convertCmToFtIn
