const Mock = require('mockjs');
const Random = Mock.Random;

let turns = 1;
const test = () => {
    return {
        'data': 2333
    }
};

const Board = () => {
    let board = []
    for (let i = 0; i <= 4; i++) {
        let line = []
        for (let i = 0; i <= 4; i++) {
            line.push(Random.natural(-1, 1))
        }
        board.push(line)
    }
    return { 'board': board}
};

const BoardUpdate = () => {
    let response = {};
    if (turns === 1) {
        response['msg'] = 'no'
    }
    if (turns === 2) {
        response['msg'] = 'no'
    }
    if (turns === 3) {
        response['msg'] = 'NA';
        response['matrix'] = Board().board
    }
    if (turns === 4) {
        response['msg'] = 'NA';
        response['matrix'] = Board().board
    }
    if (turns === 5) {
        response['msg'] = 'test ended!'
    }
    turns += 1;
    if (turns === 6) {
        turns = 1
    }
    return response
};

const Profile = () => {
    return {
        nickname: Random.name(),
        games: Random.natural(0, 100),
        rank: Random.natural(0, 100),
        remark: 'remarkremarkremarkremark!!!',
        email: Random.email(),
        check_self: true
    }
};

const Logout = () => {
    return { msg: 'Logout succeed!'}
};

const Register = () => {
    let choice = Random.natural(0, 1);
    if (choice === 1) {
        return {
            status: 'pass',
            msg: 'Register succeed!'
        }
    } else {
        return {
            status: 'fail',
            msg: 'Register fail!'
        }
    }

};

const Login = () => {
    let choice = Random.natural(0, 1);
    if (choice === 1) {
        return {
            msg: 'success',
        }
    } else {
        return {
            msg: 'passwords did not match!!',
        }
    }
};


Mock.mock(/test\/api/, 'get', test);
Mock.mock(/[a-z/]+\/127.0.0.1:8000\/api\/profile\/[0-9a-zA-Z]+/, 'get', Profile);
Mock.mock(/[a-z/]+\/127.0.0.1:8000\/api\/update/, 'post', BoardUpdate);
Mock.mock(/[a-z/]+\/127.0.0.1:8000\/api\/register/, 'post', Register);
Mock.mock(/[a-z/]+\/127.0.0.1:8000\/api\/login/, 'post', Login);
Mock.mock(/[a-z/]+\/127.0.0.1:8000\/api\/logout/, 'get', Logout);
Mock.mock(/[a-z/]+\/127.0.0.1:8000\/api/, 'get', Profile);



