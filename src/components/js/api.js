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
        withCredentials: true,
    })
}

export function addTask(task){
    console.log("i am in adding a task func")
    return axios({
        method: 'post',
        data:{
            name: task.name,
            comment: task.comment,
            tagName:task.tag,
            eventDate:task.eventDate,
        },
        url:baseURL + '/tasks',
        withCredentials: true,
    })
}

export function addTag(tag){
    console.log("i am in TAG" + tag)
    return axios({
        method: 'post',
        data:{
            tagName: tag.tagName
        },
        url:baseURL + '/tags',
        withCredentials: true,
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
        withCredentials: true,
    })
}

export function editTask(editParams){
    console.log("i am in axios!!!!!!!!")
    console.log(editParams)
    return axios.request({
        method: 'patch',
        params: {
            name:editParams.name,
            // comment:editParams.comment,
            comment:"ho",
            // eventDate:editParams.date
        },
        url: baseURL + '/tasks/edit',
        withCredentials: true,
    })
}

export function deleteTask(task){
    console.log("i am in deleting func")
    return axios({
        method: 'delete',
        url:baseURL + '/tasks/id?id=' + task.id,
        withCredentials: true,
    })
}