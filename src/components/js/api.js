import axios from "axios";

const baseURL = 'http://localhost:8080'

export function getUser(){
    console.log("I am in getUser api.js")
    return axios({
        method: 'get',
        url: baseURL + '/users',
        withCredentials: true,
    })
}

export function getAllTags(){
    return axios({
        method: 'get',
        url: baseURL + '/tags',
        withCredentials: true,
    })
}

export async function addTask(task){
    console.log("i am in adding a task func")
    const response = await axios({
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
    return response.data;
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

export function editTask(id, editParams){
    console.log("i am in axios!!!!!!!!")
    console.log(editParams)
    return axios.request({
        method: 'patch',
        data: {
            name:editParams.name,
            comment:editParams.comment,
            eventDate:editParams.eventDate
        },
        url: baseURL + `/tasks/${id}`,
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

export function editTag(id, tagToEdit){
    console.log(tagToEdit.tagName)
    return axios.request({
        method: 'patch',
        data: {
            id:tagToEdit.id,
            tagName:tagToEdit.tagName,
        },
        url: baseURL + `/tags/${id}`,
        withCredentials: true,
    })
}

export function logOut(){
    return axios.request({
        method: 'post',
        url: baseURL + `/logout`,
        withCredentials: true,
    })
}

export function deleteTag(tag){
    console.log("i am in deleting func")
    console.log(tag.id)
    return axios({
        method: 'delete',
        url: baseURL + `/tags/${tag.id}`,
        withCredentials: true,
    })
}
