function errorHandler(err, req, res, next){
    if (typeof err === "string"){  
        return res.status(400).json({ message: err});
    }

    if (typeof err === "ValidationError"){  // handling Schema Errors
        return res.status(400).json({ message: err.message});
    }

    if (typeof err === "UnauthorizedError"){
        return res.status(401).json({ message: err.message});
    }

    return res.status(500).json({ message: err.message})  // handling server errors
}

module.exports = {
    errorHandler
}
