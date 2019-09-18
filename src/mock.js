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

const MatchInit = () => {
    let choice = 1;
    if (choice === 1) {
        return {
            msg: 'success',
            board_id: 23333
        }
    } else {
        return {
            msg: 'Time out error!!',
        }
    }
};

const Players = () => {
    let choice = 1;
    if (choice === 1) {
        return {
            msg: 'success',
            players: [
                {
                    name: 'First player'
                },
                {
                    name: 'Second player'
                }
            ]
        }
    } else {
        return {
            msg: 'Match does not started!!',
        }
    }
};

const Scores = () => {
    let result = [];
    for (let i = 1;i < 6;i++) {
        let user = {
            name: Random.name(),
            wins: Random.natural(10, 100),
            lose: Random.natural(5, 50)
        };
        result.push(user)
    }
    return result
};

const StateInit = () => {
    return {
        state: true
    }
};


Mock.mock(/test\/api/, 'get', test);
Mock.mock(/[a-z/]+\/127.0.0.1:8000\/api\/game\/init_match/, 'get', MatchInit);
Mock.mock(/[a-z/]+\/127.0.0.1:8000\/api\/account\/[0-9a-zA-Z:]+/, 'get', Profile);
Mock.mock(/[a-z/]+\/127.0.0.1:8000\/api\/game\/[0-9]+\/update_game/, 'post', BoardUpdate);
Mock.mock(/[a-z/]+\/127.0.0.1:8000\/api\/game\/[0-9]+\/players/, 'get', Players);
Mock.mock(/[a-z/]+\/127.0.0.1:8000\/api\/account\/register/, 'post', Register);
Mock.mock(/[a-z/]+\/127.0.0.1:8000\/api\/account\/login/, 'post', Login);
Mock.mock(/[a-z/]+\/127.0.0.1:8000\/api\/account\/logout/, 'get', Logout);
Mock.mock(/[a-z/]+\/127.0.0.1:8000\/api\/scores/, 'get', Scores);
Mock.mock(/[a-z/]+\/127.0.0.1:8000\/api\/init/, 'get', StateInit);
Mock.mock(/[a-z/]+\/127.0.0.1:8000\/api\/game\/[0-9]+\/init_game/, 'get', Board);



