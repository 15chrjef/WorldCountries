// Disc #1 has 13 positions; at time=0, it is at position 11.
// Disc #2 has 5 positions; at time=0, it is at position 0.
// Disc #3 has 17 positions; at time=0, it is at position 11.
// Disc #4 has 3 positions; at time=0, it is at position 0.
// Disc #5 has 7 positions; at time=0, it is at position 2.
// Disc #6 has 19 positions; at time=0, it is at position 17.
// [0] is positions [1] is position
// positions = 0 to n -1
var obj ={
	1:[13,11],
	2:[5,0],
	3:[17, 11],
	4:[3,0],
	5:[7,2],
	6:[19,17]
}
let going = true
let time = 0;
while(going) {
	if(0 !== (obj[1][1] + time)%(obj[1][0]-1)){
		time ++;
	} else {
		time ++;
		if(0 !== (obj[2][1] + time)%(obj[2][0]-1)){
			time ++;
		} else {
			time ++;
			if(0 !== (obj[3][1] + time)%(obj[3][0]-1)){
				time ++;
			} else {
				time ++;
				if(0 !== (obj[4][1] + time)%(obj[4][0]-1)){
					time ++;
				} else {
					time ++;
					if(0 !== (obj[5][1] + time)%(obj[5][0]-1)){
						time ++;
					} else {
						time ++;
						if(0 !== (obj[6][1] + time)%(obj[6][0]-1)){
							time ++;
						} else {
							console.log('done',time)
							going = false
						}
					}
				}
			}
		}
	}
}
