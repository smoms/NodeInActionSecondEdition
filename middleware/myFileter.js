'use strict';

module.exports = (req, res, next) => {
    const uid = req.session.uid;
    if (!uid) {
        res.status(`401`);
        res.render('error', {message: `Error: Must be authenticated`, error: '', stack: ''});    
    }
    else{
        return next();
    }
    
  };