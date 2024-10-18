import {getAllQuiz} from "../services/api.js";

const app = {
    // hiển thị danh sách các câu hỏi
    renderListQuiz: async function(){
        const data = await getAllQuiz(); 
        const listQuiz = data?.map((item,index)=>{
            if(item.isActive){
                return `
                <a href="#" data-id="${item.id}" class="quiz-items list-group-item list-group-item-action list-group-item-primary">
                    ${item.title} : ${item.description}
                </a>
            `
            }
        }).join("") 
        const listQuizElement = document.getElementById('list_quiz');
        listQuizElement.innerHTML = listQuiz;
        this.handleClickQuiz()

    },
    handleClickQuiz: function(){
        // 1. Lấy danh sách (mảng) các quiz
        const quizItems = document.querySelectorAll('.quiz-items');
        console.log(quizItems);
        quizItems.forEach((item)=>{
            // 2. Khai báo sự kiện
            item.addEventListener('click', ()=>{
                // 3. Xác nhận 
                const title = item.textContent;
                if(window.confirm(`Bạn có chắc chắn làm quiz: ${title}`)){
                    const id = item.getAttribute("data-id")
                    window.location = `question.html?id=${id}`                    
                }                
            })
        })
        
    },
    start: function(){
        this.renderListQuiz();
    }
}

app.start()