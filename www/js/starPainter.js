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
                stroke(255);
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

        function setup () {
            createCanvas(window.windowWidth, window.windowHeight, P2D);
            angleMode(DEGREES); 
            background(0);
            stroke(255);
            grav = createVector(0,-0.01);
        }

        function touchMoved(){
            attr = true;
        }

        function draw () {
            // background(0);
            fill(255);
            textSize(12);
            noStroke();
            text("Click to draw stars",50,50);
            text("Press A to create a black hole at your cursor's location",50,80);
            text("Press S to stop the black hole",50,110);
            text("Press X to freeze the physics engine",50,140);
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
            fill(255);
            rect(50,100,50,50);



            if(mouseIsPressed){
                particles.push(new particle(mouseX, mouseY, random(0.01,0.5),random(45)));
            }
            for ( var i = 0; i < particles.length; i++){
                if(particles.length > 100){
                    particles.length = 100;
                }
                
                
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
                if(key == 'x'&&keyIsPressed){
                    particles[i].vel.set(0);
                    particles[i].acc.set(0);
                }
                if(key == 'd'&&keyIsPressed){
                    particles[i].length = particles[i].length-1;
                }    
            }
        }