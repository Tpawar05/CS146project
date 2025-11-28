// CS146project_backup/testPage.js


// Utility functions for loading/saving events and mapping importance to colors/classes

function importanceToColor(importance) {
    if (importance === "High") return "#fb0202e4";
    if (importance === "Medium") return "#f8e219dc";
    return "#5da10ada"; // Low
}

function importanceToClass(importance) {
    if (importance === "High") return "high-task";
    if (importance === "Medium") return "mid-task";
    return "low-task";
}

function loadEvents() {
    return JSON.parse(localStorage.getItem("userEvents")) || [];
}

function saveEvents(events) {
    localStorage.setItem("userEvents", JSON.stringify(events));
}

// Render the EVENTS CREATED BY USER list and the Remove dropdown
function renderUserEvents() {
    const container = document.getElementById("userEvents"); // might be null now
    const removeSelect = document.getElementById("removeEventSelect");

    
    if (!removeSelect) return;

    if (container) container.innerHTML = "";
    removeSelect.innerHTML = "";

    const events = loadEvents();

    if (events.length === 0) {
        
        const opt = document.createElement("option");
        opt.value = "";
        opt.textContent = "No events to remove";
        removeSelect.appendChild(opt);
        removeSelect.disabled = true;

        
        if (container) {
            const p = document.createElement("p");
            p.textContent = "No events yet.";
            container.appendChild(p);
        }
        return;
    }

    removeSelect.disabled = false;

    events.forEach((evt, index) => {
        if (container) {
            const eventDiv = document.createElement("div");
            eventDiv.classList.add("task", importanceToClass(evt.importance));
            eventDiv.textContent =
                "Date: " + evt.date +
                " | " + evt.description +
                " (" + evt.importance + ")";
            container.appendChild(eventDiv);
        }

        const opt = document.createElement("option");
        opt.value = index;
        opt.textContent = evt.description + " – " + evt.date;
        removeSelect.appendChild(opt);
    });
}

// LONG-TERM EVENTS form

const longForm = document.getElementById("eventForm");
if (longForm) {
    longForm.addEventListener("submit", function (e) {
        console.log("Long-term form submitted");

        const date = document.getElementById("eventDate").value;
        const desc = document.getElementById("eventDescription").value;
        const importance = document.getElementById("eventImportance").value;

        const color = importanceToColor(importance);

        const newEvent = {
            date: date,
            description: desc,
            importance: importance,
            color: color,
            type: "long"
        };

        const events = loadEvents();
        events.push(newEvent);
        saveEvents(events);

        console.log("New long-term event:", newEvent);

        
    });
}

//SHORT-TERM EVENTS form

const shortForm = document.getElementById("shortEventForm");
if (shortForm) {
    shortForm.addEventListener("submit", function (e) {
        e.preventDefault(); 

        const date = document.getElementById("shortEventDate").value;
        const desc = document.getElementById("shortEventDescription").value;
        const importance = document.getElementById("shortEventImportance").value;

        const color = importanceToColor(importance);

        const newEvent = {
            date: date,
            description: desc,
            importance: importance,
            color: color,
            type: "short"
        };

        const events = loadEvents();
        events.push(newEvent);
        saveEvents(events);

        console.log("New short-term event:", newEvent);

        shortForm.reset();
        renderUserEvents(); 
    });
}

// REMOVE EVENTS form

const removeForm = document.getElementById("removeEventForm");
if (removeForm) {
    removeForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const removeSelect = document.getElementById("removeEventSelect");
        const idx = parseInt(removeSelect.value, 10);

        if (isNaN(idx)) return;

        const events = loadEvents();
        events.splice(idx, 1);          
        saveEvents(events);

        renderUserEvents();             
        console.log("Event removed. New events array:", events);
    });
}

// initial render when customize page loads
renderUserEvents();
