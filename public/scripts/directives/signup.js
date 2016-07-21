angular.module('campgrounds')
.directive('signup', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/register.html',
            controller: function($scope, Auth, $rootScope){
                
                $scope.$on("resetForm", ()=>{
                    $('#signupform')[0].reset()
                    $scope.error = "" ;
                })
                $scope.signup = function(){
                    console.log($scope.username) ;
                    if($scope.password === $scope.confirm_password) {
                        Auth.signup($scope.username, $scope.password).success(function(response){
                            console.log(response)
                            if(!response.error.error) {
                                $rootScope.locals = response ;
                                console.log(response) ;
                                if(response.currentUser) {
                                    $scope.$emit('signup')
                                    $('#signup-modal').modal('hide')
                                ;}
                            }
                            else {
                                $scope.error = response.error.error[0] ;
                            }
                        }) ;
                            
                    }
                    else {
                        console.log("p not match")
                        $scope.password_error = "Confirm password do not match"
                    }
                }
            }
        }
    }
)