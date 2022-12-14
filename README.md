Requirements
Update the calculateRoverPath(map) function (rover_0.js).
The function must take a two-dimensional string array as input
The result of the program run is a path-plan.txt file stored in the same folder where the file with code is

JS
Do not use console.log or any other output methods
Add module.exports at the end of your file

module.exports = {
calculateRoverPath,
};


function calculateRoverPath(map)

Restrictions
Do not use libraries for algorithms. You must implement the algorithm using the basic instruments of your language.
You may use these libraries for writing to file. Use the most straightforward ways possible.
JS: you must only use Node js for writing to file.

What are the changes?

Below the sea level
The previous version processes only the terrain that is above sea level. But in reality, the landscape can be both above and below sea level. The new version of the code must handle different terrains.
The numbers still show the height. Zero 0 is a sea level. Positive numbers show the elevation above sea level. Negative numbers mean that the terrain is below sea level.
For example, here is already parsed photo of a small lake:
{{"0","-1","-1","-1","0"},
{"-1","-1","-3","-1","-1"},
{"0","-1","-1","-1","0"},
{"0","0","0","0","0"}}

Impossible Elevation
Nature is unpredictable, and sometimes there are places that the Rover cannot reach. Such terrain is marked as X on the photo. Rover cannot go into that place.
For example, here is a unparsed photo with unreachable terrain:
1 1 X X X
1 1 X X 8
1 1 0 0 3

Updated movement
Now your Rover can move diagonally! It still cannot get back to the same place, though.
Rover still moves from the [0][0] to [N - 1][M - 1]. N and M are arbitrary positive numbers.

Updated fuel mileage

Fuel Mileage with Negative Numbers
The fuel cost works the same with negative numbers: moving from 0 to 2 will cost the same two fuel units as moving from 0 to -2. Moving from 2 to -2 will cost the same as moving from 4 to 0.

Fuel Mileage with Diagonal Movement
Diagonal movement requires different fuel mileage. Every second diagonal move consumes two fuel units. The first diagonal move is one fuel, the second diagonal move is two fuel, the third is one fuel, the fourth is two, etc.
For example, here  
1 2 1
1 2 1
1 7 0
a path from [0][0] to [1][1] costs 1 fuel for diagonal move plus 1 fuel for elevation, and a path from [1][1] to [2][2] costs 2 fuel for the second diagonal move and 2 fuel for descent.

Error handling

Data
Data is not ideal. Sometimes the parser that converts from the photo to numbers shows bizarre results. Please make sure that the matrix contains only numerals and the 'X' sign.

Exceptions
Something may go wrong. There may be no matrix at all, or the matrix may contain weird data, or the path may start with X at [0][0]. There are tons of ways that the program can go wrong.
Implement exception handling. The exception rules: if the Rover cannot start its movement, throw the CannotStartMovement exception. End the program and write the reason to path-plan.txt
So, if the Rover cannot move, throw an exception and end the program. Write to the path-plan.txt something like "Cannot start a movement because ...... ." Come up with your description of a problem. Write in clear and simple English.

String parsing
The input matrix now is a string array, not an integer array.
Input example:
Java and C#:
{{"1", "2"},{"1","X"},{"0","1"}}
JS:
[['1', '2'],['1','X'],['0','1']]
