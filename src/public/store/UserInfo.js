import { observable, action, decorate } from 'mobx';


// todo：支持修饰器
class UserInfo {
    is_auth = false;

    login = () => {
        this.is_auth = true;
    };
    logout = () => {
        this.is_auth = false;
    };
}

decorate(UserInfo, {
    is_auth: observable,
    login: action,
    logout: action,
});


export default new UserInfo();
