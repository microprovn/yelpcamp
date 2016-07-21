angular.module('campgrounds')
.factory('Camp', function CampFactory($http){
    return {
        all: function(){
            return $http({method: 'GET', url:'/api/campgrounds'})
        },
        delete: function(id){
            return $http({method:'DELETE', url: '/campgrounds/'+id }) // +'?_method=DELETE'
        },
        update: function(id, data){
            var url ='/campgrounds/'+id + '?' +data;
            console.log(url) ;
            return $http({
                method: 'PUT', 
                url:'/campgrounds/'+id ,
                data:data,
                headers : {
                    'Content-Type' : "application/x-www-form-urlencoded"
                }
            })
        },
        post : function(data){
            var url ='/campgrounds' + '?' +data;
            console.log(url) ;
            return $http({
                method: 'POST', 
                url:'/campgrounds?' + data ,
                data:data,
                headers : {
                    'Content-Type' : "application/x-www-form-urlencoded"
                }
            })
        },
        query : function(authorId){
            return $http({method: 'GET', url:'/campgrounds/' + authorId})
        }
    }
})