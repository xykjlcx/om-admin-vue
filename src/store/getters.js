import { stat } from "fs";

const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    login: state => state.login,
    userinfo: state => state.userinfo
  }
  export default getters