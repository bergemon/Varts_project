import { Requests } from "@prisma/client"

// Модель заявок в друзья
function requestsModel(requests: Requests) {
    const requestsView = {
        id: requests.id,
        createdAt: requests.createdAt,
        updatedAt: requests.updatedAt
    }
    return requestsView
}

export {
    requestsModel
}