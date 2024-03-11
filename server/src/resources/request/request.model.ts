import { Requests } from "@prisma/client"

// Модель заявок в друзья
function requestsModel(requests: Requests) {
    const requestsView = {
        id: requests.id,
        created_at: requests.created_at,
        updated_at: requests.updated_at
    }
    return requestsView
}

export {
    requestsModel
}