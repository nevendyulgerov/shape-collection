export const groups = [{
    id: 1,
    type: 'day_group',
    events: {
        summerBreak: {
            startDate: '22/06/2018',
            endDate: '22/09/2018'
        },
        winterBreak: {
            startDate: '22/12/2018',
            endDate: '02/01/2019'
        }
    },
    users: [{
        id: 'abc',
        name: 'John Doe',
        age: 33,
        exams: [{
            name: 'English B1',
            score: 5
        }, {
            name: 'Exam B',
            score: 10
        }]
    }, {
        id: 'xyz',
        name: 'Teddy Williams',
        age: 42,
        exams: [{
            name: 'English B1',
            score: 6
        }, {
            name: 'Exam B',
            score: 3
        }]
    }, {
        id: 'zzz',
        name: 'Jake McCoy',
        age: 14,
        exams: []
    }]
}, {
    id: 2,
    type: 'evening_group',
    events: {
        summerBreak: {
            startDate: '12/06/2018',
            endDate: '12/09/2018'
        },
        winterBreak: {
            startDate: '01/12/2018',
            endDate: '01/02/2019'
        }
    },
    users: [{
        id: 'yyy',
        name: 'Teddy Smith',
        age: 23,
        exams: [{
            name: 'English B1',
            score: 3
        }, {
            name: 'Exam B',
            score: 7
        }]
    }, {
        id: 'jjj',
        name: 'Jane Doe',
        age: 42,
        exams: [{
            name: 'English B1',
            score: 4
        }, {
            name: 'Exam B',
            score: 1
        }]
    }]
}, {
    id: 3,
    type: 'weekend_group',
    users: []
}];

export const users = [{
    id: 1,
    type: 'day_group',
    grades: {
        english: 4,
        driving: 7
    }
}, {
    id: 2,
    type: 'evening_group',
    grades: {
        english: 6,
        driving: 10
    }
}, {
    id: 3,
    type: 'weekend_group',
    grades: []
}];
