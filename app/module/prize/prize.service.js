const constant              = require(__basePath + '/app/core/constant');
const Prize                 = require(constant.path.module + 'prize/prize.schema');
const errorHelper           = require(constant.path.app + 'util/errorHelper');

// create a prize
exports.createPrize          = (payload, callback) => {
    const prize              = new Prize(payload);

    prize.save(function(error, result) {
        if(error) {
            console.log(error)
            return callback(errorHelper.findMongoError(error))
        }
        return callback(null, result);
    })
}

// get all prize
exports.getPrizes            = (query, callback) => {
    Prize.find(query, (error, result) => {
        if(error) {
            return callback(errorHelper.findMongoError(error))
        }
        return callback(null, result);
    })
}