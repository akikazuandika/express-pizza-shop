export const SuccessResponse = (res, message = "Success", data = null) => {
    let resp = {
        success : true,
        message,
    }

    data != null ? resp.data = data : null

    return res.json(resp)
}

export const CreatedResponse = (res, message = "Success create data", data = null) => {
    let resp = {
        success : true,
        message,
    }

    data != null ? resp.data = data : null

    return res.status(201).json(resp)
}

export const BadRequestResponse = (res, message = "Invalid Request") => {
    return res.status(400).json({
        success : false,
        message
    })
}

export const UnauthorizedResponse = (res, message = "Unauthorized") => {
    return res.status(401).json({
        success : false,
        message
    })
}

export const NotFoundResponse = (res, message = "NotFound") => {
    return res.status(404).json({
        success : false,
        message
    })
}

export const ServerErrorResponse = (res, message = "Internal server error", error = null) => {
    let resp = {
        success : false,
        message,
    }

    error != null ? resp.error = error : null

    return res.status(500).json(resp)
}