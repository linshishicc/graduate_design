import axios from 'axios'
const instance = axios.create({
        baseURL: "http://localhost:3000" // 部署url
    })
    // if (localStorage.getItem("token")) {
    //     instance.defaults.headers.common["token"] = localStorage.getItem("token");
    // }

// instance.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
export default instance