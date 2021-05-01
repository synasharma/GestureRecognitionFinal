nose_x="";
nose_y="";
lw_x="";
rw_x="";
difference="";
function preload()
{

}

function setup()
{
    if(windowWidth<=800) //Various settings for various screen sizes
    {
        canvas=createCanvas(350,250);
        canvas.position(200,700);
        video=createCapture(VIDEO);
        video.position(200,150);
        console.log(windowWidth);
    }
    else
    {
        canvas=createCanvas(500,400);
        canvas.position(1100,250);
        video=createCapture(VIDEO);
        video.position(300,250);
        console.log(windowWidth);
    }
    posenet=ml5.poseNet(video,modelLoaded); //loading posenet model along with video and defining 'modelLoaded' function
    posenet.on('pose',getposes);//Activating Posenet
}

function modelLoaded() 
{
    console.log("Posenet is initialized!") 
}
function draw()
{
background ('lightslategray'); //way to set background color in p5.js
fill('#d3bdf0');//color of sqaure
stroke('black');//border of the square
square(nose_x,nose_y,difference);//initializing x and y position through the nose and the difference of the wrists which display size
document.getElementById("size").innerHTML=difference;
}

function getposes(results) //getting poses from the model through console
{
    if(results.length>0) //results.length refers to the various poses
    {
     console.log(results); //displaying all the poses with their positions
     nose_x=results[0].pose.nose.x;//getting x valur of nose
     nose_y=results[0].pose.nose.y;//getting y valur of nose
     lw_x=results[0].pose.leftWrist.x;//getting x position of left wrist
     rw_x=results[0].pose.rightWrist.x;//getting x position of right wrist
     difference=floor(lw_x-rw_x);
    }
    else
    {
        console.log("Please Reload and check webcam settings"); //If posenet is not working...
    }
}
