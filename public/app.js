//elements O = html element
let fnameO,
    lnameO,
    submitO,
    formO,
    basicFormDropInput,
    adminFormDropInput,
    reportFormDropInput,
    basicDropDown,
    adminDropDown,
    reportDropDown,
    adminBO,
    reportBO,
    reportDivO,
    reportTypes,
    minDateInput,
    maxDateInput,
    title,
    projectsO,
    extendBO,
    projectsAO,
    extendBAO,
    projectsPO,
    extendBPO,
    hoursB3O,
    dayB3O,
    submitBO,
    dateB2OMin,
    dateB2OMax,
    pnameAO,
    dateBAOMax,
    dateBAOMin,
    nameABO,
    pnamePO,
    namePBO,
    activateO,
    deleteAO,
    submitABO,
    adminBlock3,
    formUserO,
    block1O,
    block2O,
    adminFormO,
    adminBlock1O,
    adminBlock2O,
    personFormO,
    personBlock1O,
    personBlock2O,
    reportsO,
    deleteHourO,
    deleteProjectO,
    toggleProjectActiveO,
    deletePersonO,
    togglePersonActiveO;

//varables
let isoffDrop = true;
let prC = [];
let nameT = [];
let lastPrC = 0;
let prCA = [];
let lastPrCA = 0;
let prCP = [];
let lastPrCP = 0;
const maxDisp = 2;
let preP = false;
let preI, preMin, preMax;

let ctx;
let myChart;
let dataG = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
        {
            label: "# of hours",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
            ],
            hoverBackgroundColor: [],
            borderWidth: 1,
        },
    ],
};
let type = "bar";
let showTips = false;

window.onload = () => {
    //get elements
    fnameO = document.getElementById("fname");
    lnameO = document.getElementById("lname");
    basicFormDropInput = document.getElementById("basicFormDropInput");
    adminFormDropInput = document.getElementById("adminFormDropInput");
    reportFormDropInput = document.getElementById("reportFormDropInput");

    formUserO = document.getElementById("formUser");
    block1O = document.getElementById("block1");
    block2O = document.getElementById("block2");

    adminFormO = document.getElementById("adminForm");
    adminBlock1O = document.getElementById("adminBlock1");
    adminBlock2O = document.getElementById("adminBlock2");

    personFormO = document.getElementById("personForm");
    personBlock1O = document.getElementById("personBlock1");
    personBlock2O = document.getElementById("personBlock2");

    reportsO = document.getElementById("Reports");

    deleteHourO = document.getElementById("deleteHour");
    deleteProjectO = document.getElementById("deleteProject");
    toggleProjectActiveO = document.getElementById("toggleProjectActive");
    deletePersonO = document.getElementById("deletePerson");
    togglePersonActiveO = document.getElementById("togglePersonActive");

    basicDropDown = document.getElementById("basicDropDown");
    adminDropDown = document.getElementById("adminDropDown");
    reportDropDown = document.getElementById("reportDropDown");
    minDateInput = document.getElementById("minDateInput");
    maxDateInput = document.getElementById("maxDateInput");
    adminBO = document.getElementById("adminB");
    reportBO = document.getElementById("reportB");
    reportTypes = document.getElementById("reportTypes");
    title = document.getElementById("title");
    projectsO = document.getElementById("projects");
    extendBO = document.getElementById("extend");
    projectsAO = document.getElementById("projectsA");
    extendBAO = document.getElementById("extendA");
    projectsPO = document.getElementById("projectsP");
    extendBPO = document.getElementById("extendP");
    hoursB3O = document.getElementById("hoursB3");
    dayB3O = document.getElementById("dayB3");
    submitBO = document.getElementById("submitB");
    dateB2OMax = document.getElementById("dateB2Max");
    dateB2OMin = document.getElementById("dateB2Min");
    pnameAO = document.getElementById("pnameAB");
    dateBAOMax = document.getElementById("dateABMax");
    dateBAOMin = document.getElementById("dateABMin");
    nameABO = document.getElementById("nameAB");
    pnamePO = document.getElementById("pnamePB");
    namePBO = document.getElementById("namePB");
    activateO = document.getElementById("activate");
    deleteAO = document.getElementById("deleteA");
    submitABO = document.getElementById("submitAB");
    adminBlock3 = document.getElementById("adminBlock3");
    Chart.pluginService.register({
        beforeRender: function (chart) {
            if (chart.config.options.showAllTooltips) {
                // create an array of tooltips
                // we can't use the chart tooltip because there is only one tooltip per chart
                chart.pluginTooltips = [];
                chart.config.data.datasets.forEach(function (dataset, i) {
                    chart.getDatasetMeta(i).data.forEach(function (sector, j) {
                        chart.pluginTooltips.push(
                            new Chart.Tooltip(
                                {
                                    _chart: chart.chart,
                                    _chartInstance: chart,
                                    _data: chart.data,
                                    _options: chart.options.tooltips,
                                    _active: [sector],
                                },
                                chart
                            )
                        );
                    });
                });

                // turn off normal tooltips
                chart.options.tooltips.enabled = false;
            }
        },
        afterDraw: function (chart, easing) {
            if (chart.config.options.showAllTooltips) {
                // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
                if (!chart.allTooltipsOnce) {
                    if (easing !== 1) return;
                    chart.allTooltipsOnce = true;
                }

                // turn on tooltips
                chart.options.tooltips.enabled = true;
                Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
                    tooltip.initialize();
                    tooltip.update();
                    // we don't actually need this since we are not animating tooltips
                    tooltip.pivot();
                    tooltip.transition(easing).draw();
                });
                chart.options.tooltips.enabled = false;
            }
        },
    });

    let qParts = location.search.substring(1).split("&");
    if (qParts[0].substring(0, 5) === "chart") {
        document.body.innerHTML =
            "<canvas style='width:100%,height:100%' id='reportArea'></canvas>";
        ctx = document.getElementById("reportArea").getContext("2d");
        myChart = new Chart(ctx, {
            type: "line",
            data: {
                datasets: [
                    {
                        label: "First dataset",
                        data: [
                            {
                                x: new Date(2020, 1, 1),
                                y: 1,
                            },
                            {
                                t: new Date(2020, 4, 1),
                                y: 3,
                            },
                            {
                                t: new Date(2020, 7, 1),
                                y: 5,
                            },
                            {
                                t: new Date(2020, 10, 1),
                                y: 7,
                            },
                        ],
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        type: "time",
                        time: {
                            unit: "month",
                        },
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
        preP = qParts[2].substring(4);
        preI = qParts[3].substring(6);
        preMin = qParts[4].substring(4);
        preMax = qParts[5].substring(4);

        changeReport(qParts[0].substring(6), qParts[1].substring(4));
        return;
    }

    ctx = document.getElementById("reportArea").getContext("2d");
    myChart = new Chart(ctx, {
        type: "line",
        data: {
            datasets: [
                {
                    label: "First dataset",
                    data: [
                        {
                            x: new Date(2020, 1, 1),
                            y: 1,
                        },
                        {
                            t: new Date(2020, 4, 1),
                            y: 3,
                        },
                        {
                            t: new Date(2020, 7, 1),
                            y: 5,
                        },
                        {
                            t: new Date(2020, 10, 1),
                            y: 7,
                        },
                    ],
                },
            ],
        },
        options: {
            scales: {
                x: {
                    type: "time",
                    time: {
                        unit: "month",
                    },
                },
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    //get data
    getNames();
    getProjects();

    document.getElementById("day").value = new Date().toDateInputValue();
    //event listeners
    formUserO.onsubmit = submit;
    //reportTypes.onchange = changeReport;
    window.onresize = resize;
    adminFormDropInput.onchange = updatePerson;
    extendBO.onclick = extend;
    extendBAO.onclick = extendA;
    extendBPO.onclick = extendP;

    changeReport();
    resize();
    reportsO.style.display = "none";
    updatePersonA();
    updatePersonP();
};

function extend() {
    let templastPrC = lastPrC;
    for (let i = lastPrC; i < prC.length && i < maxDisp + lastPrC; i++) {
        if (check2(prC[i].date)) continue;
        let div = document.createElement("div");
        div.className = "projectO";
        let b = prC[i].date.split(/\D/);
        let id = getRandomArbitrary(-100000, 100000);
        div.innerHTML = `<input onclick="edit()" id="${id}" name="ex" value="${
            nameT[i]
        }" type='radio'><label for=${id} class='namedB2'>${
            nameT[i]
        }</label><label for=${id}>:</label>
                    
                    <label for=${id}>Hours:</label> <label for=${id} class='hoursdB2'>${
            prC[i].hours
        }</label>;
                    <label for=${id}>Date:</label> <label for=${id} class='datedB2'>${
            b[1] + "/" + b[2] + "/" + b[0]
        }</label>`;
        projectsO.appendChild(div);
        templastPrC++;
    }
    lastPrC = templastPrC;
}

function updatePerson() {
    lastPrC = 0;
    projectsO.innerHTML = "";
    let person = names.find((ell) => ell.name === adminFormDropInput.value);
    if (!person) return;
    prC = [];
    nameT = [];
    for (let i in person.projects) {
        for (let j in person.projects[i]) {
            if (check2(person.projects[i][j].date)) continue;
            nameT.push(i);
            prC.push(person.projects[i][j]);
        }
    }
    prC.sort((a, b) => new Date(b.date) - new Date(a.date));
    for (let i = 0; i < prC.length && i < maxDisp; i++) {
        let div = document.createElement("div");
        div.className = "projectO";
        let id = getRandomArbitrary(-100000, 100000);
        let b = prC[i].date.split(/\D/);
        div.innerHTML = `<input onclick="edit()" id="${id}" name="ex" value="${
            nameT[i]
        }" type='radio'><label for=${id} class='namedB2'>${
            nameT[i]
        }</label><label for=${id}>:</label>
                    
                    <label for=${id}>Hours:</label> <label for=${id} class='hoursdB2'>${
            prC[i].hours
        }</label>;
                    <label for=${id}>Date:</label> <label for=${id} class='datedB2'>${
            b[1] + "/" + b[2] + "/" + b[0]
        }</label>`;
        projectsO.appendChild(div);
        lastPrC++;
    }
}

function edit() {
    formUserO.style.display = "block";
    block1O.style.display = "block";
    block2O.style.display = "none";
    deleteHourO.style.display = "block";
}

function extendA() {
    let templastPrC = lastPrCA;
    for (let i = lastPrCA; i < prCA.length && i < maxDisp + lastPrCA; i++) {
        if (check3(prCA[i].dateCreated)) continue;
        let div = document.createElement("div");
        div.className = "projectO";
        let b = prCA[i].dateCreated.split(/\D/);
        let id = getRandomArbitrary(-100000, 100000);
        div.innerHTML = `<input onclick="editA()" id="${id}" name="projectsSelect" value="${
            prCA[i].name
        }" type='radio'><span for="${id}" class='namedB2, ${
            prCA[i].isActive ? "black" : "red"
        }'>${prCA[i].name}</span>:
                    Date: <span for="${id}" class='datedB2'>${
            b[1] + "/" + b[2] + "/" + b[0]
        }</span>`;
        projectsAO.appendChild(div);
        templastPrC++;
    }
    lastPrCA = templastPrC;
}

function updatePersonA() {
    lastPrCA = 0;
    projectsAO.innerHTML = "";
    prCA = [];
    for (let i in projects) {
        if (check3(projects[i].dateCreated)) continue;
        if (projects[i].name.includes(pnameAO.value)) {
            prCA.push(projects[i]);
        }
    }
    prCA.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
    for (let i = 0; i < prCA.length && i < maxDisp; i++) {
        let div = document.createElement("div");
        div.className = "projectO";
        let b = prCA[i].dateCreated.split(/\D/);
        let id = getRandomArbitrary(-100000, 100000);
        div.innerHTML = `<input onclick="editA()" id="${id}" name="projectsSelect" value="${
            prCA[i].name
        }" type='radio'><label for="${id}" class='namedB2, ${
            prCA[i].isActive ? "black" : "red"
        }'>${prCA[i].name}</label>:
                    <label for="${id}">Date:</label> <label for="${id}" class='datedB2'>${
            b[1] + "/" + b[2] + "/" + b[0]
        }</label>`;
        projectsAO.appendChild(div);
        lastPrCA++;
    }
}

function editA() {
    adminFormO.style.display = "block";
    adminBlock1O.style.display = "block";
    adminBlock2O.style.display = "none";
    deleteProjectO.style.display = "block";
    toggleProjectActiveO.style.display = "block";
}

function extendP() {
    let templastPrC = lastPrCP;
    for (let i = lastPrCP; i < prCP.length && i < maxDisp + lastPrCP; i++) {
        if (check3(prCP[i].dateCreated)) continue;
        let div = document.createElement("div");
        div.className = "projectO";
        let id = getRandomArbitrary(-100000, 100000);
        div.innerHTML = `<input onclick="editP()" id="${id}" name="projectSelect" value="${
            prCP[i].name
        }" type='radio'><span for="${id}" class='namedB2, ${
            prCP[i].isActive ? "black" : "red"
        }'>${prCP[i].name}</span>`;
        projectsPO.appendChild(div);
        templastPrC++;
    }
    lastPrCP = templastPrC;
}

function updatePersonP() {
    lastPrCP = 0;
    projectsPO.innerHTML = "";
    prCP = [];
    for (let i in projects) {
        if (projects[i].name.includes(pnamePO.value)) {
            prCP.push(projects[i]);
        }
    }
    prCP.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
    for (let i = 0; i < prCP.length && i < maxDisp; i++) {
        let div = document.createElement("div");
        div.className = "projectO";
        let id = getRandomArbitrary(-100000, 100000);
        div.innerHTML = `<input onclick="editP()" id="${id}" name="projectSelect" value="${
            prCP[i].name
        }" type='radio'><label for="${id}" class='namedB2, ${
            prCP[i].isActive ? "black" : "red"
        }'>${prCP[i].name}</label>`;
        projectsPO.appendChild(div);
        lastPrCP++;
    }
}

function editP() {
    personFormO.style.display = "block";
    personBlock1O.style.display = "block";
    personBlock2O.style.display = "none";
    deletePersonO.style.display = "block";
    togglePersonActiveO.style.display = "block";
}

function resize() {}

//changes report
function changeReport(preT, preD) {
    let day = document.getElementById("days");
    let isbyDay = preD
        ? "true" == preD
        : document.getElementById("isByDay").checked;
    reportFormDropInput.disabled = false;
    switch (preT ? preT : getChecked()) {
        case "leaderBoard":
            {
                createDropDowns("", 2);
                reportFormDropInput.value = "";
                if (!preT) day.innerHTML = "Month";
                reportFormDropInput.disabled = true;
                getLeaderBoardDisplayData(isbyDay);
            }
            break;
        case "club":
            {
                if (!preT) day.innerHTML = "Day";
                createDropDowns("", 2);
                reportFormDropInput.value = "";
                filterFunction(2);
                reportFormDropInput.disabled = true;
                getClubDisplayData(isbyDay);
            }
            break;
        case "person":
            {
                createDropDowns(names, 2);
                let temp = false;
                for (let i in projects) {
                    if (
                        names[i].name ===
                        (preI ? preI : reportFormDropInput.value)
                    ) {
                        temp = true;
                    }
                }
                if (!temp) {
                    reportFormDropInput.value = names[0].name;
                    filterFunction(2);
                }

                if (!preT) day.innerHTML = "Day";
                getPersonDisplayData(isbyDay);
            }
            break;
        default:
            {
                createDropDowns(projects, 2);
                let temp = false;
                for (let i in projects) {
                    if (
                        projects[i].name ===
                        (preI ? preI : reportFormDropInput.value)
                    ) {
                        temp = true;
                    }
                }
                if (!temp) {
                    reportFormDropInput.value = projects[0].name;
                    filterFunction(2);
                }
                if (!preT) day.innerHTML = "Day";
                getProjectDisplayData(isbyDay);
            }
            break;
    }
}

function check(thing) {
    let vdate = new Date(
        parseInt(thing.slice(0, 4)),
        parseInt(thing.slice(5, 7)),
        parseInt(thing.slice(8))
    );
    let min = preMin ? preMin : minDateInput.value;
    if (
        !(
            !min ||
            vdate >=
                new Date(
                    parseInt(min.slice(0, 4)),
                    parseInt(min.slice(5, 7)),
                    parseInt(min.slice(8))
                )
        )
    ) {
        return true;
    }
    let max = preMax ? preMax : maxDateInput.value;
    if (
        !(
            !max ||
            vdate <=
                new Date(
                    parseInt(max.slice(0, 4)),
                    parseInt(max.slice(5, 7)),
                    parseInt(max.slice(8))
                )
        )
    ) {
        return true;
    }
    return false;
}

function check2(thing) {
    let b1 = thing.split(/\D/);
    let vdate = new Date(parseInt(b1[0]), parseInt(b1[1]), parseInt(b1[2]));

    let b2 = dateB2OMin.value.split(/\D/);
    let b3 = dateB2OMax.value.split(/\D/);
    if (
        !(
            (!dateB2OMin.value ||
                vdate >=
                    new Date(
                        parseInt(b2[0]),
                        parseInt(b2[1]),
                        parseInt(b2[2])
                    )) &&
            (!dateB2OMax.value ||
                vdate <=
                    new Date(parseInt(b3[0]), parseInt(b3[1]), parseInt(b3[2])))
        )
    ) {
        return true;
    }
    return false;
}

function check3(thing) {
    let b1 = thing.split(/\D/);
    let vdate = new Date(parseInt(b1[0]), parseInt(b1[1]), parseInt(b1[2]));

    let b2 = dateBAOMin.value.split(/\D/);
    let b3 = dateBAOMax.value.split(/\D/);
    if (
        !(
            (!dateBAOMin.value ||
                vdate >=
                    new Date(
                        parseInt(b2[0]),
                        parseInt(b2[1]),
                        parseInt(b2[2])
                    )) &&
            (!dateBAOMax.value ||
                vdate <=
                    new Date(parseInt(b3[0]), parseInt(b3[1]), parseInt(b3[2])))
        )
    ) {
        return true;
    }
    return false;
}

function getProjectDisplayData(isDay) {
    let data = [];
    if (!isDay) {
        for (let i in names) {
            let temp =
                names[i].projects[preI ? preI : reportFormDropInput.value];
            if (temp) {
                let hours = 0;
                for (let j in temp) {
                    if (check(temp[j].date)) continue;
                    hours += parseFloat(temp[j].hours);
                }
                if (hours) {
                    data.push({
                        label: names[i].name,
                        y: hours,
                    });
                }
            }
        }
        displayData(data, "bar");
    } else {
        let days = {};
        for (let i in names) {
            let temp =
                names[i].projects[preI ? preI : reportFormDropInput.value];
            if (temp) {
                for (let j in temp) {
                    if (check(temp[j].date)) continue;
                    if (days[temp[j].date]) days[temp[j].date] += temp[j].hours;
                    if (!days[temp[j].date]) days[temp[j].date] = temp[j].hours;
                }
            }
        }
        for (let i in days) {
            if (days[i]) {
                data.push({
                    x: new Date(
                        parseInt(i.slice(0, 4)),
                        parseInt(i.slice(5, 7)),
                        parseInt(i.slice(8))
                    ),
                    y: days[i],
                });
            }
        }
        data.sort((a, b) => b.x - a.x);
        displayData(data, "line");
    }
}

function getPersonDisplayData(isDay) {
    let data = [];
    if (!isDay) {
        let temp = names.find(
            (ell) => ell.name === (preI ? preI : reportFormDropInput.value)
        );
        if (temp) {
            for (let j in temp.projects) {
                let hours = 0;
                for (let k in temp.projects[j]) {
                    if (check(temp.projects[j][k].date)) continue;
                    hours += parseFloat(temp.projects[j][k].hours);
                }
                if (hours) {
                    data.push({
                        label: j,
                        y: hours,
                    });
                }
            }
        }
        displayData(data, "bar");
    } else {
        let days = {};
        let temp = names.find(
            (ell) => ell.name === (preI ? preI : reportFormDropInput.value)
        );
        if (temp) {
            for (let j in temp.projects) {
                let hours = 0;
                for (let k in temp.projects[j]) {
                    if (check(temp.projects[j][k].date)) continue;
                    hours += parseFloat(temp.projects[j][k].hours);

                    if (days[temp.projects[j][k].date])
                        days[temp.projects[j][k].date] +=
                            temp.projects[j][k].hours;
                    if (!days[temp.projects[j][k].date])
                        days[temp.projects[j][k].date] =
                            temp.projects[j][k].hours;
                }
            }
        }
        for (let i in days) {
            if (days[i]) {
                data.push({
                    x: new Date(
                        parseInt(i.slice(0, 4)),
                        parseInt(i.slice(5, 7)),
                        parseInt(i.slice(8))
                    ),
                    y: days[i],
                });
            }
        }
        data.sort((a, b) => b.x - a.x);
        displayData(data, "line");
    }
}

function getLeaderBoardDisplayData(isMonth) {
    let data = [];
    if (!isMonth) {
        for (let i in names) {
            let temp = names[i].projects;
            let hour = 0;
            for (let j in temp) {
                for (let k in temp[j]) {
                    if (check(temp[j][k].date)) continue;
                    hour += temp[j][k].hours;
                }
            }
            if (hour) {
                data.push({
                    label: names[i].name,
                    y: hour,
                });
            }
        }
    } else {
        let cDate = new Date();
        let cMonth = "" + (cDate.getMonth() + 1);
        if (cMonth.length === 1) cMonth = "0" + cMonth;

        for (let i in names) {
            let temp = names[i].projects;
            let hour = 0;
            for (let j in temp) {
                for (let k in temp[j]) {
                    if (
                        cMonth === temp[j][k].date.slice(5, 7) &&
                        "" + cDate.getFullYear() === temp[j][k].date.slice(0, 4)
                    ) {
                        if (check(temp[j][k].date)) continue;
                        hour += temp[j][k].hours;
                    }
                }
            }
            if (hour) {
                data.push({
                    label: names[i].name,
                    y: hour,
                });
            }
        }
    }
    data.sort((a, b) => b.y - a.y);

    displayData(data, "cBar");
}

function getClubDisplayData(isDay, isprint) {
    let data = [];
    if (!isDay) {
        let days = {};
        for (let k in projects) {
            let temp = projects[k].name;
            for (let i in names) {
                if (names[i].projects[temp]) {
                    for (let j in names[i].projects[temp]) {
                        if (check(names[i].projects[temp][j].date)) continue;
                        if (days[temp])
                            days[temp] += names[i].projects[temp][j].hours;
                        if (!days[temp])
                            days[temp] = names[i].projects[temp][j].hours;
                    }
                }
            }
        }
        for (let i in days) {
            if (days[i]) {
                data.push({ label: i, y: days[i] });
            }
        }
        if (isprint) return data;
        displayData(data, "bar");
    } else {
        let days = {};
        for (let z in names) {
            let temp = names[z];
            for (let j in temp.projects) {
                let hours = 0;
                for (let k in temp.projects[j]) {
                    if (check(temp.projects[j][k].date)) continue;
                    hours += parseFloat(temp.projects[j][k].hours);

                    if (days[temp.projects[j][k].date])
                        days[temp.projects[j][k].date] +=
                            temp.projects[j][k].hours;
                    if (!days[temp.projects[j][k].date])
                        days[temp.projects[j][k].date] =
                            temp.projects[j][k].hours;
                }
            }
        }
        for (let i in days) {
            if (days[i]) {
                data.push({
                    x: new Date(
                        parseInt(i.slice(0, 4)),
                        parseInt(i.slice(5, 7)),
                        parseInt(i.slice(8))
                    ),
                    y: days[i],
                });
            }
        }
        data.sort((a, b) => b.x - a.x);
        if (isprint) return data;
        displayData(data, "line");
    }
}

function displayData(array, typ) {
    dataG.datasets[0].backgroundColor = [];
    dataG.datasets[0].borderColor = [];
    dataG.datasets[0].hoverBackgroundColor = [];
    dataG.datasets[0].hoverBorderColor = [];
    dataG.datasets[0].data = [];
    dataG.labels = [];
    if (typ === "bar" || typ === "cBar") {
        for (let i = 0; i < array.length; i++) {
            dataG.labels.push(array[i].label);
            dataG.datasets[0].data.push(array[i].y);
            let d = Math.random() * 360;
            let c = "hsla(" + d + ", 100%, 75%";
            let c2 = "hsla(" + d + ", 100%, 40%";

            dataG.datasets[0].backgroundColor.push(c + ", 0.6)");

            dataG.datasets[0].hoverBackgroundColor.push(c2 + ", 0.6)");
            dataG.datasets[0].hoverBorderColor.push(c2 + ", 1)");

            if (!isPie()) dataG.datasets[0].borderColor.push(c + ", 1)");

            myChart.destroy();

            myChart = new Chart(ctx, {
                type: isPie()
                    ? "pie"
                    : typ === "cBar"
                    ? "horizontalBar"
                    : "bar",
                data: dataG,
                options: {
                    showAllTooltips: showTips,
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                        xAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                },
            });
        }
    } else {
        for (let i = 0; i < array.length; i++) {
            dataG.labels.push(array[i].x);
            dataG.datasets[0].data.push(array[i].y);
        }

        let d = Math.random() * 360;
        let c = "hsl(" + d + ", 100%, 75%";
        let c2 = "hsl(" + d + ", 100%, 40%";

        dataG.datasets[0].backgroundColor = c + ", 0.6)";

        dataG.datasets[0].pointHoverBackgroundColor = c2 + ", .6)";

        dataG.datasets[0].borderColor = c2 + ", 1)";
        myChart.destroy();
        myChart = new Chart(ctx, {
            data: dataG,
            type: "line",
            options: {
                elements: {
                    line: {
                        tension: 0,
                    },
                },
                scales: {
                    showAllTooltips: showTips,
                    xAxes: [
                        {
                            type: "time",
                            time: {
                                displayFormats: {
                                    quarter: "MMM Do YY",
                                },
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                            type: "linear",
                        },
                    ],
                },
            },
        });
    }
    myChart.update();
}

function isPie() {
    return preP ? "true" == preP : document.getElementById("isPie").checked;
}

//finds which report is checked
function getChecked() {
    let els = reportTypes.getElementsByTagName("input");
    let checked;
    for (let i in els) {
        if (els[i].checked && els[i].type === "radio") checked = els[i].value;
    }
    return checked;
}

//gets data from base
function getNames() {
    //call database add to name array
    names.sort(sortByName);
}

//gets data from base
function getProjects() {
    //call database add to project array
    projects.sort(sortByName);
    createDropDowns(projects, 0);
    createDropDowns(names, 1);
    createDropDowns(names, 2);
}

//creates objects for dropdown
function createDropDowns(things, dropdownNum) {
    if (dropdownNum === 0) {
        basicDropDown.innerHTML = "";
    } else if (dropdownNum === 1) {
        adminDropDown.innerHTML = "";
    } else if (dropdownNum === 2) {
        reportDropDown.innerHTML = "";
    }
    if (!things) return;
    for (let i in things) {
        let el = document.createElement("button");
        el.class = "formButton";
        el.onclick = insertData;
        if (!things[i].isActive) el.style.color = "darkblue";
        if (!things[i].isActive) el.style.fontWeight = "bold";

        if (dropdownNum === 0) {
            el.setAttribute("num", 0);
            if (!things[i].isActive) {
                continue;
            }
        } else if (dropdownNum === 1) {
            el.setAttribute("num", 1);
            if (!things[i].isActive) {
                continue;
            }
        } else if (dropdownNum === 2) {
            el.setAttribute("num", 2);
        }
        el.type = "button";
        el.innerHTML = things[i].name;
        if (dropdownNum === 0) {
            basicDropDown.appendChild(el);
        } else if (dropdownNum === 1) {
            adminDropDown.appendChild(el);
        } else if (dropdownNum === 2) {
            reportDropDown.appendChild(el);
        }
    }
}
//switches to reports
function closeAll(th) {
    toggleNav();
    formUserO.style.display = "none";
    block1O.style.display = "none";
    block2O.style.display = "none";

    adminFormO.style.display = "none";
    adminBlock1O.style.display = "none";
    adminBlock2O.style.display = "none";

    personFormO.style.display = "none";
    personBlock1O.style.display = "none";
    personBlock2O.style.display = "none";

    deleteHourO.style.display = "none";
    deleteProjectO.style.display = "none";
    toggleProjectActiveO.style.display = "none";
    deletePersonO.style.display = "none";
    togglePersonActiveO.style.display = "none";

    reportsO.style.display = "none";
    document.getElementById("myTopnav").className = "topnav";
    th.className = "active";
}
//switch
function homeSwitch(th) {
    closeAll(th);
    formUserO.style.display = "block";
    block1O.style.display = "block";
}
function hourEditSwitch(th) {
    closeAll(th);
    formUserO.style.display = "block";
    block2O.style.display = "block";
}
function reportSwitch(th) {
    closeAll(th);
    reportsO.style.display = "block";
}
function addProjectSwitch(th) {
    closeAll(th);
    adminFormO.style.display = "block";
    adminBlock1O.style.display = "block";
}
function editProjectsSwitch(th) {
    closeAll(th);
    adminFormO.style.display = "block";
    adminBlock2O.style.display = "block";
}
function addPersonSwitch(th) {
    closeAll(th);
    personFormO.style.display = "block";
    personBlock1O.style.display = "block";
}
function editPersonSwitch(th) {
    closeAll(th);
    personFormO.style.display = "block";
    personBlock2O.style.display = "block";
}

//add cookies
function submit() {
    setCookie("firstName", fname.value, 100000);
    setCookie("lastName", lname.value, 100000);
}

//cookie setter function from w3schools
function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//cookie getter function from w3schools
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//shows The drop down menue
function openDropDown(num) {
    basicDropDown.classList.remove("show");
    adminDropDown.classList.remove("show");
    reportDropDown.classList.remove("show");
    if (num === 0) {
        basicDropDown.classList.add("show");
    } else if (num === 1) {
        adminDropDown.classList.add("show");
    } else if (num === 2) {
        reportDropDown.classList.add("show");
    }
}

//detects if there is a click on the body and if the drop down menue is open then closes it
function bodyClick() {
    if (isoffDrop) {
        basicDropDown.classList.remove("show");
        adminDropDown.classList.remove("show");
        reportDropDown.classList.remove("show");
    }
}

//filters the dropdown menue from w3schools
function filterFunction(num) {
    let input, filter, b, i, div;
    if (num === 0) {
        input = basicFormDropInput;
        filter = input.value.toUpperCase();
        div = basicDropDown;
        b = div.getElementsByTagName("button");
    } else if (num === 1) {
        input = adminFormDropInput;
        filter = input.value.toUpperCase();
        div = adminDropDown;
        b = div.getElementsByTagName("button");
    } else if (num === 2) {
        console.log("inssddsss");
        input = reportFormDropInput;
        filter = input.value.toUpperCase();
        div = reportDropDown;
        b = div.getElementsByTagName("button");
    }
    for (i = 0; i < b.length; i++) {
        let txtValue = b[i].textContent || b[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            b[i].style.display = "";
        } else {
            b[i].style.display = "none";
        }
    }
}

//takes data from button and puts it in the input
function insertData() {
    if (this.getAttribute("num") === "0") {
        basicFormDropInput.value = this.innerText;
        filterFunction(0);
    } else if (this.getAttribute("num") === "1") {
        adminFormDropInput.value = this.innerText;
        updatePerson();
        filterFunction(1);
    } else if (this.getAttribute("num") === "2") {
        reportFormDropInput.value = this.innerText;
        filterFunction(2);
    }
    isoffDrop = true;
    bodyClick();
}
//from w3schools
Date.prototype.toDateInputValue = function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
};

//sort function
function sortByName(a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }

    // names must be equal
    return 0;
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function randomProperty(obj) {
    return obj[(obj.length * Math.random()) << 0].name;
}

function printG() {
    showTips = true;
    changeReport();
    setTimeout(() => {
        printJS({
            printable: "reportArea",
            type: "html",
            header: "Hours Graph",
        });
        showTips = false;
        changeReport();
    }, 1000);
}

function picG(el) {
    showTips = true;
    changeReport();
    setTimeout(() => {
        let link = document.createElement("a");
        link.download = "graph.png";
        link.href = document.getElementById("reportArea").toDataURL();
        link.click();
        showTips = false;
        changeReport();
    }, 1000);
}

function downloadXlsx() {
    const config = {
        filename: "general-ledger-Q1",
        sheet: {
            data: [
                [
                    {
                        value: "Name",
                        type: "string",
                    },
                    {
                        value: "Is Active User",
                        type: "string",
                    },
                    {
                        value: "Day",
                        type: "string",
                    },
                ],
            ],
        },
    };
    let numLink = {};
    for (let i = 0; i < projects.length; i++) {
        config.sheet.data[0].push({
            value: projects[i].name,
            type: "string",
        });
        numLink[projects[i].name] = i;
    }
    let f = true;
    let lastline = [
        { value: "Total Hours", type: "string" },
        { value: "", type: "string" },
        { value: "Total", type: "string" },
    ];
    for (let j = 0; j < projects.length; j++)
        lastline.push({
            value: 0,
            type: "number",
        });
    for (let i = 0; i < names.length; i++) {
        let lines = {};
        for (let k in names[i].projects) {
            for (let l = 0; l < names[i].projects[k].length; l++) {
                if (!lines[names[i].projects[k][l].date]) {
                    lines[names[i].projects[k][l].date] = [
                        { value: "", type: "string" },
                        { value: "", type: "string" },
                        { value: names[i].projects[k][l].date, type: "string" },
                    ];
                    for (let j = 0; j < projects.length; j++)
                        lines[names[i].projects[k][l].date].push({
                            value: 0,
                            type: "number",
                        });
                    lines[names[i].projects[k][l].date][0].value =
                        names[i].name;
                }
                lines[names[i].projects[k][l].date][numLink[k] + 3].value =
                    names[i].projects[k][l].hours;
            }
        }
        //console.log(lines);
        let newline = [
            { value: "", type: "string" },
            { value: "", type: "string" },
            { value: "Total", type: "string" },
        ];
        //finish sorting
        let linesA = [];
        for (let k in lines) {
            linesA.push(lines[k]);
        }

        linesA.sort((a, b) => {
            let ad = new Date(
                parseInt(a[2].value.slice(0, 4)),
                parseInt(a[2].value.slice(5, 7)),
                parseInt(a[2].value.slice(8))
            );
            let bd = new Date(
                parseInt(b[2].value.slice(0, 4)),
                parseInt(b[2].value.slice(5, 7)),
                parseInt(b[2].value.slice(8))
            );
            return ad - bd;
        });
        for (let j = 0; j < projects.length; j++)
            newline.push({
                value: 0,
                type: "number",
            });
        for (let k in linesA) {
            if (k !== "0") linesA[k][0].value = "";
            config.sheet.data.push(linesA[k]);
            for (let l in linesA[k]) {
                if (l > 2) newline[l].value += linesA[k][l].value;
                if (l > 2) lastline[l].value += linesA[k][l].value;
            }
        }
        config.sheet.data.push(newline);
        config.sheet.data.push([]);
    }
    config.sheet.data.push(lastline);
    zipcelx(config);
}

function embed() {
    let copyText =
        "" +
        location.origin +
        location.pathname +
        `?chart=${getChecked()}&day=${
            document.getElementById("isByDay").checked
        }&pie=${isPie()}&input=${reportFormDropInput.value}&min=${
            minDateInput.value
        }&max=${maxDateInput.value}`;

    navigator.clipboard.writeText(copyText).then(
        function () {
            alert("Link was copied to your clipboard");
        },
        function (err) {
            console.error("Async: Could not copy text: ", err);
        }
    );
}

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

function toggleNav() {
    var x = document
        .getElementById("myTopnav")
        .getElementsByClassName("active");
    x[0].className = "";
}
