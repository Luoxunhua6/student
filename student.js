/**
 * Created by lenovo on 2018/10/26.
 */
var fs=require('fs');


exports.find=function(path,callback){
    fs.readFile(path,function(err,data){
        if(err){
            return callback(err);
        }
        callback(null,data);
    });
};
/**
 *添加学生信息保存
 */
exports.save=function (newStudent,callback){
    fs.readFile('./db.json',function(err,data){
        if(err){
            return callback(err);
        }
        var stu=JSON.parse(data);
        newStudent.id=parseInt(newStudent.id);
        stu.push(newStudent);
        stu=JSON.stringify(stu);
        fs.writeFile('./db.json',stu,function(err){
            if(err){
                return callback(err);
            }
            callback(null);
        });
    });
};

/**
 *编辑学生信息保存
 */
exports.edit=function(id,obj,callback){
    fs.readFile('./db.json',function(err,data){
        if(err){
            return callback(err);
        }
        var stu=JSON.parse(data);
        var editStudent={};
        for(var i=0;i<stu.length;i++){
            if(stu[i].id===id){
                editStudent=stu[i];
            }
        }
        if(obj!==null){
            for(key in obj){
                if(typeof(editStudent[key])==='number'){
                    obj[key]=parseInt(obj[key]);
                }
                editStudent[key]=obj[key];
            }
        }
        for(var i=0;i<stu.length;i++){
            if(stu[i].id===id){
                stu[i]=editStudent;
            }
        }
        stu=JSON.stringify(stu);
        fs.writeFile('./db.json',stu,function(err){
            if(err){
                return callback(err);
            }
            callback(null,editStudent);
        });
    });
};

/**
 *删除学生信息保存
 */
exports.delete=function(id,callback){
    fs.readFile('./db.json',function(err,data){
        if(err){
            return callback(err);
        }
        var stu=JSON.parse(data);
        var index=0;
        for(index;index<stu.length;index++){
            if(stu[index].id===id){
                break;
            }
        }
        stu.splice(index,1);
        stu=JSON.stringify(stu);
        fs.writeFile('./db.json',stu,function(err){
            if(err){
                return callback(err);
            }
            callback(null);
        })
    });
};