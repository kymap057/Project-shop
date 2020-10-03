

module.exports.getPageLogin = (req,res,next)=>{
   // console.log('login', req.session)
    res.render('./admin/login',{
        title: 'Login'
    })
}
module.exports.getHome =(req,res,next)=>{
    console.log(req.session)
    if(req.session.user){
        return res.render('./admin/home',{
            title:'Home'
        })
    }
    res.redirect('/login')
}
module.exports.postLogin = async(req,res,next)=>{
    res.redirect('/home');
}