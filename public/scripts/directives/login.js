angular.module('campgrounds')
.directive('login', function() {
        return {
            restrict: 'E',
            templateUrl: "templates/login.html",
            controller: function($scope, $rootScope, Auth, $element) {
                    $scope.$on('error', ()=> { 
                        console.log($rootScope.error)
                        $scope.message = $rootScope.error 
                        
                    })
                    $scope.message = "" ;
                  $scope.login = function(){
                        
                        Auth.login($scope.user.username, $scope.user.password).then(function(res){
                            if(res.status === 200) {
                                $scope.message = "" ;
                                $rootScope.error =""
                                $rootScope.locals = res.data ;
                                if(res.data.currentUser) {
                                      $scope.$emit('login') 
                                      $('#login-modal').modal('hide')
                                }
                            }
                        })
                  }
            },
            controllerAs: 'loginCtr'
        }
                 
}).directive('logout', function(){
    return {
        restrict: 'A',
        controller: function($scope, Auth, $rootScope, $location) {
            $scope.logout = function() {
                Auth.logout().success(function(data){
                    $rootScope.locals = data
                    $scope.$emit('logout') ;
                    $location.path('#/')
                })
            }
        }
    }
})