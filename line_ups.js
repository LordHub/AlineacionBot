var goalkeeperPoint = [83,222];
var defendersArray = {p1:{ x1: 224, y1 : 82}, p2:{ x2: 189, y2: 181}, p3: {x3 : 189 , y3 : 261}, p4: {x4: 224, y4: 351} };
var array4Defenders = [[222,187,187,222],[82,181,261,351]];
var array3Midfilders =[[325,297,325],[109,222,340]];
var array3Attackers = [[448,501,448],[90,222,345]];
var midfildersArray = {p1:{x1 : 327, y1: 109}, p2:{ x2: 296 , y2 : 222}, p3:{x3 : 327, y3 : 340} };
var attackersArray = {p1:{x1 : 450, y1: 90}, p2:{ x2: 503 , y2 : 222}, p3 :{ x3 : 450, y3 : 345} };
var fullXArray = []; //Array storing the X coordinates
var fullYArray = []; //Array storing the Y coordinates

function emptyArray(arrayToEmpty)
{
    arrayToEmpty = [];
}

var methods = {};

methods.addCoordinatesDefenders =function(numberOfDefenders){
    //Empty the array just in case
    emptyArray(fullXArray); emptyArray(fullYArray);
    //Add the goalkeepers        
    fullXArray.push(goalkeeperPoint[0]);
    fullYArray.push(goalkeeperPoint[1]);
    switch (numberOfDefenders) {
        case "4":
            for (let i = 0 ; i < numberOfDefenders ; i++)
            {
                fullXArray.push(array4Defenders[0][i]);
                fullYArray.push(array4Defenders[1][i]);
            }
        break;
        
        default:
            break;
        }
}

methods.addCoordinatesMidfilders =function(numberOfMidfilders){
    //Switch for the defenders
    switch (numberOfMidfilders) {
        
        case "3":
            for (let i = 0 ; i < numberOfMidfilders ; i++)
            {
                fullXArray.push(array3Midfilders[0][i]);
                fullYArray.push(array3Midfilders[1][i]);
            }
            break;

        default:
            break;
    }

};
methods.addCoordinatesAttackers =function(numberOfAttackers){
    //Switch for the defenders
    switch (numberOfAttackers) {
        case "3":
            for (let i = 0 ; i < numberOfAttackers ; i++)
            {
                fullXArray.push(array3Attackers[0][i]);
                fullYArray.push(array3Attackers[1][i]);
            }
            break;
        
        default:
            break;
    }
};

methods.getFullXArray = function () {return fullXArray};
methods.getFullYArray = function () {return fullYArray};

exports.data = methods;