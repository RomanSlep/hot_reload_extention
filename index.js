const port= 33233;
const conf_path=process.argv.reverse()[0] || 'conf.json';
const { path, ex_id } = require(conf_path.replace('/','./'));
const watch = require('node-watch');
const io = require('socket.io').listen(port);
let ex_io;

console.log(`Start wather path "${path}" on port ${port}.`);

io.sockets.on('connection', socket => {
    console.log('Success connect EX');
    ex_io=socket;
    ex_io.on('get_id', () => ex_io.emit('set_id', {ex_id}));
});

watch(path, {
    recursive: true
}, (evt, name) => {
    console.log('%s changed.', name, evt);
    ex_io.emit('change');
});