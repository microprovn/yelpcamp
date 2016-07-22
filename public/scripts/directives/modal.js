angular.module('campgrounds')
.directive('showcamp', function(){
        return {
            templateUrl: "templates/modal.html",
           
            
        }
}).directive('editcamp',function(){
    return {
        restrict: 'E',
        templateUrl: 'templates/edit.html',
        link: function(scope, element){
            element.on('click', function(){
                console.log(scope.id)
            })
        }
    };
}).directive('deletecamp', function(Camp){
    return {
        restrict: 'E',
        templateUrl: '/delete',
        link: function(scope,element){
            element.find('#delete-btn').on('click', function(){
                 $('#deleteform').trigger('submit')
                  
            })
        }
    };
}).directive('comment', function(){
    return {
        link: function(scope, element){
                element.find('#editbtn').on('click', function(){
                    element.find('.comment-text').attr("contenteditable", "true").css('outline', '2px solid rgba(0,0,0,0.20').focus();
                    //element.find('.updatebtn').attr("visibility", 'hidden') ;
                    element.find('.updatebtn').css("display","inline");
                    element.find('.cancelbtn').css("display","inline");
                })
                element.find('.cancelbtn').on('click', function(){
                    element.find('.comment-text').attr("contenteditable", "false").css('outline', 'none')
                    element.find('.updatebtn').css("display","none");
                    $(this).css("display", "none")
                })
        },
        controller: function( $scope, $element, Comment, $rootScope){
            var comment = {} ;
            $scope.isOwner = false ;
            let currentUser = "" ;
            let owner = "" ;
            if($rootScope.locals.currentUser && $rootScope.locals.currentUser._id) {
                currentUser = $rootScope.locals.currentUser.username ; }
            if($scope.comment.author) {
                owner = $scope.comment.author.username ;
            }
         
            if (currentUser === owner) {
                $scope.isOwner = true ;
            } else {
                $scope.isOwner = false ;
            }
            
            
            $scope.updateComment = function( ){
                
                comment.text = $element.find('.comment-text').text() ;
                console.log($scope)
                if(comment.text.length !== 0 ){
                    Comment.update($scope.camp._id, $scope.comment._id ,{comment: comment} ).then(function(response){
                        if(response.status === 200) {
                            $scope.getShowCamp()
                            console.log(response)
                        } else {
                            console.log(response)
                        }
                    })
                } else {
                    console.log("error")
                }
               
            }
            $scope.delete = function($index){
                Comment.delete($scope.camp._id, $scope.comment._id).then(function(res){
                    if(res.status === 200) {
                        $scope.camp.comments.splice($index,1) ;
                        $scope.getShowCamp();
                    }
                    console.log(res) 
                })
            }
            $scope.cancel = function(){
                $element.find('.comment-text').text( $scope.comment.text )
            }
        },
        controllerAs: 'commentCtr'
       
    }
}).directive('newcamp',function(){
    return {
        //restrict: 'E',
        templateUrl: '/templates/new.html',
    }
})