export const checkAndReturnCurrency = (currncycode) => {
  switch (currncycode) {
    case "KRW":
      return "한국(원)";
    case "USD":
      return "미국($)";
    case "EURO":
      return "유럽(유로)";
    case "JPY":
      return "일본(엔)";
    case "CNY":
      return "중국(위안)";
    default:
      return "한국(원)";
  }
};
