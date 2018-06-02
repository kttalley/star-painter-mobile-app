let attr = false;
        let particle = function (x,y,s,m){
            let glow = 0;
            let glowRate = 1;
            this.pos = createVector(x,y);
            this.vel = createVector(0,0);
            this.acc = createVector(0,0);
            this.mass = createVector(m,m,m);
            this.face = 45 +random(-1000,100);

            this.display = function () {
                glow += glowRate;
                if(glow > 70*s){
                    glowRate = -glowRate;
                }
                if(glow <  -70*s){
                    glowRate = -glowRate;
                }
                // rectMode(CENTER);
                // translate(this.pos.x,this.pos.y);
                // scale(m/150);
                // rotate(this.vel.y*100+m);
                // fill(255,215-glow);
                // rect(0,0,1+glow,1+glow);
                // fill(255,175+glow);
                // rect(0,0,5+glow,5+glow);
                // fill(255,105-glow);
                // rect(0,0,10-glow,10-glow);               
                // resetMatrix();
                stroke(255,10-glow);
                strokeWeight(3);
                point(this.pos.x,this.pos.y);
                stroke(255,20+glow);
                strokeWeight(2);
                point(this.pos.x,this.pos.y);
                stroke(255,50);
                strokeWeight(1);
                point(this.pos.x,this.pos.y);
            };

            this.update = function () {
            
            let mouse = createVector(mouseX,mouseY);
            if(attr === true){
                // Vector pointing from Walker to mouse
                this.acc = p5.Vector.sub(mouse, this.pos);
                // Setting the magnitude of that vector
                this.acc.setMag(0.09);
            }else{
                let timer = 0;
                if(timer <= 1){
                        timer++;
                        this.acc.set(0);
                }
                    
                }
                this.pos.add(this.vel);
                this.vel.add(this.acc);
                // this.acc.rotate(this.face/s);
                // this.acc.set(0);
            };
            this.applyForce = function(force) {
                this.acc.add(force); 
                this.mass.div(force);
            };
            this.edges = function () {
                if(this.pos.x > width - 50){
                    this.vel.x = -this.vel.x;
                    this.acc.mult(0.9);
                }
                if(this.pos.x < 50){
                    this.vel.x = -this.vel.x;
                    this.acc.mult(0.9);
                }
                if(this.pos.y > height - 50){
                    this.vel.y = -this.vel.y;
                    this.acc.mult(0.9);
                }
                if(this.pos.y < 50){
                    this.vel.y = -this.vel.y;
                    this.acc.mult(0.9);
                }
            };
        };
        let particles = [];



        let grav;
        let bgMusic;
        function succCallBack(){
            console.log("success!");
        }
        function errorCallBack(){
            console.log("error!");
        }
        function whileLoading(){
            console.log("loading");
        }
        // if( window.plugins && window.plugins.NativeAudio ) {
    
        //     // Preload audio resources
        //     window.plugins.NativeAudio.preloadComplex( 'music', 'img/sun-rap.mp3', 1, 1, 0, function(msg){
        //     }, function(msg){
        //         console.log( 'error: ' + msg );
        //     });
            
        //     // window.plugins.NativeAudio.preloadSimple( 'click', 'audio/click.mp3', function(msg){
        //     // }, function(msg){
        //         // console.log( 'error: ' + msg );
        //     // });
         
         
        //     // Play
        //     // window.plugins.NativeAudio.play( 'click' );
        //     window.plugins.NativeAudio.loop( 'music' );
         
         
        //     // Stop multichannel clip after 60 seconds
        //     window.setTimeout( function(){
         
        //         window.plugins.NativeAudio.stop( 'music' );
                    
        //         window.plugins.NativeAudio.unload( 'music' );
        //         // window.plugins.NativeAudio.unload( 'click' );
         
        //     }, 1000 * 60 );
        // }





        function preload(){
            bgMusic = loadSound('img/sun-rap.mp3',succCallBack,errorCallBack,whileLoading);
        }
        function setup () {
            bgMusic.play();
            createCanvas(window.innerWidth-5,window.innerHeight -5, P2D);
            angleMode(DEGREES); 
            background(0);
            stroke(255);
            grav = createVector(0,-0.01);
        }

        function touchMoved(){
            attr = true;
        }

        


        let reset = false;
        function resetButton () {
            if( dist( window.innerWidth/4, window.innerHeight-100, pmouseX,pmouseY) < 100){
                reset = true;
            }
            if(reset === true){
                particles = [];
                background(0);
                if(mouseIsPressed){
                    reset = false;
                }
            }
            fill(200);
            rect(window.innerWidth/4, window.innerHeight-100, 65,65);
        }
        let freeze = false;
        function freezeButton() {
           fill(0,0,255);
           if(freeze === true){
               fill(10,150,255);
           }
                  
            triangle(window.innerWidth-70, window.innerHeight-200, window.innerWidth-10, window.innerHeight-200,window.innerWidth-40, window.innerHeight-260);
            if( dist( window.innerWidth-70, window.innerHeight-200, pmouseX,pmouseY) < 100){
                if(freeze === false){
                    freeze = true;
                }
                
                
            
        }
        if(freeze === true){
            if(mouseIsPressed){
                freeze = false;
            }
        }
    }

        function attrButton () {
            if(attr === true){
                fill(250,0,0);
            }else{
                fill(200,200,200)
            }

            noStroke();
            ellipse(window.innerWidth-100, window.innerHeight-100, 65,65);
            if( dist( window.innerWidth-100, window.innerHeight-100, pmouseX,pmouseY) < 100){
                if (attr = false){
                    attr = true;
                }else{
                    attr = false;
                }
            }

        }

        // function touchEnded() {
        //     if(starBrush === true){
        //         starBrush = false;
        //     }else{
        //         starBrush = true;
        //     }
        //     if(starBrush === false){
        //         starBrush = true;
        //     }else{
        //         starBrush = false;
        //     }
        // }

        let starBrush = true;
        let starCap = 100;
        
        function draw () {
            // background(0);
            // fill(255);
            // textSize(12);
            // noStroke();
            // text("Click to draw stars",50,50);
            // text("Press A to create a black hole at your cursor's location",50,80);
            // text("Press S to stop the black hole",50,110);
            // text("Press X to freeze the physics engine",50,140);
            // if(key == 'a'&&keyIsPressed){
            //     attr = true;
            // }
            // if(key == 's'&&keyIsPressed){
            //     attr = false;
            // }
            // if(mouseX > 50 && mouseX < 100){
            //     if(mouseY > 50 && mouseY < 100){
            //         if(mouseIsPressed){

            //             attr = true;
            //         }
            //     }
                
            // }
            



            if(mouseIsPressed && starBrush === true){
                particles.push(new particle(pmouseX, pmouseY, random(0.01,0.5),random(45)));
            }
            for ( var i = 0; i < particles.length; i++){
                // if(particles[i].length > 100){
                    while(particles.length > starCap){
                        particles.pop();
                    }
                    // particles[i].length = 100;
                // }
                
        
                
                
                particles[i].display();
                particles[i].update();
                particles[i].applyForce(grav);
                if(attr === false){
                    particles[i].edges();
                }
                // if(attr === true){
                //     fill(0);
                //     stroke(random(190,255),random(200),random(190,255));
                //     strokeWeight(random(0.01,2));
                //     quad(mouseX,mouseY - 10, mouseX + 20, mouseY + 10, mouseX,mouseY + 10,mouseX - 20, mouseY + 10);
                //     noFill();
                //     ellipse(mouseX,mouseY+5,25,25);
                // }
                
                if(freeze === true){
                    particles[i].vel.set(0);
                    particles[i].acc.set(0);
                }
                if(key == 'd'&&keyIsPressed){
                    particles[i].length = particles[i].length-1;
                }    
                let starCount = particles.length;
                textSize(16);
                fill(0);
                noStroke();
                rect(180,85,25,20);
                fill(255);

                text("Star Count: "+starCount,100,100);
            }
            resetButton();
            attrButton();
            freezeButton();
        }