const sounds={
    correct:new Audio('./assets/audio/correct.mp3'),
    incorrect:new Audio('./assets/audio/incorrect.wav'),
    startup:new Audio('./assets/audio/startup.wav')
}

var timer = 60;
var anitimer=1;
var elForm = document.querySelector("#initials")
var Eltimer = document.querySelector("#timer")
Eltimer.innerHTML = timer;
var qbox = document.querySelector("#question")
var startbutton = document.querySelector("#start")
var tscore = document.querySelector("#thisrun")
var user = document.querySelector("#user")
var sbmtButton = document.querySelector("#submit-user")

const quiz = {
    0: {
        question: "This is an example of a question related to Javascript. The correct answer is C. I want some more text in here to see how it scrunches.",
        answers: ["an example of answer A", "short ans", "C", "D this one"],
        ca: 'D'
    },
    1: {
        question: "A second question, to test the changing of questions and answers. The new correct answer might be A.",
        answers: ["A (yes)", "B (no)", "C (no)", "D (no)"],
        ca: 'A'
    },
    2: {
        question: "A third question.",
        answers: ["A", "B x", "C", "D"],
        ca: 'B'
    },
    3: {
        question: "A fourth question.",
        answers: ["A", "B", "C", "D x"],
        ca: 'D'
    },
    4:{
        question: "A fifth question.",
        answers: ["A x", "B", "C", "D"],
        ca: 'A'
    },
    5:{
        question: "A sixth question.",
        answers: ["A", "B x", "C", "D"],
        ca: 'B'
    }
}

const bodies = {
    0: document.querySelector("body1"),
    1: document.querySelector("body2"),
    2: document.querySelector("body3")
}
const abxs = {
    A: document.querySelector("#A"),
    B: document.querySelector("#B"),
    C: document.querySelector("#C"),
    D: document.querySelector("#D")
}

function startQuiz() {
    bodies[0].classList.add("hidden")
    bodies[1].classList.remove("hidden")
    qnum = 0;
    let wrongs=[];

    // function scores(){
    //     function get(){
    //         var scores = JSON.parse(localStorage.getItem("scores")) || [];
    //         return scores
    //     }
    //     function set(ini,score){
    //         scores = get()
    //         scores.push([ini,score])
    //         localStorage.setItem("scores",Json.stringify(scores))
    //     }

        
    
    function startTime() {
        var timerInterval = setInterval(function () {
            timer--;
            Eltimer.innerHTML = timer;
            if (timer < 1) {
                timer=0;
                Eltimer.innerHTML=timer;
                clearInterval(timerInterval);
            }
        }, 1000);
    }
    function check(event){
        if (event.target.id == quiz[qnum].ca) {
            sounds.correct.play()
            event.target.style.background = "green"
            console.log(wrongs)
            qnum++;
            window.setTimeout(change, 1000)
            setTimeout(function(){event.target.style.background = "#373F51"},1000)
        }else {
            event.target.style.background = "red"
            wrongs.push(event.target.id)
            sounds.incorrect.play()
            timer -= 5;
            Eltimer.innerHTML = timer;
        }
    }
    function change() {
        qlength = Object.getOwnPropertyNames(quiz).length;
        if(qnum<qlength){
        qbox.innerHTML = quiz[qnum].question
        abxs.A.innerHTML = quiz[qnum].answers[0]
        abxs.B.innerHTML = quiz[qnum].answers[1]
        abxs.C.innerHTML = quiz[qnum].answers[2]
        abxs.D.innerHTML = quiz[qnum].answers[3]
        for(let el in wrongs){
            document.querySelector(`#${wrongs[el]}`).style.background = "#373F51"
        }
        wrongs=[]
        }else{
            const score = timer;
            console.log(score)
            bodies[1].classList.add("hidden")
            bodies[2].classList.remove("hidden")
            tscore.innerHTML = score
        }
    }
    qbox.innerHTML = quiz[qnum].question
    abxs.A.innerHTML = quiz[qnum].answers[0]
    abxs.B.innerHTML = quiz[qnum].answers[1]
    abxs.C.innerHTML = quiz[qnum].answers[2]
    abxs.D.innerHTML = quiz[qnum].answers[3]
    abxs.A.addEventListener("dblclick", check)
    abxs.B.addEventListener("dblclick", check)
    abxs.C.addEventListener("dblclick", check)
    abxs.D.addEventListener("dblclick", check)
    change();
    startTime();

}

// elForm.addEventListener("change",checkInitials)
startbutton.addEventListener("click", startQuiz);