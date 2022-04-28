
//LAZY LOAD
 const myLazyLoad= new LazyLoad ({
           elements_selector:".lazy-photo"
       });

   //Search Google
   function searchit() {
      document.getElementById("hp").href=(("https://www.google.com/search?q=site:dramalite.com ")+
      (document.getElementById("search").value));
    }
        
