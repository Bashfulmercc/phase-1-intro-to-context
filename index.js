const createEmployeeRecord = (recArr) => {
return {
    firstName: recArr[0],
    familyName: recArr[1],
    title: recArr[2],
    payPerHour: recArr[3],
    timeInEvents: [],
    timeOutEvents: []
    }
}

const createEmployeeRecords = (arrRec) => {
    return arrRec.map(rec => createEmployeeRecord(rec))
}

 const createTimeInEvent = function(record, dateStamp){
    const [date, hour] = dateStamp.toString().split(" ")
    const inEvent = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    record.timeInEvents.push(inEvent)
    return record
}

const createTimeOutEvent = function (record, dateStamp) {
    const [date, hour] = dateStamp.toString().split(" ")
    const outEvent = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    record.timeOutEvents.push(outEvent)
    return record
}

const hoursWorkedOnDate = function (record, timeStamp) {
    const timeIn = record.timeInEvents.find(function(e){
        return e.date === timeStamp
    })
    const timeOut = record.timeOutEvents.find(function(e){
        return e.date === timeStamp
    })
    return (timeOut.hour - timeIn.hour) / 100
}

const wagesEarnedOnDate = function(record, timeStamp){
    let netPay = hoursWorkedOnDate(record, timeStamp) * record.payPerHour
    return parseFloat(netPay.toString())
}

const allWagesFor = function (record){
    const workDays = record.timeInEvents.map(function(e){
        return e.date
    })

    let totalNet = workDays.reduce(function(time, day){
        return time + wagesEarnedOnDate(record, day)
    }, 0)

    return totalNet
}

const calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(sum, record){
    return sum + allWagesFor(record)
 }, 0)
}
