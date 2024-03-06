 export const toCapitalize = (str: string): string => {
    const firstLetter = str.charAt(0).toUpperCase();
    const restOfString = str.slice(1);
  
    return firstLetter.concat(restOfString);
  };
  