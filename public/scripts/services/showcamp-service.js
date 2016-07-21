angular.module('campgrounds')
.factory('Showcamp', function ShowcampFactory($http){
    return {
        all: function(id){
            return $http({method: 'GET' , url: '/campgrounds/api/' + id});
        }
    }
}).factory('Comment', function CommentFactory($http){
    return {
        create : function(campId, data){
            return $http({
                method: 'POST', 
                url:'campgrounds/' + campId + "/comments", 
                data : data,
                headers: {
                   'Content-Type': "application/json"
                },
            });
            
        },
        update : function(campId, commentId, data){
            return $http({
                method: 'PUT', 
                url:'campgrounds/' + campId + "/comments/" + commentId  , 
                data : data,
                headers: {
                   'Content-Type': 'application/json' //x-www-form-urlencoded'
                },
            });
        },
        delete : function(campId, commentId){
            return $http({
                method: 'DELETE',
                url: 'campgrounds/' + campId + "/comments/" + commentId,
                headers: { 'Content-Type' : 'application/json' }
            })
        }
    }
})