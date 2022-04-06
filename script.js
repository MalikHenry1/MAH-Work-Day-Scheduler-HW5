var thisDayEl = $('#thisDay');
var scheduleEl = $('.box');
var instant = moment().local();
var beginTime = 9; // initializing at 9 and ending at 17 to account for military time
var stopTime = 17;

function makeToday() {
    var startDate = instant.format('dddd, MMMM Do');
    thisDayEl.addClass('time-block');
    thisDayEl.text(startDate);
}

function makeCalendar() {
    for(var i = beginTime; i<= stopTime; i++){
        if(i < 12) {
            scheduleEl.append(`<div class="row"> 
            <div class="col-1 hour">${i}AM</div>
            <textarea class="col-10" id="time${i}"></textarea>
            <button class="col-1 saveBtn"> <i class="fas fa-save"></i> </button>
           
            </div>`);
        }
      else if(i === 12) { //change divs to sections, make subsequent conditional match the first here
        scheduleEl.append(`<div class="row"> 
        <div class="col-1 hour" id=>${i}PM</div>
        <textarea class="col-10" id="time${i}"></textarea>
        <button class="col-1 saveBtn"> <i class="fas fa-save"></i> </button>
        </div>`);
    }  else {
        scheduleEl.append(`<div class="row"> 
        <div class="col-1 hour" id=>${i-12}PM</div>
        <textarea class="col-10" id="time${i}"></textarea>
        <button class="col-1 saveBtn"> <i class="fas fa-save"></i> </button>
        </div>`);
    }
    if(i === instant.hour()) {
        $(`#time${i}`).addClass("present");
    } else if(i > instant.hour()) {
        $(`#time${i}`).addClass("future");
    } else {
        $(`#time${i}`).addClass("past");
    }
  }
}

function start() {
    makeToday();
    makeCalendar();
}

start();

$(".saveBtn").on("click", function() {
    var userText = $(this).siblings("textarea").val();
    var userTime = $(this).siblings("textarea").attr("id");
    localStorage.setItem(userTime, userText);
})

for(var i=beginTime; i<stopTime; i++){

$(`#time${i}`).val(localStorage.getItem(`time${i}`)); // looping through Local Storage to save user values to the page after refresh.

}



