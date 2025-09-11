const url = "https://anantattire-dvk2.onrender.com";
// const url = "http://localhost:5000"
const ApiConfig = {
  url,
  products: `${url}/api/products`,
  getproductById: (id)=> `${url}/api/products/${id}`,
  category: `${url}/api/categories`,
  otpLogin: `${url}/auth/otp-login`,
  query: `${url}/api/queries`,
}
export default ApiConfig;