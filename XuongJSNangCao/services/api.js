export const getAllQuiz = async ()=>{
    try {
        const res = await fetch('http://localhost:3000/quizs'); // call api:bất đồng bộ
        const data = await res.json()
        return data;
    } catch (error) {
        alert("Lỗi")
    }
}

export const getQuestionsByIdQuiz = async(idQuiz)=>{
    try {
        const res = await fetch(`http://localhost:3000/questions?quizId=${idQuiz}`); // call api:bất đồng bộ
        const data = await res.json()
        return data;
    } catch (error) {
        alert("Lỗi")
    }
}

export const getQuizById = async (id) =>{
    try {
        const res = await fetch(`http://localhost:3000/quizs/${id}`)
        const data = await res.json();
        return data
    } catch (error) {
        alert(error)
    }
}

export const addQuiz = async(data)=>{
    try {
        const res = await fetch('http://localhost:3000/quizs',{
            method: "post",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        }) 

        const dataRes = await res.json();
        return dataRes;
    } catch (error) {
        alert("Thêm lỗi")
    }
}

export const addQuestions =async(datas)=>{
    try {
        datas.forEach(async(item)=>{
            await fetch('http://localhost:3000/questions',{
                method: "post", 
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item) 
            }) 
        })

        
    } catch (error) {
        alert("Thêm lỗi")
    }


}