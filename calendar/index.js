const calendar = (function () {
  let Storage = [];

  function generateId() {
    return Math.random().toString(16).slice(2);
  }

  function addEvent(id, name, time, callback) {
    const generatedId = generateId();
    const event = { id: id || generatedId, name, time, callback };
    Storage.push(event);
  }

  function getEvents() {
    return Storage;
  }

  function editEvent(id, event) {
    Storage = Storage.map(function (element) {
      if (element.id === id) {
        const updatedEvent = {
          id: element.id,
          name: event.name || element.name,
          time: event.time || element.time,
          callback: event.callback || element.callback,
        };
        console.log(event.name);
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

  function deleteEvent(id) {
      const foundIndex = Storage.findIndex(function(element){
          if (id === element.id) {
              return true;
          }
      })
      Storage.splice(foundIndex, 1);
      return Storage;

  }

  return { addEvent, getEvents, editEvent, getEvent, deleteEvent };
})();

calendar.addEvent(123, "event Name", new Date(), () => {
  console.log("event 1 callback");
});

calendar.addEvent(234343, "event Name2", new Date(), () => {
  console.log("event 2 callback");
});

const res = calendar.getEvents();
console.log(res);

calendar.editEvent(123, { name: "Event 2" });

calendar.getEvent(123);
