const {format} = require('timeago.js')

//se utiliza para formatear fecha y hora. por ejemplo: 'hace 3 horas'.
const helpers = {};

helpers.timeago = (timestamp)=>{
    return format(timestamp);
};

helpers.compare = (conditional, optional)=>{
    if(conditional.rolesId == 1){
        return optional.fn(this);
    }
}
module.exports = helpers;