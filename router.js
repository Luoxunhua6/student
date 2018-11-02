/**
 * Created by lenovo on 2018/10/26.
 */
var fs=require('fs');
var express=require('express');
var Student=require('./student');

var router=express.Router();

//views get方式访问

//显示信息页面
router.get('/student',function(req,res){
    Student.find('./db.json',function(err,data){
       if(err){
           return res.status(500);
       }
       res.render('index.html',{
           students:JSON.parse(data)
       });
    });
});


//添加学生页面
router.get('/student/add',function(req,res){
    Student.find('./views/add.html',function(err,data){
        if(err){
            return res.status(500);
        }
        res.end(data);
    });
});
router.post('/student/add',function(req,res){
    var newStudent=req.body;
    Student.save(newStudent,function(err){
        if(err){
            return res.status(500);
        }
        res.redirect('/student');
    });
});

//编辑学生页面
router.get('/student/edit',function(req,res){
    var id=parseInt(req.query.id);
    Student.edit(id,null,function(err,editStudent){
        if(err){
           return;
        }
        res.render('edit.html',{
            editStudent:editStudent
        });
    });
});
router.post('/student/edit',function(req,res){
    var obj=req.body;
    Student.edit(parseInt(obj.id),obj,function(err,editStudent){
        if(err){
            return;
        }
        res.redirect('/student');
    });
});

router.get('/student/delete',function(req,res){
    var id=parseInt(req.query.id);
    Student.delete(id,function(err){
        if(err){
            return;
        }
        res.redirect('/student');
    })
});
module.exports=router;