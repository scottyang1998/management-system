//@login register
const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require("../../models/Profile");

//$router GET api/profiles/ydc2020
//@desc  返回请求的json数据
//@access public
router.get("/ydc2020",(req,res)=>{
    res.json({msg:"profile works"})
})

// //$router POST api/profiles/add
// //@desc  创建信息接口
// //@access private
router.post("/add",passport.authenticate('jwt',{session:false}),(req,res)=>{
    const profileFields = {};

    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.describe) profileFields.describe = req.body.describe;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expend) profileFields.expend = req.body.expend;
    if(req.body.cash) profileFields.cash = req.body.cash;
    if(req.body.remark) profileFields.remark = req.body.remark;   

    new Profile(profileFields).save().then(profile=>{
        res.json(profile);
    }) 
})


// //$router get api/profiles/
// //@desc  获取所有信息
// //@access private
router.get("/",passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.find()
    .then(profile=>{
        if(!profile){
            return res.status(404).json("没有任何内容");
        }
        res.json(profile);
    })
    .catch(err=>res.status(404).json(err));
})

// //$router get api/profiles/:id
// //@desc  获取单个信息
// //@access private
router.get(
    "/:id",
    passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOne({_id:req.params.id})
    .then(profile=>{
        if(!profile){
            return res.status(404).json("没有任何内容");
        }
        res.json(profile);
    })
    .catch(err=>res.status(404).json(err));
})



// //$router POST api/profiles/edit
// //@desc  编辑信息接口
// //@access private
router.post(
    "/edit/:id",
    passport.authenticate('jwt',{session:false}),(req,res)=>{
    const profileFields = {};

    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.describe) profileFields.describe = req.body.describe;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expend) profileFields.expend = req.body.expend;
    if(req.body.cash) profileFields.cash = req.body.cash;
    if(req.body.remark) profileFields.remark = req.body.remark;   

    Profile.findOneAndUpdate(
        {_id:req.params.id},
        {$set:profileFields},
        {new:true}
    ).then(profile=>res.json(profile))
})


// //$router POST api/profiles/delete/:id
// //@desc  删除信息接口
// //@access private
router.delete(
    "/delete/:id",
    passport.authenticate('jwt',{session:false}),(req,res)=>{
    Profile.findOneAndRemove({_id:req.params.id})
    .then(profile=>{
        profile.save().then(profile=>res.json(profile))
    })
    .catch(err=>res.status(404).json("删除失败"));
})

module.exports = router;














// router.post("/register",(req,res)=>{
//     //console.log(req.body);
//     //查询数据库是否拥有邮箱
//     User.findOne({email:req.body.email})
//         .then((user)=>{
//             if(user){
//                 return res.status(400).json("邮箱已被注册")
//             }else{
//                 const avatar = gravatar.url(req.body.email, {s: '200', r:'pg', d:'mm'});

//                 const newUser = new User({
//                     name:req.body.name,
//                     email:req.body.email,
//                     avatar,
//                     password:req.body.password,
//                     identity:req.body.identity
//                 })

//                 bcrypt.genSalt(10, function(err,salt){
//                     bcrypt.hash(newUser.password, salt, (err,hash)=>{
//                         //store hash in your password db
//                         if(err) throw err;

//                         newUser.password = hash;

//                         newUser.save()
//                                 .then(user=>res.json(user))
//                                 .catch(err=>console.log(err));
//                     });
//                 });
//             }
//         })
// })


// //$router POST api/users/test
// //@desc  返回token jwt passport
// //@access public
// router.post("/login",(req,res)=>{
//     const email = req.body.email;
//     const password = req.body.password;
//     //查询数据库
//     User.findOne({email})
//         .then(user=>{
//             if(!user){
//                 return res.status(404).json("用户不存在");
//             }

//             //密码匹配
//             bcrypt.compare(password, user.password)
//                 .then(isMatch=>{
//                     if(isMatch){
//                         //jwt.sign("规则","加密名字","过期时间","箭头函数")
//                         const rule = {
//                             id:user.id, 
//                             name:user.name,
//                             avatar:user.avatar,
//                             identity:user.identity
//                         }
//                         jwt.sign(rule,db.secretOrKey,{expiresIn:3600},(err,token)=>{
//                             if(err) throw err;
//                             res.json({
//                                 success:true,
//                                 token:"Bearer "+token
//                             });
//                         })
//                         //res.json({msg:"success"});
//                     }else{
//                         return res.status(400).json("密码错误");
//                     }
//                 })

//         })
// })

// //$router POST api/users/current
// //@desc  返回token current user
// //@access private
// router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
//     res.json({
//         id:req.user.id,
//         name:req.user.name,
//         email:req.user.email,
//         identity:req.user.identity
//     });
// })
