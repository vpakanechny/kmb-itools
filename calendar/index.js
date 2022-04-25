const calendar = (function () {
  let Storage = [];

  function generateId() {
    return Math.random().toString(16).slice(2);
  }

  function addEvent(id, name, time, callback) {
    const timer = time - new Date();
    const timeoutId = setTimeout(function () {
      callback();
    }, timer);
    const event = { id: id || generateId(), name, time, callback, timeoutId };
    Storage.push(event);
  }

  function getEvents() {
    return Storage;
  }

  function editEvent(id, event) {
    Storage = Storage.map(function (element) {
      if (element.id === id) {
        const updatedTime = event.time || element.time;
        clearTimeout(element.timeoutId);
        const timeoutId = setTimeout(function () {
          element.callback();
        }, updatedTime - new Date());
        const updatedEvent = {
          id: element.id,
          name: event.name || element.name,
          time: updatedTime,
          callback: event.callback || element.callback,
          timeoutId: timeoutId || element.timeoutId,
        };
        return updatedEvent;
      }
      return element;
    });
  }

  function getEvent(id) {
    const foundEvent = Storage.find(function (element) {
      if (id === element.id) {
        return true;
      }
    });
    return foundEvent;
  }

  function getEventsByDay(fromDate, toDate) {
    console.log(fromDate.length);
    const fromDateInMS = Date.parse(fromDate);
    const dayInMS = 24*60*60*1000;
    let toDateInMS = Date.parse(toDate);
    if (toDate === undefined) {
      if (fromDate.length <= 7) {
        toDateInMS = fromDateInMS + (30 * dayInMS);
      } else if (fromDate.length <= 12) {
        toDateInMS = fromDateInMS + dayInMS;
      } else {
        toDateInMS = fromDateInMS + (7 * dayInMS);
      }
    }
    const foundEventsByPeriod = Storage.filter((element) => {
      if (
        Math.min(fromDateInMS, toDateInMS) <= Date.parse(element.time) &&
        Date.parse(element.time) <= Math.max(fromDateInMS, toDateInMS)
      ) {
        return true;
      }
    });
    return foundEventsByPeriod;
  }

  function deleteEvent(id) {
    const foundIndex = Storage.findIndex(function (element) {
      if (id === element.id) {
        return true;
      }
    });
    clearTimeout(Storage[foundIndex].timeoutId);
    Storage.splice(foundIndex, 1);
    return Storage;
  }

  return {
    addEvent,
    getEvents,
    editEvent,
    getEvent,
    deleteEvent,
    getEventsByDay,
  };
})();

calendar.addEvent(123, "event Name", new Date(2022, 3, 10), () => {
  console.log("event 1 callback");
});

calendar.addEvent(124, "event Name2", new Date(2022, 3, 20), () => {
  console.log("event 2 callback");
});

calendar.addEvent(125, "event Name3", new Date(2022, 3, 26), () => {
  console.log("event 3 callback");
});

calendar.addEvent(126, "event Name4", new Date(2022, 3, 27), () => {
  console.log("event 4 callback");
});

calendar.addEvent(127, "event Name5", new Date(2022, 3, 30), () => {
  console.log("event 5 callback");
});

calendar.addEvent(128, "event Name6", new Date(2022, 4, 1), () => {
  console.log("event 6 callback");
});

calendar.addEvent(129, "event Name7", new Date(2022, 4, 5), () => {
  console.log("event 7 callback");
});

calendar.addEvent(130, "event Name8", new Date(2022, 4, 8), () => {
  console.log("event 8 callback");
});

calendar.addEvent(131, "event Name9", new Date(2022, 4, 10), () => {
  console.log("event 9 callback");
});

calendar.addEvent(132, "event Name10", new Date("Mon Apr 25 2022 16:32:44 GMT+0300 (Москва, стандартное время"), () => {
  console.log("event 10 callback");
});

// const res = calendar.getEvents();
// console.log(res);

// calendar.editEvent(124, { name: "Event 2" });
// calendar.editEvent(125, {
//   name: "Event 228",
//   time: new Date(2022, 7, 15),
// });

// calendar.getEvent(123);

// function factorial(n) {
//   console.log(n);
//   return n ? n * factorial(n - 1) : 1;
// }
