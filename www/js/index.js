/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	document.querySelector("#playMp3").addEventListener("touchend", playMP3, false);
	document.querySelector("#playMp3Mild").addEventListener("touchend", playMp3Mild, false);
	document.querySelector("#playRemoteFile").addEventListener("touchend", playRemoteFile, false);
	
};

function playMP3() {
    var mp3URL = getMediaURL("img/sun-rap.mp3");
    var media = new Media(mp3URL, null, mediaError);
	media.setVolume(1.0);
    media.play();
}

function playMp3Mild() {
    var mp3URL = getMediaURL("img/sun-rap.mp3");
    var media = new Media(mp3URL, null, mediaError);
	media.setVolume(0.1);
    media.play();
}

function playRemoteFile() {
	var media = new Media("http://SERVER_IP:PORT/media/test.mp3");
	media.setVolume(0.1);
    media.play();
}

function getMediaURL(s) {
    if(device.platform.toLowerCase() === "android") return "/android_asset/www/" + s;
    return s;
}

function mediaError(e) {
    alert('Media Error');
    alert(JSON.stringify(e));
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        // let bgMusic = loadSound('/android_asset/www/img/sun-rap.mp3',succCallBack,errorCallBack,whileLoading);
        // bgMusic.play();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
