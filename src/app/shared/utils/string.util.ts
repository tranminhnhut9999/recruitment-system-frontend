export function getHttpStringURL(params: any) {
  let paramsURL = "";
  if (params) {
    paramsURL += "?";
    Object.keys(params).forEach(key => {
      paramsURL += `${key}=${params[key]}`;
    });
  }
  return paramsURL;
}
