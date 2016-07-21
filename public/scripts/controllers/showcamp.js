angular.module('campgrounds')
.controller('ShowCampController', function( $scope, Showcamp , $rootScope, $element){
        let id = $scope.id;
        let user = {} ;
        if($rootScope.locals.currentUser) {
            user = $rootScope.locals.currentUser;
        }
        let camp = this ;
        camp.data = {} ;
      
        $scope.getShowCamp = function () {
            Showcamp.all(id).success(function(data){
                    camp.data = data ;
                    if(data.author && user && user.username === data.author.username){
                        $scope.isOwner = true ;
                    } else {
                        $scope.isOwner = false ;
                    }
                    
            });
        }
            
        $scope.$on('moreinfo', function(){
            $scope.getShowCamp() ;
        })
        
        $scope.$on('review', function(){
            $scope.getShowCamp() ;
        })
        
        $element.on('hidden.bs.modal', function(){
            $scope.$broadcast("closeshowcamp") ;
        })
        

}).controller('CommentController' , function($scope, Comment, $rootScope , $element){
        
    $scope.comments = $scope.$parent.comments;
    
    
       
    $scope.addComment = function(){       
            
            let id = $scope.id ;
            let url = "/campgrounds/"+ id +"/comments" ;
            let comment = {} ;
            let data = {"comment": comment} ;
            //console.log(id + data.comment)
            if($scope.comment) {
                comment.text = $scope.comment.text ;
            } else {
                comment.text = ""
            }
            //console.log($scope.currentUser)
            if(!$rootScope.locals.currentUser){
                $scope.message = "please log in first";
            }
            else if(comment && comment.text !== "") {
                Comment.create(id, data)
                    .then(
                        function(res){
                            if(res.status === 200) {
                                $scope.comment = "";
                                $scope.message = "" ;
                                $scope.$parent.getShowCamp() ;
                            } else {
                                $scope.message ="Something went wrong. Please try again"
                            } 
                    })
                $scope.$on("error", ()=>{$scope.message = $rootScope.error})
            }
    }
    $scope.$on("closeshowcamp", function(){
        $element.find("#addComment")[0].reset();
        $scope.message = ""
    })
    
})
        
        
        

    
    
