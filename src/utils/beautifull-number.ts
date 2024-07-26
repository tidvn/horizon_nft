export const beautifullBalance = (number: number|undefined): string => {
    if (number === undefined) {
      return "0 ₳";
    }
    return number.toFixed(4).toString()+" ₳";
    }