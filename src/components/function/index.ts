export const isValidTableId = (tableId: string) => {
    // Regular expression to match the format "Zone B - T1" where "B" can be a letter or number,
    // and "T" is followed by one or more numbers.
    const regex = /^Zone\s+[A-Za-z0-9]+\s+-\s+T\d+$/i;
  
    return regex.test(tableId);
  };