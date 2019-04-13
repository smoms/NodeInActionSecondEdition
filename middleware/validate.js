'use strict';

function parseField(field) {
    return field
        .split(/\[|\]/)
        .filter((s) => s);
}
function getField(req, field) {
    console.log(field);
    let val = req.body;
    console.log('val before');
    console.log(val);
    field.forEach((prop) => {
        val = val[prop];
    });
    console.log('val after');
    console.log(val);
    return val;
}
exports.required = (field) => {
    field = parseField(field);
    return (req, res, next) => {
        
        if (getField(req, field)) {
            next();
        } else {
            res.status(`${field.join(' ')} is required`);
            res.redirect('back');
        }
    };
};
exports.lengthAbove = (field, len) => {
    field = parseField(field);
    return (req, res, next) => {
        if (getField(req, field).length > len) {
            next();
        } else {
            const fields = field.join(' ');
            res.status(`402`);
            res.render('error', {message: `Error: ${fields} must have more than ${len} characters`, error: '', stack: ''});
            //res.redirect('back');
            // var err_message = `Error: ${fields} must have more than ${len} characters`;
            // var err_stack_message = `This is a super error stack trace..`;
            // next({message: err_message, stack: err_stack_message});
        }
    };
};