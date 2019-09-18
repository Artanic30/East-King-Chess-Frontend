import { observable, action, decorate } from 'mobx';
import Provider from '../../public/axios/provider';

async function init_auth() {
    let result = false;
    await Provider.get(`http://127.0.0.1:8000/api/init`).then(response => {
        console.log('axios return!', response.data.state)
            result = response.data.state
        });
    return result;
}
// todo：支持修饰器
class UserInfo {
    is_auth = init_auth();

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

console.log('store created!')
export default new UserInfo();
