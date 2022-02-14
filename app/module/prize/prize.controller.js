const constant          = require(__basePath + 'app/core/constant');
const config            = require(constant.path.app + 'config/index.js');
const response          = require(constant.path.app + 'util/response');
const errorHelper       = require(constant.path.app + 'util/errorHelper');
const messages          = require(constant.path.app + 'core/response')
const prizeService      = require(constant.path.app + 'module/prize/prize.service');
const underscore        = require('underscore');
const Utility           = require(constant.path.app + 'util/utility.js');

exports.prize           = (req, res) => {
    const body          = req.body;
    
    const payload       = {
        'name'          : body.name,
        'prizes'        : Object.values(body.prizes)
    }

    prizeService.createPrize(payload, (error, result) => {
        if(error) {
            return res.status(400).json(response.build('ERROR', 
                errorHelper.parseError(error) 
            ));  
        }
        return res.status(200).json(response.build('SUCCESS', { "data" : result }));
    })
}

exports.getAll          = (req, res) => {

    if(req.query.prizeId) {
        req.query       = { _id : Utility.toObjectId(req.query.prizeId) }
    }

    // get all registered prizes
    prizeService.getPrizes(req.query, (error, result) => {
        if(error) {
            return res.status(400).json(response.build('ERROR', 
                errorHelper.parseError(error) 
            ));  
        }
        return res.status(200).json(response.build('SUCCESS', { "data" : result }));
    })
}