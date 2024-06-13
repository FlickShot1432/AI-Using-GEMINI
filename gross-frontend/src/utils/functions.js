import jwt_decode from "jwt-decode";

export const isFunction = (fn) => typeof fn === "function";

export const passMultipleFilesIntoFormData = (formData, fileArray, key) => {
  [...fileArray].forEach((file) => {
    formData.append(key, file);
  });
};

let timerId = null;
export const debounced = (callback, wait) => {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(() => {
    callback();
  }, wait);
};

export const classNames = (...params) =>
  [...params].filter((val) => !!val).join(" ");


export const isTokenActive = (token = null) => {
  if (!token) return false
  const decoded = jwt_decode(token)
  return (decoded?.exp > Date.now() / 1000)
}

export const decodeToken = async (token = null) => {
  if (!token) return {}
  return await jwt_decode(token);
}
