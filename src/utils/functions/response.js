

function _400response(res, msg )
{
    return res.status(400).json({ success: false, message: msg })
}


function _409response(res, msg )
{
    return res.status(409).json({ success: false, message: msg })
}


module.exports = { _400response, _409response} 