

const authorizeRole=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role))
        return res.status(403).send({ success: false, message:
            'Accès non autorisé' });
                next()
    }
}
module.exports={authorizeRole}