//存储用户登录的token
export const setToken = (token) => {
  localStorage.setItem("TOKEN",token);
};

//获取用户登录的token
export const getToken = () => {
  return localStorage.getItem("TOKEN");
};

//移除用户登录的token
export const removeToken = () =>{
  localStorage.removeItem("TOKEN");
}