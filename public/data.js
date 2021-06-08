let projects = [
    {
        name: "christmass",
        isActive: false,
        dateCreated: "2021-02-13",
        dateClossed: "2021-02-13",
    },
    {
        name: "easter",
        isActive: true,
        dateCreated: "2021-02-13",
        dateClossed: "",
    },
    {
        name: "inn",
        isActive: true,
        dateCreated: "2021-02-13",
        dateClossed: "",
    },
    {
        name: "Cooking",
        isActive: true,
        dateCreated: "2021-02-13",
        dateClossed: "",
    },
    {
        name: "drive",
        isActive: true,
        dateCreated: "2021-02-13",
        dateClossed: "",
    },
    {
        name: "water",
        isActive: true,
        dateCreated: "2021-02-13",
        dateClossed: "",
    },
    {
        name: "running",
        isActive: true,
        dateCreated: "2021-01-13",
        dateClossed: "",
    },
    {
        name: "clothing",
        isActive: true,
        dateCreated: "2021-03-13",
        dateClossed: "",
    },
    {
        name: "food",
        isActive: true,
        dateCreated: "2021-04-13",
        dateClossed: "",
    },
];

let names = [
    {
        name: "Barnes",
        isActive: true,
        projects: {
            water: [
                {
                    hours: 10,
                    date: "2021-02-13",
                },
            ],
            Cooking: [
                {
                    hours: 11,
                    date: "2021-09-09",
                },
                {
                    hours: 4,
                    date: "2021-09-21",
                },
                {
                    hours: 8,
                    date: "2021-04-15",
                },
            ],
        },
    },
    {
        name: "Albert",
        isActive: true,
        projects: {
            easter: [
                {
                    hours: 5,
                    date: "2021-03-23",
                },
                {
                    hours: 11,
                    date: "2021-04-18",
                },
            ],
            Cooking: [
                {
                    hours: 7,
                    date: "2021-11-08",
                },
            ],
            running: [
                {
                    hours: 6,
                    date: "2021-02-04",
                },
            ],
        },
    },

    {
        name: "Bruce",
        isActive: true,
        projects: {
            clothing: [
                {
                    hours: 11,
                    date: "2021-03-09",
                },
                {
                    hours: 2,
                    date: "2021-07-25",
                },
            ],
            drive: [
                {
                    hours: 2,
                    date: "2021-04-22",
                },
                {
                    hours: 9,
                    date: "2021-07-09",
                },
            ],
        },
    },
    {
        name: "Carolyn",
        isActive: true,
        projects: {
            running: [
                {
                    hours: 8,
                    date: "2021-01-19",
                },
                {
                    hours: 2,
                    date: "2021-09-16",
                },
            ],
            food: [
                {
                    hours: 6,
                    date: "2021-03-07",
                },
                {
                    hours: 8,
                    date: "2021-06-21",
                },
            ],
        },
    },
    {
        name: "Cook",
        isActive: true,
        projects: {
            water: [
                {
                    hours: 1,
                    date: "2021-04-23",
                },
                {
                    hours: 1,
                    date: "2021-05-01",
                },
            ],
            clothing: [
                {
                    hours: 11,
                    date: "2021-08-08",
                },
                {
                    hours: 10,
                    date: "2021-01-20",
                },
            ],
        },
    },
    {
        name: "Harry",
        isActive: false,
        projects: {
            food: [
                {
                    hours: 7,
                    date: "2021-09-23",
                },
            ],
            inn: [
                {
                    hours: 5,
                    date: "2021-08-15",
                },
                {
                    hours: 5,
                    date: "2021-01-16",
                },
            ],
            easter: [
                {
                    hours: 7,
                    date: "2021-09-29",
                },
            ],
        },
    },
    {
        name: "Larry",
        isActive: true,
        projects: {
            clothing: [
                {
                    hours: 7,
                    date: "2021-07-21",
                },
                {
                    hours: 4,
                    date: "2021-09-23",
                },
            ],
            inn: [
                {
                    hours: 10,
                    date: "2021-09-03",
                },
                {
                    hours: 3,
                    date: "2021-07-15",
                },
            ],
            food: [
                {
                    hours: 6,
                    date: "2021-10-12",
                },
                {
                    hours: 9,
                    date: "2021-06-29",
                },
            ],
            easter: [
                {
                    hours: 4,
                    date: "2021-08-24",
                },
                {
                    hours: 2,
                    date: "2021-11-12",
                },
            ],
        },
    },
    {
        name: "Lois",
        isActive: true,
        projects: {
            inn: [
                {
                    hours: 9,
                    date: "2021-09-02",
                },
                {
                    hours: 9,
                    date: "2021-02-03",
                },
            ],
            clothing: [
                {
                    hours: 4,
                    date: "2021-04-28",
                },
            ],
            water: [
                {
                    hours: 4,
                    date: "2021-11-05",
                },
                {
                    hours: 8,
                    date: "2021-08-23",
                },
            ],
        },
    },
    {
        name: "Morgan",
        isActive: true,
        projects: {
            water: [
                {
                    hours: 6,
                    date: "2021-04-11",
                },
            ],
            running: [
                {
                    hours: 10,
                    date: "2021-11-02",
                },
                {
                    hours: 3,
                    date: "2021-06-09",
                },
            ],
        },
    },
    {
        name: "Randy",
        isActive: true,
        projects: {
            easter: [
                {
                    hours: 5,
                    date: "2021-02-24",
                },
            ],
            water: [
                {
                    hours: 5,
                    date: "2021-03-05",
                },
                {
                    hours: 9,
                    date: "2021-07-03",
                },
            ],
        },
    },
    {
        name: "Reed",
        isActive: true,
        projects: {
            water: [
                {
                    hours: 5,
                    date: "2021-09-11",
                },
                {
                    hours: 3,
                    date: "2021-01-19",
                },
                {
                    hours: 4,
                    date: "2021-01-11",
                },
            ],
            christmass: [
                {
                    hours: 6,
                    date: "2021-01-05",
                },
                {
                    hours: 1,
                    date: "2021-02-09",
                },
                {
                    hours: 11,
                    date: "2021-09-13",
                },
            ],
            food: [
                {
                    hours: 3,
                    date: "2021-02-15",
                },
                {
                    hours: 6,
                    date: "2021-04-23",
                },
            ],
        },
    },
    {
        name: "Ross",
        isActive: true,
        projects: {
            running: [
                {
                    hours: 11,
                    date: "2021-02-23",
                },
                {
                    hours: 10,
                    date: "2021-05-09",
                },
            ],
            food: [
                {
                    hours: 6,
                    date: "2021-08-10",
                },
                {
                    hours: 3,
                    date: "2021-06-06",
                },
                {
                    hours: 3,
                    date: "2021-06-09",
                },
            ],
            christmass: [
                {
                    hours: 11,
                    date: "2021-10-06",
                },
            ],
            clothing: [
                {
                    hours: 11,
                    date: "2021-07-23",
                },
                {
                    hours: 1,
                    date: "2021-02-10",
                },
                {
                    hours: 11,
                    date: "2021-07-28",
                },
            ],
        },
    },
    {
        name: "Walker",
        isActive: true,
        projects: {
            clothing: [
                {
                    hours: 6,
                    date: "2021-06-26",
                },
            ],
            water: [
                {
                    hours: 6,
                    date: "2021-10-14",
                },
                {
                    hours: 4,
                    date: "2021-06-11",
                },
                {
                    hours: 9,
                    date: "2021-10-07",
                },
            ],
            food: [
                {
                    hours: 6,
                    date: "2021-02-18",
                },
                {
                    hours: 2,
                    date: "2021-04-19",
                },
                {
                    hours: 6,
                    date: "2021-11-07",
                },
            ],
        },
    },
];
