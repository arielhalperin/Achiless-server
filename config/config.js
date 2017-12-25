module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'dev':
        case 'prod':
            return require('./' + process.env.NODE_ENV + '.json');
        default:
            console.error("no configuration found");
    }
};
