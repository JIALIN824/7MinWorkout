angular.module("7MinWorkoutApp").run(["$templateCache",function(a){"use strict";a.put("views/description-panel.html",'<div> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">Description</h3> </div> <div class="panel-body"> {{currentExercise.details.description}} </div> </div> <div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title">Steps</h3> </div> <div class="panel-body" ng-bind-html="currentExercise.details.procedure | myLineBreakFilter"> </div> </div> </div>'),a.put("views/finish.html",'<div class="row"> <div class="col-sm-3"></div> <div class="col-sm-6"> <h1 class="text-center">Well Done!</h1> <br> <img src="img/finish.png" style="width:50%" class="center-block"> <br> <div id="start" class="row"> <a href="#/workout"> <span>Start Again!</span> <span class="glyphicon glyphicon-play"></span> </a> </div> </div> <div class="col-sm-3"></div> </div>'),a.put("views/start.html",'<div class="row"> <div class="col-sm-3"></div> <div class="col-sm-6"> <h1 class="text-center">Ready for a Workout?</h1> <br> <img src="img/start.png" style="width:70%" class="center-block"> <br> <div id="start" class="row"> <a href="#/workout"> <span>Start</span> <span class="glyphicon glyphicon-play"></span> </a> </div> </div> <div class="col-sm-3"></div> </div>'),a.put("views/video-panel.html",'<div class="panel panel-info" ng-controller="WorkoutVideosController"> <div class="panel-heading"> <h3 class="panel-title">Videos</h3> </div> <div class="panel-body"> <div class="row"> <div class="col-sm-12"> <div ng-repeat="video in currentExercise.details.related.videos" ng-click="playVideo(video)" class="row video-image"> <div class="col-sm-12"> <div id="play-video-overlay"> <span class="glyphicon glyphicon-play-circle video absolute-center"></span> </div> <img height="220" ng-src="https://i.ytimg.com/vi/{{video}}/hqdefault.jpg"> </div> </div> </div> </div> </div> </div> <script type="text/ng-template" id="youtube-modal"><div class="modal-header">\n        <h3 class="modal-title">Workout Video</h3>\n    </div>\n    <div class="modal-body">\n        <iframe width="100%" height="480" src="{{video}}" frameborder="0" allowfullscreen></iframe>\n    </div>\n    <div class="modal-footer">\n        <button class="btn btn-primary" ng-click="ok()">OK</button>\n    </div></script>'),a.put("views/workout-history.html",'<div class="modal-header"> <h3 class="modal-title">Workout Video</h3> </div> <div class="modal-body"> <div class="row"> <label>Filter Workouts: </label> <div class="btn-group"> <label><input type="radio" name="searchFilter" ng-model="search.completed" value="">All </label> <label><input type="radio" name="searchFilter" ng-model="search.completed" value="true">Completed </label> <label><input type="radio" name="searchFilter" ng-model="search.completed" value="false">Incomplete </label> </div> </div> <div class="row table-responsive"> <table class="table"> <thead> <tr> <th>No</th> <th>Started</th> <th>Ended</th> <th>Last Exercise</th> <th>Exercises Done</th> <th>Completed</th> </tr> </thead> <tbody> <tr ng-repeat="historyItem in history | filter:search | orderBy:\'-startedOn\'"> <td>{{$index+1}}</td> <td>{{historyItem.startedOn | date:\'short\'}}</td> <td>{{historyItem.endedOn | date:\'short\'}}</td> <td>{{historyItem.lastExercise}}</td> <td>{{historyItem.exercisesDone}}</td> <td>{{historyItem.completed ? "Yes" : "No"}}</td> </tr> <tr ng-if="history.length==0" class="warning"> <td colspan="6">No Workout History Found.</td> </tr> </tbody> </table> </div> </div> <div class="modal-footer"> <button class="btn btn-primary" ng-click="ok()">OK</button> </div>'),a.put("views/workout.html",'<div class="row workout-app-container" tabindex="1" ng-keypress="onKeyPressed($event)"> <div id="description-panel" class="col-sm-2" ng-include="\'views/description-panel.html\'"></div> <div id="exercise-pane" class="col-sm-7"> <div id="pause-overlay" ng-click="pauseResumeToggle()"> <span class="glyphicon glyphicon-pause pause absolute-center" ng-class="{\'glyphicon-pause\': !workoutPaused, \'glyphicon-play\' : workoutPaused }"></span> </div> <span ng-controller="WorkoutAudioController"> <audio media-player="ticksAudio" loop autoplay src="content/tick10s.mp3"></audio> <audio media-player="nextUpAudio" src="content/nextup.mp3"></audio> <audio media-player="nextUpExerciseAudio" playlist="exercisesAudio"></audio> <audio media-player="halfWayAudio" src="content/15seconds.wav"></audio> <audio media-player="aboutToCompleteAudio" src="content/321.wav"></audio> </span> <div class="row workout-content"> <div class="workout-display-div"> <h4>Workout Remaining-{{workoutTimeRemaining|secondsToTime}}</h4> <h1>{{currentExercise.details.title}}</h1> <img class="img-responsive" ng-src="{{currentExercise.details.image}}"> <div class="progress time-progress"> <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="{{currentExercise.duration}}" ng-style="{\'width\':(currentExerciseDuration/currentExercise.duration)*100+\'%\'}"> </div> </div> <div class="row"> <h3 class="col-sm-6 text-left">Time Remaining: <strong>{{currentExercise.duration-currentExerciseDuration}}</strong></h3> <h3 class="col-sm-6 text-right" ng-if="currentExercise.details.name==\'rest\'">Next up:<strong>{{workoutPlan.exercises[currentExerciseIndex+1].details.title}}</strong></h3> </div> </div> </div> </div> <div id="video-panel" class="col-sm-2" ng-include="\'views/video-panel.html\'"></div> <!------><script type="text/ng-template" id="video-panel.html"><div class="panel panel-default">\n                <div class="panel-heading">\n                <h3 class="panel-title">Videos</h3>\n                </div>\n                <div class="panel-body">\n                <div ng-repeat="video in currentExercise.details.related.videos">\n                    <iframe width="330" height="220" src="{{video}}" frameborder="0" allowfullscreen></iframe>\n                    \n                </div>\n                \n                </div>\n                </div></script> </div>')}]);