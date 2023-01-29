import { v4 as uuidv4 } from 'uuid';
export const getUUID = () => {
  //先从本地存储获取UUIDTOKEN
  let uuid_token = localStorage.getItem('UUIDTOKEN');
  //如果UUIDTOKEN不存在
  if(!uuid_token){
    //随机生成一个UUIDTOKEN
    uuid_token = uuidv4();
    //保存到本地存储
    localStorage.setItem('UUIDTOKEN',uuid_token);
  }
  //返回UUIDTOKEN
  return uuid_token;
}