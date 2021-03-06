
var db=require('../dbconnection/connection')
var collection=require('../dbconnection/collections')
var {ObjectID}=require('mongodb');
const { response } = require('express');



module.exports={
    getMalayalamMovies:(req,res)=>{
        
        return new Promise(async(resolve,reject)=>{
            // const {page=1,limit=40}=req.query;
            let malayalamMovies=await db.get().collection(collection.MOVIES_COLLECTION).find({category:'Malayalam'}).sort({_id:-1}).toArray()
            resolve(malayalamMovies)
        })
    },
    getUpcomingReleaseMovies:()=>{
        return new Promise(async(resolve,reject)=>{
            let currentDate=Date.now()
            console.log(currentDate);
            let allmovies=await db.get().collection(collection.MOVIES_COLLECTION).find({releasedatestamp:{$gte:currentDate}}).sort({releasedatestamp:1}).limit(9).toArray()
            resolve(allmovies)
        })
    },
    getUpcomingReleaseAllMovies:()=>{
        return new Promise(async(resolve,reject)=>{
            let currentDate=Date.now()
            console.log(currentDate);
            let allmovies=await db.get().collection(collection.MOVIES_COLLECTION).find({releasedatestamp:{$gte:currentDate}}).sort({releasedatestamp:1}).toArray()
            resolve(allmovies)
        })
    },
    getReleasedMovies:()=>{
        return new Promise(async(resolve,reject)=>{
            let currentDate=Date.now()
            console.log(currentDate);
            let allmovies=await db.get().collection(collection.MOVIES_COLLECTION).find({releasedatestamp:{$lte:currentDate}}).sort({releasedatestamp:1}).limit(9).toArray()
            resolve(allmovies)
        })
    },
    getUpcomingOttMovies:()=>{
        return new Promise(async(resolve,reject)=>{
            let currentDate=Date.now()
            console.log(currentDate);
            let allmovies=await db.get().collection(collection.MOVIES_COLLECTION).find({ottreleasedatestamp:{$gte:currentDate}}).sort({ottreleasedatestamp:1}).limit(9).toArray()
            resolve(allmovies)
        })
    },
    getUpcomingOttAllMovies:()=>{
        return new Promise(async(resolve,reject)=>{
            let currentDate=Date.now()
            console.log(currentDate);
            let allmovies=await db.get().collection(collection.MOVIES_COLLECTION).find({ottreleasedatestamp:{$gte:currentDate}}).sort({ottreleasedatestamp:1}).toArray()
            resolve(allmovies)
        })
    },
    getTamilMovies:(req,res)=>{
        return new Promise(async(resolve,reject)=>{
            const {page=1,limit=30}=req.query;
            let tamilMovies=await db.get().collection(collection.MOVIES_COLLECTION).find({category:'Tamil'}).sort({_id:-1}).toArray()
            resolve(tamilMovies)
        })
    },
    getTeluguMovies:(req,res)=>{
        return new Promise(async(resolve,reject)=>{
            const {page=1,limit=30}=req.query;
            let teluguMovies=await db.get().collection(collection.MOVIES_COLLECTION).find({category:'Telugu'}).sort({_id:-1}).toArray()
            resolve(teluguMovies)
        })
    },
    getHindiMovies:(req,res)=>{
        return new Promise(async(resolve,reject)=>{
            const {page=1,limit=30}=req.query;
            let hindiMovies=await db.get().collection(collection.MOVIES_COLLECTION).find({category:'Hindi'}).sort({_id:-1}).toArray()
            resolve(hindiMovies)
        })
    },
    getHollywoodMovies:(req,res)=>{
        return new Promise(async(resolve,reject)=>{
            const {page=1,limit=30}=req.query;
            let hollywoodMovies=await db.get().collection(collection.MOVIES_COLLECTION).find({category:'hollywood'}).toArray()
            resolve(hollywoodMovies)
        })
    },
    getWebSeries:(req,res)=>{
        return new Promise(async(resolve,reject)=>{
            const {page=1,limit=30}=req.query;
            let webSeries=await db.get().collection(collection.MOVIES_COLLECTION).find({category:'Webseries'}).sort({_id:-1}).limit(limit*1).skip((page-1)*limit).toArray()
            resolve(webSeries)
        })
    },
    getOtherMovies:(req,res)=>{
        return new Promise(async(resolve,reject)=>{
            const {page=1,limit=30}=req.query;
            let otherMovies=await db.get().collection(collection.MOVIES_COLLECTION).find({category:'Other'}).sort({_id:-1}).limit(limit*1).skip((page-1)*limit).toArray()
            resolve(otherMovies)
        })
    },
    getLatestUpdate:()=>{
        return new Promise(async(resolve,reject)=>{
            let latestupdatemovies=await db.get().collection(collection.MOVIES_COLLECTION).find().sort({_id:-1}).limit(9).toArray()
            resolve(latestupdatemovies)
            
        })
    },
    allMovies:()=>{
        return new Promise(async(resolve,reject)=>{
            let allmovies=await db.get().collection(collection.MOVIES_COLLECTION).find().sort({_id:-1}).toArray()
            resolve(allmovies)
        })
    },
    getTrendingMovies:(req,res)=>{
        return new Promise(async(resolve,reject)=>{
            
            let trendingMovies=await db.get().collection(collection.MOVIES_COLLECTION).find({trending:'yes'}).sort({_id:-1}).limit(8).toArray()
            resolve(trendingMovies)
        })
    },
    getLatestNextweek:()=>{
        return new Promise(async(resolve,reject)=>{
            let nextweekmovies=await db.get().collection(collection.NEXT_WEEK_COLLECTION).find().sort({_id:-1}).limit(8).toArray()
            resolve(nextweekmovies)
        })
    },
    getLatestUpdates:()=>{
        return new Promise(async(resolve,reject)=>{
            let latestupdates=await db.get().collection(collection.LAST_UPDATE).find().sort({_id:-1}).limit(16).toArray()
            resolve(latestupdates)
        })
    },
    getCoverUpdates:()=>{
        return new Promise(async(resolve,reject)=>{
            let cover=await db.get().collection(collection.COVER_COLLECTION).find().sort({_id:-1}).limit(8).toArray()
            resolve(cover)
        })
    },
    
    
    

}
