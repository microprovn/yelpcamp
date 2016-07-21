angular.module('campgrounds')
.controller("PostController", function($http, $scope, Camp, $rootScope, Auth){
    var currentUser = {} ;
    Auth.auth().success(function(res){
        currentUser = res.currentUser ;
        $rootScope.locals = res ;
        Camp.query($rootScope.locals.currentUser._id).success(function(data){
            $scope.myData = data ;
        })
    })
    
    

}).controller("EditController", function($scope, $uibModal, Auth, $rootScope, Camp){
    var campground = this.campground
    $scope.campground = campground ;
    $scope.animationsEnabled = true ;
    $scope.edit = function(){
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: '/templates/edit.html',
            controller: 'EditModalInstanceController',
            size : 'lg',
            resolve : {
                campground : function(){
                    return $scope.campground ;
                }
            },
         
            controllerAs: 'camp'
        })
        
        console.log(modalInstance)
       
    };
    
    $scope.toggleAnimation = function(){
        $scope.animationsEnabled = !$scope.animationsEnabled ;
    }
    
    $scope.delete = function(campgrounds, index){
        //var locals = this ;
        Auth.auth().success(function(res){
            this.locals = res
        })
        console.log(this.locals);
        console.log($rootScope.locals)
        console.log($scope.campground)
        //console.log(locals.currentUser._id === $rootScope.currentUser._id)
        if(this.locals.currentUser && this.locals.currentUser._id === $scope.campground.author.id){
            
            Camp.delete($scope.campground._id).success(function(res){
                console.log(res)
                
                if(res && res.currentUser && res.success.success) {
                    campgrounds.splice(index, 1);
                } else {
                    console.log("error")
                }
            })
        } else {
            console.log("unauthorized")
        }
    
    }
    
    
}).controller('EditModalInstanceController', function($scope, $uibModalInstance, campground, Camp){
    var restore ={} ;
    this.campground = campground ;
    $scope.campground = campground ;
    angular.copy(campground,restore) ;
    
    $scope.update = function(){
        var id = this.campground._id ;
       
        var name = 'name='+ this.campground.name;
        var image = 'image='+ this.campground.image;
        var desc = 'description='+this.campground.description ;
       
        var data = name+'&'+image+'&'+desc
       
        Camp.update(id,  data).success(function(res){
            if(res && res.currentUser && !res.error.error) {
                console.log(res)
                $uibModalInstance.close()
            }
            else {
                console.log(res.error.error[0])
            }
        })
    }
    
    $scope.cancel = function(){
        $scope.campground.name = restore.name ;
        $scope.campground.image = restore.image ;
        $scope.campground.description = restore.description ;
        $uibModalInstance.dismiss('cancel');
    }
}).controller('ListItemController', function($scope){
    $scope.id = $scope.n._id ;
    $scope.review = function(){
        $scope.$broadcast('review');
    }
})