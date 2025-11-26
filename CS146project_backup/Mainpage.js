(function () {
    const monthLabel = document.querySelector('.month-name');
    const daysEl = document.getElementById('days');
    const controlButtons = document.querySelectorAll('.cal-header .controls button');
    const prevBtn = controlButtons[0];
    const nextBtn = controlButtons[1];

    let viewDate = new Date();

    function clearChildren(el) {
        while (el.firstChild) el.removeChild(el.firstChild);
    }

    function render() {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        monthLabel.textContent = viewDate.toLocaleString(undefined, { month: 'long', year: 'numeric' });

        clearChildren(daysEl);

        const first = new Date(year, month, 1);
        const last = new Date(year, month + 1, 0);
        const startDay = first.getDay(); // 0..6

        // empty cells before month start
        for (let i = 0; i < startDay; i++) {
            const e = document.createElement('div');
            e.className = 'day empty';
            e.setAttribute('role', 'gridcell');
            daysEl.appendChild(e);
        }

        const today = new Date();
        const isTodayMonth = today.getFullYear() === year && today.getMonth() === month;

        // day cells
        for (let d = 1; d <= last.getDate(); d++) {
            const e = document.createElement('div');
            e.className = 'day';
            e.setAttribute('role', 'gridcell');
            const num = document.createElement('div');
            num.className = 'num';
            num.textContent = d;
            e.appendChild(num);

            if (isTodayMonth && d === today.getDate()) {
                e.classList.add('today');
                e.style.background = '#48ccff';
                e.style.borderRadius = '8px';
                e.style.padding = '8px';
                e.style.boxSizing = 'border-box';
                e.style.border = '1px solid rgba(0,0,0,0.03)';
                e.style.color = '#0f172a';
                e.style.fontSize = '13px';
            }

            e.tabIndex = 0;

            daysEl.appendChild(e);
        }

        // fill remaining cells to reach 42 (6 weeks)
        while (daysEl.children.length < 42) {
            const e = document.createElement('div');
            e.className = 'day empty';
            e.setAttribute('role', 'gridcell');
            daysEl.appendChild(e);
        }
    }

    // enable controls if present and wire events
    if (prevBtn) {
        prevBtn.disabled = false;
        prevBtn.addEventListener('click', () => {
            viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
            render();
        });
    }
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.addEventListener('click', () => {
            viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
            render();
        });
    }

    daysEl.addEventListener('click', (ev) => {
        const day = ev.target.closest('.day');
        if (!day || day.classList.contains('empty')) return;
        const n = day.querySelector('.num');
        if (!n) return;
        const dayNum = Number(n.textContent);
        const clickedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), dayNum);
        console.log('Selected date:', clickedDate.toDateString());
    });

    // keyboard activation (Enter / Space)
    daysEl.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
            const day = ev.target.closest('.day');
            if (day && !day.classList.contains('empty')) day.click();
        }
    });
    function initTaskButtons() {
        const tasks = document.querySelectorAll('.task');
        tasks.forEach(task => {
            if (task.querySelector('.mark-done')) return;

            const metaEl = task.querySelector('.meta');
            if (!metaEl) return;
            if (!task.dataset.originalMeta) task.dataset.originalMeta = metaEl.textContent;

            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'mark-done';
            btn.setAttribute('aria-pressed', 'false');
            btn.textContent = 'Mark done';

            btn.addEventListener('click', (ev) => {
                ev.stopPropagation();
                const nowDone = task.classList.toggle('done');
                btn.setAttribute('aria-pressed', String(nowDone));
                btn.textContent = nowDone ? 'Undo' : 'Mark done';
                metaEl.textContent = nowDone ? 'Completed' : task.dataset.originalMeta;
            });

            task.appendChild(btn);
        });
    }


    // ADDING THE RECIEVING DATA JS FOR THE TASKS!!!! BY MASROOR

    const urlParams = new URLSearchParams(window.location.search);

    console.log(urlParams)
    const date=urlParams.get("date");
    const description=urlParams.get("description");
    const importance=urlParams.get("importance");
    const color=urlParams.get("color");

    //check if we get data

    console.log("Main page check for data:",{date,description,importance,color});


    


    // //we need to create a  task div

    // const taskList=document.getElementById("taskList");

    // const taskRecieved=document.createElement("div");

    // //every task has always some kinda task
    // taskRecieved.classList.add("task");

    //  if(importance==="High"){
    //     taskRecieved.classList.add("high-task")
    //  }

    // else if(importance==="Medium"){
    //     taskRecieved.classList.add("mid-task")
    // }else{
    //     taskRecieved.classList.add("low-task")
    // }

    // //change the color

    // if(color){
    //     taskRecieved.style.backgroundColor=color;
    // }

    // //big div container
    // const leftDiv=document.createElement("div");

    // //title div
    // const titleDiv=document.createElement("div");
    // titleDiv.classList.add("title");
    // titleDiv.textContent=description;

    // //Meta text or date
    // const metaDiv=document.createElement("div");
    // metaDiv.classList.add("meta");
    // metaDiv.textContent=date;

    // leftDiv.appendChild(titleDiv);
    // leftDiv.appendChild(metaDiv);

    // //the chev thing

    // const chev=document.createElement("div")
    // chev.classList.add("chev");
    // chev.textContent=">";


    // //adding all the things to task recieved container then to the actual task list!
    // taskRecieved.appendChild(leftDiv);
    // taskRecieved.appendChild(chev);
    // taskList.appendChild(taskRecieved)











    

    
    //the html for a task example
    // <div>
    //     <div class="title">${description}</div>
    //     <div class="meta">Time: ${description}</div>
    // </div>
    // <div class="chev">></div>

    

    // initial render
    initTaskButtons();

    //CODE TO LOAD DATA!

    const savedEvents = JSON.parse(localStorage.getItem("userEvents")) || [];
    savedEvents.forEach(evt => {
        const taskList = document.getElementById("taskList");
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");


        if(evt.importance === "High") taskDiv.classList.add("high-task");
        else if(evt.importance === "Medium") taskDiv.classList.add("mid-task");
        else taskDiv.classList.add("low-task");


        if(evt.color) taskDiv.style.backgroundColor = evt.color;

        const left = document.createElement("div");
        const title = document.createElement("div");

        title.classList.add("title");
        title.textContent = evt.description;

        const meta = document.createElement("div");
        meta.classList.add("meta");
        meta.textContent = evt.date;

        left.appendChild(title);
        left.appendChild(meta);


        const chev = document.createElement("div");
        chev.classList.add("chev");
        chev.textContent = ">";


        taskDiv.appendChild(left);
        taskDiv.appendChild(chev);
        taskList.appendChild(taskDiv);
        initTaskButtons();
    });



    render();
})();
