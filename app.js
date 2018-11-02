/**
 * Created by lenovo on 2018/10/26.
 */
var express=require('express');
var bodyParser=require('body-parser');

var app=express();

app.engine('html',require('express-art-template'));

var router=require('./router');

app.use(bodyParser.urlencoded({extand:false}));
app.use(bodyParser.json());
app.use('/public',express.static('./public'));
app.use(router);


app.listen(3000,function(){
    console.log('running......');
});