angular.module("campgrounds")
.controller('CampgroundController', function( $scope, Camp, Auth, $location, $window, $rootScope){
        let panel = this ;
        panel.camps = [];
        
        $scope.getAllCampGrounds = function() {
            
            // Camp.all().success(function success(data, status, headers, config){
            //     console.log( headers());
            // })
    
            Camp.all().success(function(data){
                panel.camps=data.campgrounds ;
                $scope.camps = panel.camps ;
                //console.log(panel.camps)
            })
        };
        //console.log($scope)
        
        $scope.getAllCampGrounds();
        $scope.checkAuth = function(){
            if(!$rootScope.locals || !$rootScope.locals.currentUser){
                $scope.alert = "Please login first"
            } else {
                $scope.alert = "" ;
            }
        }
        
        $scope.moreinfo = function(){ $scope.$broadcast('moreinfo') }
        
       
        
        $scope.addCamp = function(){
            if(!$rootScope.locals || !$rootScope.locals.currentUser){
                $scope.alert = "Please login first"
            } else {
                $scope.alert = "" ;
            }
            Auth.auth().success(function(res){
                if(res.currentUser) {
                    $location.path('/new')
                } else {
                    $scope.alert = "Please login first"
                }
            })
        }
        
        //console.log($rootScope);
}).controller('NavController', function($scope, Auth, $rootScope, $location){
    let nav = this ;
    nav.username = ""
    Auth.auth().success(function(data){
        $rootScope.locals = data;
        if(data.currentUser ){
            nav.username = $rootScope.locals.currentUser.username
        }
    })
    
    $scope.resetForm = function(){
        $rootScope.$broadcast("resetForm") ;
    }
    
    $scope.home = function(){
        $location.path('/')
    }
    
    $scope.$on('login', ()=>{ nav.username = $rootScope.locals.currentUser.username})
    $scope.$on('signup', ()=>{ nav.username = $rootScope.locals.currentUser.username})
    $scope.$on('logout',() =>{ nav.username = $rootScope.locals.currentUser })
    
       
}).controller('NewCampController' , function($scope, Auth, $location, Camp, $rootScope, $element){
    
        $scope.addNewCamp = function(){
            var name = 'name='+ this.campground.name;
            var image = 'image='+ this.campground.image;
            var desc = 'description='+this.campground.description ;
            var data = name+'&'+image+'&'+desc
            var isValid = false ;
            if (this.campground.name && this.campground.image && this.campground.description) { isValid = true } else { isValid = false }
            if(isValid && $rootScope.locals.currentUser){
                Camp.post(data).then(function(res){
                    if(res.status === 200) {
                        $rootScope.locals = res.data ;
                        $scope.message = "Your campground created" ;
                        $element.find('#addForm')[0].reset();
                    } else {
                        $scope.message = "Something wrong happended. Please try again!"

                    }
                })
            } else {
                $scope.message = "Please login first"
            }
        }
        
        $scope.$on('error', ()=> { 
            $scope.message = $rootScope.error 
        })
      
})

    


