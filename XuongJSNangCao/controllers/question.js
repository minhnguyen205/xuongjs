import {getQuizById,getQuestionsByIdQuiz} from '../services/api.js'
var listQuestion=[];
var listAnswerSubmit =[];
const btnSubmit = document.getElementById('btn_submit');
var isSumit = false;

const app ={
    getQuizandQuestion: async function(){

        const searchParam = new URLSearchParams(window.location.search);
        if(searchParam.has('id')){
            const id = searchParam.get('id');
            const dataQuiz = await getQuizById(id);
            console.log(dataQuiz);
            this.countDown(dataQuiz.time);
            this.renderQuizInfo(dataQuiz);
            listQuestion = await getQuestionsByIdQuiz(id);
            this.renderListQuestion(listQuestion);
        }

    },
    renderQuizInfo: function(data){
        document.getElementById('quiz_heading').innerHTML = data.title;
        document.getElementById('quiz_description').innerHTML = data.description;

    },
    renderListQuestion: function(list){
        list = this.random(list);
        const questionItem = list?.map((item,index)=>{
            const listAnswers = this.renderAnswers(item.answers,item.type,item.id);
            return `
                <div class="question_item border border-2 rounded p-4 mb-2">
                    <h4 class="question_number" id="${item.id}">Câu hỏi: ${index+1}</h4>
                    <h5 class="question_title" >
                       ${item.questionTiltle}
                    </h5>
                    <div class="answer_items mt-3">
                       ${listAnswers}
                    </div>
                </div>
            `
        }).join("");

        document.getElementById('question_container').innerHTML = questionItem
        
    },
    renderAnswers: function(listAnswers,type,idQuestion){

        listAnswers= this.random(listAnswers);
        return listAnswers?.map((ans,index)=>{
            return `
                <div class="form-check fs-5 mb-3">
                    <input class="form-check-input border border-2 border-primary" role="button" 
                        type="${type == 1 ? 'radio': 'checkbox'}" 
                        name="question_${idQuestion}" 
                        id="answer_${idQuestion}_${ans.id}"
                        data-idquestion="${idQuestion}"
                        data-idanswer="${ans.id}" >

                    <label class="form-check-label" role="button" for="answer_${idQuestion}_${ans.id}" >
                        ${ans.answerTitle}
                    </label>
                </div>
            `
        }).join("")
    },
    random: function(array){
        return array.sort(()=>{
            return Math.random() - Math.random();
        })
    },
    handleSubmit : function(){
        btnSubmit.addEventListener('click',()=>{
            if(confirm("Bạn có chắc chắn nộp bài không?")){
                isSumit= true;
                this.handleSubmitForm()
            }
            
        })
    },

    handleSubmitForm : function(){
        const inputAll = document.querySelectorAll('input');
        inputAll.forEach((item)=>{
            item.addEventListener('click',(e)=>{

                e.preventDefault()
            })

        })

        const listAnswersUser = document.querySelectorAll('.answer_items');

        listAnswersUser?.forEach((answers)=>{
            const data ={
                idQuestion: '',
                idAnswers: []
            }
            const inputs = answers.querySelectorAll('input');

            inputs?.forEach((ans)=>{
                if(ans.checked){
                    data.idQuestion = ans.dataset.idquestion;
                    data.idAnswers.push(ans.dataset.idanswer)
                }
            })

            if(data.idAnswers && data.idAnswers.length)
                listAnswerSubmit.push(data)
        })
        this.checkAnswers(listAnswerSubmit)
    },
    checkAnswers: function(listAnswerSubmit){
        const checkResult=[];
        console.log(listQuestion); // danh sách câu hỏi từ getQuizandQuestion
        
        const listStatus = [];
        let countRight =0;

        listAnswerSubmit.forEach((ansUser)=>{

            const findQuestion = listQuestion.find((ques)=> {return ques.id == ansUser.idQuestion})
            const isCheck = this.checkEqual(ansUser.idAnswers,findQuestion.correctAnser);

            if(isCheck){
                countRight++
            }
            listStatus.push({
                idQuestion: findQuestion.id,
                status: isCheck
            })
        })
        this.renderStatus(listStatus);
        alert(`Ban tra loi dung ${countRight}/${listQuestion.length}`)

    },
    checkEqual: function(arr1,arr2){

        if( arr1.length != arr2.length)
            return false
        arr1 = arr1.sort();
        arr2 = arr2.sort();
        for(var i =0; i< arr1.length;i++){
            if(arr1[i] != arr2[i]){
                return false
            }
        }
        return true;
    },
    renderStatus: function(listStatus){
        listStatus.forEach((item)=>{
            const title = document.getElementById(item.idQuestion);
            title.innerHTML = `${title.textContent} ${item.status ? `<span class="badge text-bg-success">Đúng</span>`: `<span class="badge text-bg-danger">Sai</span>`}`
        })
    },
    countDown: function(time){ // giây
        const that = this;

        function handleTime (){
            const minute = Math.floor(time/60);        
            const second = time%60;
            const timeElement = document.getElementById('timer');
    
            timeElement.innerHTML = `
            ${minute < 10 ? '0': ''}${minute}
            :
            ${second < 10 ? '0': ''}${second}`

            time--;
            if(isSumit){
                clearInterval(timeInter);
            }

            if(time < 0){
                that.handleSubmitForm();
                clearInterval(timeInter);
                timeElement.innerHTML = `Hết thời gian`
            }

        }

        const timeInter = setInterval(handleTime,1000);

    },
    reset: function(){
        const btnReset = document.getElementById("btn_reset");
        btnReset.addEventListener("click",()=>{
            if(window.confirm("Bạn có muốn làm lại không ?")){
                window.location.reload();
            }
        })
    },
    start: function(){
        this.getQuizandQuestion();
        this.handleSubmit();
        this.reset();
    }
}

app.start();