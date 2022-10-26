import axios from "axios";

// we will make a GET request
//change url and create one funtion
//then call it smw
const baseURL = 'http://localhost:8080'

// export function getAllTasks(){
//     return axios({
//         method: 'get',
//         url: baseURL + '/tasks',
//     })
// }

export function getAllTags(){
    return axios({
        method: 'get',
        url: baseURL + '/tags',
    })
}

export function addTask(task){
    console.log("i am in adding a task func")
    return axios({
        method: 'post',
        data:{
            name: task.name,
            comment: task.comment,
            tagName:task.tag
        },
        url:baseURL + '/tasks',
    })
}

export function getTasksByCriteria(searchParams){
    console.log(searchParams.date)
    return axios.request({
        method: 'get',
        params: {
            tag:searchParams.tagName,
            status:searchParams.status,
            date:searchParams.date
        },
        url: baseURL + '/tasks',
    })

}