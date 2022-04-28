var express = require('express');
app = express();
var router = express.Router();
var movieHelpers = require('../helpers/movie-helpers');
var getHelp =require('../helpers/gethelp');
const gethelp = require('../helpers/gethelp');


// router.get('/', function(req, res, next) {
//   getHelp.getLatestUpdate(req,res).then((latestupdatemovies)=>{
//     getHelp.getLatestNextweek(req,res).then((nextweekmovies)=>{
//       getHelp.getLatestUpdates(req,res).then((latestupdates)=>{

//         res.render('index',{latestupdatemovies,nextweekmovies,latestupdates})

//       })
//     })

//   }) 
  
// });

router.get('/', function(req, res, next) {
      getHelp.getUpcomingReleaseMovies(req,res).then((upTmovies)=>{
        getHelp.getUpcomingOttMovies(req,res).then((upOmovies)=>{
          getHelp.allMovies(req,res).then((allmovies)=>{
            getHelp.getReleasedMovies(req,res).then((rmovies)=>{
             res.render('index',{upTmovies,upOmovies,allmovies,rmovies})
            }) 
          })  
        })
      }) 
  
});
router.get('/upcoming-movies', function(req, res, next) {
  getHelp.getUpcomingReleaseAllMovies(req,res).then((upallmovies)=>{
    getHelp.getLatestUpdate(req,res).then((latestupdatemovies)=>{
    res.render('movies-category/up-t-movies',{upallmovies,latestupdatemovies});
    })
  }) 
});
router.get('/upcoming-ott-movies', function(req, res, next) {
  getHelp.getUpcomingOttAllMovies(req,res).then((ottAllMovies)=>{
    getHelp.getLatestUpdate(req,res).then((latestupdatemovies)=>{
    res.render('movies-category/up-ott-movies',{ottAllMovies,latestupdatemovies});
    })
  }) 
});
// router.get('/', function(req, res, next) {
//   getHelp.getLatestUpdate(req,res).then((latestupdatemovies)=>{
//     getHelp.getLatestNextweek(req,res).then((nextweekmovies)=>{
//       getHelp.getLatestUpdates(req,res).then((latestupdates)=>{
//         getHelp.getCoverUpdates(req,res).then((cover)=>{
//           getHelp.allMovies(req,res).then((allmovies)=>{

//             res.render('index',{latestupdatemovies,nextweekmovies,latestupdates,cover,allmovies})
//           })  
//         })
//       })
//     })

//   }) 
  
// });
router.get('/movie/:id', (req,res)=>{
  getHelp.getUpcomingOttMovies(req,res).then((upOmovies)=>{
    getHelp.getUpcomingReleaseMovies(req,res).then((upTmovies)=>{
      getHelp.getReleasedMovies(req,res).then(async(rmovies)=>{
       let movie=await movieHelpers.getOneMovie(req.params.id)
       let photos=movie.photos.slice(0,9)
       res.render('movies-category/movie',{movie,upOmovies,upTmovies,rmovies,photos})
      })
    })
  })
});
// router.get('/movie/:id', (req,res)=>{
//   getHelp.getLatestUpdate(req,res).then((latestupdatemovies)=>{
//     getHelp.getLatestNextweek(req,res).then((nextweekmovies)=>{
//       getHelp.getTrendingMovies(req,res).then(async(trendingmovies)=>{
//        let movie=await movieHelpers.getOneMovie(req.params.id)
//        res.render('movies-category/movie',{movie,latestupdatemovies,nextweekmovies,trendingmovies})
//       })
//     })
//   })
// });


router.get('/malayalam-movies', function(req, res, next) {
  getHelp.getMalayalamMovies(req,res).then((malayalamMovies)=>{
    getHelp.getLatestUpdate(req,res).then((latestupdatemovies)=>{
    res.render('movies-category/malayalam-movies',{malayalamMovies,latestupdatemovies});
    })
  }) 
});

router.get('/images/:id', async function(req, res, next) {
    let id=req.params.id
    let movie=await movieHelpers.getOneMovie(id)
    res.render('movies-category/images',{movie});
});

router.get('/celeb-images/:id', async function(req, res, next) {
  let id=req.params.id
  let celeb=await movieHelpers.getOneActor(id)
  res.render('movies-category/celeb-images',{celeb});
});


// router.get('/celebritys', function(req, res, next) {
//   movieHelpers.getAllActor(req,res).then((actor)=>{
//     getHelp.getLatestUpdate(req,res).then((latestupdatemovies)=>{
//      res.render('actor/actors-show',{actor,latestupdatemovies});
//     })
//   })
// });

//ONE ACTOR
// router.get('/profile/:id', (req,res)=>{
//   getHelp.getLatestUpdate(req,res).then(async (latestupdatemovies)=>{
//    let celebs=await movieHelpers.getOneActor(req.params.id)
//    let celebMovies=await movieHelpers.celebMovies(req.params.id)
//     res.render('actor/celebs',{celebs,latestupdatemovies,celebMovies})
//   }).catch((err)=>{
//     console.log('Err');
//   })
// });

router.get('/profile/:id', (req,res)=>{
  getHelp.getLatestUpdate(req,res).then(async (latestupdatemovies)=>{
   let celebs=await movieHelpers.getOneActor(req.params.id).then().catch((err)=>{
     res.redirect('/error')
     console.log('ERROR IN GET A ONE ACTOR Databse'+ err);})
   let celebMovies=await movieHelpers.celebMovies(req.params.id)
   let nextRmovies=await getHelp.getUpcomingReleaseAllMovies()
    res.render('actor/celebs',{celebs,latestupdatemovies,celebMovies,nextRmovies})
   }).catch((err)=>{
    console.log('Err');
  })
});


//Terms and Conditions
router.get('/terms-conditions', function(req, res, next) {
    res.render('partials/terms-condtions')
});
//Privacy Policy
router.get('/privacy-policy', function(req, res, next) {
  res.render('partials/privacy-policy')
});
//Contact Us 
router.get('/contact',async function(req, res, next) {
  
 


  res.render('partials/contact')
});
//Static

app.use(express.static('public'));

module.exports = router;
