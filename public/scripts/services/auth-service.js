angular.module('campgrounds')
.factory('Auth', function($http, $rootScope){
    return {
        auth : function(){
            return $http({method: 'GET', url: '/auth'})

        },
        login: function(username, password){
            return $http({ method:'POST', 
                        url:'/login?username='+ username + '&password='+ password, 
                        data: {}, 
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
            
        },
        logout: function(){
            return $http({method:'GET', url:'/logout'})
        },
        signup : function(username, password){
            
            var  u = 'username='+ username + '&password='+ password
            return $http({method: "POST",
                url: '/register?' , 
                data : u ,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
                
            })
        }
    }
}).factory('AuthResInterceptor', function($q, $location, $rootScope){
    return {
        response: function(response){
            if(response.status === 401){
                console.log("Response 401")
                $rootScope.error = "Unauthorized"
                $rootScope.$broadcast("error")
            }
            return response || $q.when(response)
        },
        responseError: function(rejection){
            if(rejection.status === 401){
                console.log("Response Error 401")
                //$location.path();
                //console.log($q.reject(rejection) )
                $rootScope.error = "Invalid username password!"
                $rootScope.$broadcast("error")
            }
            return $q.reject(rejection) ;
            
        }
    }
}).config(function($httpProvider){
    //HTTP Interceptor to check auth failures for xhr request 
    $httpProvider.interceptors.push('AuthResInterceptor') ;
})