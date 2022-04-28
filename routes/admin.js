var express = require('express');
var router = express.Router();
var movieHelpers = require('../helpers/movie-helpers');
var loginHelpers= require('../helpers/login');
var path = require('path')
const multer  = require('multer')
const fs=require('fs');

var storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     if(file.mimetype==='video/mp4'){
       cb(null,'public/videos/')
     }else if(file.originalname.match('poster')){
      cb(null, 'public/images/posters/');
     }else if(file.originalname.match('cover')){
      cb(null, 'public/images/cover/');
     }
     else{
      cb(null, 'public/images/uploads/');
     }    
  }, 
  filename: function (req, file, cb) { 
    let ext= path.extname(file.originalname)
    if(file.originalname.match('cover')){
      cb(null,req.body.name+'cover'+ext);
    }else if(file.originalname.match('poster')){
      cb(null,req.body.name+'poster'+ext);
    }else{
      cb(null,file.fieldname+'-'+Date.now()+ext)
    }
  }
});



const upload = multer({
  storage: storage,
  limits : {fileSize : 10000000}
})

const verifyAdmin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/')
  }
}


//MOVIES SECTION--------------------------------------------------------

router.get('/show-admin-movies',verifyAdmin, function(req, res, next) {
  console.log(req.params.id);
  movieHelpers.getAllMovies().then((movies)=>{
    res.render('admin/show-movies',{movies});
  })
  

});
//ADD MOVIE
router.get('/add-movies',verifyAdmin, function(req, res, next) {
  
  res.render('admin/add-movies');
});


router.post('/add-movies',verifyAdmin, upload.array('image', 15), function (req,res,next) {

  console.log(req.files);
  if(req.files){
    body=req.body
    
    let path = ''
    req.files.forEach(function(files,index,arr){
      path=path+files.path+','
    })
    path=path.substring(0,path.lastIndexOf(","))
    var photos=path.split(',')

    final={...body,photos}
    // console.log(final);
    // req.image= path
    // db.get().collection('movies').insertOne(final).then((data)=>{
    //   res.render("admin/add-movies")
    // })
    movieHelpers.addMovies(final)
  }
  res.redirect('/admin/show-admin-movies')
  
})

//EDIT MOVIE
router.get('/edit-movies/:id',verifyAdmin,async (req,res)=>{
  console.log(req.params.id);
  let movie=await movieHelpers.getOneMovie(req.params.id)
  res.render('admin/edit-movies',{movie})
});
router.post('/edit-movies/:id',verifyAdmin,upload.array('image', 15),function (req,res,next){
  body=req.body
  let releasedateno=req.body.releasedateno
  let ottreleasedateno=req.body.ottreleasedateno
//  Relese Date No Stamp Code
    var myDate = releasedateno;
    myDate = myDate.split("-");
    var newDate = new Date( myDate[2], myDate[1] - 1, myDate[0]);
    var releasedatestamp=newDate.getTime()

 //Ott Release Date No Code
  let myDateOne=ottreleasedateno;
  myDateOne = myDateOne.split("-");
  var newDateOne = new Date( myDateOne[2], myDateOne[1] - 1, myDateOne[0]);
  var ottreleasedatestamp=newDateOne.getTime()



let finalBody={...body,releasedatestamp,ottreleasedatestamp}
console.log(finalBody);
  
  movieHelpers.updateMovie(req.params.id,finalBody)
  res.redirect('/admin/show-admin-movies')

  
})
//ADD IMAGE EXTRA
router.post('/edit-movies-image/:id',verifyAdmin,upload.array('image', 15),function (req,res,next){
  // body=req.body
  if(req.files){
    let path = ''
    req.files.forEach(function(files,index,arr){
      path=path+files.path+','
    })
    path=path.substring(0,path.lastIndexOf(","))
    var imgPath=path.split(',')
    // var imgPath=path

    // final={...body,Spl}
    // console.log(Spl);
    // console.log(req.params.id);
    movieHelpers.updateImage(req.params.id,imgPath)
    
  }
  // body=req.body
  
  res.redirect('/admin/show-admin-movies')

  
})


//DELETE MOviE
router.get('/delete-movies/:id',verifyAdmin,function (req,res,next){

  let moviesId=req.params.id
  console.log(moviesId);
  movieHelpers.deleteMovies(moviesId)
  res.redirect('/admin/show-admin-movies')
});


//Delete Image
router.get('/delete-images/:id',verifyAdmin,function  (req,res,next){

  movieHelpers.getOneMovie(req.params.id).then(async(movie)=>{
      //  let movie=await movieHelpers.getOneMovie(req.params.id)
      //  var Spl=movie.path.split(',')
      // var Spl=movie.Spl
      // let id=req.params.id
      // Spl={...img,id}
    
      // console.log(Spl);
      res.render('admin/image-delete',{movie})
      //  res.render('movies-category/movie',{movie,Spl})
      })
  
  
});
router.post('/delete-images/:id',verifyAdmin,upload.array('image', 15),function  (req,res,next){
   let movieId = req.params.id
   let imageIndex=req.body.index
   movieHelpers.deleteImage(movieId,imageIndex)
 fs.unlink(imageIndex,(err)=>{console.log(err);})
  // movieHelpers.getOneMovie(req.params.id).then(async(movie)=>{
  //     //  let movie=await movieHelpers.getOneMovie(req.params.id)
  //     //  var Spl=movie.path.split(',')
  //     var Spl=movie.Spl
  //     console.log(Spl);
  //     res.render('admin/image-delete',{Spl})
  //     //  res.render('movies-category/movie',{movie,Spl})
  //     })
  
  res.redirect('/admin/show-admin-movies')
});

//Actor Section
router.get('/show-actor',verifyAdmin,function(req, res, next) {
  movieHelpers.getAllActor().then((actor)=>{
    res.render('admin/show-actor',{actor});
  })
  
});
// router.get('/show-actor',verifyAdmin, function(req, res, next) {
//   movieHelpers.getAllActor().then((actor)=>{
//     res.render('admin/show-actor',{actor});
//   })
  
// });
//ACTOR ADD
router.get('/add-actor',verifyAdmin, function(req, res, next) {
  res.render('admin/add-actor');
});

router.post('/add-actor',verifyAdmin,upload.array('image', 15),(req,res)=>{

  if(req.files){
    body=req.body
    
    let path = ''
    req.files.forEach(function(files,index,arr){
      path=path+files.path+','
    })
    path=path.substring(0,path.lastIndexOf(","))
    var photos=path.split(',')

    final={...body,photos}
    // console.log(final);
    // req.image= path
    // db.get().collection('movies').insertOne(final).then((data)=>{
    //   res.render("admin/add-movies")
    // })
    movieHelpers.addActor(final)
  }
  res.redirect('/admin/show-actor')
  
})



//EDIT ACTOR
router.get('/edit-actor/:id',verifyAdmin,async (req,res)=>{
  
  let actor=await movieHelpers.getOneActor(req.params.id)
  
  res.render('admin/edit-actor',{actor})
});

router.post('/edit-actor/:id',verifyAdmin,upload.array('image', 15),(req,res)=>{
  
  // let id=req.params.id
  movieHelpers.updateActor(req.params.id,req.body).then(()=>{
    res.redirect('/admin/show-actor')
  })
})
//ADD Actor IMAGE EXTRA
router.post('/edit-actor-image/:id',verifyAdmin,upload.array('image', 15),function (req,res,next){
  // body=req.body
  if(req.files){
    let path = ''
    req.files.forEach(function(files,index,arr){
      path=path+files.path+','
    })
    path=path.substring(0,path.lastIndexOf(","))
    var imgPath=path.split(',')
    // var imgPath=path

    // final={...body,Spl}
    // console.log(Spl);
    // console.log(req.params.id);
    movieHelpers.updateActorImage(req.params.id,imgPath)
    
  }
  // body=req.body
  
  res.redirect('/admin/show-actor')

  
})
//Delete ACTOR Image
router.get('/delete-actor-images/:id',verifyAdmin,function  (req,res,next){
  movieHelpers.getOneActor(req.params.id).then(async(actor)=>{
      res.render('admin/actor-image-delete',{actor})
      })
  
  
});

router.post('/delete-actor-images/:id',verifyAdmin,upload.array('image', 15),function  (req,res,next){
  let imageId = req.params.id
  let imageIndex=req.body.index
  // console.log(imageId,imageIndex);
  movieHelpers.deleteActorImage(imageId,imageIndex)
// fs.unlink(imageIndex,(err)=>{console.log(err);})
 
 res.redirect('/admin/show-actor')
});

//DELETE ACTOR
router.get('/delete-actor/:id',verifyAdmin,(req,res)=>{
  let actorId=req.params.id
  movieHelpers.deleteActor(actorId).then((response)=>{
    res.redirect('/admin/show-actor')
  })
});




































// const verifyAdmin=(req,res,next)=>{
//   if(req.session.loggedIn){
//     next()
//   }else{
//     res.redirect('/malayalam-movies')
//   }
// }
























//BASIC PAGE ADMIN
router.get('/',verifyAdmin, function(req, res, next) {
  res.render('admin/basic-section');
});


// //ACTOR SECTION
// router.get('/show-actor',function(req, res, next) {
//   movieHelpers.getAllActor().then((actor)=>{
//     res.render('admin/show-actor',{actor});
//   })
  
// });
// // router.get('/show-actor',verifyAdmin, function(req, res, next) {
// //   movieHelpers.getAllActor().then((actor)=>{
// //     res.render('admin/show-actor',{actor});
// //   })
  
// // });
// //ACTOR ADD
// router.get('/add-actor', function(req, res, next) {
//   res.render('admin/add-actor');
// });

// router.post('/add-actor',(req,res)=>{
//   movieHelpers.addActor(req.body,(id)=>{
//     let actorposter=req.files.image
//     actorposter.mv("./public/images/celebs-posters/" + id + ".jpg",(err,done)=>{
//         if(!err){
//           res.render("admin/add-actor")
//         }else{
//           console.log(err);
//         }
//     })
  
//   })
// })



// //EDIT ACTOR
// router.get('/edit-actor/:id',async (req,res)=>{
  
//   let actor=await movieHelpers.getOneActor(req.params.id)
  
//   res.render('admin/edit-actor',{actor})
// });

// router.post('/edit-actor/:id',(req,res)=>{
  
//   let id=req.params.id
//   movieHelpers.updateActor(req.params.id,req.body).then(()=>{
//     res.redirect('/admin/show-actor')
//     if(req.files.image){
//       let actorposter=req.files.image
//       actorposter.mv("./public/images/celebs-posters/" + id + ".jpg",)
//     }
//   })
// })


// //DELETE ACTOR
// router.get('/delete-actor/:id',(req,res)=>{
//   let actorId=req.params.id
//   movieHelpers.deleteActor(actorId).then((response)=>{
//     res.redirect('/admin/show-actor')
//   })
// });


// //MOVIES SECTION--------------------------------------------------------

// router.get('/show-admin-movies', function(req, res, next) {
//   console.log(req.params.id);
//   movieHelpers.getAllMovies().then((movies)=>{
//     res.render('admin/show-movies',{movies});
//   })
  

// });
// //ADD MOVIE
// router.get('/add-movies', function(req, res, next) {
  
//   res.render('admin/add-movies');
// });

// router.post('/add-movies',(req,res)=>{
//   movieHelpers.addMovies(req.body,(id)=>{
//     let movieposter=req.files.image
//     movieposter.mv("./public/images/movie-posters/" + id + ".jpg",(err,done)=>{
//         if(!err){
//           res.render("admin/add-movies")
//         }else{
//           console.log(err);
//         }
//       })
    
//   })
// });



// //EDIT MOVIE
// router.get('/edit-movies/:id',async (req,res)=>{
//   console.log(req.params.id);
//   let movie=await movieHelpers.getOneMovie(req.params.id)
//   res.render('admin/edit-movies',{movie})
// });

// router.post('/edit-movies/:id',(req,res)=>{
//   console.log(req.param.id);
//   let id=req.params.id
//   movieHelpers.updateMovie(req.params.id,req.body).then(()=>{
//     res.redirect('/admin/show-admin-movies')
//     if(req.files.image){
//       let movieposter=req.files.image
//       movieposter.mv("./public/images/movie-posters/" + id + ".jpg",)
//     }
//     else if
//     (req.files.image1){
//       let movieposter=req.files.image1
//       movieposter.mv("./public/images/movie-posters/" + id +"a"+".jpg",)
//     }
//   })
// })


// //DELETE MOviE
// router.get('/delete-movies/:id',(req,res)=>{
//   let moviesId=req.params.id
//   movieHelpers.deleteMovies(moviesId).then((response)=>{
//     res.redirect('/admin/show-admin-movies')
//   })
// });


// //NEXT WEEK MOVIES------------------------------------------
// //SHOW
// router.get('/show-nextweek-movies',function(req, res, next) {
//   movieHelpers.getAllNextweek().then((nextweek)=>{
//     res.render('admin/next-week/show-nextweek',{nextweek});
//   })
  

// });
// //ADD
// router.get('/add-nextweek-movies',function(req, res, next) {
  
//   res.render('admin/next-week/add-nextweek');
// });
// router.post('/add-nextweek-movies',(req,res)=>{
//   movieHelpers.addNextweek(req.body,(result)=>{
//     res.render("admin/next-week/add-nextweek")   
    
//   })
// });
// //EDIT
// router.get('/edit-nextweek/:id',async (req,res)=>{
//   let nextweek=await movieHelpers.getOneNextweek(req.params.id)
//   res.render('admin/next-week/edit-nextweek',{nextweek})
// });

// router.post('/edit-nextweek/:id',(req,res)=>{
//   movieHelpers.updateNextweek(req.params.id,req.body).then(()=>{
//     res.redirect('/admin/show-nextweek-movies')
//   })
// })
// //DELETE
// router.get('/delete-nextweek/:id',(req,res)=>{
//   let nextweekId=req.params.id
//   movieHelpers.deleteNextweek(nextweekId).then((response)=>{
//     res.redirect('/admin/show-nextweek-movies')
//   })
// });

// //Cover Image Movies Add----------------------------------
// router.get('/show-cover', function(req, res, next) {
//   movieHelpers.getAllCover().then((cover)=>{
//     res.render('admin/cover-update/show-cover',{cover});
//   })
  

// });
// //ADD
// router.get('/add-cover', function(req, res, next) {
  
//   res.render('admin/cover-update/add-cover');
// });
// router.post('/add-cover',(req,res)=>{
//   movieHelpers.addCover(req.body,(result)=>{
//     res.render("admin/cover-update/add-cover")   
    
//   })
// });
// //EDIT
// router.get('/edit-cover/:id',async (req,res)=>{
//   let cover=await movieHelpers.getOneCover(req.params.id)
//   res.render('admin/cover-update/edit-cover',{cover})
// });
// router.post('/edit-cover/:id',(req,res)=>{
//   movieHelpers.updateCover(req.params.id,req.body).then(()=>{
//     res.redirect('/admin/show-cover')
//   })
// })
// //DELETE
// router.get('/delete-cover/:id',(req,res)=>{
//   let coverId=req.params.id
//   movieHelpers.deleteCover(coverId).then((response)=>{
//     res.redirect('/admin/show-cover')
//   })
// });

// //LAST UPDATE------------------------------------------
// //SHOW
// router.get('/show-last-update', function(req, res, next) {
//   movieHelpers.getAllLastUpdate().then((lastlinksupdate)=>{
//     res.render('admin/last-update/show-last-update',{lastlinksupdate});
//   })
  

// });
// //ADD
// router.get('/add-last-update', function(req, res, next) {
  
//   res.render('admin/last-update/add-last-update');
// });
// router.post('/add-last-update',(req,res)=>{
//   movieHelpers.addLastUpdate(req.body,(result)=>{
//     res.render('admin/last-update/add-last-update')   
    
//   })
// });
// //EDIT
// router.get('/edit-last-update/:id',async (req,res)=>{
//   let lastlinksupdate=await movieHelpers.getOneLastUpdate(req.params.id)
//   res.render('admin/last-update/edit-last-update',{lastlinksupdate})
// });

// router.post('/edit-last-update/:id',(req,res)=>{
//   movieHelpers.updateLastUpdate(req.params.id,req.body).then(()=>{
//     res.redirect('/admin/show-last-update')
//   })
// })
// //DELETE
// router.get('/delete-last-update/:id',(req,res)=>{
//   let lastUpdateId=req.params.id
//   movieHelpers.deleteLastUpdate(lastUpdateId).then((response)=>{
//     res.redirect('/admin/show-last-update')
//   })
// });


//LOGIN-------------------------------------------------------
router.get('/97login', function(req, res, next) {
  if(req.session.loggedIn){
    res.redirect('/admin')
  }else
  res.render('admin/login');
});
router.post('/97login',(req,res)=>{
loginHelpers.doLogin(req.body).then((response)=>{
  if(response.status){
    req.session.loggedIn=true
    req.session.admin=response.admin
    res.redirect('/admin')
  }else{
    res.redirect('/')
  }
})
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})
//SIGNUP
router.get('/97signup', function(req, res, next) {
  res.render('admin/signup');
});
router.post('/97signup',(req,res)=>{
  
  loginHelpers.doSignup(req.body).then((response)=>{
    res.render('admin/login');
  })
})




module.exports = router;
