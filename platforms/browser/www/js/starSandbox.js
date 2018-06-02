
        new p5();
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
                translate(this.pos.x,this.pos.y);
                scale(m/150);
                rotate(this.vel.y*100+m);
                fill(255,215-glow);
                quad(-10+glow,0,0,-10,10,0,0-glow,10);
                fill(255,175);
                quad(-25,0,0,-25-glow,25,0,0,25+glow);
                fill(255,105);
                quad(-50,0,0,-50-glow,50,0,0,50+glow);
                fill(255,55);
                quad(-70-glow/2,0,0,-70,70,0,0,70+glow/2);
                resetMatrix();
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
            createCanvas(window.innerWidth-5, window.innerHeight-5, P2D);
            angleMode(DEGREES); 
            // background(0);
            stroke(255);
            grav = createVector(0,-0.01);
        }

        // function mobileWidget(x,y,r,g,b) {
        //     fill(r,g,b);
        //     ellipse(x,y,window.innerWidth/5);
        //     if(mouseX > x-(window.innerWidth/2.5) && mouseX < x+(window.innerWidth/2.5)){
        //         if(mouseY > y-(window.innerHeight/2.5) && mouseY < y+(window.innerHeight/2.5)){
        //           if(mouseIsPressed){
        //             attr = true;
        //         }else{
        //             attr = false;
        //         }
        //     }
        //     }

        // }    

        function mobileWidget(x,y,r,g,b) {
            fill(r,g,b);
            ellipse(x,y,200);
            if(mouseX > x+100 && mouseX < x-100){
                if(mouseY > y+100 && mouseY < y-100){
                  if(mouseIsPressed){
                    attr = true;
                }else{
                    attr = false;
                }
            }
            }

        }    

        function draw () {
            background(0);
            fill(255);
            textSize(12);
            noStroke();
            text("Swipe to paint stars",50,50);
            text("Use the buttons below to summon/remove a black hole.",50,80);
            // text("Press S to stop the black hole",50,110);
            // text("Press X to freeze the physics engine",50,140);
            // if(key == 'a'&&keyIsPressed){
            //     attr = true;
            // }
            // if(key == 's'&&keyIsPressed){
            //     attr = false;
            // }
            mobileWidget(window.innerWidth/4,window.innerHeight-window.innerWidth/4);

            if(mouseIsPressed){
                particles.push(new particle(mouseX, mouseY, random(0.01,0.5),random(45)));
            }
            for ( var i = 0; i < particles.length; i++){
                if(particles.length > 50){
                    particles.length = 50;
                }
                
                
                particles[i].display();
                particles[i].update();
                particles[i].applyForce(grav);
                if(attr === false){
                    particles[i].edges();
                }
                if(attr === true){
                    fill(0);
                    stroke(random(190,255),random(200),random(190,255));
                    strokeWeight(random(0.01,2));
                    quad(mouseX,mouseY - 10, mouseX + 20, mouseY + 10, mouseX,mouseY + 10,mouseX - 20, mouseY + 10);
                    noFill();
                    ellipse(mouseX,mouseY+5,25,25);
                }
                if(key == 'x'&&keyIsPressed){
                    particles[i].vel.set(0);
                    particles[i].acc.set(0);
                }
                if(key == 'd'&&keyIsPressed){
                    particles[i].length = particles[i].length-1;
                }    
            }
        }


