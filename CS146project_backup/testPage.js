document.getElementById("eventForm").addEventListener("submit",function(e){

    {
console.log("FORM SUBMITTED,SHOULD SUBMIT DATA!!!!")

const date=document.getElementById("eventDate").value;
const desc=document.getElementById("eventDescription").value;
const importance=document.getElementById("eventImportance").value;
const color=document.getElementById("eventColor").value;

const newEvent={
    date,description:desc,importance,color
};


console.log("THE NEW EVENT YOU MADE:",newEvent);

const eventDiv=document.createElement("div");

/*supposed to copy the css for task */
eventDiv.classList.add("task");

eventDiv.style.backgroundColor=newEvent.color;

eventDiv.textContent="Date:"+newEvent.date+"\nDescription:"+newEvent.description+"\nImportance:"+newEvent.importance;

const container=document.getElementById("userEvents");
container.appendChild(eventDiv)
console.log("ADDED THE EVENT!")
//this.reset();

}
    

})

