
var db=require('../dbconnection/connection')
var collection=require('../dbconnection/collections')
var {ObjectID}=require('mongodb');
const { response } = require('express');




module.exports={

    addMovies:(movies,callback)=>{
        console.log(movies);
        db.get().collection('movies').insertOne(movies).then((data)=>{
            callback(data.ops[0]._id)
        })
    
    },
    getAllMovies:()=>{
        return new Promise(async(resolve,reject)=>{
            let movies=await db.get().collection(collection.MOVIES_COLLECTION).find().toArray()
            resolve(movies)
        })
    },
    getOneMovie: (movieId) => {
       
        return new Promise( async (resolve,reject) => {
          let movies = await db.get()
            .collection(collection.MOVIES_COLLECTION)
            .findOne({ _id:ObjectID(movieId)})
           resolve(movies)
        });
      },
      updateMovie:(movieId,movieDetails)=>{
        console.log(movieDetails);
        return new Promise((resolve,reject)=>{
            console.log(movieDetails);
            db.get().collection(collection.MOVIES_COLLECTION).updateOne({_id:ObjectID(movieId)},{
                $set:{
                    name:movieDetails.name,
                    seoname:movieDetails.seoname,
                    releasedateno:movieDetails.releasedateno,
                    releasedatestamp:movieDetails.releasedatestamp,
                    ottreleasedateno:movieDetails.ottreleasedateno,
                    ottreleasedatestamp:movieDetails.ottreleasedatestamp,
                    language:movieDetails.language,
                    type:movieDetails.type,
                    country:movieDetails.country,
                    releasedate:movieDetails.releasedate,
                    releaseyear:movieDetails.releaseyear,
                    ottreleasedate:movieDetails.ottreleasedate,
                    director:movieDetails.director,
                    directorlink:movieDetails.directorlink,
                    written:movieDetails.written,
                    writtenlink:movieDetails.writtenlink,
                    producer:movieDetails.producer,
                    producerlink:movieDetails.producerlink,
                    genre:movieDetails.genre,
                    duration:movieDetails.duration,
                    budget:movieDetails.budget,
                    profit:movieDetails.profit,
                    watchlink:movieDetails.watchlink,
                    trailorlink:movieDetails.trailorlink,
                    video:movieDetails.video,
                    story:movieDetails.story,
                    paragraph:movieDetails.paragraph,
                    review:movieDetails.review,
                    actid1:movieDetails.actid1,
                    actid2:movieDetails.actid2,
                    actid3:movieDetails.actid3,
                    actid4:movieDetails.actid4,
                    actid5:movieDetails.actid5,
                    actid6:movieDetails.actid6,
                    coverr:movieDetails.coverr,
                    actorname1:movieDetails.actorname1,
                    actorname2:movieDetails.actorname2,
                    actorname3:movieDetails.actorname3,
                    actorname4:movieDetails.actorname4,
                    actorname5:movieDetails.actorname5,
                    actorname6:movieDetails.actorname6,
                    mvactorname1:movieDetails.mvactorname1,
                    mvactorname2:movieDetails.mvactorname2,
                    mvactorname3:movieDetails.mvactorname3,
                    mvactorname4:movieDetails.mvactorname4,
                    mvactorname5:movieDetails.mvactorname5,
                    mvactorname6:movieDetails.mvactorname6,
                    actornameline1:movieDetails.actornameline1,
                    actornameline2:movieDetails.actornameline2,
                    actornameline3:movieDetails.actornameline3,
                    actornameline4:movieDetails.actornameline4,
                    actornameline5:movieDetails.actornameline5,
                    actornameline6:movieDetails.actornameline6,


                }
            }).then((response)=>{
                resolve()
            })
        })
    },
    updateImage:(imageId,imgPath)=>{
        console.log(imageId);
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.MOVIES_COLLECTION).updateMany({_id:ObjectID(imageId)},{
                $push:{photos:{$each:imgPath}}
            }).then((response)=>{
                resolve()
            })
        })
    },
    deleteImage:(movieId,imageIndex)=>{
        console.log(movieId,imageIndex);
        return new Promise((resolve,reject)=>{
            console.log(movieId,imageIndex);
            db.get().collection(collection.MOVIES_COLLECTION).updateOne({_id:ObjectID(movieId)},{
                $pull:{photos:{$in:[imageIndex]}}}).then((response)=>{
                    
                resolve()
            })
        })
    },

    deleteMovies:(moviesId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.MOVIES_COLLECTION).removeOne({_id:ObjectID(moviesId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    addActor:(actor,callback)=>{
        
        db.get().collection('actor').insertOne(actor).then((data)=>{
            callback(data.ops[0]._id)
        })
    
    },
    getAllActor:()=>{
        return new Promise(async(resolve,reject)=>{
            let actor=await db.get().collection(collection.ACTOR_COLLECTION).find().toArray()
            resolve(actor)
        })
    },
    getOneActor:(actorId) => {
       
        return new Promise((resolve,reject) => {

          db.get()
            .collection(collection.ACTOR_COLLECTION)
            .findOne({ _id:ObjectID(actorId)})
            .then((actor) => {
                // console.log(movie);
              resolve(actor);
            // reject()
            });
        });
      },
      updateActor:(actorId,actorDetails)=>{
          console.log(actorId,actorDetails);
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.ACTOR_COLLECTION).updateOne({_id:ObjectID(actorId)},{
                $set:{
                    name:actorDetails.name,
                    language:actorDetails.language,
                    birthday:actorDetails.birthday,
                    yearactive:actorDetails.yearactive,
                    occupation:actorDetails.occupation,
                    instalink:actorDetails.instalink,
                    twitlink:actorDetails.twitlink,
                    biography:actorDetails.biography,
                    video:actorDetails.video
                }
            }).then((response)=>{
                resolve()
            })
        })
    },
    updateActorImage:(imageId,imgPath)=>{
        console.log(imageId);
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.ACTOR_COLLECTION).updateMany({_id:ObjectID(imageId)},{
                $push:{photos:{$each:imgPath}}
            }).then((response)=>{
                resolve()
            })
        })
    },
    deleteActorImage:(imageId,imageIndex)=>{
        console.log(imageId,imageIndex);
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.ACTOR_COLLECTION).updateOne({_id:ObjectID(imageId)},{
                $pull:{photos:{$in:[imageIndex]}}}).then((response)=>{
                    
                resolve()
            })
        })
    },
    deleteActor:(actorId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.ACTOR_COLLECTION).removeOne({_id:ObjectID(actorId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    celebMovies:(actorId)=>{
        return new Promise (async(resolve,reject)=>{
            IDD=actorId
            let moviesList=await db.get().collection(collection.MOVIES_COLLECTION).aggregate([
                // {$match:{seoname:(IDD)}}
                {$match:{$or:[{actid1:(IDD)},{actid2:(IDD)},{actid3:(IDD)},{actid4:(IDD)},{actid5:(IDD)},{actid6:(IDD)}]}},
                {$sort:{_id:-1}}
                
            ]).toArray() .then((moviesList) => {
                // console.log(movie);
              resolve(moviesList);
            });
            
        })
    },
    addNextweek:(nextweek,callback)=>{
        
        db.get().collection('nextweek').insertOne(nextweek).then((data)=>{
            callback(true)
        })
    
    },
    getAllNextweek:()=>{
        return new Promise(async(resolve,reject)=>{
            let nextweek=await db.get().collection(collection.NEXT_WEEK_COLLECTION).find().sort({_id:-1}).toArray()
            resolve(nextweek)
        })
    },
    getOneNextweek:(nextweekId) => {
       
        return new Promise((resolve,reject) => {

          db.get()
            .collection(collection.NEXT_WEEK_COLLECTION)
            .findOne({ _id:ObjectID(nextweekId)})
            .then((nextweek) => {
              resolve(nextweek);
            });
        });
    },
      updateNextweek:(nextweekId,nextweekDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.NEXT_WEEK_COLLECTION).updateOne({_id:ObjectID(nextweekId)},{
                $set:{
                    moviename:nextweekDetails.moviename,
                    moviereleasedate:nextweekDetails.moviereleasedate,
                    movieid:nextweekDetails.movieid,
                
                }
            }).then((response)=>{
                resolve()
            })
        })
      },
    deleteNextweek:(nextweekId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.NEXT_WEEK_COLLECTION).removeOne({_id:ObjectID(nextweekId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    addLastUpdate:(lastupdate,callback)=>{
        
        db.get().collection('lastupdate').insertOne(lastupdate).then((data)=>{
            callback(true)
        })
    
    },
    getAllLastUpdate:()=>{
        return new Promise(async(resolve,reject)=>{
            let lastlinksupdate=await db.get().collection(collection.LAST_UPDATE).find().sort({_id:-1}).toArray()
            resolve(lastlinksupdate)
        })
    },
    getOneLastUpdate:(lastupdateId) => {
       
        return new Promise((resolve,reject) => {

          db.get()
            .collection(collection.LAST_UPDATE)
            .findOne({ _id:ObjectID(lastupdateId)})
            .then((lastlinksupdate) => {
              resolve(lastlinksupdate);
            });
        });
    },
    updateLastUpdate:(lastUpdateId,lastUpdateDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.LAST_UPDATE).updateOne({_id:ObjectID(lastUpdateId)},{
                $set:{
                    lastupdatetext:lastUpdateDetails.lastupdatetext,
                    lastupdatelinktext:lastUpdateDetails.lastupdatelinktext,
                    lastupdatelink:lastUpdateDetails.lastupdatelink,


                }
            }).then((response)=>{
                resolve()
            })
        })
    },
    deleteLastUpdate:(lastUpdateId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.LAST_UPDATE).removeOne({_id:ObjectID(lastUpdateId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    addCover:(cover,callback)=>{
        
        db.get().collection('cover').insertOne(cover).then((data)=>{
            callback(true)
        })
    
    },
    getOneCover:(coverId) => {
       
        return new Promise((resolve,reject) => {

          db.get()
            .collection(collection.COVER_COLLECTION)
            .findOne({ _id:ObjectID(coverId)})
            .then((cover) => {
              resolve(cover);
            });
        });
    },
    updateCover:(coverId,coverDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.COVER_COLLECTION).updateOne({_id:ObjectID(coverId)},{
                $set:{
                    moviename:coverDetails.moviename,
                    movielanguage:coverDetails.movielanguage,
                    movieid:coverDetails.movieid,
                
                }
            }).then((response)=>{
                resolve()
            })
        })
      },
    deleteCover:(coverId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.COVER_COLLECTION).removeOne({_id:ObjectID(coverId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    getAllCover:()=>{
        return new Promise(async(resolve,reject)=>{
            let cover=await db.get().collection(collection.COVER_COLLECTION).find().sort({_id:-1}).toArray()
            resolve(cover)
        })
    },
    
}